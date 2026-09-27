import { useEffect, useState } from 'react'
import type { DeviceTier } from '../types'

const getTier = (): DeviceTier => {
  if (typeof window === 'undefined') return 'mid'

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const cores = navigator.hardwareConcurrency || 4
  const memory = 'deviceMemory' in navigator && typeof (navigator as Navigator & { deviceMemory?: unknown }).deviceMemory === 'number'
    ? Number((navigator as Navigator & { deviceMemory?: number }).deviceMemory)
    : 4

  if (reduced || (cores <= 2 && memory <= 2)) return 'low'
  if (coarse || cores <= 4 || memory <= 4) return 'mid'
  return 'high'
}

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>(() => getTier())

  useEffect(() => {
    const update = () => setTier(getTier())
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])

  return tier
}
