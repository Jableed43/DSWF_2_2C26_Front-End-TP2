// Jerarquía real de componentes de la aplicación (ver src/main.jsx y src/App.jsx).
// Si se agrega, mueve o elimina un componente, hay que actualizar este árbol.
export const arbolComponentes = {
  nombre: 'main.jsx',
  nota: 'Punto de entrada: StrictMode y BrowserRouter',
  hijos: [
    {
      nombre: 'App',
      archivo: 'src/App.jsx',
      nota: 'Define las rutas con React Router',
      hijos: [
        {
          nombre: 'Layout',
          archivo: 'src/layouts/Layout.jsx',
          nota: 'Estructura compartida por todas las pantallas',
          hijos: [
            {
              nombre: 'Sidebar',
              archivo: 'src/components/Sidebar.jsx',
              nota: 'Menú lateral con identidad, enlaces y sección activa'
            },
            {
              nombre: 'ReproductorMusica',
              archivo: 'src/components/ReproductorMusica.jsx',
              nota: 'Música de fondo, visible en todas las secciones'
            },
            {
              nombre: 'Outlet',
              nota: 'Lugar donde React Router muestra la página de la ruta',
              hijos: [
                {
                  nombre: 'Inicio',
                  archivo: 'src/pages/Inicio.jsx',
                  nota: 'Ruta /'
                },
                {
                  nombre: 'Herramientas',
                  archivo: 'src/pages/Herramientas.jsx',
                  nota: 'Ruta /herramientas',
                  hijos: [
                    {
                      nombre: 'CatalogoHerramientas',
                      archivo: 'src/components/CatalogoHerramientas.jsx',
                      nota: 'Lee herramientas.json, con búsqueda, filtro y tarjetas'
                    }
                  ]
                },
                {
                  nombre: 'ApiGithub',
                  archivo: 'src/pages/ApiGithub.jsx',
                  nota: 'Ruta /api',
                  hijos: [
                    {
                      nombre: 'RepositoriosAPI',
                      archivo: 'src/components/RepositoriosAPI.jsx',
                      nota: 'Consulta la API de GitHub, con carga, error y reintento'
                    }
                  ]
                },
                {
                  nombre: 'Arbol',
                  archivo: 'src/pages/Arbol.jsx',
                  nota: 'Ruta /arbol',
                  hijos: [
                    {
                      nombre: 'ArbolComponentes',
                      archivo: 'src/components/ArbolComponentes.jsx',
                      nota: 'Dibuja este mismo árbol, expandible y contraíble'
                    }
                  ]
                },
                {
                  nombre: 'Bitacora',
                  archivo: 'src/pages/Bitacora.jsx',
                  nota: 'Ruta /bitacora',
                  hijos: [
                    {
                      nombre: 'BitacoraRegistros',
                      archivo: 'src/components/BitacoraRegistros.jsx',
                      nota: 'Lee bitacora.js, con filtro por etapa y registros desplegables'
                    }
                  ]
                },
                {
                  nombre: 'PerfilIntegrante',
                  archivo: 'src/components/PerfilIntegrante.jsx',
                  nota:
                    'Rutas /integrantes/javier, rocio, facundo y damian: un mismo componente con distintos datos por props',
                  hijos: [
                    {
                      nombre: 'Carrusel',
                      archivo: 'src/components/PerfilIntegrante.jsx',
                      nota: 'Se usa dos veces: películas y discos'
                    },
                    {
                      nombre: 'TarjetaJuego',
                      archivo: 'src/components/PerfilIntegrante.jsx',
                      nota: 'Una por cada juego, con ficha desplegable'
                    }
                  ]
                },
                {
                  nombre: 'NoEncontrada',
                  archivo: 'src/pages/NoEncontrada.jsx',
                  nota: 'Cualquier ruta que no existe'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
