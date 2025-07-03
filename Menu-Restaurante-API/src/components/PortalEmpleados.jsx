"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import fondo from "../Imagenes/BackgroundUsuarios.jpg";
import "./PortalEmpleados.css";

export default function PortalEmpleados() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div
      className="portal-container"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
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

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* NAVBAR */}
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
            <Link to="/portal">Portal</Link>

            {/* En mobile se verá acá */}
            {token && (
              <button
                onClick={handleLogout}
                className="nav-button logout-button mobile-only"
              >
                Cerrar sesión
              </button>
            )}
          </div>

          <div className="login-user-info">
            {token && (
              <button
                onClick={handleLogout}
                className="nav-button logout-button desktop-only"
              >
                Cerrar sesión
              </button>
            )}

            <img
              src="src/assets/Logos/Favicon3.ico"
              alt="Logo Niquel"
              style={{
                width: "30px",
                height: "30px",
                objectFit: "contain",
                marginLeft: "0.5rem",
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
              >
                ADMINISTRACIÓN DE USUARIOS
              </Link>

              <Link
                to="/admin-platos"
                className="portal-button portal-button-secondary"
              >
                ADMINISTRACIÓN DE PLATOS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
