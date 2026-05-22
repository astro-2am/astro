import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { testimonials } from '../../data/testimonials'

export function TrustSection() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <Container>
        <SectionHeader
          eyebrow="Trusted guidance"
          title="Voices from our community"
          description="Seekers who value reflection, patience, and readings prepared by a real astrologer — not generated in seconds."
        />
        <ul className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.li
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <blockquote className="flex h-full flex-col border-t-2 border-gold/40 pt-8">
                <p className="flex-1 font-serif text-xl leading-relaxed text-ink italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-8">
                  <cite className="not-italic font-medium text-ink">{t.name}</cite>
                  <p className="text-sm text-ink-soft">{t.role}</p>
                </footer>
              </blockquote>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
