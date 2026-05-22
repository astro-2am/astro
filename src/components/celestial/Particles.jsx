import { motion } from 'framer-motion'

const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: `${(i * 17) % 100}%`,
  y: `${(i * 23) % 100}%`,
  size: i % 3 === 0 ? 2 : 1,
  delay: (i % 5) * 0.4,
}))

export function Particles({ className = '', count = 24 }) {
  const items = particles.slice(0, count)

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {items.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            opacity: 0.35,
          }}
          animate={{ opacity: [0.2, 0.6, 0.2], y: [0, -8, 0] }}
          transition={{
            duration: 4 + p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  )
}
