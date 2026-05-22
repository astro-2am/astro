import { Link } from 'react-router-dom'

export function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-soft">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-2">
              {i > 0 ? <span aria-hidden className="text-ink/20">/</span> : null}
              {item.to && !isLast ? (
                <Link to={item.to} className="hover:text-ink transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'font-medium text-ink' : ''} aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
