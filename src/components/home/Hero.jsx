import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { site } from '../../config/site'

function OrbitalRing({ className, duration = 40 }) {
  return (
    <motion.div
      className={`absolute rounded-full border border-gold/20 ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
      aria-hidden
    />
  )
}

export function Hero() {
  return (
    <section id='hero' className="relative overflow-hidden bg-cream">
      {/* Light → dark gradient bleed at bottom */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-cream/10"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute -right-24 top-20 h-96 w-96 rounded-full bg-lavender-soft/60 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 top-1/2 h-72 w-72 rounded-full bg-gold-soft/40 blur-3xl"
        aria-hidden
      />

      <Container className="relative py-20 md:py-28 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-lavender">
              Premium Vedic astrology
            </p>
            <h1 className="font-serif text-4xl leading-[1.1] tracking-tight text-ink md:text-5xl lg:text-6xl text-balance">
              Guidance written in the stars,{' '}
              <span className="italic text-ink-muted">prepared for you</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-muted">
              {site.name} offers thoughtful, hand-crafted readings — birth charts, compatibility,
              and answers to life&apos;s questions — with the calm clarity of a luxury wellness
              experience.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button to="/services" size="lg">
                Begin your reading
              </Button>
              <Button to="/#insights" variant="secondary" size="lg">
                Explore insights
              </Button>
            </div>
            <p className="mt-8 text-sm text-ink-soft">
              Trusted by seekers who value depth over instant algorithms.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-square w-full max-w-md"
            aria-hidden
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-linen to-white shadow-elevated" />
            <OrbitalRing className="inset-[8%]" duration={50} />
            <OrbitalRing className="inset-[18%] border-lavender/15" duration={70} />
            <OrbitalRing className="inset-[28%] border-gold/25" duration={90} />
            <motion.div
              className="absolute inset-[38%] flex items-center justify-center rounded-full bg-midnight shadow-card"
              animate={{ boxShadow: ['0 0 0 0 rgba(184,149,108,0)', '0 0 40px 4px rgba(184,149,108,0.15)', '0 0 0 0 rgba(184,149,108,0)'] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <span className="font-serif text-4xl text-gold">☉</span>
            </motion.div>
            {['♈', '♋', '♎', '♑'].map((sign, i) => (
              <motion.span
                key={sign}
                className="absolute font-serif text-lg text-lavender/80"
                style={{
                  top: `${50 + 42 * Math.sin((i * Math.PI) / 2)}%`,
                  left: `${50 + 42 * Math.cos((i * Math.PI) / 2)}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
              >
                {sign}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
