/**
 * ASTRO PORTAL — Google Apps Script
 *
 * SETUP (one-time):
 * 1. Create a Google Sheet. Row 1 = headers (run setupSheet() once from editor).
 * 2. Extensions → Apps Script → paste this file.
 * 3. Project Settings → Script properties:
 *    RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, FRONTEND_URL, ASTROLOGER_EMAIL
 *    Optional: WEBHOOK_SECRET (for Razorpay webhook URL with ?action=webhook)
 * 4. Deploy → New deployment → Web app:
 *    Execute as: Me | Who has access: Anyone
 * 5. Copy deployment URL → VITE_SCRIPT_URL in React .env.local
 * 6. Razorpay Dashboard → Webhook (optional backup): same URL, event payment.captured
 *
 * PRICES (INR) — keep in sync with src/config/services.js
 */
var PRICES = {
  janam_kundli: 499,
  kundli_milan: 799,
  ask_question: 299,
};

var SLA_HOURS = {
  janam_kundli: 72,
  kundli_milan: 72,
  ask_question: 48,
};

var HEADERS = [
  'order_id',
  'service',
  'status',
  'amount_inr',
  'name',
  'email',
  'phone',
  'language',
  'notes',
  'question',
  'category',
  'p1_name',
  'p1_dob',
  'p1_birth_time',
  'p1_birth_place',
  'p1_gender',
  'p2_name',
  'p2_dob',
  'p2_birth_time',
  'p2_birth_place',
  'p2_gender',
  'created_at',
  'paid_at',
  'due_by',
  'razorpay_order_id',
  'razorpay_payment_id',
  // new fields for location
  'location',
  'location_manual',
];

var SERVICE_SHEETS = {
  janam_kundli: 'Janam Kundli',
  kundli_milan: 'Kundli Milan',
  ask_question: 'Ask a Question',
};

function getProps() {
  var p = PropertiesService.getScriptProperties();
  return {
    keyId: p.getProperty('RAZORPAY_KEY_ID'),
    keySecret: p.getProperty('RAZORPAY_KEY_SECRET'),
    frontendUrl: (p.getProperty('FRONTEND_URL') || '').replace(/\/$/, ''),
    astrologerEmail: p.getProperty('ASTROLOGER_EMAIL') || 'astro.meghashri@gmail.com',
    webhookSecret: p.getProperty('WEBHOOK_SECRET'),
  };
}

function getSheetForService(service) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetName = SERVICE_SHEETS[service] || 'Sheet1';
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    // Setup headers for this new sheet
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

/** Run once from Apps Script editor to create header rows for all service sheets */
function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(SERVICE_SHEETS).forEach(function (serviceKey) {
    var name = SERVICE_SHEETS[serviceKey];
    var sheet = ss.getSheetByName(name);
    if (!sheet) {
      sheet = ss.insertSheet(name);
    } else {
      sheet.clear();
    }
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.autoResizeColumns(1, HEADERS.length);
  });

  // Delete default 'Sheet1' if it's empty to keep the workspace clean
  var defaultSheet = ss.getSheetByName('Sheet1');
  if (defaultSheet && defaultSheet.getLastRow() === 0) {
    try {
      ss.deleteSheet(defaultSheet);
    } catch (e) {
      // Ignore if it cannot be deleted
    }
  }
}

function doGet(e) {
  var action = (e.parameter && e.parameter.action) || '';
  if (action === 'getOrders') {
    return handleGetOrders();
  }
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, message: 'Astro portal script is running' })
  ).setMimeType(ContentService.MimeType.JSON);
}

