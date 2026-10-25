import { Routes, Route, Link } from 'react-router-dom'
import Layout from './layouts/Layout'
import Portada from './pages/Portada'
import ArbolRenderizado from './pages/ArbolRenderizado'
import Bitacora from './pages/Bitacora'
import CatalogoHerramientas from './components/CatalogoHerramientas'
import RepositoriosAPI from './components/RepositoriosAPI'
import PerfilIntegrante from './components/PerfilIntegrante'

import { perfilBase } from './data/perfilBase'
import { perfilDamian } from './data/perfilDamian'
import { perfilJavier } from './data/perfilJavier'
import { perfilFacundo } from './data/perfilFacundo'
import { perfilRocio } from './data/perfilRocio'

function RutaNoEncontrada() {
  return (
    <div style={{ textAlign: 'center', padding: '64px 20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--burgundy-950)', marginBottom: '12px' }}>
        404
      </h1>
      <h2 style={{ fontSize: '1.25rem', color: 'var(--burgundy-800)', marginBottom: '16px' }}>
        Página no encontrada
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.6 }}>
        La dirección solicitada no existe o fue movida. Podés regresar a la portada o explorar las secciones desde el menú lateral.
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          background: 'var(--burgundy-800)',
          color: '#ffffff',
          borderRadius: 'var(--radius-md)',
          fontWeight: 600,
          textDecoration: 'none'
        }}
      >
        ← Volver a la Portada
      </Link>
    </div>
  )
}

function App() {
  return (
    <Layout>
      <Routes>
        {/* Portada Principal del Equipo */}
        <Route path="/" element={<Portada />} />

        {/* Catálogo de Herramientas (JSON Local) */}
        <Route path="/herramientas" element={<CatalogoHerramientas />} />

        {/* Proyectos de GitHub (API Pública) */}
        <Route path="/proyectos-api" element={<RepositoriosAPI />} />

        {/* Perfiles de los Integrantes */}
        <Route
          path="/integrantes/rocio"
          element={<PerfilIntegrante perfil={perfilRocio} />}
        />
        <Route
          path="/integrantes/javier"
          element={<PerfilIntegrante perfil={perfilJavier} />}
        />
        <Route
          path="/integrantes/damian"
          element={<PerfilIntegrante perfil={perfilDamian} />}
        />
        <Route
          path="/integrantes/facundo"
          element={<PerfilIntegrante perfil={perfilFacundo} />}
        />

        {/* Molde / Perfil Base */}
        <Route
          path="/perfil-base"
          element={<PerfilIntegrante perfil={perfilBase} />}
        />

        {/* Árbol de Renderizado de Componentes (Criterio 13) */}
        <Route path="/arbol-renderizado" element={<ArbolRenderizado />} />

        {/* Bitácora de Trabajo y Registro de Decisiones (Criterio 14) */}
        <Route path="/bitacora" element={<Bitacora />} />

        {/* Ruta para prevenir pantallas sin salida (Criterio 06) */}
        <Route path="*" element={<RutaNoEncontrada />} />
      </Routes>
    </Layout>
  )
}

export default App
