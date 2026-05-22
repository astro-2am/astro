export function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  return (
    <header className={`section-heading section-heading--${align}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="section-title">{title}</h2>
      {description ? <p className="section-desc">{description}</p> : null}
    </header>
  )
}
