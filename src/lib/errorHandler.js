/**
 * Safe Error Handler
 * 
 * Sanitizes error messages to prevent information leakage
 */

/**
 * User-friendly error messages that don't expose internal details
 */
const SAFE_ERROR_MESSAGES = {
  // Network errors
  network: 'Unable to connect to the server. Please check your internet connection and try again.',
  timeout: 'The request took too long. Please try again.',
  
  // Payment errors
  payment_failed: 'Payment could not be processed. Please try again or contact support.',
  payment_cancelled: 'Payment was cancelled. You can try again when ready.',
  
  // Form errors
  validation: 'Please check your form inputs and try again.',
  invalid_data: 'Some information provided is invalid. Please review and correct.',
  
  // Server errors
  server_error: 'Something went wrong on our end. Please try again in a few moments.',
  service_unavailable: 'Service is temporarily unavailable. Please try again later.',
  
  // Generic
  unknown: 'An unexpected error occurred. Please try again or contact support if the issue persists.',
}

/**
 * Sanitize error message for user display
 * @param {Error|string} error - Error object or message
 * @param {string} context - Context where error occurred (e.g., 'payment', 'form')
 * @returns {string} Safe error message
 */
export function getSafeErrorMessage(error, context = 'unknown') {
  // If it's already a safe message, return it
  if (typeof error === 'string' && Object.values(SAFE_ERROR_MESSAGES).includes(error)) {
    return error
  }
  
  const errorMessage = error instanceof Error ? error.message : String(error)
  const lowerMessage = errorMessage.toLowerCase()
  
  // Map specific error patterns to safe messages
  if (lowerMessage.includes('network') || lowerMessage.includes('fetch')) {
    return SAFE_ERROR_MESSAGES.network
  }
  
  if (lowerMessage.includes('timeout')) {
    return SAFE_ERROR_MESSAGES.timeout
  }
  
  if (lowerMessage.includes('payment') && lowerMessage.includes('cancel')) {
    return SAFE_ERROR_MESSAGES.payment_cancelled
  }
  
  if (lowerMessage.includes('payment') || lowerMessage.includes('razorpay')) {
    return SAFE_ERROR_MESSAGES.payment_failed
  }
  
  if (lowerMessage.includes('validation') || lowerMessage.includes('invalid')) {
    return SAFE_ERROR_MESSAGES.validation
  }
  
  if (lowerMessage.includes('server') || lowerMessage.includes('500') || lowerMessage.includes('503')) {
    return SAFE_ERROR_MESSAGES.server_error
  }
  
  if (lowerMessage.includes('unavailable') || lowerMessage.includes('503')) {
    return SAFE_ERROR_MESSAGES.service_unavailable
  }
  
  // Context-specific defaults
  if (context === 'payment') {
    return SAFE_ERROR_MESSAGES.payment_failed
  }
  
  if (context === 'form') {
    return SAFE_ERROR_MESSAGES.validation
  }
  
  // Default safe message
  return SAFE_ERROR_MESSAGES.unknown
}

/**
 * Log error details for debugging (only in development)
 * @param {Error|string} error - Error to log
 * @param {string} context - Context information
 */
export function logError(error, context = '') {
  // Only log detailed errors in development
  if (import.meta.env.DEV) {
    console.error(`[${context}]`, error)
    
    if (error instanceof Error && error.stack) {
      console.error('Stack trace:', error.stack)
    }
  }
  
  // In production, you might want to send errors to a logging service
  // Example: sendToLoggingService({ error, context, timestamp: new Date() })
}

/**
 * Handle error with safe message and optional logging
 * @param {Error|string} error - Error to handle
 * @param {string} context - Context where error occurred
 * @returns {string} Safe error message
 */
export function handleError(error, context = 'unknown') {
  logError(error, context)
  return getSafeErrorMessage(error, context)
}

/**
 * Create a safe error response for API calls
 * @param {Error|string} error - Error to handle
 * @param {string} context - Context information
 * @returns {Object} Error response object
 */
export function createErrorResponse(error, context = 'unknown') {
  return {
    success: false,
    error: getSafeErrorMessage(error, context),
    timestamp: new Date().toISOString(),
  }
}

/**
 * Check if error is a network error
 * @param {Error} error - Error to check
 * @returns {boolean} True if network error
 */
export function isNetworkError(error) {
  if (!error) return false
  
  const message = error.message?.toLowerCase() || ''
  return (
    message.includes('network') ||
    message.includes('fetch') ||
    message.includes('connection') ||
    error.name === 'NetworkError' ||
    error.name === 'TypeError'
  )
}

/**
 * Check if error is a timeout error
 * @param {Error} error - Error to check
 * @returns {boolean} True if timeout error
 */
export function isTimeoutError(error) {
  if (!error) return false
  
  const message = error.message?.toLowerCase() || ''
  return message.includes('timeout') || error.name === 'TimeoutError'
}
