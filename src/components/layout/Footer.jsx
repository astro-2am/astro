import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { site } from '../../config/site'
import { serviceList } from '../../config/services'

export function Footer() {
  return (
    <footer className="border-t border-ink/5 bg-cream">
      <Container className="py-16 md:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="font-serif text-2xl text-ink">{site.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{site.tagline}</p>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-lavender">✦</p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-ink-soft">Services</p>
              <ul className="mt-4 space-y-2">
                {serviceList.map((s) => (
                  <li key={s.id}>
                    <Link to={s.path} className="text-sm text-ink-muted hover:text-ink">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-ink-soft">Company</p>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="/services" className="text-sm text-ink-muted hover:text-ink">
                    All services
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-sm text-ink-muted hover:text-ink">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm text-ink-muted hover:text-ink">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-ink-soft">Contact</p>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href={`mailto:${site.email}`} className="text-sm text-ink-muted hover:text-ink">
                    {site.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${site.phone.replace(/\s/g, '')}`}
                    className="text-sm text-ink-muted hover:text-ink"
                  >
                    {site.phone}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-12 max-w-2xl text-xs leading-relaxed text-ink-soft">{site.disclaimer}</p>
        <p className="mt-6 text-xs text-ink-soft">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  )
}
