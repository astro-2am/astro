export function Container({ children, className = '', as: Tag = 'div' }) {
  return <Tag className={`mx-auto w-full max-w-6xl px-5 md:px-8 ${className}`}>{children}</Tag>
}
