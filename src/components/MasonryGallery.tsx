import { useEffect, useState } from 'react'
import type { Photo } from '../types'
import { PHOTOS } from '../data/photos'

function Lightbox({ photo, onClose }: { photo: Photo | null; onClose: () => void }) {
  useEffect(() => {
    if (!photo) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [photo, onClose])

  if (!photo) return null
  return (
    <div role="dialog" aria-modal="true" aria-label="Pratinjau foto" className="fixed inset-0 z-[80] grid place-items-center bg-navy/95 p-4" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose() }}>
      <div className="relative flex max-h-[92svh] max-w-5xl flex-col items-center">
        <button type="button" aria-label="Tutup foto" onClick={onClose} className="absolute right-2 top-2 z-10 grid h-11 w-11 place-items-center rounded-full bg-navy-deep/90 text-cream">×</button>
        <img src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} className="max-h-[78svh] w-auto max-w-full rounded-2xl object-contain" />
        <p className="mt-3 max-w-xl text-center text-sm text-cream-muted">{photo.caption}</p>
      </div>
    </div>
  )
}

export function MasonryGallery() {
  const [selected, setSelected] = useState<Photo | null>(null)
  return (
    <section id="galeri-foto" className="section-shell scroll-mt-10 px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="section-kicker">Galeri masonry</p>
          <h2 className="section-title mt-3">Foto-foto yang ingin kamu ulang.</h2>
        </div>
        <div className="columns-2 gap-3 sm:columns-3 sm:gap-4">
          {PHOTOS.map((photo) => (
            <button type="button" key={photo.id} onClick={() => setSelected(photo)} className="group mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-navy-deep text-left sm:mb-4">
              <img src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} loading="lazy" decoding="async" className="block h-auto w-full transition duration-500 group-hover:scale-[1.015]" />
              <span className="block border-t border-white/10 p-3 text-xs leading-5 text-cream-muted">{photo.caption}</span>
            </button>
          ))}
        </div>
      </div>
      <Lightbox photo={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
