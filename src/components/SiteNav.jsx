import { nav, profile } from '../data/content'

export default function SiteNav() {
  return (
    <header className="site-nav">
      <a className="site-nav__mark" href="#top">
        {profile.name}
      </a>
      <nav className="site-nav__links" aria-label="页内导航">
        {nav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
