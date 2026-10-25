import { useState } from 'react'
import './Bitacora.css'

const registrosBitacora = [
  {
    id: 1,
    etapa: 'TP1',
    fecha: 'Septiembre 2026',
    autor: 'Equipo',
    titulo: 'Fundaciones del Proyecto y Maquetado Semántico Inicial',
    criterios: ['TP1', 'Identidad Inicial'],
    resumen: 'Definición de roles en el equipo y estructuración HTML/CSS sin frameworks.',
    hizo: 'Estructuramos las primeras fichas personales y la presentación general de la comisión, probando esquemas de color y enlaces relativos.',
    decidio: 'Decidimos utilizar una estructura semántica rigurosa (header, main, section, article, footer) para asegurar accesibilidad nativa desde el día uno.',
    dificultad: 'Surgieron inconsistencias en cómo cada integrante formateaba sus datos; se resolvió creando una plantilla base compartida.'
  },
  {
    id: 2,
    etapa: 'TP2 - Arquitectura',
    fecha: '18 de Octubre 2026',
    autor: 'Javier López',
    titulo: 'Inicialización de Vite, React 19 y Configuración de Vercel',
    criterios: ['Criterio 01', 'Criterio 04', 'Criterio 06'],
    resumen: 'Creación del repositorio público, configuración de Vite y solución al error 404 al recargar.',
    hizo: 'Se inicializó el proyecto con Vite y React Router, configurando ramas individuales para cada integrante y la publicación continua en Vercel.',
    decidio: 'Se decidió utilizar React Router 7 con un Layout compartido y crear el archivo vercel.json con reglas de rewrite para que cualquier URL profunda cargue sin error al refrescar la página (Criterio 06).',
    dificultad: 'Al recargar rutas como /integrantes/damian en Vercel, el servidor devolvía 404. Se solucionó agregando la directiva "rewrites": [{"source": "/(.*)", "destination": "/index.html"}] en vercel.json.'
  },
  {
    id: 3,
    etapa: 'TP2 - Diseño & UI',
    fecha: '20 de Octubre 2026',
    autor: 'Rocío Arenas',
    titulo: 'Sistema de Diseño Borgoña / Violeta y Regla 60-30-10',
    criterios: ['Criterio 07', 'Criterio 09'],
    resumen: 'Definición de variables CSS personalizadas, contraste WCAG y portada interactiva.',
    hizo: 'Se diseñaron los tokens de diseño en theme.css: 60% fondos limpios (#fbf8fa / #ffffff), 30% estructura borgoña/vino (#4d1848 / #2d0d2a), y 10% acentos magenta y bermellón (#c2185b). Se construyó la Portada del equipo con tarjetas dinámicas.',
    decidio: 'Reemplazar valores hexadecimales duros por custom properties CSS universales para garantizar coherencia visual entre portada, catálogo, perfiles y modales.',
    dificultad: 'Lograr contraste suficiente en botones sobre fondos borgoña. Se auditó con el analizador de contraste WCAG logrando ratio superior a 4.5:1 (Nivel AA/AAA).'
  },
  {
    id: 4,
    etapa: 'TP2 - Componentes',
    fecha: '21 de Octubre 2026',
    autor: 'Javier López',
    titulo: 'Diseño del Molde Reutilizable PerfilIntegrante con Props',
    criterios: ['Criterio 04', 'Criterio 08'],
    resumen: 'Componente molde que recibe objetos de datos por props para todos los perfiles.',
    hizo: 'Se programó PerfilIntegrante.jsx integrando avatar girable en 3D (foto/avatar), carrusel accesible de películas (YouTube) y música (Spotify), y fichas de videojuegos con acordeón.',
    decidio: 'Separar estrictamente la lógica visual de los datos: cada integrante tiene su archivo perfilNombre.js en src/data/ y se inyecta como prop al mismo componente.',
    dificultad: 'Los carruseles independientes compartían posición de slide. Se solucionó encapsulando el hook useState dentro del subcomponente Carrusel con su propio useId.'
  },
  {
    id: 5,
    etapa: 'TP2 - Datos & API',
    fecha: '22 de Octubre 2026',
    autor: 'Damián Gorosito',
    titulo: 'Catálogo de 20 Herramientas y Consumo de GitHub REST API',
    criterios: ['Criterio 10', 'Criterio 11', 'Criterio 12'],
    resumen: 'JSON local con búsqueda tolerante a acentos y conexión a la API pública de GitHub.',
    hizo: 'Se creó herramientas.json con 20 registros clasificados (Frontend, Backend, Bases de datos, Desarrollo), búsqueda en tiempo real, filtro por categoría, y la sección de repositorios GitHub.',
    decidio: 'Implementar normalización con .normalize("NFD").replace(/[\\u0300-\\u036f]/g, "") para que "react" encuentre "React" y "búsqueda" no falle por tildes. En la API se usó AbortController para evitar memory leaks.',
    dificultad: 'GitHub API aplica límites de tasa (403 rate limit) si se ejecutan múltiples peticiones simultáneas. Se capturó específicamente el status 403 y se ofreció un mensaje claro con botón de reintento.'
  },
  {
    id: 6,
    etapa: 'TP2 - Integración Final',
    fecha: '24 de Octubre 2026',
    autor: 'Facundo Sánchez',
    titulo: 'Bitácora Reactiva, Documentación del Repositorio y Auditoría de IA',
    criterios: ['Criterio 02', 'Criterio 03', 'Criterio 14', 'Criterio 15'],
    resumen: 'Consolidación de la bitácora con filtros funcionales, README completo y matriz de IA.',
    hizo: 'Se construyó la pantalla de Bitácora con filtros reactivos por autor y etapa, se redactó el README con índice interno y tabla de uso de IA de los 4 integrantes.',
    decidio: 'Hacer que cada registro sea un componente desplegable interactivo para cumplir con el nivel Propone de los criterios 14 y 15 sin saturar la pantalla.',
    dificultad: 'Organizar la enorme cantidad de tareas y decisiones del equipo. Se resolvió creando un esquema estructurado de datos (Hizo, Decidió, Dificultad, Criterios).'
  }
]