function handleGetOrders() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var orders = [];

  for (var s = 0; s < sheets.length; s++) {
    var sheet = sheets[s];
    // Skip sheets that are not one of the SERVICE_SHEETS
    var isValidSheet = false;
    for (var key in SERVICE_SHEETS) {
      if (SERVICE_SHEETS[key] === sheet.getName()) {
        isValidSheet = true;
        break;
      }
    }
    if (!isValidSheet) continue;

    var data = sheet.getDataRange().getValues();
    if (data.length <= 1) continue; // Only headers or empty

    for (var r = 1; r < data.length; r++) {
      var row = data[r];
      var orderObj = {};
      for (var c = 0; c < HEADERS.length; c++) {
        var val = row[c];
        if (val instanceof Date) {
          orderObj[HEADERS[c]] = val.toISOString();
        } else {
          orderObj[HEADERS[c]] = val;
        }
      }
      // only add if it has an order ID
      if (orderObj.order_id) {
        orders.push(orderObj);
      }
    }
  }

  // Sort by created_at descending
  orders.sort(function(a, b) {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  return ContentService.createTextOutput(JSON.stringify({ ok: true, orders: orders }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var action = (e.parameter && e.parameter.action) || '';

    if (action === 'createOrder') {
      return handleCreateOrder(e.parameter);
    }
    if (action === 'confirmPayment') {
      return handleConfirmPayment(e.parameter);
    }
    if (action === 'webhook' || (e.postData && e.postData.contents && !action)) {
      return handleWebhook(e);
    }

    return redirectTo(e.parameter.frontendUrl || getProps().frontendUrl + '/payment/failed', {
      error: 'unknown_action',
    });
  } catch (err) {
    Logger.log(err);
    var front = getProps().frontendUrl || 'http://localhost:5173';
    return redirectTo(front + '/payment/failed', { error: 'server_error' });
  }
}

function handleCreateOrder(params) {
  var props = getProps();
  var frontendUrl = props.frontendUrl || 'http://localhost:5173';

  var service = params.service;
  var amountInr = PRICES[service];
  if (!amountInr) {
    throw new Error('Invalid service: ' + service);
  }

  var orderId = 'AST-' + Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyyMMdd') + '-' + randomSuffix();
  var slaHours = SLA_HOURS[service] || 72;
  var createdAt = new Date();
  var dueBy = new Date(createdAt.getTime() + slaHours * 60 * 60 * 1000);

  // 1. Create real Razorpay Order
  var rzpOrder;
  try {
    rzpOrder = createRazorpayOrder(props, {
      amount: amountInr * 100, // Amount in paise
      currency: 'INR',
      receipt: orderId,
      notes: { order_id: orderId, service: service }
    });
  } catch(e) {
    throw new Error("Razorpay Order Creation Failed: " + e.message + " (Check if your RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are set correctly in Script Properties)");
  }

  // 2. Save order to sheet with 'created' status
  var row = rowFromParams(params, {
    order_id: orderId,
    service: service,
    status: 'created', // Pending payment
    amount_inr: amountInr,
    created_at: createdAt,
    due_by: dueBy,
    paid_at: '',
    razorpay_order_id: rzpOrder.id,
    razorpay_payment_id: '',
  });

  appendRow(row);

  // 3. Redirect to the React /checkout page
  var checkoutUrl =
    frontendUrl +
    '/checkout?' +
    [
      'order_id=' + encodeURIComponent(orderId),
      'razorpay_order_id=' + encodeURIComponent(rzpOrder.id),
      'amount_paise=' + encodeURIComponent(amountInr * 100),
      'service=' + encodeURIComponent(service),
      'name=' + encodeURIComponent(params.name || ''),
      'email=' + encodeURIComponent(params.email || ''),
      'phone=' + encodeURIComponent(params.phone || ''),
    ].join('&');

  return redirectTo(checkoutUrl);
}

function handleConfirmPayment(params) {
  var props = getProps();
  var orderId = params.order_id;
  var razorpayOrderId = params.razorpay_order_id;
  var paymentId = params.razorpay_payment_id;
  var signature = params.razorpay_signature;

  if (!verifyPaymentSignature(props.keySecret, razorpayOrderId, paymentId, signature)) {
    return redirectTo(props.frontendUrl + '/payment/failed', {
      order_id: orderId,
      service: findServiceByOrderId(orderId),
    });
  }

  var result = findRowIndexAndSheetByOrderId(orderId);
  if (result) {
    updateRow(result.sheet, result.rowIndex, {
      status: 'paid',
      paid_at: new Date(),
      razorpay_payment_id: paymentId,
    });
    var row = getRowData(result.sheet, result.rowIndex);
    sendPaidEmails(props, row);
  }

  var service = result ? getRowValue(result.sheet, result.rowIndex, 'service') : '';
  return redirectTo(props.frontendUrl + '/payment/success', {
    order_id: orderId,
    service: service,
  });
}

function handleWebhook(e) {
  var props = getProps();
  var body = e.postData.contents;
  var payload = JSON.parse(body);

  if (props.webhookSecret && e.parameter && e.parameter['X-Razorpay-Signature']) {
    // Signature in query is weak; prefer confirmPayment from client
  }

  if (payload.event === 'payment.captured') {
    var payment = payload.payload.payment.entity;
    var orderIdNote = payment.notes && payment.notes.order_id;
    var orderId = orderIdNote || payment.receipt;
    var result = findRowIndexAndSheetByOrderId(orderId);
    if (result && getRowValue(result.sheet, result.rowIndex, 'status') !== 'paid') {
      updateRow(result.sheet, result.rowIndex, {
        status: 'paid',
        paid_at: new Date(),
        razorpay_payment_id: payment.id,
      });
      sendPaidEmails(props, getRowData(result.sheet, result.rowIndex));
    }
  }

  return ContentService.createTextOutput('ok').setMimeType(ContentService.MimeType.TEXT);
}

function createRazorpayOrder(props, orderPayload) {
  var url = 'https://api.razorpay.com/v1/orders';
  var auth = Utilities.base64Encode(props.keyId + ':' + props.keySecret);
  var response = UrlFetchApp.fetch(url, {
    method: 'post',
    headers: {
      Authorization: 'Basic ' + auth,
      'Content-Type': 'application/json',
    },
    payload: JSON.stringify(orderPayload),
    muteHttpExceptions: true,
  });

  var code = response.getResponseCode();
  var text = response.getContentText();
  if (code < 200 || code >= 300) {
    throw new Error('Razorpay order failed: ' + text);
  }
  return JSON.parse(text);
}

function verifyPaymentSignature(secret, orderId, paymentId, signature) {
  if (!secret || !orderId || !paymentId || !signature) return false;
  var body = orderId + '|' + paymentId;
  var bytes = Utilities.computeHmacSha256Signature(body, secret);
  var generated = bytes
    .map(function (b) {
      var v = (b < 0 ? b + 256 : b).toString(16);
      return v.length === 1 ? '0' + v : v;
    })
    .join('');
  return generated === signature;
}

function rowFromParams(params, overrides) {
  var row = {};
  HEADERS.forEach(function (h) {
    row[h] = '';
  });
  HEADERS.forEach(function (h) {
    if (params[h] !== undefined && params[h] !== '') row[h] = params[h];
  });
  Object.keys(overrides).forEach(function (k) {
    row[k] = overrides[k];
  });
  return row;
}

function appendRow(rowObj) {
  var sheet = getSheetForService(rowObj.service);
  var values = HEADERS.map(function (h) {
    var v = rowObj[h];
    if (v instanceof Date) return v;
    return v === undefined || v === null ? '' : v;
  });
  sheet.appendRow(values);
}

function findRowIndexAndSheetByOrderId(orderId) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var orderCol = HEADERS.indexOf('order_id');
  if (orderCol < 0) return null;

  for (var s = 0; s < sheets.length; s++) {
    var sheet = sheets[s];
    var data = sheet.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      if (data[i][orderCol] === orderId) {
        return { sheet: sheet, rowIndex: i + 1 };
      }
    }
  }
  return null;
}

