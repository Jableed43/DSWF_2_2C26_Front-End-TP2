import { Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Portada from './pages/Portada'
import Herramientas from './pages/Herramientas'
import ApiGithub from './pages/ApiGithub'
import Arbol from './pages/Arbol'
import Bitacora from './pages/Bitacora'
import NoEncontrada from './pages/NoEncontrada'
import PerfilIntegrante from './components/PerfilIntegrante'

import { perfilDamian } from './data/perfilDamian'
import { perfilJavier } from './data/perfilJavier'
import { perfilFacundo } from './data/perfilFacundo'
import { perfilRocio } from './data/perfilRocio'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Portada />} />
        <Route path="/herramientas" element={<Herramientas />} />
        <Route path="/api" element={<ApiGithub />} />
        <Route path="/arbol" element={<Arbol />} />
        <Route path="/bitacora" element={<Bitacora />} />

        <Route
          path="/integrantes/javier"
          element={<PerfilIntegrante perfil={perfilJavier} />}
        />
        <Route
          path="/integrantes/rocio"
          element={<PerfilIntegrante perfil={perfilRocio} />}
        />
        <Route
          path="/integrantes/facundo"
          element={<PerfilIntegrante perfil={perfilFacundo} />}
        />
        <Route
          path="/integrantes/damian"
          element={<PerfilIntegrante perfil={perfilDamian} />}
        />

        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  )
}

export default App
