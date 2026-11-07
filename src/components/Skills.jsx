import { useRef } from 'react'
import { skills } from '../data/content'
import SectionTitle from './ui/SectionTitle'
import { useDrawIn } from '../hooks/useDrawIn'

export default function Skills() {
  const scopeRef = useRef(null)
  useDrawIn(scopeRef)

  return (
    <section className="section" id="skills" aria-labelledby="skills-title" ref={scopeRef}>
      <div className="wrap">
        <SectionTitle id="skills-title" index="03" title="会什么" />

        <div className="skills">
          {skills.map((group) => (
            <div className="skill-group" key={group.group} data-reveal>
              <h3 className="skill-group__label">
                <svg viewBox="0 0 26 18" aria-hidden="true" focusable="false">
                  <path data-draw d="M2 9 C 6 11, 7 13.5, 9 16 C 12 11, 17 5, 24 1.5" />
                </svg>
                {group.group}
              </h3>

              <ul className="skill-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
