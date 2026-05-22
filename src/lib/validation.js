/**
 * Input validation utilities for form data
 */

/**
 * Sanitize string input by trimming and limiting length
 * @param {string} value - Input value
 * @param {number} maxLength - Maximum allowed length
 * @returns {string} Sanitized value
 */
export function sanitizeString(value, maxLength = 500) {
  if (typeof value !== 'string') return ''
  return String(value).trim().slice(0, maxLength)
}

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean} True if valid
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

/**
 * Validate phone number (basic check)
 * @param {string} phone - Phone number
 * @returns {boolean} True if valid
 */
export function isValidPhone(phone) {
  if (!phone || typeof phone !== 'string') return false
  // Allow digits, spaces, +, -, (, )
  const phoneRegex = /^[\d\s+\-()]+$/
  return phoneRegex.test(phone) && phone.length >= 10 && phone.length <= 20
}

/**
 * Validate date format (YYYY-MM-DD)
 * @param {string} date - Date string
 * @returns {boolean} True if valid
 */
export function isValidDate(date) {
  if (!date || typeof date !== 'string') return false
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (!dateRegex.test(date)) return false
  
  const d = new Date(date)
  return d instanceof Date && !isNaN(d.getTime())
}

/**
 * Validate time format (HH:MM)
 * @param {string} time - Time string
 * @returns {boolean} True if valid
 */
export function isValidTime(time) {
  if (!time || typeof time !== 'string') return false
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
  return timeRegex.test(time)
}

/**
 * Validate name (letters, spaces, hyphens, apostrophes)
 * @param {string} name - Name string
 * @returns {boolean} True if valid
 */
