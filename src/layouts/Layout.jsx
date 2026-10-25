import { useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import ReproductorMusica from '../components/ReproductorMusica'
import './Layout.css'

function Layout({ children }) {
  const [sidebarAbierta, setSidebarAbierta] = useState(false)

  return (
    <div className="layout">
      {/* Enlace accesible para lectores de pantalla y navegación por teclado */}
      <a href="#contenido-principal" className="skip-link">
        Saltar al contenido principal
      </a>

      {/* Barra superior visible únicamente en pantallas pequeñas/móviles */}
      <header className="layout__topbar-movil">
        <button
          type="button"
          className="layout__boton-hamburguesa"
          onClick={() => setSidebarAbierta(true)}
          aria-label="Abrir menú de navegación"
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

      {/* Overlay o fondo oscuro al abrir el menú en móvil */}
      {sidebarAbierta && (
        <div
          className="layout__overlay"
          onClick={() => setSidebarAbierta(false)}
          aria-hidden="true"
        />
      )}

      {/* Menú lateral compartido */}
      <Sidebar
        abierta={sidebarAbierta}
        alCerrar={() => setSidebarAbierta(false)}
      />

      {/* Contenedor del contenido principal */}
      <div className="layout__cuerpo">
        <main id="contenido-principal" className="layout__contenido">
          {children}
        </main>

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
      </div>

      {/* Reproductor de audio montado a nivel Layout para que no se reinicie al navegar */}
      <ReproductorMusica />
    </div>
  )
}

export default Layout
