import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import ReproductorMusica from '../components/ReproductorMusica'
import './Layout.css'

function Layout() {
  const [abierta, setAbierta] = useState(false)

  useEffect(() => {
    if (!abierta) return

    function cerrarConEscape(evento) {
      if (evento.key === 'Escape') setAbierta(false)
    }

    document.addEventListener('keydown', cerrarConEscape)
    return () => document.removeEventListener('keydown', cerrarConEscape)
  }, [abierta])

  return (
    <div className="layout">
      <a className="layout__saltar" href="#contenido">
        Saltar al contenido
      </a>

      <header className="layout__barra-movil">
        <button
          type="button"
          aria-expanded={abierta}
          aria-controls="sidebar"
          onClick={() => setAbierta((valor) => !valor)}
        >
          {abierta ? 'Cerrar menú' : 'Menú'}
        </button>
        <span>BlueTech</span>
      </header>

      <Sidebar abierta={abierta} onNavegar={() => setAbierta(false)} />

      {abierta && (
        <div
          className="layout__fondo"
          onClick={() => setAbierta(false)}
          aria-hidden="true"
        />
      )}

      <main id="contenido" className="layout__contenido">
        <Outlet />
      </main>

      <ReproductorMusica />
    </div>
  )
}

export default Layout
