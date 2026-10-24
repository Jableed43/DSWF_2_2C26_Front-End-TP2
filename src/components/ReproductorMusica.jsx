import { useRef, useState } from 'react'
import './ReproductorMusica.css'

const pistas = [
  {
    id: 'easy-lemon',
    titulo: 'Easy Lemon',
    archivo: '/audio/easy-lemon.mp3'
  },
  {
    id: 'local-forecast',
    titulo: 'Local Forecast',
    archivo: '/audio/local-forecast.mp3'
  },
  {
    id: 'local-forecast-elevator',
    titulo: 'Local Forecast - Elevator',
    archivo: '/audio/local-forecast-elevator.mp3'
  }
]

function ReproductorMusica() {
  const audioRef = useRef(null)
  const [pistaId, setPistaId] = useState(pistas[0].id)
  const [error, setError] = useState('')
  const [oculto, setOculto] = useState(false)
  const [reproduciendo, setReproduciendo] = useState(false)

  const pistaActual = pistas.find((pista) => pista.id === pistaId)

  function cambiarPista(evento) {
    audioRef.current?.pause()
    setReproduciendo(false)
    setPistaId(evento.target.value)
    setError('')
  }

  async function alternarReproduccion() {
    const audio = audioRef.current
    if (!audio) return

    if (!audio.paused) {
      audio.pause()
      return
    }

    try {
      setError('')
      await audio.play()
    } catch {
      setError('No se pudo reproducir la pista. Probá desde el panel.')
      setOculto(false)
    }
  }

  return (
    <section
      className={`reproductor ${oculto ? 'reproductor--oculto' : ''}`}
      aria-label="Música de fondo"
    >
      <div hidden={!oculto} className="reproductor__compacto">
        <button
          type="button"
          onClick={alternarReproduccion}
          aria-label={reproduciendo ? 'Pausar música' : 'Reproducir música'}
        >
          {reproduciendo ? 'Pausar' : 'Reproducir'}
        </button>

        <button
          type="button"
          onClick={() => setOculto(false)}
          aria-label="Abrir reproductor"
          aria-expanded={!oculto}
          aria-controls="panel-musica"
          title="Abrir reproductor"
        >
          +
        </button>
      </div>

      <div id="panel-musica" hidden={oculto}>
        <div className="reproductor__cabecera">
          <h2>Música de fondo</h2>

          <button
            type="button"
            onClick={() => setOculto(true)}
            aria-expanded={!oculto}
            aria-controls="panel-musica"
          >
            Ocultar
          </button>
        </div>

        <label htmlFor="seleccion-musica">Canción</label>

        <select
          id="seleccion-musica"
          value={pistaId}
          onChange={cambiarPista}
        >
          {pistas.map((pista) => (
            <option key={pista.id} value={pista.id}>
              {pista.titulo}
            </option>
          ))}
        </select>

        <p id="pista-actual">{pistaActual.titulo}</p>
      </div>

      {/* El audio permanece montado para que no se corte al ocultarlo. */}
      <audio
        ref={audioRef}
        src={pistaActual.archivo}
        controls
        hidden={oculto}
        loop
        preload="none"
        aria-label={`Reproductor: ${pistaActual.titulo}`}
        onPlay={() => {
          setReproduciendo(true)
          setError('')
        }}
        onPause={() => setReproduciendo(false)}
        onError={() => {
          setReproduciendo(false)
          setError('No se pudo cargar la canción. Revisá el archivo MP3.')
          setOculto(false)
        }}
      >
        Tu navegador no permite reproducir este audio.
      </audio>

      <div hidden={oculto}>
        {error && <p role="alert">{error}</p>}

        <details className="reproductor__creditos">
          <summary>Créditos de la música</summary>

          <p>
            “Easy Lemon”, “Local Forecast” y
            “Local Forecast - Elevator”, de{' '}
            <a
              href="https://incompetech.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kevin MacLeod — Incompetech
            </a>.
          </p>

          <p>
            Licencia:{' '}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Creative Commons Atribución 4.0
            </a>.
            {' '}Archivos sin modificaciones.
          </p>
        </details>
      </div>
    </section>
  )
}

export default ReproductorMusica