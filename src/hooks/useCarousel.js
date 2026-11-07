import { useLayoutEffect, useEffect, useRef } from 'react'

/**
 * 挂画墙的横向滚动：
 *  - 鼠标拖拽（触屏交给浏览器原生滚动，不抢）
 *  - 松手后带惯性继续滑一段
 *  - 内容被复制了 3 份，滚过一份就瞬间平移一份的距离，
 *    因为三份长得一模一样，跳的时候看不出来 → 无缝循环
 */
export function useCarousel(ref, unitCount) {
  const setWRef = useRef(0)
  const inertiaRef = useRef(0)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const measure = () => {
      const kids = el.children
      if (kids.length <= unitCount) return
      const a = kids[0].getBoundingClientRect().left
      const b = kids[unitCount].getBoundingClientRect().left
      const w = b - a
      if (w > 0) setWRef.current = w
    }

    // 把滚动位置夹在中间那一份里
    const normalize = () => {
      const w = setWRef.current
      if (!w) return
      const x = el.scrollLeft
      if (x < w * 0.5) el.scrollLeft = x + w
      else if (x > w * 1.5) el.scrollLeft = x - w
    }

    const reset = () => {
      measure()
      normalize()
    }

    reset()
    const raf = requestAnimationFrame(reset)
    window.addEventListener('resize', reset)
    el.addEventListener('scroll', normalize, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      cancelAnimationFrame(inertiaRef.current)
      window.removeEventListener('resize', reset)
      el.removeEventListener('scroll', normalize)
    }
  }, [ref, unitCount])

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let dragging = false
    let startX = 0
    let startLeft = 0
    let moved = 0
    let lastX = 0
    let lastT = 0
    let speed = 0

    const stopInertia = () => {
      cancelAnimationFrame(inertiaRef.current)
      inertiaRef.current = 0
    }

    const glide = (v) => {
      if (reduced) return
      let s = Math.max(-3, Math.min(3, v))
      if (Math.abs(s) < 0.05) return
      const step = () => {
        if (Math.abs(s) < 0.02) {
          inertiaRef.current = 0
          return
        }
        el.scrollLeft += s * 16
        s *= 0.95
        inertiaRef.current = requestAnimationFrame(step)
      }
      stopInertia()
      inertiaRef.current = requestAnimationFrame(step)
    }

    const onDown = (e) => {
      if (e.pointerType === 'touch' || e.button !== 0) return
      stopInertia()
      dragging = true
      moved = 0
      speed = 0
      startX = e.clientX
      startLeft = el.scrollLeft
      lastX = e.clientX
      lastT = performance.now()
    }

    const onMove = (e) => {
      if (!dragging) return
      const dx = e.clientX - startX
      if (Math.abs(dx) > moved) moved = Math.abs(dx)

      const now = performance.now()
      const dt = Math.max(now - lastT, 1)
      // 记录瞬时速度（px/ms），松手后拿它当惯性初速度
      speed = (e.clientX - lastX) / dt
      lastX = e.clientX
      lastT = now

      if (moved > 4) {
        el.classList.add('is-dragging')
        el.scrollLeft = startLeft - dx
        e.preventDefault()
      }
    }

    const onUp = () => {
      if (!dragging) return
      dragging = false
      el.classList.remove('is-dragging')
      if (moved > 6) glide(-speed)
    }

    const onClick = (e) => {
      if (moved > 6) {
        e.preventDefault()
        e.stopPropagation()
      }
      moved = 0
    }

    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', onUp)
    el.addEventListener('pointercancel', onUp)
    el.addEventListener('pointerleave', onUp)
    el.addEventListener('click', onClick, true)

    return () => {
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onUp)
      el.removeEventListener('pointerleave', onUp)
      el.removeEventListener('click', onClick, true)
      stopInertia()
    }
  }, [ref])
}
