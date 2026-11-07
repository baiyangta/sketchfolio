import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * 把 scope 内所有带 [data-draw] 的 SVG path 变成「随滚动一笔画出来」。
 * 关闭动画偏好时完全不介入，path 保持静态可见。
 */
export function useDrawIn(scopeRef) {
  useLayoutEffect(() => {
    const scope = scopeRef.current
    if (!scope) return undefined

    let mm
    const ctx = gsap.context(() => {
      mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        scope.querySelectorAll('[data-draw]').forEach((path) => {
          let len = 0
          try {
            len = path.getTotalLength()
          } catch {
            return
          }
          if (!len) return

          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
          gsap.to(path, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: path,
              start: 'top 92%',
              end: 'top 62%',
              scrub: 0.5,
            },
          })
        })
      })
    }, scope)

    return () => {
      mm?.revert()
      ctx.revert()
    }
  }, [scopeRef])
}
