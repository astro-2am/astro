import { testimonials } from '../data/testimonials'
import { SectionHeading } from './SectionHeading'

export function Testimonials() {
  return (
    <section className="testimonials-section" aria-labelledby="testimonials-heading">
      <SectionHeading
        eyebrow="Sacred trust"
        title="Voices from the cosmos"
        description="Real seekers who found clarity through our manual, heartfelt readings."
      />
      <ul className="testimonials-grid">
        {testimonials.map((t) => (
          <li key={t.name}>
            <blockquote className="testimonial-card">
              <span className="testimonial-card__stars" aria-hidden="true">
                ✦ ✦ ✦ ✦ ✦
              </span>
              <p>&ldquo;{t.quote}&rdquo;</p>
              <footer>
                <span className="testimonial-card__avatar" aria-hidden="true">
                  {t.avatar}
                </span>
                <div>
                  <cite>{t.name}</cite>
                  <span>{t.city}</span>
                </div>
              </footer>
            </blockquote>
          </li>
        ))}
      </ul>
    </section>
  )
}
