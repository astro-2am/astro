import { useState } from 'react'

const inputClass =
  'w-full rounded-xl border border-ink/10 bg-cream/30 px-4 py-3 text-ink text-sm placeholder:text-ink-soft/60 transition-colors focus:border-lavender focus:bg-white focus:outline-none focus:ring-2 focus:ring-lavender/20'

const selectClass =
  'w-full rounded-xl border border-ink/10 bg-cream/30 px-3 py-3 text-ink text-sm transition-colors focus:border-lavender focus:bg-white focus:outline-none focus:ring-2 focus:ring-lavender/20 cursor-pointer'

const COUNTRIES = [
  'India',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Nepal',
  'Sri Lanka',
  'Bangladesh',
  'Pakistan',
  'United Arab Emirates',
  'Singapore',
  'Malaysia',
  'Germany',
  'France',
  'South Africa',
  'New Zealand',
  'Saudi Arabia',
  'Qatar',
  'Kuwait',
  'Oman',
  'Bahrain',
  'Mauritius',
  'Fiji',
  'Trinidad and Tobago',
  'Other',
]

/**
 * Place of birth — renders City, State/Province, Country fields.
 * Submits a single hidden input as "City, State, Country" for the given `name`.
 * Props: name, required
 */
export function PlaceOfBirth({ name, required }) {
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('India')

  const combinedValue =
    city && state && country ? `${city}, ${state}, ${country}` : ''

  return (
    <div className="space-y-3">
      {/* Hidden input for form submission — combines into single value */}
      <input type="hidden" name={name} value={combinedValue} />
      {/* Required sentinel */}
      <input
        type="text"
        aria-hidden="true"
        tabIndex={-1}
        required={required}
        value={combinedValue}
        onChange={() => {}}
        className="sr-only"
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
      />

      {/* Row: City + State side by side */}
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="mb-1 block text-xs font-medium text-ink-soft">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Mumbai"
            className={inputClass}
            aria-label="City of birth"
          />
        </div>
        <div className="flex-1">
          <label className="mb-1 block text-xs font-medium text-ink-soft">State / Province</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="e.g. Maharashtra"
            className={inputClass}
            aria-label="State of birth"
          />
        </div>
      </div>

      {/* Country dropdown */}
      <div>
        <label className="mb-1 block text-xs font-medium text-ink-soft">Country</label>
        <div className="relative">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className={selectClass}
            aria-label="Country of birth"
          >
            <option value="">Select country</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
