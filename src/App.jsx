import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import SiteNav from './components/SiteNav'
import ScrollPencilLine from './components/ScrollPencilLine'
import DoorIntro from './components/DoorIntro'
import Hero from './components/Hero'
import About from './components/About'
import Gallery from './components/Gallery'
import Skills from './components/Skills'
import Contact from './components/Contact'

gsap.registerPlugin(ScrollTrigger)

// 移动端地址栏收起会触发 resize，默认会让触发点抖动，这里忽略。
ScrollTrigger.config({ ignoreMobileResize: true })

// 关闭动画偏好的人直接看内容，不给门。
// 加 #content 也会跳过入场，方便调试和分享直达。
const skipIntro =
  typeof window !== 'undefined' &&
  (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.location.hash === '#content')

export default function App() {
  const root = useRef(null)
  const [entered, setEntered] = useState(skipIntro)
  const [showDoor, setShowDoor] = useState(!skipIntro)

  // 字体加载完成后行高会变，重新计算触发点
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    if (document.fonts?.ready) document.fonts.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  // 带 hash 直接进来（比如分享 #work）时，等页面渲染完再跳
  useEffect(() => {
    const id = window.location.hash.replace('#', '')
    if (!id || id === 'content') return undefined
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView()
    }, 120)
    return () => window.clearTimeout(timer)
  }, [])

  // 门开了之后再挂滚动入场，免得在门后面白演一遍
  useEffect(() => {
    if (!entered) return undefined

    let mm
    const ctx = gsap.context(() => {
      mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('[data-reveal]').forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 26,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              once: true,
            },
          })
        })
      })
    }, root)

    return () => {
      mm?.revert()
      ctx.revert()
    }
  }, [entered])

  // 保险：万一过渡动画没跑完，3.2 秒后强制把页面显出来，绝不让内容一直看不见
  useEffect(() => {
    if (!entered) return undefined
    const timer = window.setTimeout(() => {
      const page = root.current?.querySelector('.page')
      if (page) {
        page.style.transition = 'none'
        page.style.opacity = '1'
      }
    }, 3200)
    return () => window.clearTimeout(timer)
  }, [entered])

  return (
    <div ref={root}>
      <div className="paper-bg" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="grain grain--fine" aria-hidden="true" />

      <a className="skip" href="#main">
        跳到主要内容
      </a>

      {showDoor && (
        <DoorIntro
          onOpen={() => setEntered(true)}
          onDone={() => setShowDoor(false)}
        />
      )}

      <div
        className={`page${showDoor ? ' is-waiting' : ''}${entered ? ' is-in' : ''}`}
      >
        <SiteNav />
        <ScrollPencilLine />

        <main id="main">
          <Hero entered={entered} />
          <About />
          <Gallery />
          <Skills />
          <Contact />
        </main>
      </div>
    </div>
  )
}
