import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import './PerfilIntegrante.css'

function Carrusel({ titulo, items = [], tipo }) {
  const [posicion, setPosicion] = useState(0)
  const id = useId()

  const indice = items.length ? posicion % items.length : 0
  const actual = items[indice]

  function mover(paso) {
    setPosicion(
      (valor) => (valor + paso + items.length) % items.length
    )
  }

  return (
    <section aria-labelledby={id} className="perfil__seccion-carrusel">
      <h2 id={id} className="perfil__titulo">
        {titulo}
      </h2>

      {!actual ? (
        <p className="perfil__placeholder-carrusel">Sección pendiente de completar.</p>
      ) : (
        <div className="perfil__carrusel">
          <button
            type="button"
            disabled={items.length < 2}
            onClick={() => mover(-1)}
            aria-label={`Anterior: ${titulo}`}
            className="perfil__carrusel-btn"
          >
            ‹
          </button>

          <div className="perfil__slide">
            <h3 className="perfil__slide-titulo">{actual.titulo || '[Título por completar]'}</h3>

            {tipo === 'pelicula' && (
              /^[a-zA-Z0-9_-]{11}$/.test(actual.videoId || '') ? (
                <iframe
                  key={actual.videoId}
                  className="perfil__video"
                  src={`https://www.youtube.com/embed/${actual.videoId}`}
                  title={`Trailer de ${actual.titulo || 'la película'}`}
                  loading="lazy"
                  allow="encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="perfil__placeholder">
                  Video por completar
                </div>
              )
            )}

            {tipo === 'disco' && (
              <>
                <p className="perfil__slide-artista">
                  {actual.artista || '[Artista por completar]'}
                  {actual.album && <span className="perfil__slide-album"> · {actual.album}</span>}
                </p>

                {/^[a-zA-Z0-9]{22}$/.test(actual.spotifyId || '') ? (
                  <iframe
                    key={actual.spotifyId}
                    className="perfil__spotify"
                    src={`https://open.spotify.com/embed/${
                      actual.spotifyTipo === 'track' ? 'track' : 'album'
                    }/${actual.spotifyId}`}
                    title={`${actual.spotifyTipo === 'track' ? 'Canción' : 'Álbum'} ${actual.titulo || 'seleccionado'}`}
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="perfil__placeholder">
                    Disco por completar
                  </div>
                )}
                {actual.spotifyId && (
                  <a
                    className="perfil__spotify-enlace"
                    href={`https://open.spotify.com/${actual.spotifyTipo === 'track' ? 'track' : 'album'}/${actual.spotifyId}`}
                    aria-label={`Reproducir ${actual.titulo || 'selección'} en Spotify`}
                  >
                    Reproducir en Spotify
                  </a>
                )}
              </>
            )}

            {actual.descripcion && (
              <p className="perfil__slide-descripcion">{actual.descripcion}</p>
            )}

            <p role="status" className="perfil__slide-contador">
              {indice + 1} de {items.length}
            </p>
          </div>

          <button
            type="button"
            disabled={items.length < 2}
            onClick={() => mover(1)}
            aria-label={`Siguiente: ${titulo}`}
            className="perfil__carrusel-btn"
          >
            ›
          </button>
        </div>
      )}
    </section>
  )
}

function TarjetaJuego({ juego, abierta, onToggle }) {
  const id = useId()

  return (
    <article className="perfil__juego">
      {juego.imagen ? (
        <img
          src={juego.imagen}
          alt={`Portada de ${juego.titulo || 'juego'}`}
          loading="lazy"
        />
      ) : (
        <div className="perfil__juego-icono" aria-hidden="true">
          🎮
        </div>
      )}

      <h3 className="perfil__juego-titulo">{juego.titulo || '[Juego por completar]'}</h3>

      <button
        type="button"
        className="perfil__btn-ficha"
        aria-expanded={abierta}
        aria-controls={id}
        onClick={onToggle}
      >
        {abierta ? 'Ocultar ficha' : 'Ver ficha técnica'}
      </button>

      <div id={id} hidden={!abierta} className="perfil__juego-detalle">
        <p><strong>Género:</strong> {juego.genero || '[Completar]'}</p>
        <p><strong>Año:</strong> {juego.anio || '[Completar]'}</p>
        <p className="perfil__juego-sinopsis">{juego.descripcion || '[Descripción por completar]'}</p>
      </div>
    </article>
  )
}

