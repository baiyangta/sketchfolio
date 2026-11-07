import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * 页面左侧那条随滚动逐渐画出来的铅笔线。
 * 固定在视口内，纵向路径用 preserveAspectRatio="none" 拉满整屏。
 */
export default function ScrollPencilLine() {
  const pathRef = useRef(null)

  useLayoutEffect(() => {
    const path = pathRef.current
    if (!path) return undefined

    let len = 0
    try {
      len = path.getTotalLength()
    } catch {
      return undefined
    }
    if (!len) return undefined

    let mm
    const ctx = gsap.context(() => {
      mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            start: 0,
            end: 'max',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        })
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: 0 })
        ScrollTrigger.refresh()
      })
    })

    return () => {
      mm?.revert()
      ctx.revert()
    }
  }, [])

  return (
    <svg
      className="pencil-line"
      viewBox="0 0 14 1000"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        ref={pathRef}
        d="M7 0 C 11 120, 3 240, 7 360 C 11 480, 3 600, 7 720 C 11 840, 3 940, 7 1000"
        fill="none"
        stroke="var(--rule)"
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