function findRowIndexAndSheetByRazorpayOrderId(rzpOrderId) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var col = HEADERS.indexOf('razorpay_order_id');
  if (col < 0) return null;

  for (var s = 0; s < sheets.length; s++) {
    var sheet = sheets[s];
    var data = sheet.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      if (data[i][col] === rzpOrderId) {
        return { sheet: sheet, rowIndex: i + 1 };
      }
    }
  }
  return null;
}

function findServiceByOrderId(orderId) {
  var result = findRowIndexAndSheetByOrderId(orderId);
  if (!result) return '';
  return getRowValue(result.sheet, result.rowIndex, 'service');
}

function getRowValue(sheet, rowIndex, header) {
  var col = HEADERS.indexOf(header) + 1;
  return sheet.getRange(rowIndex, col).getValue();
}

function updateRow(sheet, rowIndex, updates) {
  Object.keys(updates).forEach(function (key) {
    var col = HEADERS.indexOf(key) + 1;
    if (col > 0) sheet.getRange(rowIndex, col).setValue(updates[key]);
  });
}

function getRowData(sheet, rowIndex) {
  var obj = {};
  HEADERS.forEach(function (h) {
    obj[h] = getRowValue(sheet, rowIndex, h);
  });
  return obj;
}

function sendPaidEmails(props, row) {
  if (!row.email) return;

  var serviceLabel = row.service.replace(/_/g, ' ');
  var userSubject = 'Payment received — Order ' + row.order_id;
  var userBody =
    'Namaste ' +
    row.name +
    ',\n\nThank you for your payment for ' +
    serviceLabel +
    '.\n\nOrder ID: ' +
    row.order_id +
    '\nAmount: ₹' +
    row.amount_inr +
    '\n\nOur astrologer will reply to this email (' +
    row.email +
    ') within the timeframe mentioned on our website.\n\nWith blessings,\nJyoti Vishwas';

  // Append location information if available
  if (row.location) {
    userBody += '\nLocation (coords): ' + row.location;
  }
  if (row.location_manual) {
    userBody += '\nLocation (text): ' + row.location_manual;
  }

  MailApp.sendEmail(row.email, userSubject, userBody);

  if (props.astrologerEmail) {
    var astroBody = formatOrderForAstrologer(row);
    MailApp.sendEmail(
      props.astrologerEmail,
      'New PAID order: ' + row.order_id + ' — ' + serviceLabel,
      astroBody
    );
  }
}

  

