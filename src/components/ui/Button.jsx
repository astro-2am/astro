import { Link } from 'react-router-dom'

const variants = {
  primary:
    'bg-ink text-white hover:bg-ink/90 shadow-soft border border-transparent',
  secondary:
    'bg-white text-ink border border-ink/10 hover:border-ink/20 hover:bg-cream',
  ghost: 'bg-transparent text-ink hover:bg-linen border border-transparent',
  gold: 'bg-gold text-white hover:bg-gold/90 border border-transparent',
  outlineLight:
    'bg-transparent text-white border border-white/30 hover:bg-white/10',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-3.5 text-base',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  type = 'button',
  ...props
}) {
  const classes = `inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 rounded-full ${variants[variant]} ${sizes[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}
