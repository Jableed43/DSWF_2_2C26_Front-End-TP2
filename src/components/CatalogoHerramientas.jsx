import { useState } from 'react'
import herramientas from '../data/herramientas.json'
import './CatalogoHerramientas.css'

const categorias = [
  ...new Set(herramientas.map((herramienta) => herramienta.categoria))
]

function normalizar(texto) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function CatalogoHerramientas() {
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('')

  const resultados = herramientas.filter((herramienta) => {
    const texto = normalizar(
      `${herramienta.nombre} ${herramienta.descripcion}`
    )

    const coincideTexto = texto.includes(normalizar(busqueda))
    const coincideCategoria =
      categoria === '' || herramienta.categoria === categoria

    return coincideTexto && coincideCategoria
  })

  function restablecer() {
    setBusqueda('')
    setCategoria('')
  }

  return (
    <section className="catalogo">
      <h2>Herramientas de desarrollo web</h2>
      <p>Buscá por nombre o descripción y filtrá por categoría.</p>

      <div className="catalogo__controles">
        <div className="catalogo__campo">
          <label htmlFor="busqueda-herramientas">
            Buscar herramienta
          </label>

          <input
            id="busqueda-herramientas"
            type="search"
            placeholder="Por ejemplo: React"
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
          />
        </div>

        <div className="catalogo__campo">
          <label htmlFor="categoria-herramientas">
            Categoría
          </label>

          <select
            id="categoria-herramientas"
            value={categoria}
            onChange={(evento) => setCategoria(evento.target.value)}
          >
            <option value="">Todas las categorías</option>

            {categorias.map((nombreCategoria) => (
              <option key={nombreCategoria} value={nombreCategoria}>
                {nombreCategoria}
              </option>
            ))}
          </select>
        </div>

        <button type="button" onClick={restablecer}>
          Restablecer
        </button>
      </div>

      <p className="catalogo__contador" role="status">
        Mostrando {resultados.length} de {herramientas.length} herramientas.
      </p>

      {resultados.length === 0 ? (
        <p className="catalogo__vacio">
          No se encontraron herramientas con esa búsqueda y categoría.
          Probá cambiar los filtros o presioná Restablecer.
        </p>
      ) : (
        <div className="catalogo__lista">
          {resultados.map((herramienta) => (
            <article
              className="catalogo__tarjeta"
              key={herramienta.id}
            >
              <h3>{herramienta.nombre}</h3>
              <p className="catalogo__categoria">
                {herramienta.categoria}
              </p>

              <details>
                <summary>Ver descripción</summary>
                <p>{herramienta.descripcion}</p>
              </details>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default CatalogoHerramientas