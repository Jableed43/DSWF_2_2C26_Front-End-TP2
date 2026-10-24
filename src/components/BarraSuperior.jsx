import { NavLink } from 'react-router-dom'
import './BarraSuperior.css'

function BarraSuperior() {
  return (
    <header className="barra-superior">
      <NavLink to="/" className="barra-superior__marca">
        BlueTech
      </NavLink>

      <nav aria-label="Navegación del equipo">
        <ul className="barra-superior__enlaces">
          <li>
            <NavLink to="/" end>Inicio</NavLink>
          </li>
          <li>
            <NavLink to="/integrantes/damian">Damián</NavLink>
          </li>
          <li>
            <NavLink to="/integrantes/javier">Javier</NavLink>
          </li>
          <li>
            <NavLink to="/integrantes/facundo">Facundo</NavLink>
          </li>
          <li>
            <NavLink to="/integrantes/rocio">Rocío</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default BarraSuperior