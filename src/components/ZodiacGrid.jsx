import { zodiacSigns } from '../data/zodiac'
import { SectionHeading } from './SectionHeading'

export function ZodiacGrid() {
  return (
    <section className="zodiac-section" aria-labelledby="zodiac-heading">
      <SectionHeading
        eyebrow="The twelve rashis"
        title="Explore your zodiac sign"
        description="Each sign carries unique energies. Select yours as you begin your cosmic journey."
      />
      <ul className="zodiac-grid">
        {zodiacSigns.map((sign) => (
          <li key={sign.name}>
            <article className="zodiac-card">
              <span className="zodiac-card__emoji" aria-hidden="true">
                {sign.emoji}
              </span>
              <span className="zodiac-card__symbol" aria-hidden="true">
                {sign.symbol}
              </span>
              <h3>{sign.name}</h3>
              <p>{sign.dates}</p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
