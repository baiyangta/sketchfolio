export default function SectionTitle({ index, title, id, align = 'left' }) {
  return (
    <header className={`section-title${align === 'center' ? ' section-title--center' : ''}`}>
      <div className="section-title__row">
        <span className="section-title__index" aria-hidden="true">
          {index}
        </span>
        <h2 className="section-title__text" id={id}>
          {title}
        </h2>
      </div>
      <svg
        className="section-title__rule"
        viewBox="0 0 320 12"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path data-draw d="M3 8 C 58 3, 118 10, 176 6 C 226 2.5, 272 9, 317 6" />
      </svg>
    </header>
  )
}
