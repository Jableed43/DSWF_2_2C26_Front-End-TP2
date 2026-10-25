import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Sidebar.css'

const enlacesPrincipales = [
  {
    to: '/',
    etiqueta: 'Portada / Inicio',
    icono: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  },
  {
    to: '/herramientas',
    etiqueta: 'Catálogo de Herramientas',
    icono: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="7" height="7" x="3" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" />
        <rect width="7" height="7" x="3" y="14" rx="1" />
      </svg>
    )
  },
  {
    to: '/proyectos-api',
    etiqueta: 'Proyectos GitHub (API)',
    icono: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    )
  }
]

const integrantes = [
  { to: '/integrantes/rocio', nombre: 'Rocío Arenas', rol: 'Identidad Visual & Portada' },
  { to: '/integrantes/javier', nombre: 'Javier López', rol: 'Estructura & Navegación' },
  { to: '/integrantes/damian', nombre: 'Damián Gorosito', rol: 'Datos Locales & API' },
  { to: '/integrantes/facundo', nombre: 'Facundo Sánchez', rol: 'Bitácora & Documentación' }
]

const enlacesProyecto = [
  {
    to: '/arbol-renderizado',
    etiqueta: 'Árbol de Renderizado',
    icono: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <rect x="3" y="15" width="6" height="4" rx="1" />
        <rect x="15" y="15" width="6" height="4" rx="1" />
        <path d="M12 7v4" />
        <path d="M6 15v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
      </svg>
    )
  },
  {
    to: '/bitacora',
    etiqueta: 'Bitácora de Trabajo',
    icono: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
        <path d="M6 6h10" />
        <path d="M6 10h10" />
        <path d="M6 14h6" />
      </svg>
    )
  }
]

function Sidebar({ abierta, alCerrar, onNavegar }) {
  const localizacion = useLocation()

  const cerrarMenu = () => {
    if (onNavegar) onNavegar()
    if (alCerrar) alCerrar()
  }

  useEffect(() => {
    if (abierta && alCerrar) {
      alCerrar()
    }
  }, [localizacion.pathname, abierta, alCerrar])

  useEffect(() => {
    function manejarTecla(e) {
      if (e.key === 'Escape' && abierta && alCerrar) {
        alCerrar()
      }
    }
    window.addEventListener('keydown', manejarTecla)
    return () => window.removeEventListener('keydown', manejarTecla)
  }, [abierta, alCerrar])

  return (
    <aside
      className={`sidebar ${abierta ? 'sidebar--abierta' : ''}`}
      aria-label="Navegación principal del sitio"
      id="sidebar-navegacion"
    >
      <div className="sidebar__encabezado">
        <NavLink to="/" className="sidebar__marca" aria-label="BlueTech - Ir a la portada" onClick={cerrarMenu}>
          <div className="sidebar__logo-icono" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <div className="sidebar__titulos">
            <span className="sidebar__nombre">BlueTech</span>
            <span className="sidebar__insignia">2C26 · TP2 React</span>
          </div>
        </NavLink>

        <button
          type="button"
          className="sidebar__boton-cerrar"
          onClick={cerrarMenu}
          aria-label="Cerrar panel de navegación"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <nav className="sidebar__nav">
        <div className="sidebar__grupo">
          <span className="sidebar__grupo-titulo">Explorar</span>
          <ul className="sidebar__lista">
            {enlacesPrincipales.map((enlace) => (
              <li key={enlace.to}>
                <NavLink
                  to={enlace.to}
                  end={enlace.to === '/'}
                  onClick={cerrarMenu}
                  className={({ isActive }) =>
                    `sidebar__enlace ${isActive ? 'sidebar__enlace--activo' : ''}`
                  }
                >
                  <span className="sidebar__icono">{enlace.icono}</span>
                  <span className="sidebar__texto">{enlace.etiqueta}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar__grupo">
          <span className="sidebar__grupo-titulo">Equipo BlueTech</span>
          <ul className="sidebar__lista">
            {integrantes.map((miembro) => (
              <li key={miembro.to}>
                <NavLink
                  to={miembro.to}
                  onClick={cerrarMenu}
                  className={({ isActive }) =>
                    `sidebar__enlace ${isActive ? 'sidebar__enlace--activo' : ''}`
                  }
                >
                  <span className="sidebar__avatar-min" aria-hidden="true">
                    {miembro.nombre.charAt(0)}
                  </span>
                  <div className="sidebar__miembro-info">
                    <span className="sidebar__texto">{miembro.nombre}</span>
                    <span className="sidebar__subtexto">{miembro.rol}</span>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar__grupo">
          <span className="sidebar__grupo-titulo">Auditoría & Entrega</span>
          <ul className="sidebar__lista">
            {enlacesProyecto.map((enlace) => (
              <li key={enlace.to}>
                <NavLink
                  to={enlace.to}
                  onClick={cerrarMenu}
                  className={({ isActive }) =>
                    `sidebar__enlace ${isActive ? 'sidebar__enlace--activo' : ''}`
                  }
                >
                  <span className="sidebar__icono">{enlace.icono}</span>
                  <span className="sidebar__texto">{enlace.etiqueta}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="sidebar__pie">
        <p className="sidebar__materia">Desarrollo de Sistemas Web</p>
        <p className="sidebar__institucional">Front End · Grupo 8</p>
      </div>
    </aside>
  )
}

export default Sidebar
