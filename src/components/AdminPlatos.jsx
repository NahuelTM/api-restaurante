import { useState } from "react"
import { Link } from "react-router-dom"
import "./PortalEmpleados.css"

export default function AdminPlatos() {
  const [menuAbierto, setMenuAbierto] = useState(false)

  return (
    <div className="portal-container" style={{ position: "relative", minHeight: "100vh", backgroundColor: "#121212" }}>
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 1,
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Navbar */}
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
              style={{ width: 30, height: 30, objectFit: "contain" }}
            />
          </div>
        </nav>

        {/* Contenido vacio */}
        <main style={{ padding: "2rem", color: "white", textAlign: "center" }}>
          <h1>Administración de Platos</h1>
          <p>Página vacía, contenido por implementar.</p>
        </main>
      </div>
    </div>
  )
}