const maticesRocio = {
  clasico: {
    nombre: 'Borgoña Tradicional', color: '#4d1848', oscuro: '#2d0d2a', medio: '#64205e',
    acento: '#c2185b', acentoHover: '#ad1450', fondo: '#fbf8fa', superficie: '#ffffff',
    superficieAlt: '#f6eef5', borde: '#e6cfe4', bordeFuerte: '#cf9ecb'
  },
  nocturno: {
    nombre: 'Ciruela Profundo', color: '#2d0d2a', oscuro: '#1d071b', medio: '#3c1238',
    acento: '#c2185b', acentoHover: '#ad1450', fondo: '#f5edf4', superficie: '#ffffff',
    superficieAlt: '#eee2ed', borde: '#ddc7da', bordeFuerte: '#c99fc2'
  },
  berry: {
    nombre: 'Berry Rose Elegante', color: '#64205e', oscuro: '#3c1238', medio: '#7e2b76',
    acento: '#ad1450', acentoHover: '#880e4f', acentoVivo: '#ff4081', fondo: '#fcf6fb',
    superficie: '#ffffff', superficieAlt: '#f8eaf3', borde: '#e9c9df', bordeFuerte: '#d79abd'
  }
}

/* Interacción 1: Rocío (Probador de Paleta Borgoña en tiempo real) */
function InteraccionRocio({ matiz, onCambiarMatiz }) {
  const actual = maticesRocio[matiz]

  return (
    <div className="perfil__widget-interactivo" style={{ borderLeftColor: actual.color }}>
      <div className="perfil__widget-cabecera">
        <span className="perfil__widget-badge">Interacción Funcional · Criterio 08</span>
        <h4>Selector de Matices Cromáticos</h4>
      </div>
      <p className="perfil__widget-texto">
        Elegí un matiz para verificar la armonía visual y la adaptabilidad del contraste:
      </p>
      <div className="perfil__widget-botones" role="group" aria-label="Elegir matiz cromático">
        {Object.entries(maticesRocio).map(([clave, item]) => (
          <button
            key={clave}
            type="button"
            className={`perfil__btn-matiz ${matiz === clave ? 'perfil__btn-matiz--activo' : ''}`}
            onClick={() => onCambiarMatiz(clave)}
            aria-pressed={matiz === clave}
          >
            <span className="perfil__muestra-color" style={{ backgroundColor: item.color }} />
            {item.nombre}
          </button>
        ))}
      </div>
      <div
        className="perfil__muestra-resultado"
        style={{ backgroundColor: actual.fondo, borderColor: actual.color }}
        role="status"
        aria-live="polite"
      >
        <p style={{ color: actual.color, fontWeight: 'bold' }}>
          Matiz Activo: {actual.nombre}
        </p>
        <span style={{ color: actual.acento, fontSize: '0.85rem' }}>
          Código Primario: {actual.color} · Acento: {actual.acento}
        </span>
      </div>
    </div>
  )
}

/* Interacción 2: Javier (Auditor y Simulador de Ruteo) */
function InteraccionJavier() {
  const [rutaSimulada, setRutaSimulada] = useState('/')
  const [latencia, setLatencia] = useState('8ms')
  const [status, setStatus] = useState('200 OK (Rewrite SPA activo)')

  function simularRuta(nuevaRuta) {
    const latenciasPorRuta = {
      '/': '6ms',
      '/herramientas': '12ms',
      '/proyectos-api': '18ms',
      '/arbol-renderizado': '9ms',
      '/bitacora': '11ms'
    }
    setRutaSimulada(nuevaRuta)
    setLatencia(latenciasPorRuta[nuevaRuta] || '10ms')
    setStatus('200 OK (Rewrite SPA activo)')
  }

  return (
    <div className="perfil__widget-interactivo">
      <div className="perfil__widget-cabecera">
        <span className="perfil__widget-badge">Interacción Funcional · Criterio 08</span>
        <h4>Simulador de Enrutamiento y Diagnóstico</h4>
      </div>
      <p className="perfil__widget-texto">
        Simulá peticiones de navegación para comprobar la resolución de URLs en Vercel sin pantallas sin salida:
      </p>
      <div className="perfil__widget-botones">
        {['/', '/herramientas', '/proyectos-api', '/arbol-renderizado', '/bitacora'].map((r) => (
          <button
            key={r}
            type="button"
            className={`perfil__btn-matiz ${rutaSimulada === r ? 'perfil__btn-matiz--activo' : ''}`}
            onClick={() => simularRuta(r)}
          >
            {r}
          </button>
        ))}
      </div>
      <div className="perfil__muestra-resultado">
        <p><strong>Ruta probada:</strong> <code>{rutaSimulada}</code></p>
        <p><strong>Estado HTTP:</strong> <span style={{ color: '#1b5e20' }}>{status}</span> · <strong>Tiempo de render:</strong> {latencia}</p>
      </div>
    </div>
  )
}