const autores = ['Todos', 'Equipo', 'Rocío Arenas', 'Javier López', 'Damián Gorosito', 'Facundo Sánchez']
const etapas = ['Todas', 'TP1', 'TP2 - Arquitectura', 'TP2 - Diseño & UI', 'TP2 - Componentes', 'TP2 - Datos & API', 'TP2 - Integración Final']

function Bitacora() {
  const [filtroAutor, setFiltroAutor] = useState('Todos')
  const [filtroEtapa, setFiltroEtapa] = useState('Todas')
  const [abiertos, setAbiertos] = useState(() => new Set([1, 2, 3, 4, 5, 6]))

  const registrosFiltrados = registrosBitacora.filter((reg) => {
    const coincideAutor = filtroAutor === 'Todos' || reg.autor === filtroAutor
    const coincideEtapa = filtroEtapa === 'Todas' || reg.etapa === filtroEtapa
    return coincideAutor && coincideEtapa
  })

  function alternarRegistro(id) {
    setAbiertos((prev) => {
      const nuevo = new Set(prev)
      if (nuevo.has(id)) {
        nuevo.delete(id)
      } else {
        nuevo.add(id)
      }
      return nuevo
    })
  }

  function expandirTodos() {
    setAbiertos(new Set(registrosBitacora.map((r) => r.id)))
  }

  function colapsarTodos() {
    setAbiertos(new Set())
  }

  function restablecerFiltros() {
    setFiltroAutor('Todos')
    setFiltroEtapa('Todas')
  }

  return (
    <div className="bitacora-pagina">
      <header className="bitacora-pagina__cabecera">
        <div className="bitacora-pagina__insignia">Criterio 14 · Nivel Propone</div>
        <h1 className="bitacora-pagina__titulo">Bitácora de Trabajo y Registro de Decisiones</h1>
        <p className="bitacora-pagina__subtitulo">
          Memoria viva del proceso técnico del equipo BlueTech, integrando la trayectoria
          desde el TP1 hasta la culminación del proyecto React en el TP2.
        </p>
      </header>

      {/* Controles de Filtrado */}
      <section className="bitacora__filtros-seccion" aria-label="Filtros de la bitácora">
        <div className="bitacora__filtros-grid">
          <div className="bitacora__filtro-campo">
            <label htmlFor="filtro-autor">Filtrar por Responsable</label>
            <select
              id="filtro-autor"
              value={filtroAutor}
              onChange={(e) => setFiltroAutor(e.target.value)}
            >
              {autores.map((autor) => (
                <option key={autor} value={autor}>
                  {autor}
                </option>
              ))}
            </select>
          </div>

          <div className="bitacora__filtro-campo">
            <label htmlFor="filtro-etapa">Filtrar por Etapa o Sprint</label>
            <select
              id="filtro-etapa"
              value={filtroEtapa}
              onChange={(e) => setFiltroEtapa(e.target.value)}
            >
              {etapas.map((etapa) => (
                <option key={etapa} value={etapa}>
                  {etapa}
                </option>
              ))}
            </select>
          </div>

          <div className="bitacora__filtros-botones">
            <button
              type="button"
              className="bitacora__btn-secundario"
              onClick={restablecerFiltros}
            >
              Restablecer
            </button>
            <button
              type="button"
              className="bitacora__btn-secundario"
              onClick={expandirTodos}
            >
              Expandir todos
            </button>
            <button
              type="button"
              className="bitacora__btn-secundario"
              onClick={colapsarTodos}
            >
              Contraer todos
            </button>
          </div>
        </div>

        <p className="bitacora__contador" role="status">
          Mostrando {registrosFiltrados.length} de {registrosBitacora.length} registros del proceso.
        </p>
      </section>

      {/* Listado de Entradas Desplegables */}
      <section className="bitacora__lista-entradas" aria-label="Entradas de la bitácora">
        {registrosFiltrados.length === 0 ? (
          <div className="bitacora__vacio">
            <p>No hay registros que coincidan con los filtros seleccionados.</p>
            <button
              type="button"
              className="bitacora__btn-primario"
              onClick={restablecerFiltros}
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          registrosFiltrados.map((registro) => {
            const estaAbierto = abiertos.has(registro.id)
            return (
              <article
                key={registro.id}
                className={`bitacora__entrada ${
                  estaAbierto ? 'bitacora__entrada--abierta' : ''
                }`}
              >
                <div
                  className="bitacora__entrada-cabecera"
                  onClick={() => alternarRegistro(registro.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      alternarRegistro(registro.id)
                    }
                  }}
                  aria-expanded={estaAbierto}
                  aria-controls={`contenido-registro-${registro.id}`}
                >
                  <div className="bitacora__meta-tags">
                    <span className="bitacora__tag-etapa">{registro.etapa}</span>
                    <span className="bitacora__tag-autor">{registro.autor}</span>
                    <span className="bitacora__tag-fecha">{registro.fecha}</span>
                  </div>

                  <h2 className="bitacora__entrada-titulo">{registro.titulo}</h2>
                  <p className="bitacora__entrada-resumen">{registro.resumen}</p>

                  <div className="bitacora__entrada-criterios">
                    {registro.criterios.map((crit, idx) => (
                      <span key={idx} className="bitacora__criterio-pill">
                        {crit}
                      </span>
                    ))}
                    <span className="bitacora__indicador-despliegue" aria-hidden="true">
                      {estaAbierto ? 'Ocultar detalles ▲' : 'Ver detalles ▼'}
                    </span>
                  </div>
                </div>

                {estaAbierto && (
                  <div
                    id={`contenido-registro-${registro.id}`}
                    className="bitacora__entrada-cuerpo"
                  >
                    <div className="bitacora__detalle-bloque">
                      <h3 className="bitacora__detalle-subtitulo">
                        <span aria-hidden="true">🔨</span> ¿Qué hicimos?
                      </h3>
                      <p>{registro.hizo}</p>
                    </div>

                    <div className="bitacora__detalle-bloque">
                      <h3 className="bitacora__detalle-subtitulo">
                        <span aria-hidden="true">💡</span> ¿Qué decidimos y por qué?
                      </h3>
                      <p>{registro.decidio}</p>
                    </div>

                    <div className="bitacora__detalle-bloque bitacora__detalle-bloque--dificultad">
                      <h3 className="bitacora__detalle-subtitulo">
                        <span aria-hidden="true">⚠️</span> Dificultad y solución técnica
                      </h3>
                      <p>{registro.dificultad}</p>
                    </div>
                  </div>
                )}
              </article>
            )
          })
        )}
      </section>
    </div>
  )
}

export default Bitacora
