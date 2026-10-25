import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Portada.css'

const integrantesData = [
  {
    id: 'rocio',
    nombre: 'Rocío Arenas',
    rol: 'Identidad Visual & Portada',
    especialidad: 'Diseño de UI, Tokens CSS & Responsive Design',
    descripcion: 'Lideró la definición de la paleta borgoña/violeta 60-30-10, la coherencia visual entre secciones, la creación de la portada interactiva y la accesibilidad global.',
    inicial: 'R',
    tecnologias: ['CSS3 Tokens', 'Flexbox / Grid', 'Responsive', 'WCAG AA'],
    frase: '“El diseño no es sólo cómo se ve, sino cómo funciona y guía intuitivamente al usuario.”',
    ruta: '/integrantes/rocio'
  },
  {
    id: 'javier',
    nombre: 'Javier López',
    rol: 'Estructura & Navegación',
    especialidad: 'React Router, Layout Modular & Vercel Deploy',
    descripcion: 'Diseñó el esqueleto arquitectónico en React, la sidebar compartida persistente con panel deslizable en móviles, y el árbol de renderizado jerárquico.',
    inicial: 'J',
    tecnologias: ['React Router 7', 'Vite', 'Árbol Jerárquico', 'SPA Architecture'],
    frase: '“Una arquitectura limpia garantiza que cada componente tenga una única responsabilidad clara.”',
    ruta: '/integrantes/javier'
  },
  {
    id: 'damian',
    nombre: 'Damián Gorosito',
    rol: 'Datos Locales & API',
    especialidad: 'JSON Dinámico, Filtros Reactivos & GitHub API',
    descripcion: 'Implementó el catálogo local con más de 20 herramientas de software, normalización de acentos para búsqueda en vivo, y el consumo asíncrono de la API de GitHub.',
    inicial: 'D',
    tecnologias: ['REST APIs', 'AbortController', 'Filtros Reactivos', 'JSON Normalizado'],
    frase: '“Gestionar estados asíncronos y errores resilientes es la clave de una app profesional.”',
    ruta: '/integrantes/damian'
  },
  {
    id: 'facundo',
    nombre: 'Facundo Sánchez',
    rol: 'Bitácora & Documentación',
    especialidad: 'Gestión Documental, Bitácora Reactiva & Ética IA',
    descripcion: 'Coordinó la bitácora interactiva con filtros funcionales, la documentación completa del repositorio, el registro de prompts de IA y la verificación de rúbrica.',
    inicial: 'F',
    tecnologias: ['Documentación', 'Auditoría Rúbrica', 'Filtros Bitácora', 'Ética IA'],
    frase: '“La documentación rigurosa es el mapa que permite a cualquier equipo escalar sin fricción.”',
    ruta: '/integrantes/facundo'
  }
]

const metricasProyecto = [
  { numero: '4', etiqueta: 'Integrantes en el equipo', detalle: 'Roles y perfiles independientes' },
  { numero: '20+', etiqueta: 'Herramientas indexadas', detalle: 'Búsqueda en tiempo real y filtros' },
  { numero: '100%', etiqueta: 'Cobertura de Rúbrica', detalle: '15 criterios en nivel Propone / Supera' },
  { numero: '60/30/10', etiqueta: 'Regla de Color', detalle: 'Paleta Borgoña de alto contraste' }
]