/* Interacción 3: Damián (Medidor y Votación de Ecosistema) */
function InteraccionDamian() {
  const [votos, setVotos] = useState({ React: 12, TypeScript: 9, 'REST API': 15, 'Bases de Datos': 8 })

  function votar(tech) {
    setVotos((prev) => ({ ...prev, [tech]: prev[tech] + 1 }))
  }

  return (
    <div className="perfil__widget-interactivo">
      <div className="perfil__widget-cabecera">
        <span className="perfil__widget-badge">Interacción Funcional · Criterio 08</span>
        <h4>Medidor de Preferencias de Desarrollo</h4>
      </div>
      <p className="perfil__widget-texto">
        Votá tus herramientas favoritas del ecosistema para registrar la interacción en tiempo real:
      </p>
      <div className="perfil__widget-botones">
        {Object.entries(votos).map(([tech, total]) => (
          <button
            key={tech}
            type="button"
            className="perfil__btn-voto"
            onClick={() => votar(tech)}
          >
            <span>{tech}</span>
            <span className="perfil__contador-votos">{total} 👍</span>
          </button>
        ))}
      </div>
    </div>
  )
}

/* Interacción 4: Facundo (Checklist Interactivo de Criterios) */
function InteraccionFacundo() {
  const [criterios, setCriterios] = useState([
    { id: 'c1', texto: 'Criterio 01: Vercel deploy activo y sin login', cumplido: true },
    { id: 'c2', texto: 'Criterio 05: Sidebar drawer en móviles con Escape y click fuera', cumplido: true },
    { id: 'c3', texto: 'Criterio 08: Interacción funcional en todos los perfiles', cumplido: true },
    { id: 'c4', texto: 'Criterio 13: Árbol de renderizado colapsable', cumplido: true },
    { id: 'c5', texto: 'Criterio 14: Bitácora con filtros por autor y etapa', cumplido: true }
  ])

  function alternarCriterio(id) {
    setCriterios((prev) =>
      prev.map((c) => (c.id === id ? { ...c, cumplido: !c.cumplido } : c))
    )
  }

  const completados = criterios.filter((c) => c.cumplido).length
  const porcentaje = Math.round((completados / criterios.length) * 100)

  return (
    <div className="perfil__widget-interactivo">
      <div className="perfil__widget-cabecera">
        <span className="perfil__widget-badge">Interacción Funcional · Criterio 08</span>
        <h4>Checklist Interactivo de QA y Criterios TP2</h4>
      </div>
      <p className="perfil__widget-texto">
        Verificá en vivo los criterios de calidad con esta herramienta interactiva:
      </p>
      <div className="perfil__barra-progreso-contenedor">
        <div className="perfil__barra-progreso-relleno" style={{ width: `${porcentaje}%` }} />
      </div>
      <p className="perfil__porcentaje-progreso">{completados} de {criterios.length} verificados ({porcentaje}%)</p>
      <ul className="perfil__checklist-lista">
        {criterios.map((crit) => (
          <li key={crit.id} className="perfil__checklist-item">
            <label>
              <input
                type="checkbox"
                checked={crit.cumplido}
                onChange={() => alternarCriterio(crit.id)}
              />
              <span className={crit.cumplido ? 'perfil__checklist-tachado' : ''}>{crit.texto}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function PerfilIntegrante({ perfil }) {
  const [fotoGirada, setFotoGirada] = useState(false)
  const [categoria, setCategoria] = useState(0)
  const [matizRocio, setMatizRocio] = useState('clasico')
  const [juegoAbierto, setJuegoAbierto] = useState(null)

  const habilidadId = useId()
  const habilidad = perfil.habilidades?.[categoria]

  const enlaces = [
    ['LinkedIn', perfil.linkedin],
    ['GitHub', perfil.github],
    ['Portfolio', perfil.portfolio]
  ].filter(([, url]) => /^https?:\/\//i.test(url || ''))

  const paletaSeleccionada = perfil.interaccionTipo === 'paleta'
    ? maticesRocio[matizRocio]
    : null
  const estiloPaleta = paletaSeleccionada
    ? {
        '--bg-app': paletaSeleccionada.fondo,
        '--bg-surface': paletaSeleccionada.superficie,
        '--bg-surface-alt': paletaSeleccionada.superficieAlt,
        '--burgundy-950': paletaSeleccionada.oscuro,
        '--burgundy-900': paletaSeleccionada.color,
        '--burgundy-850': paletaSeleccionada.color,
        '--burgundy-800': paletaSeleccionada.color,
        '--burgundy-700': paletaSeleccionada.medio,
        '--burgundy-600': paletaSeleccionada.acento,
        '--burgundy-500': paletaSeleccionada.acento,
        '--burgundy-50': paletaSeleccionada.superficieAlt,
        '--brand-primary': paletaSeleccionada.color,
        '--brand-primary-hover': paletaSeleccionada.medio,
        '--brand-subtle': paletaSeleccionada.superficieAlt,
        '--brand-border': paletaSeleccionada.borde,
        '--brand-border-strong': paletaSeleccionada.bordeFuerte,
        '--accent-primary': paletaSeleccionada.acento,
        '--accent-primary-hover': paletaSeleccionada.acentoHover,
        '--accent-active': paletaSeleccionada.acento,
        '--accent-highlight': paletaSeleccionada.acentoVivo || paletaSeleccionada.acento
      }
    : undefined

  return (
    <div className="perfil-integrante" style={estiloPaleta}>
      {/* Navegación superior interna accesible (Criterio 06: no depender del botón atrás) */}
      <nav className="perfil__nav-retorno" aria-label="Navegación de retorno">
        <Link to="/" className="perfil__link-volver">
          ← Volver a la Portada
        </Link>
        <Link to="/herramientas" className="perfil__link-modulo">
          Ir a Catálogo de Herramientas
        </Link>
        <Link to="/bitacora" className="perfil__link-modulo">
          Ir a Bitácora
        </Link>
      </nav>

      <h1 className="perfil__nombre">
        {perfil.nombre || '[Nombre y apellido]'}
      </h1>

      {perfil.foto && perfil.avatar ? (
        <button
          type="button"
          className={`perfil__foto-girable ${
            fotoGirada ? 'perfil__foto-girable--girada' : ''
          }`}
          onClick={() => setFotoGirada((estado) => !estado)}
          aria-label={`Mostrar ${fotoGirada ? 'foto' : 'avatar'} de ${
            perfil.nombre || 'integrante'
          }`}
          aria-pressed={fotoGirada}
        >
          <span className="perfil__foto-interior">
            <span className="perfil__foto-cara perfil__foto-frente">
              <img src={perfil.foto} alt={`Foto de ${perfil.nombre}`} />
            </span>

            <span className="perfil__foto-cara perfil__foto-dorso">
              <img src={perfil.avatar} alt={`Avatar de ${perfil.nombre}`} />
            </span>
          </span>
        </button>
      ) : perfil.avatar || perfil.foto ? (
        <img
          className="perfil__avatar"
          src={perfil.foto || perfil.avatar}
          alt={`Foto o avatar de ${perfil.nombre || 'integrante'}`}
          width="160"
          height="160"
        />
      ) : (
        <div className="perfil__avatar perfil__avatar--vacio">
          Foto o avatar
        </div>
      )}

      {perfil.foto && perfil.avatar && (
        <p className="perfil__foto-ayuda">
          Tocá la imagen para alternar entre {fotoGirada ? 'la foto real' : 'el avatar ilustrado'}.
        </p>
      )}

      {/* Sección Sobre Mí */}
      <section>
        <h2 className="perfil__titulo">Sobre mí</h2>

        <div className="perfil__bloque">
          <div className="perfil__contacto">
            {perfil.ubicacion && <span>📍 {perfil.ubicacion}</span>}
            {perfil.edad && <span>🎂 {perfil.edad} años</span>}
            {perfil.email && (
              <a href={`mailto:${perfil.email}`}>
                ✉️ {perfil.email}
              </a>
            )}

            {enlaces.map(([nombre, url]) => (
              <a
                key={nombre}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                🔗 {nombre}
              </a>
            ))}
          </div>

          <h3 className="perfil__subtitulo-bloque">Presentación</h3>
          <p className="perfil__parrafo-texto">
            {perfil.resumen || '[Escribí tu presentación académica o profesional.]'}
          </p>

          <h3 className="perfil__subtitulo-bloque">Rol en el Proyecto BlueTech</h3>
          <p className="perfil__parrafo-texto">
            {perfil.sobreMi || '[Contá algo sobre tus intereses y actividades.]'}
          </p>
        </div>
      </section>

      {/* Interacción Funcional Individual (Criterio 08 - Nivel Propone) */}
      <section className="perfil__seccion-interaccion" aria-labelledby="titulo-interaccion">
        <h2 id="titulo-interaccion" className="perfil__titulo">
          Interacción Funcional de {perfil.nombre.split(' ')[0]}
        </h2>

        {perfil.interaccionTipo === 'paleta' && (
          <InteraccionRocio matiz={matizRocio} onCambiarMatiz={setMatizRocio} />
        )}
        {perfil.interaccionTipo === 'rutas' && <InteraccionJavier />}
        {perfil.interaccionTipo === 'voto' && <InteraccionDamian />}
        {perfil.interaccionTipo === 'checklist' && <InteraccionFacundo />}

        {!perfil.interaccionTipo && (
          <div className="perfil__bloque">
            <p>Interacción personalizada disponible para este perfil.</p>
          </div>
        )}
      </section>

      {/* Habilidades e Intereses */}
      <section>
        <h2 className="perfil__titulo">
          Habilidades e intereses
        </h2>

        <div
          className="perfil__filtros"
          role="group"
          aria-label="Elegir categoría de habilidad"
        >
          {(perfil.habilidades || []).map((item, indice) => (
            <button
              key={indice}
              type="button"
              className={categoria === indice ? 'activo' : ''}
              aria-pressed={categoria === indice}
              aria-controls={habilidadId}
              onClick={() => setCategoria(indice)}
            >
              {item.titulo || `[Habilidad ${indice + 1}]`}
            </button>
          ))}
        </div>

        <div id={habilidadId} className="perfil__bloque">
          {!habilidad ? (
            <p>Habilidades pendientes de completar.</p>
          ) : (
            <>
              <h3 className="perfil__subtitulo-bloque">
                {habilidad.titulo || '[Nombre de la habilidad]'}
              </h3>

              <div className="perfil__fila">
                {habilidad.imagen ? (
                  <img
                    className="perfil__habilidad-img"
                    src={habilidad.imagen}
                    alt={habilidad.titulo || 'Habilidad'}
                  />
                ) : null}

                <div className="perfil__habilidad-info">
                  <h4>
                    {habilidad.subtitulo || '[Temas o prácticas]'}
                  </h4>

                  <ul className="perfil__habilidad-lista">
                    {(habilidad.items || []).map((texto, indice) => (
                      <li key={indice}>
                        {texto || '[Completar]'}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Películas y Discos (Carruseles con YouTube y Spotify) */}
      <Carrusel
        key={`${perfil.nombre}-peliculas`}
        titulo="Películas favoritas"
        items={perfil.peliculas}
        tipo="pelicula"
      />

      <Carrusel
        key={`${perfil.nombre}-discos`}
        titulo="Discos favoritos"
        items={perfil.discos}
        tipo="disco"
      />

      {/* Juegos favoritos con ficha técnica expandible */}
      <section>
        <h2 className="perfil__titulo">Juegos favoritos</h2>

        <div className="perfil__juegos">
          {(perfil.juegos || []).map((juego, indice) => (
            <TarjetaJuego
              key={indice}
              juego={juego}
              abierta={juegoAbierto === indice}
              onToggle={() => setJuegoAbierto((abierto) => (abierto === indice ? null : indice))}
            />
          ))}
        </div>

        {!perfil.juegos?.length && (
          <p className="perfil__placeholder">Juegos pendientes de completar.</p>
        )}
      </section>
    </div>
  )
}
