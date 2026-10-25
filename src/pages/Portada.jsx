import { useState } from 'react'
import { Link } from 'react-router-dom'
import herramientas from '../data/herramientas.json'
import { bitacora } from '../data/bitacora'
import './Portada.css'

const integrantes = [
  {
    id: 'javier',
    nombre: 'Javier López',
    rol: 'Estructura y navegación',
    avatar: '/img/javier/avatar.png',
    descripcion:
      'Armó la base del proyecto en React, la sidebar compartida y la navegación entre secciones.',
    aporte:
      'Proyecto con Vite y React Router, sidebar con panel para el celular, publicación en Vercel y árbol de renderizado.',
    tags: ['React Router', 'Sidebar', 'Vercel'],
    ruta: '/integrantes/javier'
  },
  {
    id: 'rocio',
    nombre: 'Rocío Arenas',
    rol: 'Identidad visual y portada',
    avatar: '/img/rocio/avatar.png',
    descripcion:
      'Diseñó la portada del equipo y trabaja la identidad visual de la aplicación.',
    aporte:
      'Portada con presentación del equipo, tarjetas de integrantes y accesos a cada sección.',
    tags: ['Portada', 'Diseño', 'CSS'],
    ruta: '/integrantes/rocio'
  },
  {
    id: 'damian',
    nombre: 'Damián Gorosito',
    rol: 'Datos y API',
    avatar: '/img/damian/avatar.png',
    descripcion:
      'Armó el catálogo de herramientas y la consulta a la API pública de GitHub.',
    aporte:
      'Catálogo con 20 herramientas, búsqueda y filtro, consulta a GitHub con estados de carga y error, y el componente de perfil.',
    tags: ['JSON', 'Búsqueda y filtro', 'API de GitHub'],
    ruta: '/integrantes/damian'
  },
  {
    id: 'facundo',
    nombre: 'Facundo Sánchez',
    rol: 'Bitácora y documentación',
    avatar: '/img/facundo/avatar.jpg',
    descripcion:
      'Se ocupa de la bitácora, del README y de reunir la declaración de uso de IA.',
    aporte:
      'Bitácora del proceso, README del repositorio y declaración de uso de IA del equipo.',
    tags: ['Bitácora', 'README', 'Declaración de IA'],
    ruta: '/integrantes/facundo'
  }
]

const metricas = [
  {
    numero: String(integrantes.length),
    etiqueta: 'Integrantes',
    detalle: 'Cada uno con su perfil'
  },
  {
    numero: String(herramientas.length),
    etiqueta: 'Herramientas',
    detalle: 'Con búsqueda y filtro'
  },
  {
    numero: '3',
    etiqueta: 'Repositorios',
    detalle: 'Consultados a la API de GitHub'
  },
  {
    numero: String(bitacora.length),
    etiqueta: 'Registros',
    detalle: 'En la bitácora del proceso'
  }
]

const modulos = [
  {
    ruta: '/herramientas',
    icono: '🛠️',
    titulo: 'Herramientas',
    texto:
      'Catálogo local con 20 registros, búsqueda por texto, filtro por categoría y ficha desplegable.',
    enlace: 'Explorar el catálogo →'
  },
  {
    ruta: '/api',
    icono: '🌐',
    titulo: 'API de GitHub',
    texto:
      'Consulta a una API pública para ver datos de los repositorios de React, Vue y Angular.',
    enlace: 'Consultar la API →'
  },
  {
    ruta: '/arbol',
    icono: '🌳',
    titulo: 'Árbol de renderizado',
    texto:
      'Los componentes de la aplicación, de la raíz a las tarjetas, que se pueden expandir y contraer.',
    enlace: 'Ver el árbol →'
  },
  {
    ruta: '/bitacora',
    icono: '📓',
    titulo: 'Bitácora',
    texto:
      'Qué hicimos, qué decidimos y qué dificultades resolvimos, desde el TP1 hasta hoy.',
    enlace: 'Leer la bitácora →'
  }
]

