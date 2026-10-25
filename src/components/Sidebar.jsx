import { NavLink } from 'react-router-dom'
import './Sidebar.css'

const secciones = [
  { to: '/', texto: 'Inicio', fin: true },
  { to: '/herramientas', texto: 'Herramientas' },
  { to: '/api', texto: 'API de GitHub' },
  { to: '/arbol', texto: 'Árbol de renderizado' },
  { to: '/bitacora', texto: 'Bitácora' }
]

const integrantes = [
  { to: '/integrantes/javier', texto: 'Javier López' },
  { to: '/integrantes/rocio', texto: 'Rocío Arenas' },
  { to: '/integrantes/facundo', texto: 'Facundo Sánchez' },
  { to: '/integrantes/damian', texto: 'Damián Gorosito' }
]

function Sidebar({ abierta, onNavegar }) {
  return (
    <aside
      id="sidebar"
      className={`sidebar ${abierta ? 'sidebar--abierta' : ''}`}
      aria-label="Menú principal"
    >
      <NavLink to="/" className="sidebar__marca" onClick={onNavegar}>
        Blue<span>Tech</span>
      </NavLink>
      <p className="sidebar__lema">TP2 · Front End · 2C26</p>

      <nav aria-label="Secciones">
        <ul className="sidebar__lista">
          {secciones.map((seccion) => (
            <li key={seccion.to}>
              <NavLink to={seccion.to} end={seccion.fin} onClick={onNavegar}>
                {seccion.texto}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <nav aria-labelledby="sidebar-integrantes">
        <h2 id="sidebar-integrantes" className="sidebar__titulo">
          Integrantes
        </h2>
        <ul className="sidebar__lista">
          {integrantes.map((integrante) => (
            <li key={integrante.to}>
              <NavLink to={integrante.to} onClick={onNavegar}>
                {integrante.texto}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
