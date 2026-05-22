import { DatePicker } from './DatePicker'
import { TimePicker } from './TimePicker'
import { PlaceOfBirth } from './PlaceOfBirth'

export function FormField({
  label,
  name,
  type = 'text',
  required,
  hint,
  as: Component = 'input',
  children,
  className = '',
  ...props
}) {
  const id = `field-${name}`
  const inputClass =
    'w-full rounded-xl border border-ink/10 bg-cream/30 px-4 py-3 text-ink placeholder:text-ink-soft/60 transition-colors focus:border-lavender focus:bg-white focus:outline-none focus:ring-2 focus:ring-lavender/20'

  // Determine if we should render a custom component
  const isDatePicker = type === 'date'
  const isTimePicker = type === 'time'
  const isPlacePicker = Component === 'place'

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required ? <span className="text-lavender"> *</span> : null}
      </label>
      {hint ? <p className="mb-1.5 text-xs text-ink-soft">{hint}</p> : null}

      {isDatePicker ? (
        <DatePicker name={name} required={required} />
      ) : isTimePicker ? (
        <TimePicker name={name} required={required} />
      ) : isPlacePicker ? (
        <PlaceOfBirth name={name} required={required} />
      ) : Component === 'select' ? (
        <select id={id} name={name} required={required} className={inputClass} {...props}>
          {children}
        </select>
      ) : Component === 'textarea' ? (
        <textarea id={id} name={name} required={required} className={`${inputClass} min-h-[120px] resize-y`} {...props} />
      ) : (
        <input id={id} name={name} type={type} required={required} className={inputClass} {...props} />
      )}
    </div>
  )
}
