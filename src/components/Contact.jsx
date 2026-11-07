import { useRef } from 'react'
import { contact, footer } from '../data/content'
import SectionTitle from './ui/SectionTitle'
import { useDrawIn } from '../hooks/useDrawIn'

export default function Contact() {
  const scopeRef = useRef(null)
  useDrawIn(scopeRef)

  return (
    <>
      <section className="section contact" id="contact" aria-labelledby="contact-title" ref={scopeRef}>
        <div className="wrap">
          <SectionTitle id="contact-title" index="04" title="联系我" align="center" />

          <p className="contact__lead" data-reveal>
            {contact.lead}
          </p>

          <a className="contact__mail" href={`mailto:${contact.email}`} data-reveal>
            {contact.email}
            <svg className="contact__mail-rule" viewBox="0 0 400 14" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              <path data-draw d="M4 8 C 70 2, 140 12, 210 6 C 280 1, 340 11, 396 5" />
            </svg>
          </a>

          <ul className="contact__links" data-reveal>
            {contact.links.map((link) => (
              <li key={link.label}>
                <a className="link link--always" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="contact__sign" aria-hidden="true">
            <svg viewBox="0 0 240 60" focusable="false">
              <path d="M12 42 C 24 12, 38 8, 45 26 C 52 44, 58 44, 67 24 C 76 5, 86 10, 90 29 C 94 48, 106 45, 114 26 C 122 8, 132 14, 136 35" />
              <path d="M150 38 C 164 20, 180 17, 190 25 C 200 33, 210 30, 218 21 C 224 15, 231 17, 233 26" />
            </svg>
          </div>

          <p className="contact__sign-note" data-reveal>
            {contact.signNote}
          </p>
        </div>
      </section>

      <footer className="footer">
        <div className="footer__rule" aria-hidden="true" />
        <p>
          © {footer.year} {footer.copyright} · 手写代码，慢慢改
        </p>
      </footer>
    </>
  )
}
