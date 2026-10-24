import { Routes, Route } from 'react-router-dom'
import BarraSuperior from './components/BarraSuperior'
import CatalogoHerramientas from './components/CatalogoHerramientas'
import RepositoriosAPI from './components/RepositoriosAPI'
import ReproductorMusica from './components/ReproductorMusica'
import PerfilIntegrante from './components/PerfilIntegrante'

import { perfilBase } from './data/perfilBase'
import { perfilDamian } from './data/perfilDamian'
import { perfilJavier } from './data/perfilJavier'
import { perfilFacundo } from './data/perfilFacundo'
import { perfilRocio } from './data/perfilRocio'

function App() {
  return (
    <>
      <BarraSuperior />
      <ReproductorMusica />

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <h1>BlueTech</h1>
              <CatalogoHerramientas />
              <RepositoriosAPI />
            </main>
          }
        />

        <Route
          path="/perfil-base"
          element={<PerfilIntegrante perfil={perfilBase} />}
        />

        <Route
          path="/integrantes/damian"
          element={<PerfilIntegrante perfil={perfilDamian} />}
        />

        <Route
          path="/integrantes/javier"
          element={<PerfilIntegrante perfil={perfilJavier} />}
        />

        <Route
          path="/integrantes/facundo"
          element={<PerfilIntegrante perfil={perfilFacundo} />}
        />

        <Route
          path="/integrantes/rocio"
          element={<PerfilIntegrante perfil={perfilRocio} />}
        />
      </Routes>
    </>
  )
}

export default App