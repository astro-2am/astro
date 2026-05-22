import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { Button } from '../ui/Button'

export function CompatibilitySection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <motion.div
            className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            aria-hidden
          >
            <div className="absolute h-48 w-48 rounded-full bg-lavender-soft/80 blur-sm" />
            <motion.div
              className="absolute left-1/4 top-1/2 h-36 w-36 -translate-y-1/2 rounded-full border border-lavender/30 bg-gradient-to-br from-lavender-soft to-white shadow-soft"
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute right-1/4 top-1/2 h-36 w-36 -translate-y-1/2 rounded-full border border-gold/30 bg-gradient-to-br from-gold-soft to-white shadow-soft"
              animate={{ x: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
            <div className="relative z-10 rounded-full bg-white px-5 py-2 shadow-card">
              <p className="font-serif text-lg text-ink">Gun milan</p>
            </div>
          </motion.div>

          <div>
            <SectionHeader
              align="left"
              eyebrow="Kundli Milan"
              title="Compatibility with warmth and depth"
              description="Relationship insights rooted in tradition — presented with modern clarity. No clichés, only thoughtful analysis for two souls considering a shared path."
            />
            <Button to="/kundli-milan" variant="secondary" size="lg">
              Explore compatibility reading
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
