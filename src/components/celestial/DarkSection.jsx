import { Particles } from './Particles'

export function DarkSection({ children, className = '', id }) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden bg-midnight text-white ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(61,53,102,0.35),transparent_60%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_100%,rgba(155,143,184,0.12),transparent_50%)]"
        aria-hidden
      />
      <Particles count={18} />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 max-w-xl -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="relative z-10">{children}</div>
    </section>
  )
}
