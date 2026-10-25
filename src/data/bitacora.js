// Registros del proceso de trabajo. Los de etapa 'TP1' continúan la bitácora
// del proyecto anterior; los de etapa 'TP2' son los de esta aplicación.
export const bitacora = [
  {
    id: 'tp1-planificacion',
    etapa: 'TP1',
    titulo: 'Planificación inicial y asignación de roles',
    fecha: '6 de septiembre de 2026',
    queHicimos:
      'Analizamos los requerimientos del TP1 y coordinamos la primera reunión oficial del equipo para distribuir componentes e implementar un flujo de trabajo transparente.',
    decisiones: [
      'Asignación de componentes: Damián (Footer y documentación), Javier (Template de perfiles), Rocío (Header de portada y perfiles), Facundo (Bitácora) y María Cristina (Portada Home).',
      'Establecimiento de revisores cruzados para la revisión de código previa a cada integración.',
      'Adopción de la tipografía Poppins mediante Google Fonts y definición de una paleta cromática provisional.'
    ],
    dificultades:
      'Coordinar una línea estética común que permitiera a cada integrante mantener su libertad creativa en el perfil individual sin romper la identidad visual del grupo.'
  },
  {
    id: 'tp1-repositorio',
    etapa: 'TP1',
    titulo: 'Estructuración del repositorio y arquitectura CSS',
    fecha: '12 a 15 de septiembre de 2026',
    queHicimos:
      'Creamos el repositorio público e independiente en GitHub con ramas individuales por integrante y organizamos la estructura modular del proyecto.',
    decisiones: [
      'Modularización de estilos CSS: variables globales, componentes compartidos y componentes multimedia en archivos separados.',
      'Inclusión de las pautas de diseño y minutas en la carpeta context para fácil consulta del equipo.',
      'Depuración del repositorio eliminando componentes y recursos de prueba obsoletos sin uso en el sitio.'
    ],
    dificultades:
      'Evitar colisiones y solapamientos en las reglas de estilo globales al trabajar simultáneamente en componentes compartidos.'
  },
  {
    id: 'tp1-javascript',
    etapa: 'TP1',
    titulo: 'Desarrollo de interacciones dinámicas en JavaScript',
    fecha: '18 a 20 de septiembre de 2026',
    queHicimos:
      'Programamos las funciones de interacción en JavaScript requeridas para la portada y las secciones de perfil.',
    decisiones: [
      'Botón "Sorprendeme" en la portada para redirigir a un perfil aleatorio del equipo.',
      'Filtros por categorías de habilidades, tarjetas interactivas giratorias y carruseles multimedia en los perfiles.',
      'Desacoplamiento de scripts generales moviendo la lógica específica a archivos dedicados.'
    ],
    dificultades:
      'Garantizar que al cambiar de diapositiva en los carruseles de películas y discos se pausara automáticamente la reproducción activa de audio o video.'
  },
  {
    id: 'tp1-equipo',
    etapa: 'TP1',
    titulo: 'Reorganización del equipo por cambio de integrantes',
    fecha: '22 de septiembre de 2026',
    queHicimos:
      'Gestionamos la salida de María Cristina Gutiérrez tras notificarnos la aprobación de su equivalencia académica.',
    decisiones: [
      'Retiro de su página individual de la navegación del sitio publicado.',
      'Conservación de sus contribuciones previas en el historial de commits del repositorio Git para mantener la transparencia.',
      'Reasignación del ajuste final de la portada entre los integrantes activos sin demorar el cronograma de entrega.'
    ],
    dificultades:
      'Reestructurar los enlaces internos del menú desplegable y de la portada garantizando que ningún enlace quedara roto.'
  },
  {
    id: 'tp1-pruebas',
    etapa: 'TP1',
    titulo: 'Pruebas responsivas y preparación de entrega',
    fecha: '25 a 27 de septiembre de 2026',
    queHicimos:
      'Sometimos el sitio a pruebas de maquetación adaptable en múltiples resoluciones y auditamos la navegación interna.',
    decisiones: [
      'Verificación de las media queries en los tres breakpoints obligatorios: 400 px, 900 px y 1200 px, sin desbordes de contenido.',
      'Asegurar la navegación completa mediante botones y menús para no depender del botón "Atrás" del navegador.',
      'Finalización de la documentación técnica en el README y preparación del entorno de despliegue en Vercel.'
    ],
    dificultades:
      'Ajustar la grilla responsiva de las tarjetas y la visibilidad de los controles de carrusel en la vista móvil de 400 px.'
  },
  {
    id: 'tp2-base',
    etapa: 'TP2',
    titulo: 'Repositorio nuevo y base en React',
    fecha: '18 de octubre de 2026',
    queHicimos:
      'Creamos el repositorio público del TP2, armamos el proyecto con Vite y React, instalamos React Router y lo publicamos en Vercel.',
    decisiones: [
      'Partir de un repositorio independiente del TP1 y llevar al TP2 el nombre BlueTech y los contenidos de los perfiles.',
      'Una rama por integrante y revisión de cada rama antes de integrarla en main.',
      'Agregar un archivo de configuración de Vercel para que recargar una dirección interna no devuelva un error 404.'
    ],
    dificultades:
      'Vercel rechazó el primer despliegue porque la regla de reescritura usaba un nombre de propiedad incorrecto. Lo corregimos y el sitio quedó publicado.'
  },
  {
    id: 'tp2-datos-api',
    etapa: 'TP2',
    titulo: 'Catálogo de herramientas, API y componente de perfil',
    fecha: '24 de octubre de 2026',
    queHicimos:
      'Damián incorporó un catálogo con 20 herramientas de desarrollo web desde un archivo JSON, con búsqueda y filtro, una sección que consulta la API pública de GitHub y un reproductor de música.',
    decisiones: [
      'Un único componente de perfil que recibe los datos de cada integrante por props, para no repetir código.',
      'Búsqueda sin distinguir tildes ni mayúsculas, con contador de resultados y botón para restablecer.',
      'Elegir la API de GitHub porque se consulta desde el navegador sin claves privadas.'
    ],
    dificultades:
      'La API de GitHub limita las consultas sin autenticación, así que mostramos un mensaje claro y un botón para reintentar.'
  },
  {
    id: 'tp2-sidebar',
    etapa: 'TP2',
    titulo: 'Sidebar compartida, perfiles y árbol de renderizado',
    fecha: '25 de octubre de 2026',
    queHicimos:
      'Reemplazamos la barra superior por una sidebar compartida con un panel que se abre y cierra en el celular, completamos los cuatro perfiles con los datos del TP1 y sumamos la sección con el árbol de componentes.',
    decisiones: [
      'Un layout común con la sidebar y una página 404 con enlace de regreso, para que ninguna pantalla quede sin salida.',
      'Usar la paleta de la sidebar en todas las secciones para tener una identidad visual única.',
      'Escribir el árbol de renderizado a partir del código final y hacerlo expandible y contraíble.'
    ],
    dificultades:
      'Las canciones de Rocío son de Spotify y no álbumes, así que el perfil no las cargaba. Agregamos soporte para los dos tipos de enlace.'
  }
]
