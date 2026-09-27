import confetti from 'canvas-confetti'
import { useState } from 'react'
import { SITE_CONFIG } from '../data/config'
import { useDeviceTier } from '../hooks/useDeviceTier'
import { useReducedMotionSafe } from '../hooks/useReducedMotionSafe'
import { BirthdayCake } from './BirthdayCake'

const counts = { low: 34, mid: 62, high: 96 } as const

export function ConfettiCelebration() {
  const tier = useDeviceTier()
  const reduced = useReducedMotionSafe()
  const [wished, setWished] = useState(false)

  const makeWish = () => {
    setWished(true)
    if (reduced) return
    void confetti({ particleCount: counts[tier], spread: tier === 'high' ? 75 : 58, startVelocity: tier === 'high' ? 30 : 24, origin: { x: 0.5, y: 0.66 }, ticks: tier === 'high' ? 140 : 100, disableForReducedMotion: true })
  }

  return (
    <section id="wish" className="section-shell px-5 py-28 sm:py-36">
      <div className="mx-auto max-w-3xl text-center">
        <p className="section-kicker">Perayaan</p>
        <h2 className="section-title mt-3">Tiga lilin. Satu harapan.</h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-cream-muted">{SITE_CONFIG.wishPrompt}</p>
        <BirthdayCake />
        <button type="button" onClick={makeWish} className="mt-10 min-h-12 rounded-full bg-gold px-7 py-3 text-sm font-bold text-navy hover:translate-y-[-1px]">{wished ? 'Harapannya sudah dikirim ✨' : 'Make a wish'}</button>
        <p className="mt-5 text-xs text-cream-muted">Tidak perlu memberitahu siapa pun apa harapannya.</p>
      </div>
    </section>
  )
}
