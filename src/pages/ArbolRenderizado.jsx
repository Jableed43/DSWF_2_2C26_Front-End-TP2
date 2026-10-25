import { useState } from 'react'
import './ArbolRenderizado.css'

const arbolComponentes = {
  id: 'app',
  nombre: 'App',
  archivo: 'src/App.jsx',
  tipo: 'Raíz / Enrutador',
  descripcion: 'Componente raíz que define el BrowserRouter, el Layout persistente y el mapeo de todas las rutas mediante React Router.',
  props: 'Ninguna (raíz)',
  hooks: 'Ninguno',
  hijos: [
    {
      id: 'layout',
      nombre: 'Layout',
      archivo: 'src/layouts/Layout.jsx',
      tipo: 'Estructura / Shell',
      descripcion: 'Envoltura compartida de la aplicación. Gestiona el estado de apertura del panel móvil, accesibilidad (skip-link), backdrop y footer.',
      props: 'children: ReactNode',
      hooks: 'useState (sidebarAbierta)',
      hijos: [
        {
          id: 'sidebar',
          nombre: 'Sidebar',
          archivo: 'src/components/Sidebar.jsx',
          tipo: 'Navegación Compartida',
          descripcion: 'Menú lateral fijo en desktop y panel deslizable (drawer) en móvil. Identifica la sección activa y la marca BlueTech.',
          props: 'abierta: boolean, alCerrar: function',
          hooks: 'useLocation, useEffect (auto-cierre y escape key)'
        },
        {
          id: 'reproductor',
          nombre: 'ReproductorMusica',
          archivo: 'src/components/ReproductorMusica.jsx',
          tipo: 'Widget Multimedia',
          descripcion: 'Reproductor flotante persistente con selección de pistas, soporte de loop, créditos de licencia Creative Commons y estados min/max.',
          props: 'Ninguna',
          hooks: 'useRef (audioRef), useState (pistaId, oculto, reproduciendo, error)'
        },
        {
          id: 'routes',
          nombre: 'Routes (React Router)',
          archivo: 'src/App.jsx',
          tipo: 'Enrutador Interno',
          descripcion: 'Mapea las URL a sus respectivas vistas y previene pantallas sin salida.',
          props: 'Routes y Route components',
          hooks: 'Enrutamiento declarativo',
          hijos: [
            {
              id: 'portada',
              nombre: 'Portada',
              archivo: 'src/pages/Portada.jsx',
              tipo: 'Página',
              descripcion: 'Pantalla principal de presentación de BlueTech con hero, métricas, tarjetas interactivas de integrantes con frases dinámicas y accesos a módulos.',
              props: 'Ninguna',
              hooks: 'useState (integranteSeleccionado)'
            },
            {
              id: 'catalogo',
              nombre: 'CatalogoHerramientas',
              archivo: 'src/components/CatalogoHerramientas.jsx',
              tipo: 'Página / Catálogo',
              descripcion: 'Listado dinámico de 20 herramientas desde JSON local, búsqueda insensible a mayúsculas/acentos, filtro por categoría y botón de restablecer.',
              props: 'Ninguna (consume herramientas.json)',
              hooks: 'useState (busqueda, categoria)'
            },
            {
              id: 'api',
              nombre: 'RepositoriosAPI',
              archivo: 'src/components/RepositoriosAPI.jsx',
              tipo: 'Página / Conexión Externa',
              descripcion: 'Muestra estadísticas en tiempo real de repositorios oficiales (React, Vue, Angular) desde GitHub REST API con AbortController, carga y error.',
              props: 'Ninguna',
              hooks: 'useState (datos, cargando, error, consulta), useEffect'
            },
            {
              id: 'perfil',
              nombre: 'PerfilIntegrante',
              archivo: 'src/components/PerfilIntegrante.jsx',
              tipo: 'Página Molde Reutilizable',
              descripcion: 'Componente reutilizable que recibe los datos por props para renderizar a Rocío, Javier, Damián o Facundo con foto/avatar 3D y su interacción.',
              props: 'perfil: Object (nombre, avatar, foto, habilidades, peliculas, discos, juegos, interaccion)',
              hooks: 'useState (fotoGirada, categoria, interaccionPropia), useId',
              hijos: [
                {
                  id: 'carrusel',
                  nombre: 'Carrusel',
                  archivo: 'src/components/PerfilIntegrante.jsx',
                  tipo: 'Subcomponente UI',
                  descripcion: 'Carrusel accesible con botones anterior/siguiente, contador de posición y embeds de YouTube / Spotify.',
                  props: 'titulo: string, items: Array, tipo: "pelicula" | "disco"',
                  hooks: 'useState (posicion), useId'
                },
                {
                  id: 'tarjeta-juego',
                  nombre: 'TarjetaJuego',
                  archivo: 'src/components/PerfilIntegrante.jsx',
                  tipo: 'Subcomponente UI',
                  descripcion: 'Ficha interactiva desplegable de videojuegos con imagen de portada, detalles técnicos y sinopsis.',
                  props: 'juego: Object',
                  hooks: 'useState (abierta), useId'
                }
              ]
            },
            {
              id: 'arbol-nodo',
              nombre: 'ArbolRenderizado',
              archivo: 'src/pages/ArbolRenderizado.jsx',
              tipo: 'Página / Auditoría',
              descripcion: 'Visualización de la arquitectura real de componentes, soporte para expandir/colapsar ramas y auditoría de responsabilidades.',
              props: 'Ninguna',
              hooks: 'useState (nodosExpandidos, filtroTipo)'
            },
            {
              id: 'bitacora',
              nombre: 'Bitacora',
              archivo: 'src/pages/Bitacora.jsx',
              tipo: 'Página / Historial',
              descripcion: 'Registro de hitos del proyecto TP1 y TP2, filtros funcionales por autor y etapa, y detalles desplegables de problemas resueltos.',
              props: 'Ninguna',
              hooks: 'useState (filtroAutor, filtroEtapa)'
            }
          ]
        }
      ]
    }
  ]
}

