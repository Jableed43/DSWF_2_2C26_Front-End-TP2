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
    <section aria-labelledby={id}>
      <h2 id={id} className="perfil__titulo">
        {titulo}
      </h2>

      {!actual ? (
        <p>Sección pendiente de completar.</p>
      ) : (
        <div className="perfil__carrusel">
          <button
            type="button"
            disabled={items.length < 2}
            onClick={() => mover(-1)}
            aria-label={`Anterior: ${titulo}`}
          >
            ‹
          </button>

          <div className="perfil__slide">
            <h3>{actual.titulo || '[Título por completar]'}</h3>

            {tipo === 'pelicula' && (
              /^[a-zA-Z0-9_-]{11}$/.test(actual.videoId || '') ? (
                <iframe
                  key={actual.videoId}
                  className="perfil__video"
                  src={`https://www.youtube.com/embed/${actual.videoId}`}
                  title={`Video de ${actual.titulo || 'la película'}`}
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
                {actual.artista && <p>{actual.artista}</p>}

                {/^[a-zA-Z0-9]{22}$/.test(actual.spotifyId || '') ? (
                  <iframe
                    key={actual.spotifyId}
                    className="perfil__spotify"
                    src={`https://open.spotify.com/embed/${
                      actual.spotifyTipo === 'track' ? 'track' : 'album'
                    }/${actual.spotifyId}`}
                    title={`Disco ${actual.titulo || 'seleccionado'}`}
                    loading="lazy"
                    allow="encrypted-media; fullscreen; picture-in-picture"
                  />
                ) : (
                  <div className="perfil__placeholder">
                    Disco por completar
                  </div>
                )}
              </>
            )}

            {actual.descripcion && <p>{actual.descripcion}</p>}

            <p role="status">
              {indice + 1} de {items.length}
            </p>
          </div>

          <button
            type="button"
            disabled={items.length < 2}
            onClick={() => mover(1)}
            aria-label={`Siguiente: ${titulo}`}
          >
            ›
          </button>
        </div>
      )}
    </section>
  )
}

function TarjetaJuego({ juego }) {
  const [abierta, setAbierta] = useState(false)
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
        <div className="perfil__placeholder">
          Portada por completar
        </div>
      )}

      <h3>{juego.titulo || '[Juego por completar]'}</h3>

      <button
        type="button"
        aria-expanded={abierta}
        aria-controls={id}
        onClick={() => setAbierta((valor) => !valor)}
      >
        {abierta ? 'Ocultar ficha' : 'Ver ficha'}
      </button>

      <div id={id} hidden={!abierta}>
        <p>Género: {juego.genero || '[Completar]'}</p>
        <p>Año: {juego.anio || '[Completar]'}</p>
        {juego.descripcion && <p>{juego.descripcion}</p>}
      </div>
    </article>
  )
}

export default function PerfilIntegrante({ perfil }) {
  const [fotoGirada, setFotoGirada] = useState(false)
  const [categoria, setCategoria] = useState(0)

  const habilidadId = useId()
  const habilidad = perfil.habilidades?.[categoria]

  const enlaces = [
    ['LinkedIn', perfil.linkedin],
    ['GitHub', perfil.github],
    ['Portfolio', perfil.portfolio]
  ].filter(([, url]) => /^https?:\/\//i.test(url || ''))

  return (
    <div className="perfil-integrante">
      <Link to="/">Volver al inicio</Link>

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
          aria-label={`Mostrar avatar en lugar de la foto de ${
            perfil.nombre || 'integrante'
          }`}
          aria-pressed={fotoGirada}
        >
          <span className="perfil__foto-interior">
            <span className="perfil__foto-cara perfil__foto-frente">
              <img src={perfil.foto} alt="" />
            </span>

            <span className="perfil__foto-cara perfil__foto-dorso">
              <img src={perfil.avatar} alt="" />
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
          Tocá la imagen para ver {fotoGirada ? 'mi foto' : 'mi avatar'}.
        </p>
      )}

      <section>
        <h2 className="perfil__titulo">Sobre mí</h2>

        <div className="perfil__bloque">
          <div className="perfil__contacto">
            <span>{perfil.ubicacion || '[Ubicación]'}</span>

            {perfil.edad && <span>{perfil.edad} años</span>}

            {perfil.email && (
              <a href={`mailto:${perfil.email}`}>
                {perfil.email}
              </a>
            )}

            {enlaces.map(([nombre, url]) => (
              <a
                key={nombre}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {nombre}
              </a>
            ))}
          </div>

          <h3>Presentación</h3>

          <p>
            {perfil.resumen ||
              '[Escribí tu presentación académica o profesional.]'}
          </p>

          <p>
            {perfil.sobreMi ||
              '[Contá algo sobre tus intereses y actividades.]'}
          </p>
        </div>
      </section>

      <section>
        <h2 className="perfil__titulo">
          Habilidades e intereses
        </h2>

        <div
          className="perfil__filtros"
          role="group"
          aria-label="Elegir habilidad"
        >
          {(perfil.habilidades || []).map((item, indice) => (
            <button
              key={indice}
              type="button"
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
              <h3>
                {habilidad.titulo || '[Nombre de la habilidad]'}
              </h3>

              <div className="perfil__fila">
                {habilidad.imagen ? (
                  <img
                    className="perfil__habilidad-img"
                    src={habilidad.imagen}
                    alt={habilidad.titulo || 'Habilidad'}
                  />
                ) : (
                  <div className="perfil__placeholder">
                    Imagen opcional
                  </div>
                )}

                <div>
                  <h4>
                    {habilidad.subtitulo || '[Temas o prácticas]'}
                  </h4>

                  <ul>
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

      <section>
        <h2 className="perfil__titulo">Juegos favoritos</h2>

        <div className="perfil__juegos">
          {(perfil.juegos || []).map((juego, indice) => (
            <TarjetaJuego key={indice} juego={juego} />
          ))}
        </div>

        {!perfil.juegos?.length && (
          <p>Juegos pendientes de completar.</p>
        )}
      </section>
    </div>
  )
}