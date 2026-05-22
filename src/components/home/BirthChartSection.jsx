import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { Button } from '../ui/Button'
import { DarkSection } from '../celestial/DarkSection'
import { ZodiacWheel } from '../celestial/ZodiacWheel'

export function BirthChartSection() {
  return (
    <DarkSection id="birth-chart" className="py-24 md:py-32">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHeader
              align="left"
              dark
              eyebrow="Janam Kundli"
              title="Your birth chart, illuminated"
              description="The celestial map at the moment you arrived — interpreted with care, not automation. Our immersive chart experience is the emotional heart of your reading."
            />
            <motion.ul
              className="mb-10 space-y-3 text-white/75"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {['Planetary positions & houses', 'Key yogas and life themes', 'Delivered as a personal email report'].map(
                (t) => (
                  <li key={t} className="flex gap-3 text-sm md:text-base">
                    <span className="text-gold">—</span>
                    {t}
                  </li>
                ),
              )}
            </motion.ul>
            <Button to="/janam-kundli" variant="gold" size="lg">
              Request your birth chart
            </Button>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ZodiacWheel />
          </motion.div>
        </div>
      </Container>
    </DarkSection>
  )
}
