import { Link } from 'react-router-dom'

function NoEncontrada() {
  return (
    <>
      <h1>Página no encontrada</h1>
      <p>
        Esa dirección no existe. <Link to="/">Volver al inicio</Link>
      </p>
    </>
  )
}

export default NoEncontrada
