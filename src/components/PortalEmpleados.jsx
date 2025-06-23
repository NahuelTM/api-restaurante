"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import fondo from "../Imagenes/BackgroundUsuarios.jpg"
import "./PortalEmpleados.css"

export default function PortalEmpleados() {
  const [menuAbierto, setMenuAbierto] = useState(false)

  const handleUserAdmin = () => {
    console.log("Ir a administración de usuarios")
  }

  const handleDishAdmin = () => {
    console.log("Ir a administración de platos")
  }

  return (
    <div
      className="portal-container"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative", // para el overlay
      }}
    >
      {/* Overlay oscuro */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        }}
      />

      {/* Contenido con zIndex superior */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {/* NAVBAR actualizado */}
        <nav className="login-nav">
          <button
            className="menu-toggle"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Menú"
          >
            ☰
          </button>

          <div className={`login-links ${menuAbierto ? "open" : ""}`}>
            <a href="/menu">Menu</a>
            <a href="/restaurante">Restaurante</a>
            <Link to="/portal">Portal</Link>
            <a href="/Login" className="header-login-link">Iniciar sesión</a>
          </div>

          <div className="login-user-info">
            <img
              src="src/assets/Logos/Favicon3.ico"
              alt="Logo Niquel"
              style={{
                width: "30px",
                height: "30px",
                objectFit: "contain",
              }}
            />
          </div>
        </nav>

        {/* BRAND */}
        <div className="portal-brand">
          <h1>niquel.</h1>
        </div>

        {/* MAIN CONTENT */}
        <div className="portal-main">
  <div className="portal-content">
    <h2 className="portal-title">Bienvenido al portal de empleados</h2>
    <p className="portal-subtitle">¿Qué deseas hacer hoy?</p>

    <div className="portal-divider"></div>

    <div className="portal-buttons">
      <Link
        to="/admin-usuarios"
        className="portal-button portal-button-primary"
        role="button"
        tabIndex={0}
      >
        ADMINISTRACIÓN DE USUARIOS
      </Link>

      <Link
        to="/admin-platos"
        className="portal-button portal-button-secondary"
        role="button"
        tabIndex={0}
      >
        ADMINISTRACIÓN DE PLATOS
      </Link>
    </div>
  </div>
</div>
      </div>
    </div>
  )
}
