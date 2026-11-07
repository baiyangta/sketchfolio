import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { about, profile } from '../data/content'

/* 手绘椭圆：两条略微错位的闭合曲线，模拟「描了两遍」 */
const ELLIPSE_A =
  'M 198 10 C 306 6, 392 32, 393 70 C 394 108, 292 134, 190 131 C 92 128, 8 106, 7 68 C 6 30, 104 8, 216 12'
const ELLIPSE_B =
  'M 192 19 C 292 17, 380 41, 375 75 C 370 109, 278 123, 186 120 C 92 117, 22 96, 25 66 C 28 36, 110 19, 210 23'

const meta = about.facts.map((f) => f.value)

export default function Hero({ entered }) {
  const p1 = useRef(null)
  const p2 = useRef(null)

  // 等门开了再画这个圈，不然观众看不到
  useLayoutEffect(() => {
    if (!entered) return undefined

    const paths = [p1.current, p2.current].filter(Boolean)
    if (!paths.length) return undefined

    let mm
    const ctx = gsap.context(() => {
      mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        paths.forEach((p) => {
          const len = p.getTotalLength()
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
        })
        gsap.to(paths, {
          strokeDashoffset: 0,
          duration: 1.5,
          delay: 0.8,
          ease: 'power2.inOut',
          stagger: 0.26,
        })
      })
    })

    return () => {
      mm?.revert()
      ctx.revert()
    }
  }, [entered])

  const chars = Array.from(profile.name)

  return (
    <section className={`hero${entered ? ' is-entered' : ''}`} id="top">
      <div className="hero__inner">
        <p className="eyebrow">{profile.role}</p>

        <h1 className="hero__name" aria-label={profile.name}>
          <span className="hero__name-inner">
            {chars.map((c, i) => (
              <span
                key={`${c}-${i}`}
                className="hero__char"
                style={{ '--i': i }}
                aria-hidden="true"
              >
                {c}
              </span>
            ))}
            <svg
              className="hero__circle"
              viewBox="0 0 400 140"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
            >
              <path ref={p1} d={ELLIPSE_A} vectorEffect="non-scaling-stroke" />
              <path ref={p2} d={ELLIPSE_B} vectorEffect="non-scaling-stroke" />
            </svg>
          </span>
        </h1>

        <p className="hero__tagline">{profile.tagline}</p>

        <div className="hero__meta">
          {meta.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>

      <a className="hero__scroll" href="#about">
        往下看
        <svg viewBox="0 0 18 34" aria-hidden="true" focusable="false">
          <path
            d="M9 2 V28 M2 21 L9 29 L16 21"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </section>
  )
}
