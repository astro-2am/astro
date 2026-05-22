import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { Button } from '../ui/Button'

const messages = [
  {
    role: 'user',
    text: 'I feel uncertain about a career change. What should I focus on this month?',
  },
  {
    role: 'astrologer',
    text: 'Your chart suggests a period of consolidation rather than sudden leaps. Saturn rewards patience — consider strengthening skills before expanding outward.',
  },
  {
    role: 'user',
    text: 'That resonates. Any timing I should be mindful of?',
  },
  {
    role: 'astrologer',
    text: 'The waxing moon this fortnight supports clear communication. A thoughtful conversation mid-month may open doors you have been preparing for.',
  },
]

export function AiAstrologerSection() {
  return (
    <section id="guidance" className="bg-linen py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Thoughtful guidance"
              title="A conversation, not a chatbot"
              description="Soon: an AI-assisted dialogue shaped by Vedic principles — warm, minimal, and emotionally intelligent. For now, our astrologer answers your questions by hand."
            />
            <Button to="/ask-question" variant="primary" size="lg">
              Ask a question today
            </Button>
            <p className="mt-4 text-sm text-ink-soft">Replies within 2 business days · Prepared manually</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-ink/5 bg-white p-6 shadow-card md:p-8"
          >
            <div className="mb-6 flex items-center gap-3 border-b border-ink/5 pb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lavender-soft font-serif text-lavender">
                ✦
              </span>
              <div>
                <p className="font-medium text-ink">Guidance session</p>
                <p className="text-xs text-ink-soft">Preview experience</p>
              </div>
            </div>
            <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <p
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-cream text-ink-muted'
                        : 'border border-lavender/20 bg-lavender-soft/50 text-ink'
                    }`}
                  >
                    {m.text}
                  </p>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 flex gap-2 rounded-full border border-ink/10 bg-cream/80 px-4 py-3">
              <span className="flex-1 text-sm text-ink-soft">Type your question…</span>
              <span className="text-xs font-medium text-lavender">Coming soon</span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
