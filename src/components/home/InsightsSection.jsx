import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { dailyInsights } from '../../data/insights'

const accentBorder = {
  lavender: 'border-l-lavender',
  gold: 'border-l-gold',
  ink: 'border-l-ink/30',
}

export function InsightsSection() {
  return (
    <section id="insights" className="bg-white py-20 md:py-28">
      <Container>
        <SectionHeader
          eyebrow="Personalized insights"
          title="A calm read on today's cosmos"
          description="Sample reflections to illustrate your daily experience. Full readings are prepared individually after you book a service."
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dailyInsights.map((item, i) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <article
                className={`group h-full rounded-2xl border border-ink/5 bg-cream/50 p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card border-l-4 ${accentBorder[item.accent]}`}
              >
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink-soft">
                  {item.label}
                </p>
                <h3 className="mt-2 font-serif text-2xl text-ink">{item.value}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.detail}</p>
              </article>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
