import { useCallback, useEffect, useRef } from 'react'
import { useDeviceTier } from '../hooks/useDeviceTier'
import { useInViewCanvas } from '../hooks/useInViewCanvas'
import { useReducedMotionSafe } from '../hooks/useReducedMotionSafe'

type Spark = { x: number; y: number; started: number; size: number }

export function ClickSparkCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const sparksRef = useRef<Spark[]>([])
  const frameRef = useRef<number | null>(null)
  const { ref, active } = useInViewCanvas<HTMLDivElement>()
  const tier = useDeviceTier()
  const reduced = useReducedMotionSafe()

  const draw = useCallback((time: number) => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const context = canvas.getContext('2d')
    if (!context) return
    const dpr = Math.min(window.devicePixelRatio || 1, tier === 'high' ? 2 : 1.5)
    const width = container.clientWidth
    const height = container.clientHeight
    if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
    }
    context.setTransform(dpr, 0, 0, dpr, 0, 0)
    context.clearRect(0, 0, width, height)
    const now = time
    const life = tier === 'high' ? 640 : 480
    const next: Spark[] = []
    for (const spark of sparksRef.current) {
      const progress = Math.min(1, (now - spark.started) / life)
      if (progress >= 1) continue
      const alpha = 1 - progress
      context.beginPath()
      context.arc(spark.x, spark.y, spark.size * (1 + progress * 2.1), 0, Math.PI * 2)
      context.strokeStyle = `rgba(245,197,66,${alpha * 0.78})`
      context.lineWidth = 1.2
      context.stroke()
      next.push(spark)
    }
    sparksRef.current = next
    if (active && next.length > 0 && !reduced) frameRef.current = requestAnimationFrame(draw)
    else frameRef.current = null
  }, [active, reduced, tier])

  useEffect(() => {
    if (!active || reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      const container = containerRef.current
      if (!container) return
      canvas.width = Math.floor(container.clientWidth * Math.min(window.devicePixelRatio || 1, tier === 'high' ? 2 : 1.5))
      canvas.height = Math.floor(container.clientHeight * Math.min(window.devicePixelRatio || 1, tier === 'high' ? 2 : 1.5))
    }
    const observer = new ResizeObserver(resize)
    if (containerRef.current) observer.observe(containerRef.current)
    resize()
    return () => observer.disconnect()
  }, [active, reduced, tier])

  useEffect(() => {
    if (!active || reduced) return
    const handleWindowPointerDown = (event: PointerEvent) => {
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) return
      const amount = tier === 'high' ? 5 : tier === 'mid' ? 3 : 2
      const now = performance.now()
      for (let index = 0; index < amount; index += 1) {
        sparksRef.current.push({ x: event.clientX - rect.left + (index - (amount - 1) / 2) * 5, y: event.clientY - rect.top, started: now + index * 12, size: 3 + (index % 2) })
      }
      if (frameRef.current === null) frameRef.current = requestAnimationFrame(draw)
    }
    window.addEventListener('pointerdown', handleWindowPointerDown, { passive: true })
    return () => {
      window.removeEventListener('pointerdown', handleWindowPointerDown)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
  }, [active, draw, reduced, tier])

  return (
    <div ref={(node) => { containerRef.current = node; ref.current = node }} className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
    </div>
  )
}
