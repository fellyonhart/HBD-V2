import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { LETTER } from '../data/letters'
import { useReducedMotionSafe } from '../hooks/useReducedMotionSafe'

export function BottleLetter() {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotionSafe()

  return (
    <section id="surat" className="section-shell px-5 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="max-w-md text-center lg:text-left">
          <p className="section-kicker">Botol surat</p>
          <h2 className="section-title mt-3 text-4xl sm:text-5xl">Ada pesan yang sengaja disimpan untukmu.</h2>
          <p className="mt-5 text-sm leading-7 text-cream-muted">
            Bukan pesan yang buru-buru dibaca. Ambil napas, buka botolnya, lalu baca pelan-pelan.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="min-h-11 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-navy shadow-[0_12px_30px_rgba(245,197,66,.14)] transition-transform hover:-translate-y-0.5"
            >
              {open ? 'Tutup surat' : 'Buka surat'}
            </button>
            <span className="inline-flex min-h-11 items-center rounded-full border border-white/10 bg-white/[0.03] px-4 text-xs uppercase tracking-[0.18em] text-cream-muted">
              tanpa kunci
            </span>
          </div>
        </div>

        <div className="bottle-letter-card relative overflow-hidden rounded-[2rem] border border-white/10 p-5 sm:p-8">
          <div className="bottle-letter-orbit" aria-hidden="true" />
          <div className="bottle-letter-stage">
            <div className="bottle-pedestal" aria-hidden="true" />

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Buka botol surat"
              className="bottle-button group"
            >
              <span className="bottle-shadow" aria-hidden="true" />
              <span className="bottle-neck" aria-hidden="true">
                <span className="bottle-lip" />
                <span className="bottle-cork" />
                <span className="bottle-rope" />
              </span>
              <span className="bottle-glass" aria-hidden="true">
                <span className="bottle-reflection bottle-reflection-a" />
                <span className="bottle-reflection bottle-reflection-b" />
                <span className="bottle-bubble bubble-a" />
                <span className="bottle-bubble bubble-b" />
                <span className="bottle-bubble bubble-c" />
                <span className="bottle-sea" />
              </span>
              <span className="bottle-scroll" aria-hidden="true">
                <span className="bottle-scroll-top" />
                <span className="bottle-scroll-paper">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="bottle-scroll-bottom" />
              </span>
              <span className="bottle-label">surat untukmu</span>
            </button>

            <p className="bottle-helper" aria-hidden="true">sentuh botol untuk membuka</p>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: reduced ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : 18 }}
                transition={{ duration: reduced ? 0.01 : 0.32, ease: 'easeOut' }}
                className="absolute inset-3 z-10 overflow-y-auto rounded-[1.5rem] border border-gold/25 bg-cream p-6 text-navy shadow-[0_24px_60px_rgba(0,0,0,.35)] sm:inset-6 sm:p-9"
              >
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-navy/10 text-lg text-navy/70 transition-transform hover:-translate-y-0.5"
                  aria-label="Tutup surat"
                >
                  ×
                </button>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9b7b17]">Surat untukmu</p>
                <h3 className="mt-3 pr-10 font-display text-3xl font-semibold sm:text-4xl">{LETTER.title}</h3>
                <div className="mt-5 space-y-4 text-sm leading-7 text-navy-soft">
                  {LETTER.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                <p className="mt-7 font-display text-lg italic text-navy">{LETTER.signature}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
