import { useRef } from 'react'
import { about } from '../data/content'
import SectionTitle from './ui/SectionTitle'
import Tape from './ui/Tape'
import { useDrawIn } from '../hooks/useDrawIn'

export default function About() {
  const scopeRef = useRef(null)
  useDrawIn(scopeRef)

  return (
    <section className="section" id="about" aria-labelledby="about-title" ref={scopeRef}>
      <div className="wrap">
        <SectionTitle id="about-title" index="01" title="关于我" />

        <div className="about__grid">
          <article className="sheet about__note" data-reveal>
            <Tape />
            <p className="about__lead">{about.lead}</p>
            <div className="about__body">
              {about.paragraphs.map((text) => (
                <p key={text.slice(0, 12)}>{text}</p>
              ))}
            </div>

            <ul className="about__facts">
              {about.facts.map((fact) => (
                <li key={fact.label}>
                  <span className="fact-label">{fact.label}</span>
                  <b>{fact.value}</b>
                </li>
              ))}
            </ul>
          </article>

          <aside className="about__side" data-reveal>
            <blockquote className="about__quote">「{about.quote}」</blockquote>
            <p className="about__quote-note">{about.quoteNote}</p>
          </aside>
        </div>
      </div>
    </section>
  )
}
