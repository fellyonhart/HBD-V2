import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useReducedMotionSafe } from '../hooks/useReducedMotionSafe'

const WISHES = [
  {
    id: 'w1',
    eyebrow: 'Untuk dirimu',
    title: 'Lebih dekat dengan hal yang kamu suka',
    message:
      'Semoga tahun ini kamu punya lebih banyak waktu untuk hal-hal yang membuatmu antusias, tanpa merasa harus selalu terburu-buru.',
  },
  {
    id: 'w2',
    eyebrow: 'Tentang langkah baru',
    title: 'Berani mencoba, tanpa takut mulai lagi',
    message:
      'Semoga ada keberanian untuk mencoba pengalaman baru, dan kelapangan hati untuk belajar dari setiap prosesnya.',
  },
  {
    id: 'w3',
    eyebrow: 'Tentang hari-hari',
    title: 'Dipenuhi momen sederhana yang hangat',
    message:
      'Semoga hal-hal kecil—obrolan menyenangkan, tawa spontan, dan waktu bersama orang tersayang—menjadi kenangan yang berharga.',
  },
  {
    id: 'w4',
    eyebrow: 'Tentang orang-orang baik',
    title: 'Selalu dikelilingi energi yang baik',
    message:
      'Semoga kamu bertemu dan terus bersama orang-orang yang menghargaimu, mendukung langkahmu, serta membuatmu nyaman menjadi diri sendiri.',
  },
  {
    id: 'w5',
    eyebrow: 'Tentang impianmu',
    title: 'Satu per satu, semoga menemukan jalannya',
    message:
      'Semoga hal-hal yang sedang kamu usahakan diberi kesempatan untuk tumbuh. Nikmati prosesnya, rayakan kemajuan kecil, dan tetap sisakan ruang untuk beristirahat.',
  },
] as const

export function PesanPesanKecil() {
  const reduced = useReducedMotionSafe()
  const [index, setIndex] = useState(0)
  const current = WISHES[index]!

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % WISHES.length)
    }, 7000)
    return () => window.clearInterval(id)
  }, [reduced])

  const next = () => setIndex((value) => (value + 1) % WISHES.length)
  const previous = () => setIndex((value) => (value - 1 + WISHES.length) % WISHES.length)

  return (
    <section id="wish" aria-labelledby="wishes-title" className="section-shell px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-2xl">
          <p className="section-kicker">Wishes tahun ini</p>
          <h2 id="wishes-title" className="section-title mt-3">
            Semoga tahun barumu dipenuhi hal-hal yang berarti.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-cream-muted sm:text-base">
            Beberapa harapan kecil untuk perjalanan barumu—dibaca satu per satu, tanpa perlu terburu-buru.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-navy-deep/90 p-5 shadow-[0_24px_70px_rgba(0,0,0,.24)] sm:p-8 lg:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(231,190,112,.16)_0%,rgba(231,190,112,0)_70%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(230,137,174,.13)_0%,rgba(230,137,174,0)_70%)]"
          />

          <div className="relative grid min-h-[300px] items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
            <div className="min-w-0">
              <div className="mb-8 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/30 bg-gold/10 font-display text-lg text-gold" aria-hidden="true">
                  ✦
                </span>
                <span className="text-xs uppercase tracking-[0.22em] text-gold">
                  Wish {String(index + 1).padStart(2, '0')} <span className="text-cream-muted/60">/ {String(WISHES.length).padStart(2, '0')}</span>
                </span>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: reduced ? 0 : 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: reduced ? 0 : -16 }}
                  transition={{ duration: reduced ? 0.01 : 0.25, ease: 'easeOut' }}
                  aria-live="polite"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-pink">{current.eyebrow}</p>
                  <h3 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight text-cream sm:text-4xl">
                    {current.title}
                  </h3>
                  <p className="mt-5 max-w-2xl text-sm leading-8 text-cream-muted sm:text-base">
                    {current.message}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex gap-1.5" aria-hidden="true">
                {WISHES.map((wish, wishIndex) => (
                  <span
                    key={wish.id}
                    className={`h-1.5 flex-1 rounded-full ${wishIndex === index ? 'bg-gold' : 'bg-cream/15'}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-5 md:flex-col md:justify-center md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <button
                type="button"
                onClick={previous}
                aria-label="Wish sebelumnya"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 text-xl text-cream hover:border-gold/60 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              >
                ←
              </button>
              <span className="text-xs tabular-nums text-cream-muted md:py-1">
                {String(index + 1).padStart(2, '0')} / {String(WISHES.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={next}
                aria-label="Wish berikutnya"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/50 text-xl text-gold hover:bg-gold/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
