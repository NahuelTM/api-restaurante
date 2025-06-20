"use client"

import { useState } from "react"
import "./PortalEmpleados.css"

export default function PortalEmpleados() {
  const [menuAbierto, setMenuAbierto] = useState(false)

  const handleUserAdmin = () => {
    // Navegar a administración de usuarios
    console.log("Ir a administración de usuarios")
  }

  const handleDishAdmin = () => {
    // Navegar a administración de platos
    console.log("Ir a administración de platos")
  }

  return (
    <div className="portal-container">
      {/* NAVBAR - Mismo header del login */}
      <nav className="portal-nav">
        <button className="menu-toggle" onClick={() => setMenuAbierto(!menuAbierto)} aria-label="Menú">
          ☰
        </button>

        <div className={`portal-links ${menuAbierto ? "open" : ""}`}>
          <a href="/menu">Menu</a>
          <a href="/restaurante">Restaurante</a>
          <a href="/reserva">Reserva</a>
          <a href="/Login" className="header-login-link">
            Iniciar sesión
          </a>
        </div>

        <div className="portal-user-info">
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
          <h2 className="portal-title">Bienvenido al portal de Empleados</h2>
          <p className="portal-subtitle">¿Que deseas hacer hoy?</p>

          <div className="portal-divider"></div>

          <div className="portal-buttons">
            <button className="portal-button portal-button-primary" onClick={handleUserAdmin}>
              ADMINISTRACIÓN DE USUARIOS
            </button>

            <button className="portal-button portal-button-secondary" onClick={handleDishAdmin}>
              ADMINISTRACIÓN DE PLATOS
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
