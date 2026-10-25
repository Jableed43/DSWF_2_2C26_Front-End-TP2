// src/components/Portada.jsx
import React from 'react';
import '../styles/theme.css';
import './Portada.css';

export const Portada = ({ alSeleccionarPerfil }) => {
  // Datos simulados basados en tu lista (Miembros 7, 9 y Rocío como 8)
  const equipo = [
    { id: 7, nombre: "Miembro 7", rol: "Backend Dev", avatar: "https://placeholder.com" },
    { id: 8, nombre: "Rocío", rol: "Frontend Lead", avatar: "https://placeholder.com" },
    { id: 9, nombre: "Miembro 9", rol: "UI/UX Designer", avatar: "https://placeholder.com" }
  ];

  return (
    <header className="portada-container">
      <div className="portada-hero">
        <h1 className="portada-titulo">Plataforma del Equipo</h1>
        <p className="portada-descripcion">
          Bienvenidos al espacio colaborativo. Conoce a los integrantes del squad y explora sus perfiles interactivos.
        </p>
        <button className="btn-cta-principal">Explorar Repositorio</button>
      </div>

      <section className="equipo-seccion">
        <h2 className="seccion-titulo">Nuestro Equipo</h2>
        <div className="equipo-grid">
          {equipo.map((miembro) => (
            <div key={miembro.id} className="tarjeta-miembro">
              <img src={miembro.avatar} alt={miembro.nombre} className="avatar-img" />
              <h3>{miembro.nombre}</h3>
              <p>{miembro.rol}</p>
              <button 
                className="btn-perfil" 
                onClick={() => alSeleccionarPerfil(miembro.id)}
              >
                Ver Perfil {miembro.id === 8 && "(Interactivo)"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </header>
  );
};
