"use client"

import { useState } from "react"
import "./Login.css"

export default function Login({ onLogin }) {
  const [nombre, setNombre] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [ok, setOk] = useState(false)
  const [loading, setLoading] = useState(false)
  const [menuAbierto, setMenuAbierto] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setOk(false)
    setLoading(true)

    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, password }),
      })

      const data = await res.json()

      if (res.ok) {
        localStorage.setItem("token", data.token)
        setOk(true)
        onLogin?.()
      } else {
        setError(data.error || "Error al iniciar sesión")
      }
    } catch (err) {
      console.error(err)
      setError("Error de conexión")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
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
          <a href="/restaurante">Restaurante</a>
          <a href="/PortalEmpleados">Portal</a>
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
      <div className="login-brand">
        <h1>niquel.</h1>
      </div>

      {/* MAIN */}
      <div className="login-main">
        {/* FORM */}
        <div className="login-form-container">
          <div className="login-form-wrapper">
            <h2 className="login-form-title">Iniciar Sesión</h2>
            <form className="login-form" onSubmit={handleLogin}>
              <div className="login-form-group">
                <label htmlFor="usuario" className="login-label">Usuario</label>
                <input
                  id="usuario"
                  type="text"
                  className="login-input"
                  placeholder="Ingrese su usuario"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              <div className="login-form-group">
                <label htmlFor="password" className="login-label">Contraseña</label>
                <input
                  id="password"
                  type="password"
                  className="login-input"
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div>
                <button type="submit" disabled={loading} className="login-button">
                  {loading ? "INGRESANDO..." : "INGRESAR"}
                </button>
              </div>
            </form>

            {ok && <div className="login-success">✅ Login exitoso</div>}
            {error && <div className="login-error">❌ {error}</div>}
          </div>
        </div>

        {/* DIVIDER */}
        <div className="login-divider" />

        {/* RIGHT INFO */}
        <div className="login-info">
          <div>
            <img
              src="src/Imagenes/Background.png"
              alt="Interior del restaurante Niquel"
              className="login-image"
            />
          </div>
          <div className="login-text">
            <h3>¿Querés reservar una mesa o tenés alguna duda?</h3>
            <p>
              Si deseas reservar una mesa o tenés alguna consulta, nuestro equipo estará encantado de asistirte
              personalmente. Podés comunicarte con nosotros a través de +110203020 | y te responderemos a la brevedad.
              Será un placer recibirte.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
