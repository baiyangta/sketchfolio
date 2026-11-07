export default function Tape({ variant }) {
  return <span className={`tape${variant === 'left' ? ' tape--left' : ''}`} aria-hidden="true" />
}
