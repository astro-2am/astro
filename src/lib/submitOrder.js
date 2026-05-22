import { handleError } from './errorHandler'

const SCRIPT_URL = import.meta.env.VITE_SCRIPT_URL

/**
 * POST form to Google Apps Script (avoids CORS). Script redirects back to /checkout.
 * @param {Record<string, string>} fields
 */
export async function submitOrderToScript(fields) {
  if (!SCRIPT_URL) {
    throw new Error('Service configuration error')
  }

  const formData = new URLSearchParams()
  Object.entries({ action: 'createOrder', ...fields }).forEach(([name, value]) => {
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

    if (!response.ok) {
      throw new Error('Server error')
    }

    const data = await response.json()
    if (data && data.redirectUrl) {
      window.location.href = data.redirectUrl
    } else {
      throw new Error('Invalid server response')
    }
  } catch (err) {
    throw new Error(handleError(err, 'form'))
  }
}
