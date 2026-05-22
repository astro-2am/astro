import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FormField } from './FormField'
import { Button } from './ui/Button'
import { submitOrderToScript } from '../lib/submitOrder'
import { validateOrderForm } from '../lib/validation'
import { getCsrfToken } from '../lib/csrf'
import { handleError } from '../lib/errorHandler'

const LANGUAGES = [
  { value: 'hindi', label: 'Hindi' },
  { value: 'english', label: 'English' },
  { value: 'both', label: 'Hindi & English' },
]

export function OrderForm({ serviceId, children }) {
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [location, setLocation] = useState('')
  const [csrfToken, setCsrfToken] = useState('')

  useEffect(() => {
    // Generate CSRF token on mount
    setCsrfToken(getCsrfToken())
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation(`${pos.coords.latitude},${pos.coords.longitude}`),
        (err) => console.warn('Geolocation error', err)
      )
    }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    const form = e.currentTarget
    const data = new FormData(form)
    const fields = {}

    for (const [key, value] of data.entries()) {
      fields[key] = String(value).trim()
    }

    // Validate form data
    const validation = validateOrderForm(fields, serviceId)
    
    if (!validation.isValid) {
      setError(validation.errors.join('. '))
      setSubmitting(false)
      return
    }

    // Add CSRF token
    validation.sanitized.csrf_token = csrfToken

    try {
      await submitOrderToScript(validation.sanitized)
    } catch (err) {
      const safeError = handleError(err, 'form')
      setError(safeError)
      setSubmitting(false)
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* CSRF Token */}
      <input type="hidden" name="csrf_token" value={csrfToken} />
      
      {children}

      <fieldset className="rounded-xl border border-ink/5 bg-cream/20 p-4">
        <legend className="px-1 text-sm font-medium text-ink">Report language</legend>
        <div className="mt-3 flex flex-wrap gap-4">
          {LANGUAGES.map((lang) => (
            <label key={lang.value} className="flex cursor-pointer items-center gap-2 text-sm text-ink-muted">
              <input
                type="radio"
                name="language"
                value={lang.value}
                defaultChecked={lang.value === 'hindi'}
                required
                className="accent-lavender"
              />
              {lang.label}
            </label>
          ))}
        </div>
      </fieldset>

      {!location && (
        <FormField
          label="Your location (city, country)"
          name="location_manual"
          placeholder="e.g., Mumbai, India"
        />
      )}
      <input type="hidden" name="location" value={location} />
      
      {location && (
        <p className="text-xs text-ink-muted">
          📍 Location detected for accurate astrological calculations. See our{' '}
          <Link to="/privacy" className="text-lavender hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      )}
      
      <ContactFields />

      {error ? (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? 'Redirecting to payment…' : 'Proceed to secure payment'}
      </Button>
      <p className="text-center text-xs text-ink-soft">You will complete payment via Razorpay.</p>
    </form>
  )
}

export function ContactFields() {
  return (
    <>
      <FormField label="Full name" name="name" required autoComplete="name" />
      <FormField label="Email" name="email" type="email" required autoComplete="email" />
      <FormField
        label="Phone"
        name="phone"
        type="tel"
        required
        autoComplete="tel"
        hint="Include country code, e.g. +91 98765 43210"
      />
    </>
  )
}
