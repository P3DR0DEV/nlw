import nlwUniteIcon from '../assets/nlw-unite-icon.svg'

export function Header() {
  return (
    <header className="flex items-center gap-5 w-full py-2">
      <img src={nlwUniteIcon} alt="nlw unite icon" />
      <nav className="flex items-center gap-5 text-sm font-medium">
        <a href="" className="text-zinc-300">
          Eventos
        </a>
        <a href="">Participantes</a>
      </nav>
    </header>
  )
}
