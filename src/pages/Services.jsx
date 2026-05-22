import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { serviceList, formatPrice, formatSla } from '../config/services'

export function Services() {
  return (
    <div className="bg-cream py-12 md:py-20">
      <Container>
        <header className="mb-12 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-lavender">Offerings</p>
          <h1 className="mt-2 font-serif text-4xl text-ink md:text-5xl">Services</h1>
          <p className="mt-4 text-lg text-ink-muted">
            Choose a reading. Each order is prepared manually and delivered to your email after
            payment.
          </p>
        </header>

        <ul className="divide-y divide-ink/5 overflow-hidden rounded-2xl border border-ink/5 bg-white shadow-soft">
          {serviceList.map((service) => (
            <li key={service.id}>
              <Link
                to={service.path}
                className="group flex items-center justify-between gap-6 p-6 md:p-8 transition-colors hover:bg-cream/50"
              >
                <div>
                  <h2 className="font-serif text-xl text-ink group-hover:text-lavender transition-colors md:text-2xl">
                    {service.title}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm text-ink-muted">{service.description}</p>
                  <p className="mt-3 text-sm font-medium text-ink">
                    {formatPrice(service.priceInr)} · {formatSla(service.slaHours)}
                  </p>
                </div>
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/10 text-ink-muted transition-all group-hover:border-lavender group-hover:text-lavender"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <p className="text-sm text-ink-muted">
            By selecting a service, you agree to our{' '}
            <Link to="/terms" className="font-medium text-lavender hover:text-lavender/80">
              Terms and Conditions
            </Link>
            .
          </p>
        </div>
      </Container>
    </div>
  )
}
