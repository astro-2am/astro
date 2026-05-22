import { useState } from 'react'

const selectClass =
  'flex-1 rounded-xl border border-ink/10 bg-cream/30 px-3 py-3 text-ink text-sm transition-colors focus:border-lavender focus:bg-white focus:outline-none focus:ring-2 focus:ring-lavender/20 cursor-pointer'

/**
 * Custom time picker — renders Hour / Minute / AM-PM selects
 * and a hidden input with value "HH:MM AM/PM" (e.g. "03:45 PM").
 * Props: name, required
 */
export function TimePicker({ name, required }) {
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const [period, setPeriod] = useState('')

  const hours = Array.from({ length: 12 }, (_, i) => i + 1)
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5)

  const formattedValue =
    hour && minute !== '' && period
      ? `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${period}`
      : ''

  return (
    <div className="flex gap-2">
      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={formattedValue} />
      {/* Required sentinel — invisible, so browser validation works */}
      <input
        type="text"
        aria-hidden="true"
        tabIndex={-1}
        required={required}
        value={formattedValue}
        onChange={() => {}}
        className="sr-only"
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
      />

      {/* Hour */}
      <div className="relative flex-1">
        <select
          value={hour}
          onChange={(e) => setHour(e.target.value)}
          className={selectClass}
          aria-label="Hour"
        >
          <option value="">Hour</option>
          {hours.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
      </div>

      {/* Minute */}
      <div className="relative flex-1">
        <select
          value={minute}
          onChange={(e) => setMinute(e.target.value)}
          className={selectClass}
          aria-label="Minute"
        >
          <option value="">Min</option>
          {minutes.map((m) => (
            <option key={m} value={m}>
              {String(m).padStart(2, '0')}
            </option>
          ))}
        </select>
      </div>

      {/* AM / PM */}
      <div className="relative flex-1">
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className={selectClass}
          aria-label="AM or PM"
        >
          <option value="">AM/PM</option>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>
  )
}
