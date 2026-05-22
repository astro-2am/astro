import { formatPrice, formatSla } from '../config/services'
import { site } from '../config/site'
import { Breadcrumb } from './Breadcrumb'
import { Container } from './ui/Container'

export function ServicePage({ service, children }) {
  return (
    <div className="bg-cream py-12 md:py-16">
      <Container>
        <article className="mx-auto max-w-3xl">
          <Breadcrumb
            items={[
              { label: 'Home', to: '/' },
              { label: 'Services', to: '/services' },
              { label: service.title },
            ]}
          />

          <header className="mb-10 border-b border-ink/5 pb-10">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-lavender">Manual report</p>
            <h1 className="mt-2 font-serif text-4xl tracking-tight text-ink md:text-5xl">
              {service.title}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-ink-muted">{service.description}</p>

            <div className="mt-8 flex flex-wrap items-end gap-6 rounded-2xl border border-ink/5 bg-white p-6 shadow-soft">
              <div>
                <p className="text-xs uppercase tracking-wider text-ink-soft">Investment</p>
                <p className="font-serif text-3xl text-ink">{formatPrice(service.priceInr)}</p>
              </div>
              <div className="h-10 w-px bg-ink/10 hidden sm:block" />
              <div>
                <p className="text-xs uppercase tracking-wider text-ink-soft">Delivery</p>
                <p className="font-medium text-ink">{formatSla(service.slaHours)}</p>
              </div>
            </div>

            <ul className="mt-6 space-y-2">
              {service.highlights.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-ink-muted">
                  <span className="text-gold">·</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-ink-soft">
              {site.name} will email your report after payment. Each reading is prepared by hand.
            </p>
          </header>

          <section className="rounded-2xl border border-ink/5 bg-white p-6 shadow-soft md:p-8">
            <h2 className="font-serif text-xl text-ink">Your details</h2>
            <p className="mt-1 mb-8 text-sm text-ink-soft">
              Please be precise — especially birth time and place.
            </p>
            {children}
          </section>
        </article>
      </Container>
    </div>
  )
}
