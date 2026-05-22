import { handleError } from './errorHandler'

const KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID
const SCRIPT_URL = import.meta.env.VITE_SCRIPT_URL
const SITE_URL = import.meta.env.VITE_SITE_URL || window.location.origin

function loadRazorpayScript() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Payment service unavailable'))
    document.body.appendChild(script)
  })
}

/**
 * @param {{
 *   razorpayOrderId: string;
 *   amountPaise: number;
 *   orderId: string;
 *   name: string;
 *   email: string;
 *   phone: string;
 *   serviceTitle: string;
 * }} options
 */
export async function openRazorpayCheckout(options) {
  if (!KEY_ID) {
    throw new Error('Payment configuration error')
  }

  await loadRazorpayScript()

  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay({
      key: KEY_ID,
      amount: options.amountPaise,
      currency: 'INR',
      name: 'Jyoti Vishwas',
      description: options.serviceTitle,
      order_id: options.razorpayOrderId,
      prefill: {
        name: options.name,
        email: options.email,
        contact: options.phone,
      },
      theme: { color: '#6b4423' },
      handler(response) {
        confirmPaymentViaScript({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          order_id: options.orderId,
        })
        resolve(response)
      },
      modal: {
        ondismiss() {
          reject(new Error('Payment cancelled'))
        },
      },
    })

    rzp.on('payment.failed', (response) => {
      console.error('Payment failed');
      const errorMsg = 'payment_failed'
      window.location.href = `${SITE_URL}/payment/failed?order_id=${encodeURIComponent(options.orderId)}&reason=${encodeURIComponent(errorMsg)}`
    })

    rzp.open()
  })
}

async function confirmPaymentViaScript(payload) {
  if (!SCRIPT_URL) return

  const formData = new URLSearchParams()
  Object.entries({ action: 'confirmPayment', ...payload }).forEach(([name, value]) => {
    formData.append(name, value ?? '')
  })

  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    const data = await response.json()
    if (data && data.redirectUrl) {
      window.location.href = data.redirectUrl
    } else {
      window.location.href = `${SITE_URL}/payment/failed?order_id=${encodeURIComponent(payload.order_id)}&error=payment_error`
    }
  } catch (err) {
    console.error('Payment confirmation error')
    window.location.href = `${SITE_URL}/payment/failed?order_id=${encodeURIComponent(payload.order_id)}&error=network_error`
  }
}
