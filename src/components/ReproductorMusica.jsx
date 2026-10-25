import { useEffect, useLayoutEffect, useRef, useState } from 'react'
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
  },
  {
    id: 'lluvia-suave',
    titulo: 'Lluvia suave',
    archivo: '/audio/lluvia-suave.wav'
  },
  {
    id: 'lofi-ambiental',
    titulo: 'Lofi ambiental',
    archivo: '/audio/lofi-ambiental.wav'
  }
]

function ReproductorMusica() {
  const audioRef = useRef(null)
  const [pistaId, setPistaId] = useState('lofi-ambiental')
  const [error, setError] = useState('')
  const [oculto, setOculto] = useState(true)
  const [reproduciendo, setReproduciendo] = useState(false)
  const reproducirAlCambiarRef = useRef(false)

  const pistaActual = pistas.find((pista) => pista.id === pistaId)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.play().catch(() => setReproduciendo(false))
  }, [])

  useLayoutEffect(() => {
    if (!reproducirAlCambiarRef.current) return

    const audio = audioRef.current
    reproducirAlCambiarRef.current = false
    if (!audio) return

    audio.play().catch(() => {
      setError('No se pudo iniciar la pista. Probá con el botón Reproducir.')
    })
  }, [pistaId])

  function cambiarPista(siguientePista) {
    const audio = audioRef.current
    if (!audio) return

    audio.pause()
    reproducirAlCambiarRef.current = true
    setReproduciendo(false)
    setPistaId(siguientePista.id)
    setError('')

    audio.play().catch(() => {
      setError('No se pudo iniciar la pista. Probá con el botón Reproducir.')
    })
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
        <div className="reproductor__compacto-info">
          <span className="reproductor__compacto-icono" aria-hidden="true">♫</span>
          <span className="reproductor__compacto-pista">
            <strong>Música</strong>
            <span>{pistaActual.titulo}</span>
          </span>
        </div>

        <button
          type="button"
          className="reproductor__boton-play"
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
          className="reproductor__boton-abrir"
        >
          <span aria-hidden="true">⌃</span>
          <span className="reproductor__solo-lector">Abrir controles</span>
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

        <span className="reproductor__etiqueta-pistas">Pistas</span>
        <div className="reproductor__lista-pistas" role="group" aria-label="Elegir pista">
          {pistas.map((pista) => (
            <button
              key={pista.id}
              type="button"
              className={pista.id === pistaId ? 'reproductor__pista-activa' : ''}
              aria-pressed={pista.id === pistaId}
              onClick={() => cambiarPista(pista)}
            >
              <span>{pista.titulo}</span>
              {pista.id === pistaId && <span aria-hidden="true">●</span>}
            </button>
          ))}
        </div>

        <p id="pista-actual">{pistaActual.titulo}</p>
      </div>

      {/* El audio permanece montado para que no se corte al ocultarlo. */}
      <audio
        ref={audioRef}
        src={pistaActual.archivo}
        controls
        hidden={oculto}
        loop
        preload="auto"
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

          <p>
            “Lluvia suave” y “Lofi ambiental” son loops originales generados para este proyecto.
          </p>
        </details>
      </div>
    </section>
  )
}

export default ReproductorMusica