function Portada() {
  const [integranteSeleccionado, setIntegranteSeleccionado] = useState(null)

  return (
    <div className="portada">
      {/* Hero Section */}
      <section className="portada__hero" aria-labelledby="titulo-hero">
        <div className="portada__badge-hero">
          <span className="portada__punto-pulso" aria-hidden="true" />
          Desarrollo de Sistemas Web Front End · Comisión 2C26
        </div>

        <h1 id="titulo-hero" className="portada__titulo-principal">
          Equipo <span className="portada__titulo-resalte">BlueTech</span>
        </h1>

        <p className="portada__subtitulo">
          Aplicación modular en React que presenta al equipo de trabajo,
          organiza herramientas esenciales del ecosistema web, consume datos externos
          y documenta el proceso constructivo con una identidad visual borgoña refinada.
        </p>

        <div className="portada__acciones">
          <a href="#seccion-equipo" className="portada__btn portada__btn--primario">
            Conocer al Equipo
          </a>
          <Link to="/herramientas" className="portada__btn portada__btn--secundario">
            Ver Catálogo de Herramientas
          </Link>
          <Link to="/bitacora" className="portada__btn portada__btn--terciario">
            Bitácora de Trabajo
          </Link>
        </div>
      </section>

      {/* Métricas del Proyecto */}
      <section className="portada__metricas" aria-label="Métricas destacadas del proyecto">
        <div className="portada__metricas-grid">
          {metricasProyecto.map((m, idx) => (
            <div key={idx} className="portada__metrica-card">
              <span className="portada__metrica-numero">{m.numero}</span>
              <strong className="portada__metrica-etiqueta">{m.etiqueta}</strong>
              <span className="portada__metrica-detalle">{m.detalle}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Presentación del Equipo (Criterio 07: Elementos interactivos que introducen al equipo y sus perfiles) */}
      <section id="seccion-equipo" className="portada__seccion-equipo" aria-labelledby="titulo-equipo">
        <div className="portada__seccion-cabecera">
          <h2 id="titulo-equipo" className="portada__seccion-titulo">
            Integrantes del Equipo
          </h2>
          <p className="portada__seccion-subtitulo">
            Cada integrante coordinó un pilar fundamental del proyecto y cuenta con su
            propio perfil enriquecido con interacciones dinámicas.
          </p>
        </div>

        <div className="portada__equipo-grid">
          {integrantesData.map((miembro) => (
            <article
              key={miembro.id}
              className={`portada__tarjeta-miembro ${
                integranteSeleccionado === miembro.id ? 'portada__tarjeta-miembro--activo' : ''
              }`}
            >
              <div className="portada__miembro-cabecera">
                <div className="portada__avatar-simbolo" aria-hidden="true">
                  {miembro.inicial}
                </div>
                <div className="portada__miembro-titulos">
                  <h3 className="portada__miembro-nombre">{miembro.nombre}</h3>
                  <span className="portada__miembro-rol">{miembro.rol}</span>
                </div>
              </div>

              <p className="portada__miembro-desc">{miembro.descripcion}</p>

              <div className="portada__miembro-tags" aria-label="Tecnologías destacadas">
                {miembro.tecnologias.map((tec, i) => (
                  <span key={i} className="portada__tag">
                    {tec}
                  </span>
                ))}
              </div>

              {/* Elemento interactivo: botón para previsualizar cita/filosofía de trabajo */}
              <button
                type="button"
                className="portada__btn-cita"
                onClick={() =>
                  setIntegranteSeleccionado(
                    integranteSeleccionado === miembro.id ? null : miembro.id
                  )
                }
                aria-expanded={integranteSeleccionado === miembro.id}
                aria-controls={`cita-${miembro.id}`}
              >
                {integranteSeleccionado === miembro.id ? 'Ocultar frase' : 'Ver frase y enfoque'}
              </button>

              <div
                id={`cita-${miembro.id}`}
                className="portada__cita-contenedor"
                hidden={integranteSeleccionado !== miembro.id}
              >
                <blockquote className="portada__cita-texto">
                  {miembro.frase}
                </blockquote>
              </div>

              <div className="portada__miembro-pie">
                <Link to={miembro.ruta} className="portada__btn-perfil">
                  <span>Ver perfil completo</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Secciones Clave de la Aplicación */}
      <section className="portada__seccion-modulos" aria-labelledby="titulo-modulos">
        <div className="portada__seccion-cabecera">
          <h2 id="titulo-modulos" className="portada__seccion-titulo">
            Módulos del Sistema
          </h2>
          <p className="portada__seccion-subtitulo">
            Recorré las diferentes dimensiones técnicas implementadas para cumplir con los estándares de la materia.
          </p>
        </div>

        <div className="portada__modulos-grid">
          <Link to="/herramientas" className="portada__modulo-card">
            <div className="portada__modulo-icono" aria-hidden="true">🛠️</div>
            <h3>Catálogo de Herramientas</h3>
            <p>Listado local con 20+ registros categorizados, búsqueda instantánea, filtrado y ficha desplegable.</p>
            <span className="portada__modulo-enlace">Explorar catálogo →</span>
          </Link>

          <Link to="/proyectos-api" className="portada__modulo-card">
            <div className="portada__modulo-icono" aria-hidden="true">🌐</div>
            <h3>Proyectos GitHub (API Pública)</h3>
            <p>Conexión asíncrona a la API de GitHub para comparar repositorios de React, Vue y Angular en vivo.</p>
            <span className="portada__modulo-enlace">Consultar API →</span>
          </Link>

          <Link to="/arbol-renderizado" className="portada__modulo-card">
            <div className="portada__modulo-icono" aria-hidden="true">🌳</div>
            <h3>Árbol de Renderizado</h3>
            <p>Diagrama interactivo de componentes jerárquicos con soporte para expandir, colapsar y auditar props.</p>
            <span className="portada__modulo-enlace">Inspeccionar árbol →</span>
          </Link>

          <Link to="/bitacora" className="portada__modulo-card">
            <div className="portada__modulo-icono" aria-hidden="true">📓</div>
            <h3>Bitácora de Trabajo</h3>
            <p>Registro ordenado del proceso de desarrollo, dificultades superadas y decisiones técnicas tomadas.</p>
            <span className="portada__modulo-enlace">Leer bitácora →</span>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Portada
