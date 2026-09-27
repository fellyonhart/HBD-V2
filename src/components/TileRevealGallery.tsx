import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PHOTOS } from '../data/photos'
import { useDeviceTier } from '../hooks/useDeviceTier'
import { useReducedMotionSafe } from '../hooks/useReducedMotionSafe'

gsap.registerPlugin(ScrollTrigger)

export function TileRevealGallery() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const tier = useDeviceTier()
  const reduced = useReducedMotionSafe()
  const count = tier === 'high' ? 12 : tier === 'mid' ? 9 : 6
  const tiles = useMemo(() => Array.from({ length: count }, (_, index) => PHOTOS[index % PHOTOS.length]!), [count])

  useEffect(() => {
    const scope = sectionRef.current
    if (!scope) return
    const ctx = gsap.context(() => {
      const nodes = scope.querySelectorAll<HTMLElement>('[data-tile]')
      const copy = scope.querySelectorAll<HTMLElement>('[data-tile-copy]')
      if (reduced) {
        gsap.set(nodes, { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 })
        gsap.set(copy, { opacity: 1, y: 0 })
        return
      }

      nodes.forEach((node, index) => {
        const direction = index % 2 === 0 ? -1 : 1
        gsap.set(node, { opacity: 0, x: direction * (42 + (index % 3) * 16), y: 26 + (index % 2) * 12, scale: 0.92, rotate: 0 })
      })
      gsap.set(copy, { opacity: 0, y: 22 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope,
          start: 'top top',
          end: tier === 'high' ? '+=1500' : tier === 'mid' ? '+=1200' : '+=900',
          scrub: 0.6,
          pin: true,
        },
      })

      tl.to(nodes, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.45, stagger: { each: 0.06, grid: 'auto', from: 'start' }, ease: 'power2.out' })
        .to(nodes, { opacity: 0, scale: 1.12, y: -18, duration: 0.2, stagger: 0.018, ease: 'power2.in' }, 0.75)
        .to(copy, { opacity: 1, y: 0, duration: 0.2, stagger: 0.06, ease: 'power2.out' }, 0.82)
    }, scope)
    return () => ctx.revert()
  }, [reduced, tier, count])

  return (
    <section id="kenangan" ref={sectionRef} className="relative min-h-[150svh] overflow-hidden">
      <div className="sticky top-0 flex min-h-[100svh] items-center justify-center px-4 py-16">
        <div className="absolute inset-0 tile-stage" aria-hidden="true" />
        <div className="relative z-10 w-full max-w-5xl">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4" aria-hidden="true">
            {tiles.map((photo, index) => (
              <div data-tile key={`${photo.id}-${index}`} className="aspect-square overflow-hidden rounded-2xl border border-white/10 bg-navy-deep shadow-[0_18px_50px_rgba(0,0,0,.2)]">
                <img src={photo.src} width={photo.width} height={photo.height} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-5 text-center">
            <div className="max-w-2xl">
              <p data-tile-copy className="section-kicker">Tile reveal</p>
              <h2 data-tile-copy className="mt-3 font-display text-4xl font-semibold text-cream sm:text-6xl">Cerita kecil, senyum besar.</h2>
              <p data-tile-copy className="mx-auto mt-5 max-w-xl text-sm leading-7 text-cream-muted sm:text-base">Saat gambar bergerak pergi, yang tersisa adalah cerita yang ingin kamu simpan lebih lama.</p>
              <a data-tile-copy href="#galeri-foto" className="pointer-events-auto mt-7 inline-flex min-h-11 items-center rounded-full border border-gold px-5 py-2.5 text-sm font-semibold text-gold">Lihat galeri</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
