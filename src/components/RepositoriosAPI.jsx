import { useEffect, useState } from 'react'
import './RepositoriosAPI.css'

const repositorios = [
  'facebook/react',
  'vuejs/core',
  'angular/angular'
]

function RepositoriosAPI() {
  const [datos, setDatos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [consulta, setConsulta] = useState(0)

  useEffect(() => {
    const controlador = new AbortController()

    async function cargarRepositorios() {
      setCargando(true)
      setError('')

      try {
        const resultados = await Promise.all(
          repositorios.map(async (repositorio) => {
            const respuesta = await fetch(
              `https://api.github.com/repos/${repositorio}`,
              { signal: controlador.signal }
            )

            if (!respuesta.ok) {
              if (
                respuesta.status === 403 ||
                respuesta.status === 429
              ) {
                throw new Error(
                  'GitHub limitó las consultas. Esperá un rato y reintentá.'
                )
              }

              throw new Error(
                'No se pudieron obtener los repositorios. Reintentá la consulta.'
              )
            }

            return respuesta.json()
          })
        )

        if (!controlador.signal.aborted) {
          setDatos(resultados)
        }
      } catch (problema) {
        if (!controlador.signal.aborted) {
          setError(
            problema instanceof TypeError
              ? 'No se pudo conectar con GitHub. Revisá tu conexión y reintentá.'
              : problema.message
          )
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false)
        }
      }
    }

    cargarRepositorios()

    return () => controlador.abort()
  }, [consulta])

  function actualizar() {
    setConsulta((valorActual) => valorActual + 1)
  }

  return (
    <section className="repositorios">
      <h2>Proyectos en GitHub</h2>

      <p>
        Esta sección consulta la API pública de GitHub y muestra
        la descripción, las estrellas y el lenguaje principal
        de los repositorios de React, Vue y Angular.
      </p>

      <div className="repositorios__controles">
        <button
          type="button"
          onClick={actualizar}
          disabled={cargando}
        >
          {cargando
            ? 'Consultando...'
            : error
              ? 'Reintentar'
              : 'Actualizar datos'}
        </button>
      </div>

      {cargando && (
        <p role="status">Cargando datos de GitHub...</p>
      )}

      {!cargando && error && (
        <p className="repositorios__vacio" role="alert">
          {error}
        </p>
      )}

      {!cargando && !error && (
        <div className="repositorios__lista">
          {datos.map((repositorio) => (
            <article
              className="repositorios__tarjeta"
              key={repositorio.id}
            >
              <h3>{repositorio.full_name}</h3>

              <p>
                {repositorio.description || 'Sin descripción disponible.'}
              </p>

              <p>
                Lenguaje principal: {repositorio.language || 'No informado'}
              </p>

              <p>
                Estrellas: {repositorio.stargazers_count.toLocaleString('es-AR')}
              </p>

              <a
                href={repositorio.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver repositorio en GitHub
              </a>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default RepositoriosAPI