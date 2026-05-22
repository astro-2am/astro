import { motion } from 'framer-motion'

const SIGNS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓']

export function ZodiacWheel() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg" aria-hidden>
      <motion.svg
        viewBox="0 0 400 400"
        className="h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      >
        <circle cx="200" cy="200" r="190" fill="none" stroke="rgba(184,149,108,0.2)" strokeWidth="0.5" />
        <circle cx="200" cy="200" r="150" fill="none" stroke="rgba(155,143,184,0.15)" strokeWidth="0.5" />
        <circle cx="200" cy="200" r="110" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        {SIGNS.map((sign, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180)
          const x = 200 + 165 * Math.cos(angle)
          const y = 200 + 165 * Math.sin(angle)
          return (
            <text
              key={sign}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="rgba(232,220,200,0.85)"
              fontSize="18"
              fontFamily="Georgia, serif"
            >
              {sign}
            </text>
          )
        })}
      </motion.svg>
      <motion.div
        className="absolute inset-[30%] flex items-center justify-center rounded-full border border-gold/30 bg-midnight-deep/80 backdrop-blur-sm"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="text-center">
          <p className="font-serif text-3xl text-gold">☉</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/50">Birth chart</p>
        </div>
      </motion.div>
    </div>
  )
}
