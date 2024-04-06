import nlwUniteIcon from '../assets/nlw-unite-icon.svg'
import { NavLink } from './nav-link'

const paths = [
  { name: 'Eventos', href: '/events' },
  { name: 'Participantes', href: '/attendees' },
]

export function Header() {
  return (
    <header className="flex items-center gap-5 w-full py-2">
      <img src={nlwUniteIcon} alt="nlw unite icon" />
      <nav className="flex items-center gap-5">
        {paths.map((path) => (
          <NavLink key={path.name} href={path.href}>
            {path.name}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
