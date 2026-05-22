import { Container } from '../components/ui/Container'
import { site } from '../config/site'

export function Privacy() {
  return (
    <div className="bg-cream py-12 md:py-20">
      <Container className="max-w-2xl prose prose-ink">
        <h1 className="font-serif text-4xl text-ink">Privacy policy</h1>
        <p className="mt-6 text-ink-muted leading-relaxed">
          {site.name} collects information you submit with your order (name, email, phone, birth
          details) solely to provide astrological services and process payments.
        </p>
        <p className="mt-4 text-ink-muted leading-relaxed">
          Data is stored in our order systems and handled only by our astrologer. We do not sell
          your personal information.
        </p>
        <p className="mt-4 text-ink-muted leading-relaxed">
          Questions:{' '}
          <a href={`mailto:${site.email}`} className="text-ink underline">
            {site.email}
          </a>
        </p>
      </Container>
    </div>
  )
}