function formatOrderForAstrologer(row) {
  var lines = ['NEW PAID ORDER', '================', 'Order: ' + row.order_id, 'Service: ' + row.service, 'Amount: ₹' + row.amount_inr, 'Due by: ' + row.due_by, '', '--- Contact ---', 'Name: ' + row.name, 'Email: ' + row.email, 'Phone: ' + row.phone, 'Language: ' + row.language, ''];

  if (row.question) lines.push('Question: ' + row.question, 'Category: ' + row.category);
  if (row.p1_dob) {
    lines.push('', '--- Person 1 ---', 'Name: ' + row.p1_name, 'DOB: ' + row.p1_dob, 'Time: ' + row.p1_birth_time, 'Place: ' + row.p1_birth_place, 'Gender: ' + row.p1_gender);
  }
  if (row.p2_dob) {
    lines.push('', '--- Person 2 ---', 'Name: ' + row.p2_name, 'DOB: ' + row.p2_dob, 'Time: ' + row.p2_birth_time, 'Place: ' + row.p2_birth_place, 'Gender: ' + row.p2_gender);
  }
  if (row.notes) lines.push('', 'Notes: ' + row.notes);

  return lines.join('\n');
}

function redirectTo(url, extraParams) {
  var full = url;
  if (extraParams) {
    var qs = Object.keys(extraParams)
      .filter(function (k) {
        return extraParams[k];
      })
      .map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(extraParams[k]);
      })
      .join('&');
    if (qs) full += (url.indexOf('?') >= 0 ? '&' : '?') + qs;
  }
  
  var response = { ok: true, redirectUrl: full };
  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

function escapeHtmlAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function randomSuffix() {
  return Math.floor(1000 + Math.random() * 9000);
}
