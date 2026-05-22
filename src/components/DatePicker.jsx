import { useState } from 'react'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function getDaysInMonth(month, year) {
  if (!month) return 31
  return new Date(year || 2000, Number(month), 0).getDate()
}

const selectClass =
  'flex-1 rounded-xl border border-ink/10 bg-cream/30 px-3 py-3 text-ink text-sm transition-colors focus:border-lavender focus:bg-white focus:outline-none focus:ring-2 focus:ring-lavender/20 cursor-pointer'

/**
 * Custom date picker - renders Day/Month/Year selects and a hidden input with value YYYY-MM-DD.
 * Props: name, required, label (optional — handled by parent FormField)
 */
export function DatePicker({ name, required }) {
  const currentYear = new Date().getFullYear()
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')

  const daysInMonth = getDaysInMonth(month, year)
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const isoValue =
    year && month && day
      ? `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      : ''

  return (
    <div className="flex gap-2">
      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={isoValue} />
      {/* Required sentinel — invisible, matches isoValue so browser validation works */}
      <input
        type="text"
        aria-hidden="true"
        tabIndex={-1}
        required={required}
        value={isoValue}
        onChange={() => {}}
        className="sr-only"
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
      />

      {/* Day */}
      <div className="relative flex-1">
        <select
          value={day}
          onChange={e => setDay(e.target.value)}
          className={selectClass}
          aria-label="Day"
        >
          <option value="">Day</option>
          {days.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Month */}
      <div className="relative" style={{ flex: '1.6' }}>
        <select
          value={month}
          onChange={e => {
            setMonth(e.target.value)
            // Reset day if it exceeds the new month's days
            const newDays = getDaysInMonth(e.target.value, year)
            if (Number(day) > newDays) setDay('')
          }}
          className={selectClass}
          aria-label="Month"
        >
          <option value="">Month</option>
          {MONTHS.map((m, i) => (
            <option key={m} value={i + 1}>{m}</option>
          ))}
        </select>
      </div>

      {/* Year */}
      <div className="relative flex-1">
        <select
          value={year}
          onChange={e => setYear(e.target.value)}
          className={selectClass}
          aria-label="Year"
        >
          <option value="">Year</option>
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
