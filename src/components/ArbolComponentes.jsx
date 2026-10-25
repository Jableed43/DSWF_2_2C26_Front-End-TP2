import { useState } from 'react'
import { arbolComponentes } from '../data/arbolComponentes'
import './ArbolComponentes.css'

function Nodo({ nodo, abiertoInicial }) {
  const [abierto, setAbierto] = useState(abiertoInicial)
  const tieneHijos = Boolean(nodo.hijos?.length)

  return (
    <li className="arbol__nodo">
      <div className="arbol__fila">
        {tieneHijos ? (
          <button
            type="button"
            className="arbol__boton"
            aria-expanded={abierto}
            aria-label={`${abierto ? 'Contraer' : 'Expandir'} ${nodo.nombre}`}
            onClick={() => setAbierto((valor) => !valor)}
          >
            {abierto ? '−' : '+'}
          </button>
        ) : (
          <span className="arbol__hoja" aria-hidden="true">
            •
          </span>
        )}

        <span className="arbol__nombre">{`<${nodo.nombre} />`}</span>
        {nodo.archivo && <code className="arbol__archivo">{nodo.archivo}</code>}
      </div>

      {nodo.nota && <p className="arbol__nota">{nodo.nota}</p>}

      {tieneHijos && abierto && (
        <ul className="arbol__lista">
          {nodo.hijos.map((hijo) => (
            <Nodo
              key={hijo.nombre}
              nodo={hijo}
              abiertoInicial={abiertoInicial}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

function ArbolComponentes() {
  const [abiertoInicial, setAbiertoInicial] = useState(true)
  const [version, setVersion] = useState(0)

  function cambiarTodo(abrir) {
    setAbiertoInicial(abrir)
    setVersion((valor) => valor + 1)
  }

  return (
    <section className="arbol">
      <h1>Árbol de renderizado</h1>
      <p>
        Jerarquía real de los componentes de la aplicación, desde el punto de
        entrada hasta las tarjetas. Usá los botones para expandir o contraer
        cada rama.
      </p>

      <div className="arbol__controles">
        <button type="button" onClick={() => cambiarTodo(true)}>
          Expandir todo
        </button>
        <button type="button" onClick={() => cambiarTodo(false)}>
          Contraer todo
        </button>
      </div>

      <ul className="arbol__lista arbol__lista--raiz">
        <Nodo
          key={version}
          nodo={arbolComponentes}
          abiertoInicial={abiertoInicial}
        />
      </ul>
    </section>
  )
}

export default ArbolComponentes
