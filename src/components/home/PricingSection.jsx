import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { Button } from '../ui/Button'
import { serviceList, formatPrice, formatSla } from '../../config/services'

export function PricingSection() {
  return (
    <section id="offerings" className="bg-linen py-20 md:py-28">
      <Container>
        <SectionHeader
          eyebrow="Our offerings"
          title="Invest in clarity"
          description="Each reading is prepared individually and delivered by email. Transparent pricing, no subscriptions required."
        />
        <ul className="grid gap-6 md:grid-cols-3">
          {serviceList.map((service, i) => (
            <motion.li
              key={service.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={i === 1 ? 'md:-mt-2 md:mb-2' : ''}
            >
              <article
                className={`flex h-full flex-col rounded-2xl border bg-white p-8 shadow-soft transition-shadow hover:shadow-card ${
                  i === 1 ? 'border-gold/40 ring-1 ring-gold/20' : 'border-ink/5'
                }`}
              >
                {i === 1 ? (
                  <span className="mb-4 inline-block w-fit rounded-full bg-gold-soft px-3 py-1 text-xs font-medium uppercase tracking-wider text-ink">
                    Most requested
                  </span>
                ) : (
                  <span className="mb-4 h-6" />
                )}
                <h3 className="font-serif text-2xl text-ink">{service.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                  {service.description}
                </p>
                <p className="mt-6 font-serif text-3xl text-ink">{formatPrice(service.priceInr)}</p>
                <p className="text-sm text-ink-soft">{formatSla(service.slaHours)} delivery</p>
                <Button
                  to={service.path}
                  variant={i === 1 ? 'primary' : 'secondary'}
                  className="mt-8 w-full"
                >
                  Select
                </Button>
              </article>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
