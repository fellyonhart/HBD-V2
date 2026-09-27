import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SITE_CONFIG } from '../data/config'
import { useReducedMotionSafe } from '../hooks/useReducedMotionSafe'
import type Lenis from 'lenis'
import { ClickSparkCanvas } from './ClickSparkCanvas'

export function Hero({ lenisRef }: { lenisRef: React.MutableRefObject<Lenis | null> }) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const reduced = useReducedMotionSafe()

  useEffect(() => {
    const scope = sectionRef.current
    if (!scope) return
    const ctx = gsap.context(() => {
      const targets = scope.querySelectorAll<HTMLElement>('[data-hero-reveal]')
      if (reduced) {
        gsap.set(targets, { opacity: 1, y: 0 })
        return
      }
      gsap.set(targets, { opacity: 0, y: 24 })
      gsap.to(targets, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out' })
    }, scope)
    return () => ctx.revert()
  }, [reduced])

  const scrollToPesan = () => {
    const lenis = lenisRef.current
    if (lenis) lenis.scrollTo('#pesan', { duration: 1.4 })
    else document.getElementById('pesan')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-20 text-center">
      <div className="aurora absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_15%_18%,rgba(255,143,177,.12)_0_1px,transparent_1px),radial-gradient(circle_at_82%_30%,rgba(245,197,66,.14)_0_1px,transparent_1px)] [background-size:72px_72px,108px_108px]" aria-hidden="true" />
      <ClickSparkCanvas />
      <div className="relative z-10 mx-auto max-w-4xl">
        <p data-hero-reveal className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-gold)]">{SITE_CONFIG.heroEyebrow}</p>
        <h1 data-hero-reveal className="mt-5 font-display text-6xl font-semibold leading-[0.95] text-[var(--color-cream)] sm:text-8xl md:text-9xl">{SITE_CONFIG.recipientName}</h1>
        <p data-hero-reveal className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--color-cream-muted)] sm:text-lg">{SITE_CONFIG.heroSubtitle}</p>
        <button data-hero-reveal type="button" onClick={scrollToPesan} className="mt-9 min-h-12 rounded-full border border-gold/70 px-7 py-3 text-sm font-semibold text-gold hover:bg-gold hover:text-navy">Mulai perjalanan</button>
      </div>
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.28em] text-[var(--color-cream-muted)]">scroll pelan-pelan</div>
    </section>
  )
}