function NodoArbol({ nodo, nivel = 0, expandidos, alAlternar }) {
  const tieneHijos = Boolean(nodo.hijos && nodo.hijos.length > 0)
  const estaExpandido = expandidos.has(nodo.id)

  return (
    <li className={`arbol__item arbol__item--nivel-${nivel}`}>
      <div className="arbol__tarjeta-nodo">
        <div className="arbol__nodo-cabecera">
          {tieneHijos ? (
            <button
              type="button"
              className="arbol__btn-toggle"
              onClick={() => alAlternar(nodo.id)}
              aria-label={estaExpandido ? `Colapsar ${nodo.nombre}` : `Expandir ${nodo.nombre}`}
              aria-expanded={estaExpandido}
            >
              {estaExpandido ? '−' : '+'}
            </button>
          ) : (
            <span className="arbol__punto-hoja" aria-hidden="true">•</span>
          )}

          <div className="arbol__nodo-identificacion">
            <code className="arbol__nodo-tag">&lt;{nodo.nombre}&gt;</code>
            <span className="arbol__nodo-tipo">{nodo.tipo}</span>
          </div>

          <span className="arbol__nodo-archivo">{nodo.archivo}</span>
        </div>

        <p className="arbol__nodo-desc">{nodo.descripcion}</p>

        <div className="arbol__nodo-metadata">
          <div className="arbol__meta-item">
            <strong>Props:</strong> <code>{nodo.props}</code>
          </div>
          <div className="arbol__meta-item">
            <strong>Hooks:</strong> <code>{nodo.hooks}</code>
          </div>
        </div>
      </div>

      {tieneHijos && estaExpandido && (
        <ul className="arbol__sublista">
          {nodo.hijos.map((hijo) => (
            <NodoArbol
              key={hijo.id}
              nodo={hijo}
              nivel={nivel + 1}
              expandidos={expandidos}
              alAlternar={alAlternar}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

function obtenerTodosLosIds(nodo) {
  let ids = [nodo.id]
  if (nodo.hijos) {
    for (const h of nodo.hijos) {
      ids = ids.concat(obtenerTodosLosIds(h))
    }
  }
  return ids
}

function ArbolRenderizado() {
  const todosLosIds = obtenerTodosLosIds(arbolComponentes)
  const [expandidos, setExpandidos] = useState(new Set(todosLosIds))

  function alternarNodo(id) {
    setExpandidos((prev) => {
      const nuevo = new Set(prev)
      if (nuevo.has(id)) {
        nuevo.delete(id)
      } else {
        nuevo.add(id)
      }
      return nuevo
    })
  }

  function expandirTodo() {
    setExpandidos(new Set(todosLosIds))
  }

  function colapsarTodo() {
    setExpandidos(new Set(['app']))
  }

  return (
    <div className="arbol-pagina">
      <header className="arbol-pagina__cabecera">
        <div className="arbol-pagina__insignia">Criterio 13 · Nivel Propone</div>
        <h1 className="arbol-pagina__titulo">Árbol de Renderizado de Componentes</h1>
        <p className="arbol-pagina__subtitulo">
          Jerarquía real de componentes de la aplicación entregada en React 19.
          Permite inspeccionar la arquitectura, sus props, hooks y expandir o contraer
          cada rama del árbol interactivamente.
        </p>
      </header>

      <div className="arbol-pagina__controles">
        <button
          type="button"
          className="arbol-pagina__btn-control"
          onClick={expandirTodo}
        >
          Expandir todos
        </button>
        <button
          type="button"
          className="arbol-pagina__btn-control"
          onClick={colapsarTodo}
        >
          Contraer todos
        </button>
        <span className="arbol-pagina__contador-nodos">
          {expandidos.size} de {todosLosIds.length} módulos visibles
        </span>
      </div>

      <div className="arbol-pagina__contenedor-arbol">
        <ul className="arbol__lista-raiz">
          <NodoArbol
            nodo={arbolComponentes}
            nivel={0}
            expandidos={expandidos}
            alAlternar={alternarNodo}
          />
        </ul>
      </div>
    </div>
  )
}

export default ArbolRenderizado
