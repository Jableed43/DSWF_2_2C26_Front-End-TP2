import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import ReproductorMusica from '../components/ReproductorMusica'
import './Layout.css'

function Layout({ children }) {
  const [sidebarAbierta, setSidebarAbierta] = useState(false)
  const botonMenuRef = useRef(null)
  const navigate = useNavigate()

  function volverAtras() {
    if (window.history.state?.idx > 0) navigate(-1)
    else navigate('/')
  }

  const cerrarSidebar = useCallback(() => {
    setSidebarAbierta(false)
    botonMenuRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!sidebarAbierta) return

    function cerrarConEscape(evento) {
      if (evento.key === 'Escape') cerrarSidebar()
    }

    document.addEventListener('keydown', cerrarConEscape)
    return () => document.removeEventListener('keydown', cerrarConEscape)
  }, [sidebarAbierta, cerrarSidebar])

  const contenido = children ?? <Outlet />

  return (
    <div className="layout">
      <a href="#contenido-principal" className="skip-link">Saltar al contenido principal</a>

      <header className="layout__topbar-movil">
        <button
          type="button"
          className="layout__boton-volver"
          onClick={volverAtras}
          aria-label="Volver atrás"
          title="Volver atrás"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
            <path d="M9 12h12" />
          </svg>
        </button>

        <button
          type="button"
          className="layout__boton-hamburguesa"
          ref={botonMenuRef}
          onClick={() => (sidebarAbierta ? cerrarSidebar() : setSidebarAbierta(true))}
          aria-label={sidebarAbierta ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          aria-expanded={sidebarAbierta}
          aria-controls="sidebar-navegacion"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <Link to="/" className="layout__marca-movil">
          <span className="layout__marca-nombre">BlueTech</span>
          <span className="layout__marca-badge">TP2</span>
        </Link>
      </header>

      {sidebarAbierta && (
        <div
          className="layout__overlay"
          onClick={cerrarSidebar}
          aria-hidden="true"
        />
      )}

      <Sidebar abierta={sidebarAbierta} alCerrar={cerrarSidebar} />

      <div className="layout__cuerpo">
        <main id="contenido-principal" className="layout__contenido">
          {contenido}
        </main>
      </div>

      <footer className="layout__pie-global">
        <div className="layout__pie-interior">
          <p className="layout__pie-texto">
            <strong>BlueTech</strong> · Desarrollo de Sistemas Web Front End · Comisión 2C26 (2026)
          </p>
          <p className="layout__pie-subtexto">
            Desarrollado con React 19, React Router 7 y Vite · Grupo 8
          </p>
        </div>
      </footer>

      <ReproductorMusica />
    </div>
  )
}

export default Layout
