import { useCallback, useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'ultah-audio-muted'

const readMuted = (): boolean => {
  if (typeof window === 'undefined') return true
  return window.localStorage.getItem(STORAGE_KEY) === 'true'
}

export function useAudioManager(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const mutedRef = useRef(readMuted())
  const [muted, setMuted] = useState(mutedRef.current)
  const [playing, setPlaying] = useState(false)

  const play = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || mutedRef.current) return
    try {
      await audio.play()
      setPlaying(true)
    } catch {
      setPlaying(false)
    }
  }, [])

  const pause = useCallback(() => {
    audioRef.current?.pause()
    setPlaying(false)
  }, [])

  const toggleMuted = useCallback(() => {
    const next = !mutedRef.current
    mutedRef.current = next
    setMuted(next)
    window.localStorage.setItem(STORAGE_KEY, String(next))
    if (next) pause()
    else void play()
  }, [pause, play])

  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = true
    audio.preload = 'none'
    audioRef.current = audio

    const onEnded = () => setPlaying(false)
    audio.addEventListener('ended', onEnded)

    const unlock = () => {
      if (!mutedRef.current) void play()
    }
    window.addEventListener('pointerdown', unlock, { once: true, passive: true })
    window.addEventListener('keydown', unlock, { once: true })

    return () => {
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
      audio.removeEventListener('ended', onEnded)
      audio.pause()
      audio.src = ''
      audioRef.current = null
    }
  }, [play, src])

  return { muted, playing, play, pause, toggleMuted }
}
