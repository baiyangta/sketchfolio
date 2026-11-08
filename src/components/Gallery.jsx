import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { gallery } from '../data/content'
import SectionTitle from './ui/SectionTitle'
import SketchThumb from './ui/SketchThumb'
import Skyline from './ui/Skyline'
import { useDrawIn } from '../hooks/useDrawIn'
import { useCarousel } from '../hooks/useCarousel'

const items = gallery.items
const coming = gallery.coming ?? []
const COPIES = 3

/**
 * 站内绝对路径要补上部署前缀。
 * GitHub Pages 下面整个站挂在 /<仓库名>/，直接写 /shots/x.jpg 会去域名根目录找，必然 404。
 * 本地开发时 BASE_URL 是 '/'，补完还是 '/shots/x.jpg'。
 * 外部链接（http 开头）原样返回。
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

function assetUrl(path) {
  if (!path) return path
  if (!path.startsWith('/')) return path
  return `${BASE}${path}`
}

export default function Gallery() {
  const scopeRef = useRef(null)
  const railRef = useRef(null)
  const [active, setActive] = useState(null)
  const [closing, setClosing] = useState(false)

  useDrawIn(scopeRef)
  useCarousel(railRef, items.length + coming.length)

  const open = useCallback((item) => {
    setClosing(false)
    setActive(item)
  }, [])

  const close = useCallback(() => {
    setClosing(true)
    window.setTimeout(() => {
      setActive(null)
      setClosing(false)
    }, 280)
  }, [])

  return (
    <>
      <section
        className="section gallery"
        id="gallery"
        ref={scopeRef}
        aria-labelledby="gallery-title"
      >
        <div className="wrap gallery__head">
          <SectionTitle id="gallery-title" index="02" title="画廊" />
          <p className="gallery__intro" data-reveal>
            {gallery.intro}
          </p>
        </div>

        <div className="wall">
          <Skyline />

          <div
            className="wall__rail"
            ref={railRef}
            tabIndex={0}
            role="region"
            aria-label="作品画廊，可用左右方向键翻看"
          >
            <ul className="wall__track">
              {Array.from({ length: COPIES }, (_, copy) => {
                // 只有中间那一份给屏幕阅读器和 Tab 键，另外两份是循环用的副本
                const mirrored = copy !== 1
                return (
                  <Fragment key={copy}>
                    {items.map((item) => (
                      <li
                        className="frame"
                        key={`${copy}-${item.title}`}
                        aria-hidden={mirrored || undefined}
                      >
                        <Hanger />
                        <button
                          type="button"
                          className="frame__card"
                          tabIndex={mirrored ? -1 : undefined}
                          onClick={() => open(item)}
                          aria-label={`${item.title}，${item.year}，查看详情`}
                        >
                          <span className="frame__art">
                            {item.image ? (
                              <img
                                className="frame__img"
                                src={assetUrl(item.image)}
                                alt={`${item.title} 的照片`}
                                loading="lazy"
                              />
                            ) : (
                              <SketchThumb variant={item.variant} />
                            )}
                          </span>
                          <span className="frame__meta">
                            <span className="frame__title">{item.title}</span>
                            <span className="frame__year">{item.year}</span>
                          </span>
                        </button>
                      </li>
                    ))}

                    {coming.map((slot, i) => (
                      <li
                        className="frame"
                        key={`${copy}-soon-${i}`}
                        aria-hidden={mirrored || undefined}
                      >
                        <Hanger />
                        <div className="frame__card frame__card--soon">
                          <span className="frame__soon-art">
                            <svg
                              viewBox="0 0 100 110"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3.2"
                              strokeLinecap="round"
                              aria-hidden="true"
                              focusable="false"
                            >
                              <path d="M28 36 C 30 14, 66 10, 71 32 C 76 52, 52 55, 49 74" />
                              <path d="M49 94 l 0.6 1" strokeWidth="7" />
                            </svg>
                          </span>
                          <span className="frame__meta">
                            <span className="frame__title">敬请期待</span>
                          </span>
                          {slot.note ? (
                            <span className="frame__note">{slot.note}</span>
                          ) : null}
                        </div>
                      </li>
                    ))}
                  </Fragment>
                )
              })}
            </ul>
          </div>

          <svg
            className="wall__floor"
            viewBox="0 0 1200 10"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M0 5 C 120 2, 240 8, 360 5 C 480 2, 600 8, 720 5 C 840 2, 960 8, 1080 5 C 1140 3, 1170 6, 1200 5" />
          </svg>
        </div>
      </section>

      {active && <DetailCard item={active} closing={closing} onClose={close} />}
    </>
  )
}

function Hanger() {
  return (
    <svg
      className="frame__hanger"
      viewBox="0 0 100 26"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M50 1 L4 25 M50 1 L96 25" />
      <circle cx="50" cy="2.2" r="1.8" />
    </svg>
  )
}

function DetailCard({ item, closing, onClose }) {
  const [shown, setShown] = useState(false)
  const cardRef = useRef(null)
  const restoreRef = useRef(null)

  useEffect(() => {
    restoreRef.current = document.activeElement
    const raf = requestAnimationFrame(() => setShown(true))

    // 焦点放到卡片本身：屏幕阅读器会念出对话框，键盘用户再 Tab 到关闭键，
    // 也不会因为自动聚焦按钮而出现一圈焦点框
    cardRef.current?.focus?.()

    const prevOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = prevOverflow
      restoreRef.current?.focus?.()
    }
  }, [onClose])

  return (
    <div
      className={`vitrine${shown ? ' is-shown' : ''}${closing ? ' is-closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="vitrine-title"
      onClick={onClose}
    >
      <div
        className="vitrine__card"
        ref={cardRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="vitrine__close"
          onClick={onClose}
          aria-label="关闭"
        >
          ×
        </button>

        <p className="vitrine__kicker">
          {item.year} · {item.role}
        </p>
        <h3 className="vitrine__title" id="vitrine-title">
          {item.title}
        </h3>

        <div className="vitrine__art">
          {item.image ? (
            <img src={assetUrl(item.image)} alt={`${item.title} 的照片`} />
          ) : (
            <SketchThumb variant={item.variant} />
          )}
        </div>

        <p className="vitrine__summary">{item.summary}</p>

        <p className="vitrine__label">技术栈</p>
        <ul className="vitrine__tags">
          {item.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <a className="btn btn--accent vitrine__link" href={item.link}>
          {item.linkLabel} →
        </a>
      </div>
    </div>
  )
}
