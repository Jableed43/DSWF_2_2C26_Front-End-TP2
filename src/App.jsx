import { Route, Routes } from 'react-router-dom'
import PerfilIntegrante from './components/PerfilIntegrante'
import { perfilDamian } from './data/perfilDamian'
import { perfilFacundo } from './data/perfilFacundo'
import { perfilJavier } from './data/perfilJavier'
import { perfilRocio } from './data/perfilRocio'
import Layout from './layouts/Layout'
import ApiGithub from './pages/ApiGithub'
import ArbolRenderizado from './pages/ArbolRenderizado'
import Bitacora from './pages/Bitacora'
import Herramientas from './pages/Herramientas'
import NoEncontrada from './pages/NoEncontrada'
import Portada from './pages/Portada'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Portada />} />
        <Route path="herramientas" element={<Herramientas />} />
        <Route path="proyectos-api" element={<ApiGithub />} />
        <Route path="integrantes/rocio" element={<PerfilIntegrante perfil={perfilRocio} />} />
        <Route path="integrantes/javier" element={<PerfilIntegrante perfil={perfilJavier} />} />
        <Route path="integrantes/damian" element={<PerfilIntegrante perfil={perfilDamian} />} />
        <Route path="integrantes/facundo" element={<PerfilIntegrante perfil={perfilFacundo} />} />
        <Route path="arbol-renderizado" element={<ArbolRenderizado />} />
        <Route path="bitacora" element={<Bitacora />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  )
}

export default App
