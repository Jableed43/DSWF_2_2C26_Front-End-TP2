import { useState } from 'react'
import { bitacora } from '../data/bitacora'
import './BitacoraRegistros.css'

const etapas = ['Todos', 'TP1', 'TP2']

function BitacoraRegistros() {
  const [etapa, setEtapa] = useState('Todos')

  const registros = bitacora.filter(
    (registro) => etapa === 'Todos' || registro.etapa === etapa
  )

  return (
    <section className="bitacora">
      <h1>Bitácora del proyecto</h1>
      <p>
        Registramos qué hicimos, qué decidimos y qué dificultades resolvimos.
        Seguimos la bitácora del TP1 y le sumamos los registros de esta
        aplicación en React.
      </p>

      <div
        className="bitacora__filtros"
        role="group"
        aria-label="Filtrar registros por etapa"
      >
        {etapas.map((nombre) => (
          <button
            key={nombre}
            type="button"
            aria-pressed={etapa === nombre}
            onClick={() => setEtapa(nombre)}
          >
            {nombre}
          </button>
        ))}
      </div>

      <p className="bitacora__contador" role="status">
        Mostrando {registros.length} de {bitacora.length} registros.
      </p>

      <div className="bitacora__lista">
        {registros.map((registro) => (
          <details className="bitacora__registro" key={registro.id}>
            <summary>
              <span className="bitacora__etapa">{registro.etapa}</span>
              <span className="bitacora__titulo">{registro.titulo}</span>
              <span className="bitacora__fecha">{registro.fecha}</span>
            </summary>

            <div className="bitacora__detalle">
              <h3>¿Qué hicimos?</h3>
              <p>{registro.queHicimos}</p>

              <h3>Decisiones tomadas</h3>
              <ul>
                {registro.decisiones.map((decision) => (
                  <li key={decision}>{decision}</li>
                ))}
              </ul>

              <h3>Dificultades</h3>
              <p>{registro.dificultades}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}

export default BitacoraRegistros
