import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotionSafe } from '../hooks/useReducedMotionSafe'

const candles = [
  { id: 'candle-1', delay: 0 },
  { id: 'candle-2', delay: 0.12 },
  { id: 'candle-3', delay: 0.24 },
] as const

export function BirthdayCake() {
  const reduced = useReducedMotionSafe()
  const sparklePositions = useMemo(() => [
    { left: '12%', top: '28%' },
    { left: '82%', top: '24%' },
    { left: '6%', top: '62%' },
    { left: '91%', top: '58%' },
    { left: '18%', top: '78%' },
    { left: '77%', top: '74%' },
  ], [])

  return (
    <div className="cake-scene mx-auto mt-12 w-full max-w-lg" aria-label="Kue ulang tahun tiga lilin">
      <div className="cake-glow" aria-hidden="true" />

      <div className="cake-sparkles" aria-hidden="true">
        {sparklePositions.map((sparkle, index) => (
          <span
            key={index}
            className="cake-sparkle"
            style={{ left: sparkle.left, top: sparkle.top }}
          />
        ))}
      </div>

      <div className="cake-plate" aria-hidden="true">
        <span className="cake-plate-inner" />
      </div>

      <div className="cake-body" aria-hidden="true">
        <div className="cake-bottom-shadow" />
        <div className="cake-lower-tier">
          <span className="cake-side-shine" />
          <div className="cake-drip cake-drip-left" />
          <div className="cake-drip cake-drip-center" />
          <div className="cake-drip cake-drip-right" />
          <div className="cake-frosting-line" />
        </div>

        <div className="cake-upper-tier">
          <span className="cake-side-shine" />
          <div className="cake-frosting-cap">
            <span className="cake-frosting-drip frosting-drip-a" />
            <span className="cake-frosting-drip frosting-drip-b" />
            <span className="cake-frosting-drip frosting-drip-c" />
            <span className="cake-frosting-drip frosting-drip-d" />
          </div>
          <div className="cake-berry-row">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="cake-topper" aria-hidden="true">
          <div className="cake-top-icing" />
          <div className="cake-center-flower">
            <span />
            <span />
            <span />
            <span />
            <b />
          </div>
        </div>

        <div className="cake-candles" aria-label="Tiga lilin">
          {candles.map((candle, index) => (
            <div className="cake-candle-wrap" key={candle.id}>
              <motion.span
                className="cake-flame"
                aria-hidden="true"
                animate={reduced ? { opacity: 1 } : { opacity: [0.8, 1, 0.86], y: [0, -1.5, 0], scale: [0.96, 1.04, 0.98] }}
                transition={reduced ? { duration: 0.01 } : { duration: 1.15, repeat: Infinity, delay: candle.delay, ease: 'easeInOut' }}
              />
              <span className="cake-flame-halo" aria-hidden="true" />
              <span className={`cake-candle cake-candle-${index + 1}`}>
                <i className="cake-candle-stripe stripe-a" />
                <i className="cake-candle-stripe stripe-b" />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="cake-caption">
        <span className="cake-caption-line" />
        <span>make a wish</span>
        <span className="cake-caption-line" />
      </div>
    </div>
  )
}
