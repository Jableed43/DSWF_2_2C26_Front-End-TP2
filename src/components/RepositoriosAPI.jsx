import { useEffect, useState } from 'react'
import './CatalogoHerramientas.css'

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
              if (respuesta.status === 403 || respuesta.status === 429) {
                throw new Error(
                  'GitHub limitó las consultas temporalmente (Rate Limit). Esperá unos minutos y presioná Reintentar.'
                )
              }

              throw new Error(
                `No se pudo obtener información de ${repositorio}. Reintentá la consulta.`
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
              ? 'No se pudo conectar con la API de GitHub. Verificá tu conexión a internet.'
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
    <section className="catalogo" aria-labelledby="titulo-api-github">
      <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '9999px', background: 'var(--burgundy-50)', border: '1px solid var(--brand-border)', color: 'var(--burgundy-800)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px' }}>
        Criterio 12 · Nivel Propone
      </div>

      <h2 id="titulo-api-github">Proyectos Oficiales en GitHub (API Pública)</h2>

      <p>
        Esta sección consume en vivo los endpoints públicos de la <strong>GitHub REST API</strong> sin requerir
        claves privadas. Compara en tiempo real la popularidad (estrellas), el lenguaje de desarrollo
        y las descripciones de los tres frameworks/librerías líderes en el desarrollo frontend: React, Vue y Angular.
      </p>

      <div className="catalogo__controles">
        <button
          type="button"
          onClick={actualizar}
          disabled={cargando}
        >
          {cargando
            ? 'Consultando API...'
            : error
              ? 'Reintentar consulta'
              : 'Actualizar estadísticas'}
        </button>
      </div>

      {cargando && (
        <div className="catalogo__vacio" role="status">
          <p>⏳ Consultando datos actualizados de GitHub en tiempo real...</p>
        </div>
      )}

      {!cargando && error && (
        <div className="catalogo__vacio" role="alert" style={{ borderColor: 'var(--color-error)', backgroundColor: 'var(--color-error-bg)' }}>
          <p style={{ color: 'var(--color-error)', fontWeight: 600 }}>{error}</p>
          <div style={{ marginTop: '14px' }}>
            <button type="button" onClick={actualizar}>
              Reintentar ahora
            </button>
          </div>
        </div>
      )}

      {!cargando && !error && (
        <div className="catalogo__lista">
          {datos.map((repositorio) => (
            <article
              className="catalogo__tarjeta"
              key={repositorio.id}
            >
              <h3>{repositorio.name}</h3>
              <span className="catalogo__categoria">
                {repositorio.full_name}
              </span>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '14px', flex: 1, lineHeight: 1.5 }}>
                {repositorio.description || 'Sin descripción disponible.'}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: 'var(--burgundy-900)', borderTop: '1px solid var(--brand-border)', paddingTop: '12px', marginTop: 'auto' }}>
                <p>
                  <strong>Lenguaje principal:</strong> {repositorio.language || 'No informado'}
                </p>
                <p>
                  <strong>⭐ Estrellas:</strong> {repositorio.stargazers_count.toLocaleString('es-AR')}
                </p>
                <p>
                  <strong>🍴 Forks:</strong> {repositorio.forks_count.toLocaleString('es-AR')}
                </p>
              </div>

              <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid var(--brand-border)' }}>
                <a
                  href={repositorio.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.85rem', fontWeight: 700 }}
                >
                  Ver repositorio oficial en GitHub →
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default RepositoriosAPI
