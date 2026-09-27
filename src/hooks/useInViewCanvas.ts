import { useEffect, useRef, useState } from 'react'

export function useInViewCanvas<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)
  const [visible, setVisible] = useState(() => typeof document === 'undefined' ? false : !document.hidden)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? false),
      { rootMargin: '160px 0px', threshold: 0.01 },
    )
    observer.observe(node)

    const onVisibility = () => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return { ref, active: inView && visible }
}
