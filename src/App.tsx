import { useMemo } from 'react'
import { Hero } from './components/Hero'
import { SectionPesan } from './components/SectionPesan'
import { TileRevealGallery } from './components/TileRevealGallery'
import { MasonryGallery } from './components/MasonryGallery'
import { VideoSection } from './components/VideoSection'
import { BottleLetter } from './components/BottleLetter'
import { PesanPesanKecil } from './components/PesanPesanKecil'
import { ConfettiCelebration } from './components/ConfettiCelebration'
import { SITE_CONFIG } from './data/config'
import { useAudioManager } from './hooks/useAudioManager'
import { useDeviceTier } from './hooks/useDeviceTier'
import { useLenisScroll } from './hooks/useLenisScroll'

function AudioToggle() {
  const audio = useAudioManager(SITE_CONFIG.audioSrc)
  return (
    <button type="button" onClick={audio.toggleMuted} aria-pressed={!audio.muted} aria-label={audio.muted ? 'Nyalakan musik' : 'Matikan musik'} className="fixed bottom-5 right-5 z-[70] grid h-11 w-11 place-items-center rounded-full border border-gold/40 bg-navy-deep/90 text-gold shadow-lg backdrop-blur-sm">
      <span aria-hidden="true">{audio.muted ? '♪' : '♫'}</span>
    </button>
  )
}

function SectionRail() {
  const ids = useMemo(() => ['pesan', 'kenangan', 'galeri-foto', 'video', 'surat', 'wish'], [])
  return (
    <nav aria-label="Navigasi section" className="fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 lg:block">
      <div className="flex flex-col gap-2 rounded-full border border-white/10 bg-navy/70 p-2 backdrop-blur-sm">
        {ids.map((id) => <a key={id} href={`#${id}`} aria-label={`Lompat ke ${id}`} className="h-2 w-2 rounded-full bg-cream/30 hover:bg-gold" />)}
      </div>
    </nav>
  )
}

export default function App() {
  const tier = useDeviceTier()
  const lenisRef = useLenisScroll(tier)

  return (
    <div className="min-h-screen overflow-x-clip bg-navy text-cream">
      <AudioToggle />
      <SectionRail />
      <main>
        <Hero lenisRef={lenisRef} />
        <SectionPesan />
        <TileRevealGallery />
        <MasonryGallery />
        <VideoSection />
        <BottleLetter />
        <PesanPesanKecil />
        <ConfettiCelebration />
      </main>
      <footer className="border-t border-white/10 px-5 py-8 text-center text-xs text-cream-muted">Dibuat khusus untuk {SITE_CONFIG.recipientName}.</footer>
    </div>
  )
}
