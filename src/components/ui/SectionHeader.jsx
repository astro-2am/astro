import { motion } from 'framer-motion'

export function SectionHeader({ eyebrow, title, description, align = 'center', dark = false }) {
  const alignClass =
    align === 'center' ? 'text-center mx-auto' : align === 'left' ? 'text-left' : 'text-right'

  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-12 md:mb-16 max-w-2xl ${alignClass}`}
    >
      {eyebrow ? (
        <p
          className={`mb-3 text-xs font-medium uppercase tracking-[0.2em] ${dark ? 'text-gold-soft' : 'text-lavender'}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-serif text-3xl md:text-4xl lg:text-[2.75rem] leading-tight tracking-tight ${dark ? 'text-white' : 'text-ink'}`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-base md:text-lg leading-relaxed ${dark ? 'text-white/70' : 'text-ink-muted'}`}
        >
          {description}
        </p>
      ) : null}
    </motion.header>
  )
}