export function isValidName(name) {
  if (!name || typeof name !== 'string') return false
  const nameRegex = /^[a-zA-Z\s\-'\.]+$/
  return nameRegex.test(name) && name.length >= 2 && name.length <= 100
}

/**
 * Validate place name
 * @param {string} place - Place name
 * @returns {boolean} True if valid
 */
export function isValidPlace(place) {
  if (!place || typeof place !== 'string') return false
  // Allow letters, numbers, spaces, commas, hyphens, apostrophes
  const placeRegex = /^[a-zA-Z0-9\s,\-'\.]+$/
  return placeRegex.test(place) && place.length >= 2 && place.length <= 200
}

/**
 * Validate gender selection
 * @param {string} gender - Gender value
 * @returns {boolean} True if valid
 */
export function isValidGender(gender) {
  const validGenders = ['male', 'female', 'other']
  return validGenders.includes(gender)
}

/**
 * Validate language selection
 * @param {string} language - Language value
 * @returns {boolean} True if valid
 */
export function isValidLanguage(language) {
  const validLanguages = ['hindi', 'english', 'both']
  return validLanguages.includes(language)
}

/**
 * Validate service ID
 * @param {string} serviceId - Service identifier
 * @returns {boolean} True if valid
 */
export function isValidServiceId(serviceId) {
  const validServices = ['janam_kundli', 'kundli_milan', 'ask_question']
  return validServices.includes(serviceId)
}

/**
 * Validate question category
 * @param {string} category - Category value
 * @returns {boolean} True if valid
 */
export function isValidCategory(category) {
  const validCategories = ['Career', 'Love & marriage', 'Finance', 'Health', 'Family', 'General']
  return validCategories.includes(category)
}

/**
 * Sanitize and validate form data
 * @param {Object} fields - Form fields object
 * @param {string} serviceId - Service identifier
 * @returns {Object} { isValid: boolean, errors: string[], sanitized: Object }
 */
export function validateOrderForm(fields, serviceId) {
  const errors = []
  const sanitized = {}

  // Validate service
  if (!isValidServiceId(serviceId)) {
    errors.push('Invalid service selected')
    return { isValid: false, errors, sanitized }
  }
  sanitized.service = serviceId

  // Validate common fields
  if (!isValidName(fields.name)) {
    errors.push('Please enter a valid name (2-100 characters, letters only)')
  } else {
    sanitized.name = sanitizeString(fields.name, 100)
  }

  if (!isValidEmail(fields.email)) {
    errors.push('Please enter a valid email address')
  } else {
    sanitized.email = sanitizeString(fields.email, 254).toLowerCase()
  }

  if (!isValidPhone(fields.phone)) {
    errors.push('Please enter a valid phone number (10-20 characters)')
  } else {
    sanitized.phone = sanitizeString(fields.phone, 20)
  }

  if (!isValidLanguage(fields.language)) {
    errors.push('Please select a valid language')
  } else {
    sanitized.language = fields.language
  }

  // Validate location
  if (fields.location) {
    sanitized.location = sanitizeString(fields.location, 100)
  }
  if (fields.location_manual) {
    if (!isValidPlace(fields.location_manual)) {
      errors.push('Please enter a valid location')
    } else {
      sanitized.location_manual = sanitizeString(fields.location_manual, 200)
    }
  }

  // Service-specific validation
  if (serviceId === 'janam_kundli') {
    if (!isValidDate(fields.p1_dob)) {
      errors.push('Please enter a valid date of birth')
    } else {
      sanitized.p1_dob = fields.p1_dob
    }

    if (!isValidTime(fields.p1_birth_time)) {
      errors.push('Please enter a valid birth time')
    } else {
      sanitized.p1_birth_time = fields.p1_birth_time
    }

    if (!isValidPlace(fields.p1_birth_place)) {
      errors.push('Please enter a valid birth place')
    } else {
      sanitized.p1_birth_place = sanitizeString(fields.p1_birth_place, 200)
    }

    if (!isValidGender(fields.p1_gender)) {
      errors.push('Please select a valid gender')
    } else {
      sanitized.p1_gender = fields.p1_gender
    }

    if (fields.notes) {
      sanitized.notes = sanitizeString(fields.notes, 1000)
    }
  }

  if (serviceId === 'kundli_milan') {
    // Person 1
    if (!isValidName(fields.p1_name)) {
      errors.push('Please enter a valid name for Person 1')
    } else {
      sanitized.p1_name = sanitizeString(fields.p1_name, 100)
    }

    if (!isValidDate(fields.p1_dob)) {
      errors.push('Please enter a valid date of birth for Person 1')
    } else {
      sanitized.p1_dob = fields.p1_dob
    }

    if (!isValidTime(fields.p1_birth_time)) {
      errors.push('Please enter a valid birth time for Person 1')
    } else {
      sanitized.p1_birth_time = fields.p1_birth_time
    }

    if (!isValidPlace(fields.p1_birth_place)) {
      errors.push('Please enter a valid birth place for Person 1')
    } else {
      sanitized.p1_birth_place = sanitizeString(fields.p1_birth_place, 200)
    }

    if (!isValidGender(fields.p1_gender)) {
      errors.push('Please select a valid gender for Person 1')
    } else {
      sanitized.p1_gender = fields.p1_gender
    }

    // Person 2
    if (!isValidName(fields.p2_name)) {
      errors.push('Please enter a valid name for Person 2')
    } else {
      sanitized.p2_name = sanitizeString(fields.p2_name, 100)
    }

    if (!isValidDate(fields.p2_dob)) {
      errors.push('Please enter a valid date of birth for Person 2')
    } else {
      sanitized.p2_dob = fields.p2_dob
    }

    if (!isValidTime(fields.p2_birth_time)) {
      errors.push('Please enter a valid birth time for Person 2')
    } else {
      sanitized.p2_birth_time = fields.p2_birth_time
    }

    if (!isValidPlace(fields.p2_birth_place)) {
      errors.push('Please enter a valid birth place for Person 2')
    } else {
      sanitized.p2_birth_place = sanitizeString(fields.p2_birth_place, 200)
    }

    if (!isValidGender(fields.p2_gender)) {
      errors.push('Please select a valid gender for Person 2')
    } else {
      sanitized.p2_gender = fields.p2_gender
    }

    if (fields.notes) {
      sanitized.notes = sanitizeString(fields.notes, 1000)
    }
  }

  if (serviceId === 'ask_question') {
    if (!fields.question || fields.question.trim().length < 10) {
      errors.push('Please enter a question (minimum 10 characters)')
    } else if (fields.question.length > 1000) {
      errors.push('Question is too long (maximum 1000 characters)')
    } else {
      sanitized.question = sanitizeString(fields.question, 1000)
    }

    if (!isValidCategory(fields.category)) {
      errors.push('Please select a valid category')
    } else {
      sanitized.category = fields.category
    }

    // Optional birth details
    if (fields.p1_dob) {
      if (!isValidDate(fields.p1_dob)) {
        errors.push('Please enter a valid date of birth')
      } else {
        sanitized.p1_dob = fields.p1_dob
      }
    }

    if (fields.p1_birth_time) {
      if (!isValidTime(fields.p1_birth_time)) {
        errors.push('Please enter a valid birth time')
      } else {
        sanitized.p1_birth_time = fields.p1_birth_time
      }
    }

    if (fields.p1_birth_place) {
      if (!isValidPlace(fields.p1_birth_place)) {
        errors.push('Please enter a valid birth place')
      } else {
        sanitized.p1_birth_place = sanitizeString(fields.p1_birth_place, 200)
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitized,
  }
}
