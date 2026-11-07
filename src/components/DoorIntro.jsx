import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * 入场：两扇纸门向外打开。
 * - 点击 / 回车 / 空格 / 滚轮 都能开
 * - 7 秒没人动，自动开（不让访客卡在门上）
 * - 门挡着的时候锁住页面滚动
 * - 关闭动画偏好时不渲染这个组件（在 App 里判断）
 */
export default function DoorIntro({ onOpen, onDone }) {
  const [open, setOpen] = useState(false)
  const opened = useRef(false)

  // 回调放进 ref，避免父组件每次重渲染都重建 effect
  const cbs = useRef({ onOpen, onDone })
  cbs.current = { onOpen, onDone }

  const openDoor = useCallback(() => {
    if (opened.current) return
    opened.current = true
    setOpen(true)

    // 门开始转之后就放首屏，让文字在门缝里一点点长出来
    window.setTimeout(() => cbs.current.onOpen?.(), 320)
    window.setTimeout(() => cbs.current.onDone?.(), 1850)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const prevOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    window.scrollTo(0, 0)

    const timer = window.setTimeout(openDoor, 7000)

    const onKey = (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') openDoor()
    }

    window.addEventListener('wheel', openDoor, { passive: true })
    window.addEventListener('touchmove', openDoor, { passive: true })
    window.addEventListener('keydown', onKey)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('wheel', openDoor)
      window.removeEventListener('touchmove', openDoor)
      window.removeEventListener('keydown', onKey)
      root.style.overflow = prevOverflow
    }
  }, [openDoor])

  return (
    <div
      className={`door${open ? ' is-open' : ''}`}
      onClick={openDoor}
      role="presentation"
    >
      <div className="door__leaf door__leaf--left" aria-hidden="true">
        <span className="door__frame" />
      </div>

      <div className="door__leaf door__leaf--right" aria-hidden="true">
        <span className="door__frame" />
        <span className="door__knob" />
      </div>

      <div className="door__hint">
        <p className="door__kicker">Portfolio · 2026</p>
        <button
          type="button"
          className="door__btn"
          onClick={(e) => {
            e.stopPropagation()
            openDoor()
          }}
        >
          推门进去
        </button>
        <p className="door__sub">点一下，或者滚一下也行</p>
      </div>
    </div>
  )
}
