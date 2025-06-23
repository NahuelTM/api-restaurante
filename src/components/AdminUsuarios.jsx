"use client"

import { useState, useEffect } from "react"
import "./AdminUsuarios.css"
import { Link } from "react-router-dom"

const API_URL = "http://localhost:3001/api"

export default function AdminUsuarios() {
  const [token, setToken] = useState("")
  const [usuarios, setUsuarios] = useState([])
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [usuarioEditando, setUsuarioEditando] = useState(null)
  const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: "", password: "", activo: true })
  const [modalAgregarAbierto, setModalAgregarAbierto] = useState(false)
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false)
  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false)
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null)

  // Login automático con usuario admin
  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: "admin", password: "admin123" }),
      })

      const data = await res.json()
      if (res.ok) {
        setToken(data.token)
        mostrarNotificacion("Sesión iniciada correctamente", "success")
      } else {
        mostrarNotificacion("Error al iniciar sesión", "error")
      }
    } catch (error) {
      mostrarNotificacion("Error de conexión", "error")
    }
  }

  // Obtener usuarios desde la API
  const fetchUsuarios = async () => {
    try {
      const res = await fetch(`${API_URL}/usuarios`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.ok) {
        const data = await res.json()
        setUsuarios(data)
      }
    } catch (error) {
      mostrarNotificacion("Error al cargar usuarios", "error")
    }
  }

  // Agregar nuevo usuario
  const handleAgregarUsuario = async () => {
    if (!nuevoUsuario.nombre || !nuevoUsuario.password) {
      mostrarNotificacion("Por favor completa todos los campos", "error")
      return
    }

    try {
      const res = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nuevoUsuario),
      })

      if (res.ok) {
        mostrarNotificacion("Usuario agregado correctamente", "success")
        setNuevoUsuario({ nombre: "", password: "", activo: true })
        setModalAgregarAbierto(false)
        fetchUsuarios()
      } else {
        mostrarNotificacion("Error al agregar usuario", "error")
      }
    } catch (error) {
      mostrarNotificacion("Error de conexión", "error")
    }
  }

  // Editar usuario
  const handleEditarUsuario = async () => {
    if (!usuarioEditando.nombre) {
      mostrarNotificacion("El nombre es requerido", "error")
      return
    }

    try {
      const res = await fetch(`${API_URL}/usuarios/${usuarioEditando.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: usuarioEditando.nombre,
          activo: usuarioEditando.activo,
        }),
      })

      if (res.ok) {
        mostrarNotificacion("Usuario actualizado correctamente", "success")
        setUsuarioEditando(null)
        setModalEditarAbierto(false)
        fetchUsuarios()
      } else {
        mostrarNotificacion("Error al actualizar usuario", "error")
      }
    } catch (error) {
      mostrarNotificacion("Error de conexión", "error")
    }
  }

  // Eliminar usuario
  const handleEliminarUsuario = async () => {
    try {
      const res = await fetch(`${API_URL}/usuarios/${usuarioAEliminar.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.ok) {
        mostrarNotificacion("Usuario eliminado correctamente", "success")
        setModalEliminarAbierto(false)
        setUsuarioAEliminar(null)
        fetchUsuarios()
      } else {
        mostrarNotificacion("Error al eliminar usuario", "error")
      }
    } catch (error) {
      mostrarNotificacion("Error de conexión", "error")
    }
  }

  // Función para mostrar notificaciones
  const mostrarNotificacion = (mensaje, tipo) => {
    // Crear elemento de notificación
    const notificacion = document.createElement("div")
    notificacion.className = `notification ${tipo}`
    notificacion.textContent = mensaje

    // Agregar al DOM
    document.body.appendChild(notificacion)

    // Remover después de 3 segundos
    setTimeout(() => {
      if (document.body.contains(notificacion)) {
        document.body.removeChild(notificacion)
      }
    }, 3000)
  }

  const abrirModalEditar = (usuario) => {
    setUsuarioEditando({ ...usuario })
    setModalEditarAbierto(true)
  }

  const abrirModalEliminar = (usuario) => {
    setUsuarioAEliminar(usuario)
    setModalEliminarAbierto(true)
  }

  useEffect(() => {
    if (token) {
      fetchUsuarios()
    }
  }, [token])

  return (
    <div className="admin-container">
      {/* NAVBAR actualizado */}
      <nav className="login-nav">
        <button className="menu-toggle" onClick={() => setMenuAbierto(!menuAbierto)} aria-label="Menú">
          ☰
        </button>

        <div className={`login-links ${menuAbierto ? "open" : ""}`}>
          <a href="/menu">Menu</a>
          <a href="/restaurante">Restaurante</a>
          <Link to="/portal">Portal</Link>
          <a href="/Login" className="header-login-link">
            Iniciar sesión
          </a>
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

      {/* CONTENIDO ADMIN */}
      <div className="admin-content">
        <div className="admin-card">
          <div className="card-header">
            <h2>👤 Administración de Usuarios</h2>
          </div>

          <div className="card-content">
            {!token ? (
              <div className="login-section">
                <button onClick={handleLogin} className="btn btn-primary btn-large">
                  Iniciar sesión como admin
                </button>
              </div>
            ) : (
              <>
                {/* HEADER CON BOTONES */}
                <div className="section-header">
                  <h3>Usuarios registrados ({usuarios.length})</h3>
                  <button className="btn btn-primary" onClick={() => setModalAgregarAbierto(true)}>
                    ➕ Agregar Usuario
                  </button>
                </div>

                {/* TABLA DE USUARIOS */}
                {usuarios.length === 0 ? (
                  <div className="empty-state">
                    <p>No hay usuarios disponibles.</p>
                  </div>
                ) : (
                  <div className="table-container">
                    <table className="users-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Nombre</th>
                          <th>Estado</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usuarios.map((usuario) => (
                          <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nombre}</td>
                            <td>
                              <span className={`badge ${usuario.activo ? "badge-active" : "badge-inactive"}`}>
                                {usuario.activo ? "Activo" : "Inactivo"}
                              </span>
                            </td>
                            <td>
                              <div className="actions">
                                <button
                                  className="btn btn-small btn-outline"
                                  onClick={() => abrirModalEditar(usuario)}
                                  title="Editar"
                                >
                                  ✏️
                                </button>
                                <button
                                  className="btn btn-small btn-danger"
                                  onClick={() => abrirModalEliminar(usuario)}
                                  title="Eliminar"
                                >
                                  🗑️
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* MODAL AGREGAR USUARIO */}
      {modalAgregarAbierto && (
        <div className="modal-overlay" onClick={() => setModalAgregarAbierto(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Agregar Nuevo Usuario</h3>
              <button className="modal-close" onClick={() => setModalAgregarAbierto(false)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  value={nuevoUsuario.nombre}
                  onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
                  placeholder="Nombre del usuario"
                />
              </div>
              <div className="form-group">
                <label>Contraseña:</label>
                <input
                  type="password"
                  value={nuevoUsuario.password}
                  onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })}
                  placeholder="Contraseña"
                />
              </div>
              <div className="form-group">
                <label>Estado:</label>
                <select
                  value={nuevoUsuario.activo}
                  onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, activo: e.target.value === "true" })}
                >
                  <option value={true}>Activo</option>
                  <option value={false}>Inactivo</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setModalAgregarAbierto(false)}>
                Cancelar
              </button>
              <button className="btn btn-primary" onClick={handleAgregarUsuario}>
                Agregar Usuario
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDITAR USUARIO */}
      {modalEditarAbierto && usuarioEditando && (
        <div className="modal-overlay" onClick={() => setModalEditarAbierto(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Editar Usuario</h3>
              <button className="modal-close" onClick={() => setModalEditarAbierto(false)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  value={usuarioEditando.nombre}
                  onChange={(e) => setUsuarioEditando({ ...usuarioEditando, nombre: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Estado:</label>
                <select
                  value={usuarioEditando.activo}
                  onChange={(e) => setUsuarioEditando({ ...usuarioEditando, activo: e.target.value === "true" })}
                >
                  <option value={true}>Activo</option>
                  <option value={false}>Inactivo</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setModalEditarAbierto(false)}>
                Cancelar
              </button>
              <button className="btn btn-primary" onClick={handleEditarUsuario}>
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ELIMINAR USUARIO */}
      {modalEliminarAbierto && usuarioAEliminar && (
        <div className="modal-overlay" onClick={() => setModalEliminarAbierto(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Confirmar Eliminación</h3>
              <button className="modal-close" onClick={() => setModalEliminarAbierto(false)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p>
                ¿Estás seguro de que deseas eliminar al usuario <strong>{usuarioAEliminar.nombre}</strong>?
              </p>
              <p>Esta acción no se puede deshacer.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setModalEliminarAbierto(false)}>
                Cancelar
              </button>
              <button className="btn btn-danger" onClick={handleEliminarUsuario}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
