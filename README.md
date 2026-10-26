# BlueTech · TP2 Front End

Aplicación web desarrollada en React 19 para la materia **Desarrollo de Sistemas Web Front End** (Comisión 2C26, 2026). El proyecto continúa la identidad del TP1 y evoluciona hacia una arquitectura Single Page Application (SPA) modular, accesible y responsiva, organizada desde una Sidebar compartida con navegación persistente.

🔗 **Sitio desplegado en Vercel:**  
https://dswf-2-2-c26-front-end-tp-2-t12j.vercel.app/

---

## 📑 Índice de Contenidos

1. [Descripción General](#-descripción-general)
2. [Integrantes del Equipo](#-integrantes-del-equipo)
3. [Responsabilidades y Flujo de Trabajo](#-responsabilidades-y-flujo-de-trabajo)
4. [Estructura del Proyecto y Tecnologías](#-estructura-del-proyecto-y-tecnologías)
5. [Módulos Implementados](#-módulos-implementados)
6. [Cómo Ejecutar el Proyecto en Local](#-cómo-ejecutar-el-proyecto-en-local)
7. [Declaración Exhaustiva de Uso de IA](#-declaración-exhaustiva-de-uso-de-ia)
8. [Verificación de los 15 Criterios de Evaluación](#-verificación-de-los-15-criterios-de-evaluación)

---

## 🚀 Descripción General

BlueTech centraliza la presentación del equipo, la gestión de herramientas tecnológicas y el seguimiento de calidad de desarrollo en una única aplicación React:

*   **Identidad Visual Unificada:** Sistema de diseño basado en una paleta cromática refinada en tonos **Borgoña, Violeta y Vino** aplicando la regla **60-30-10** para garantizar descanso visual y cumplimiento de contraste WCAG AA/AAA.
*   **Sidebar Compartida y Adaptable:** Menú lateral persistente en pantallas medianas y grandes, adaptado a dispositivos móviles mediante un panel deslizable (drawer) con control de foco, tecla Escape y cierre al navegar.
*   **Navegación Sin Salida:** Enrutamiento declarativo con React Router 7 y configuración de `vercel.json` para permitir la recarga directa (F5) en cualquier ruta profunda sin errores 404.
*   **Reutilización Estricta de Componentes:** Componente molde `PerfilIntegrante` que instancia los perfiles de los cuatro miembros mediante `props` e incorpora una interacción funcional exclusiva por integrante.
*   **Gestión de Datos y API:** Catálogo local de 20 herramientas con búsqueda tolerante a acentos y filtro por categoría, junto con un módulo asíncrono que consulta en tiempo real la API pública de GitHub.
*   **Auditoría y Transparencia:** Árbol de renderizado interactivo con nodos colapsables y bitácora de decisiones con filtros dinámicos por autor y etapa.

---

## 👥 Integrantes del Equipo

| Integrante | Rol Principal | Perfil de GitHub |
| :--- | :--- | :--- |
| **Rocío Ailén Arenas** | Identidad Visual, Portada & Accesibilidad | [@rocioailenar](https://github.com/rocioailenar) |
| **Javier Nehuén López** | Estructura, Navegación & Árbol de Renderizado | [@Jableed43](https://github.com/Jableed43) |
| **Damián Gorosito** | Datos Locales (JSON), Filtros & API de GitHub | [@damiangorosito](https://github.com/damiangorosito) |
| **Facundo Sánchez** | Bitácora, Documentación & Auditoría de Calidad | [@FacundoAreo](https://github.com/FacundoAreo) |

---

## 🛠️ Responsabilidades y Flujo de Trabajo

Para asegurar la calidad del código y la coherencia arquitectónica, el equipo adoptó un flujo de trabajo con ramas independientes por integrante y revisión cruzada de código (*peer review*) antes de integrar a la rama principal (`main`).

| Integrante | Tareas Asignadas | Criterios Vinculados |
| :--- | :--- | :--- |
|**Rocío Arenas** | Definición de tokens de diseño en `theme.css` (paleta borgoña 60-30-10), diseño de la Portada con elementos interactivos, creación de avatares vectoriales, adaptabilidad multidispositivo mediante media queries y lógica para la ambientación sonora con música y efectos ambientales. | Criterios 07, 08, 09 (perfil) |
| **Javier López** | Arquitectura general con Vite y React Router, Sidebar compartida con panel móvil que abre y cierra, componente base reutilizable `PerfilIntegrante` con props, configuración de `vercel.json` y Árbol de renderizado expandible. | Criterios 01, 04, 05, 06, 13, 08 (perfil) |
| **Damián Gorosito** | Estructuración del JSON local con 20+ herramientas, búsqueda en vivo con normalización de acentos, filtro reactivo por categoría, consumo de GitHub REST API con `AbortController` y widget de audio. | Criterios 10, 11, 12, 08 (perfil) |
| **Facundo Sánchez** | Redacción del README con índice interno, migración de la bitácora del TP1 al TP2 con filtros reactivos y desplegables, consolidación de la declaración de IA y verificación integral de rúbrica. | Criterios 02, 03, 14, 15, 08 (perfil) |

---

## 💻 Estructura del Proyecto y Tecnologías

```text
DSWF_2_2C26_Front-End-TP2/
├── public/
│   ├── audio/                # Pistas de audio con licencia Creative Commons
│   ├── img/                  # Fotos y avatares vectoriales por integrante
│   └── favicon.svg           # Isotipo del equipo
├── src/
│   ├── components/           # Componentes modulares reutilizables
│   │   ├── CatalogoHerramientas.jsx / .css
│   │   ├── PerfilIntegrante.jsx / .css
│   │   ├── RepositoriosAPI.jsx
│   │   ├── ReproductorMusica.jsx / .css
│   │   └── Sidebar.jsx / .css
│   ├── data/                 # Modelos de datos independientes
│   │   ├── herramientas.json
│   │   ├── perfilBase.js
│   │   ├── perfilDamian.js
│   │   ├── perfilFacundo.js
│   │   ├── perfilJavier.js
│   │   └── perfilRocio.js
│   ├── layouts/              # Envolturas estructurales
│   │   └── Layout.jsx / .css
│   ├── pages/                # Vistas y pantallas enrutadas
│   │   ├── ArbolRenderizado.jsx / .css
│   │   ├── Bitacora.jsx / .css
│   │   └── Portada.jsx / .css
│   ├── styles/               # Tokens de diseño y paleta borgoña
│   │   └── theme.css
│   ├── App.jsx               # Definición de rutas y layout raíz
│   ├── index.css             # Utilidades globales
│   └── main.jsx              # Punto de entrada de React 19
├── vercel.json               # Configuración de rewrites para SPA
├── vite.config.js            # Configuración de compilación con Vite
└── README.md
```

*   **React 19 & React Router 7:** Enrutamiento declarativo y componentes funcionales con hooks (`useState`, `useEffect`, `useRef`, `useId`, `useLocation`).
*   **Vite 8:** Entorno de compilación ultra rápido y optimizado para producción.
*   **CSS3 Custom Properties:** Sistema de tokens de diseño sin dependencias pesadas para máximo rendimiento.
*   **Oxlint:** Linter de última generación con cero advertencias y cero errores de tipado o pureza.

---

## 📦 Módulos Implementados

1.  **Portada del Equipo (`/`):** Hero section con métricas del proyecto, accesos directos y tarjetas interactivas de cada integrante con cita y botón de expansión.
2.  **Catálogo de Herramientas (`/herramientas`):** 20 registros dinámicos con categorización, búsqueda insensible a tildes/mayúsculas y ficha desplegable (`<details>`).
3.  **Proyectos GitHub (`/proyectos-api`):** Consulta a la API pública de GitHub con manejo de estados de carga, límite de tasa (*rate limit*), mensaje de error y botón de reintento.
4.  **Perfiles de Integrantes (`/integrantes/:nombre`):**
    *   **Rocío:** Probador interactivo de variantes de paleta borgoña.
    *   **Javier:** Simulador de enrutamiento y tiempos de respuesta SPA.
    *   **Damián:** Medidor interactivo de preferencias tecnológicas con feedback en tiempo real.
    *   **Facundo:** Checklist interactivo de criterios de evaluación con barra de progreso.
    *   *Todos los perfiles:* Foto girable en 3D (foto real vs avatar ilustrado), pestañas de habilidades, carruseles multimedia (YouTube y Spotify) y fichas de videojuegos.
5.  **Árbol de Renderizado (`/arbol-renderizado`):** Diagrama jerárquico interactivo con soporte para expandir y contraer nodos, auditoría de props y hooks.
6.  **Bitácora de Trabajo (`/bitacora`):** Registro de decisiones técnicas con filtros reactivos por autor y etapa, y detalles desplegables de problemas resueltos.
7.  **Reproductor Musical Flotante:** Widget de audio de ambientación con selección de pistas, persistente durante la navegación.

---

## 🔧 Cómo Ejecutar el Proyecto en Local

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/Jableed43/DSWF_2_2C26_Front-End-TP2.git
    cd DSWF_2_2C26_Front-End-TP2
    ```
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Iniciar servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    Abrir `http://localhost:5173` en el navegador.
4.  **Auditar calidad de código:**
    ```bash
    npm run lint
    ```
5.  **Compilar para producción:**
    ```bash
    npm run build
    ```

---

## 🤖 Declaración Exhaustiva de Uso de IA

Conforme al **Criterio 15 (Nivel Propone)**, se detallan las herramientas, modelos y propósitos técnicos específicos empleados por cada integrante:

| Integrante | Herramienta / App | Modelo Empleado | Contenido o Tarea Desarrollada |
| :--- | :--- | :--- | :--- |
| **Rocío Arenas** | Google Antigravity & ChatGPT | Gemini 1.5 Pro & GPT-4o | Diseño de la arquitectura de tokens CSS en `theme.css`, verificación de contrastes WCAG AA en la paleta Borgoña 60-30-10, maquetado de la Portada interactiva y generación de los avatares vectoriales SVG. |
| **Javier López** | Claude & ChatGPT | Claude 3.5 Sonnet & GPT-4o | Estructuración del enrutador con React Router 7, depuración del drawer deslizable con eventos de teclado en `Sidebar.jsx`, reglas de rewrite en `vercel.json` y modelado jerárquico del componente `ArbolRenderizado.jsx`. |
| **Damián Gorosito** | GitHub Copilot & ChatGPT | GPT-4o | Algoritmo de normalización de cadenas Unicode (`.normalize('NFD')`) para búsqueda tolerante a acentos, configuración de peticiones con `AbortController` ante desmontaje y manejo de errores HTTP en `RepositoriosAPI.jsx`. |
| **Facundo Sánchez** | Claude & Google Antigravity | Claude 3.5 Sonnet & Gemini 1.5 Pro | Consolidación cronológica de la bitácora con filtros por faceta, estructuración del índice y tabla de IA en `README.md`, y auditoría de cumplimiento de los 15 criterios de la consigna. |

---

## 🎯 Verificación de los 15 Criterios de Evaluación

| Criterio | Requisito Principal | Nivel Alcanzado | Justificación Técnica |
| :---: | :--- | :---: | :--- |
| **01** | Repositorio público y deploy Vercel | **Propone** | Repositorio público con acceso directo y deploy en Vercel funcionando sin credenciales. |
| **02** | README completo | **Propone** | Contiene descripción, enlaces, integrantes, índice con enlaces internos y tabla de IA. |
| **03** | Integrantes con acceso | **Propone** | 100% de integrantes con acceso aceptado y responsabilidades detalladas en tabla. |
| **04** | Proyecto en React | **Propone** | SPA en React 19 que reutiliza el componente molde `PerfilIntegrante` mediante `props`. |
| **05** | Sidebar compartida | **Propone** | Sidebar fija en desktop con estado activo; panel deslizable en móvil con apertura/cierre. |
| **06** | Navegación completa | **Propone** | Navegación interna sin pantallas sin salida y recarga directa en cualquier URL (`vercel.json`). |
| **07** | Portada del equipo | **Propone** | Presentación visual cuidada con elementos interactivos que introducen al equipo y perfiles. |
| **08** | Perfiles en React | **Propone** | Los 4 integrantes cuentan con perfil completo y cada uno incluye una interacción funcional propia. |
| **09** | Propuesta estética | **Supera** | Paleta Borgoña 60-30-10 integral, imágenes generadas/editadas para el proyecto y coherencia total. |
| **10** | Datos locales JSON | **Propone** | Archivo `herramientas.json` con 20 registros y despliegue de detalles técnicos adicionales. |
| **11** | Búsqueda y filtro | **Propone** | Búsqueda por texto normalizado, filtro por categoría, contador y botón para restablecer. |
| **12** | API pública y estados | **Propone** | Conexión a GitHub API, estados de carga, error descriptivo y botón de reintento. |
| **13** | Árbol de renderizado | **Propone** | Esquema jerárquico real del proyecto con controles para expandir y contraer componentes. |
| **14** | Bitácora | **Propone** | Registro continuo desde TP1 hasta TP2 presentado mediante desplegables y filtros funcionales. |
| **15** | Declaración de IA | **Propone** | Identificación precisa por integrante de la aplicación, modelo y tareas técnicas realizadas. |
