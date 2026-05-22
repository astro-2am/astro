/**
 * CSRF Protection Utilities
 * 
 * Generates and validates CSRF tokens for form submissions
 */

const CSRF_TOKEN_KEY = 'csrf_token'
const CSRF_TOKEN_EXPIRY_KEY = 'csrf_token_expiry'
const TOKEN_VALIDITY_MS = 60 * 60 * 1000 // 1 hour

/**
 * Generate a random CSRF token
 * @returns {string} CSRF token
 */
function generateToken() {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * Get or create a CSRF token
 * @returns {string} CSRF token
 */
export function getCsrfToken() {
  const existingToken = sessionStorage.getItem(CSRF_TOKEN_KEY)
  const expiry = sessionStorage.getItem(CSRF_TOKEN_EXPIRY_KEY)
  
  // Check if token exists and is still valid
  if (existingToken && expiry && Date.now() < parseInt(expiry, 10)) {
    return existingToken
  }
  
  // Generate new token
  const newToken = generateToken()
  const newExpiry = Date.now() + TOKEN_VALIDITY_MS
  
  sessionStorage.setItem(CSRF_TOKEN_KEY, newToken)
  sessionStorage.setItem(CSRF_TOKEN_EXPIRY_KEY, newExpiry.toString())
  
  return newToken
}

/**
 * Validate a CSRF token
 * @param {string} token - Token to validate
 * @returns {boolean} True if valid
 */
export function validateCsrfToken(token) {
  if (!token) return false
  
  const storedToken = sessionStorage.getItem(CSRF_TOKEN_KEY)
  const expiry = sessionStorage.getItem(CSRF_TOKEN_EXPIRY_KEY)
  
  if (!storedToken || !expiry) return false
  if (Date.now() >= parseInt(expiry, 10)) return false
  
  // Constant-time comparison to prevent timing attacks
  return timingSafeEqual(token, storedToken)
}

/**
 * Timing-safe string comparison
 * @param {string} a - First string
 * @param {string} b - Second string
 * @returns {boolean} True if equal
 */
function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false
  
  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  
  return result === 0
}

/**
 * Clear CSRF token (e.g., on logout)
 */
export function clearCsrfToken() {
  sessionStorage.removeItem(CSRF_TOKEN_KEY)
  sessionStorage.removeItem(CSRF_TOKEN_EXPIRY_KEY)
}

/**
 * Refresh CSRF token (generate new one)
 * @returns {string} New CSRF token
 */
export function refreshCsrfToken() {
  clearCsrfToken()
  return getCsrfToken()
}