function Portada() {
  const [abierto, setAbierto] = useState(null)

  return (
    <div className="portada">
      <section className="portada__hero" aria-labelledby="titulo-hero">
        <div className="portada__badge-hero">
          <span className="portada__punto-pulso" aria-hidden="true" />
          Desarrollo de Sistemas Web Front End · Comisión 2C26
        </div>

        <h1 id="titulo-hero" className="portada__titulo-principal">
          Somos <span className="portada__titulo-resalte">BlueTech</span>
        </h1>

        <p className="portada__subtitulo">
          Un equipo de cuatro personas que continúa en React el sitio del TP1.
          Acá cada uno se presenta, mostramos un catálogo de herramientas, una
          consulta a una API pública y contamos cómo fuimos armando todo.
        </p>

        <div className="portada__acciones">
          <a href="#seccion-equipo" className="portada__btn portada__btn--primario">
            Conocer al equipo
          </a>
          <Link to="/herramientas" className="portada__btn portada__btn--secundario">
            Ver las herramientas
          </Link>
          <Link to="/bitacora" className="portada__btn portada__btn--terciario">
            Leer la bitácora
          </Link>
        </div>
      </section>

      <section className="portada__metricas" aria-label="El proyecto en números">
        <div className="portada__metricas-grid">
          {metricas.map((metrica) => (
            <div key={metrica.etiqueta} className="portada__metrica-card">
              <span className="portada__metrica-numero">{metrica.numero}</span>
              <strong className="portada__metrica-etiqueta">{metrica.etiqueta}</strong>
              <span className="portada__metrica-detalle">{metrica.detalle}</span>
            </div>
          ))}
        </div>
      </section>

      <section
        id="seccion-equipo"
        className="portada__seccion-equipo"
        aria-labelledby="titulo-equipo"
      >
        <div className="portada__seccion-cabecera">
          <h2 id="titulo-equipo" className="portada__seccion-titulo">
            El equipo
          </h2>
          <p className="portada__seccion-subtitulo">
            Cada integrante se ocupó de una parte del proyecto y tiene su propio perfil.
          </p>
        </div>

        <div className="portada__equipo-grid">
          {integrantes.map((miembro) => (
            <article
              key={miembro.id}
              className={`portada__tarjeta-miembro ${
                abierto === miembro.id ? 'portada__tarjeta-miembro--activo' : ''
              }`}
            >
              <div className="portada__miembro-cabecera">
                <img
                  className="portada__avatar"
                  src={miembro.avatar}
                  alt=""
                  width="56"
                  height="56"
                  loading="lazy"
                />
                <div className="portada__miembro-titulos">
                  <h3 className="portada__miembro-nombre">{miembro.nombre}</h3>
                  <span className="portada__miembro-rol">{miembro.rol}</span>
                </div>
              </div>

              <p className="portada__miembro-desc">{miembro.descripcion}</p>

              <div className="portada__miembro-tags" aria-label="Temas">
                {miembro.tags.map((tag) => (
                  <span key={tag} className="portada__tag">
                    {tag}
                  </span>
                ))}
              </div>

              <button
                type="button"
                className="portada__btn-cita"
                onClick={() => setAbierto(abierto === miembro.id ? null : miembro.id)}
                aria-expanded={abierto === miembro.id}
                aria-controls={`aporte-${miembro.id}`}
              >
                {abierto === miembro.id ? 'Ocultar aporte' : 'Ver qué aportó'}
              </button>

              <div
                id={`aporte-${miembro.id}`}
                className="portada__cita-contenedor"
                hidden={abierto !== miembro.id}
              >
                <p className="portada__cita-texto">{miembro.aporte}</p>
              </div>

              <div className="portada__miembro-pie">
                <Link to={miembro.ruta} className="portada__btn-perfil">
                  <span>Ver perfil completo</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="portada__seccion-modulos" aria-labelledby="titulo-modulos">
        <div className="portada__seccion-cabecera">
          <h2 id="titulo-modulos" className="portada__seccion-titulo">
            Qué hay en el sitio
          </h2>
          <p className="portada__seccion-subtitulo">
            Todas las secciones se recorren desde la sidebar o desde acá.
          </p>
        </div>

        <div className="portada__modulos-grid">
          {modulos.map((modulo) => (
            <Link key={modulo.ruta} to={modulo.ruta} className="portada__modulo-card">
              <div className="portada__modulo-icono" aria-hidden="true">
                {modulo.icono}
              </div>
              <h3>{modulo.titulo}</h3>
              <p>{modulo.texto}</p>
              <span className="portada__modulo-enlace">{modulo.enlace}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Portada
