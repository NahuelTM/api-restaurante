"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import styles from "./AdminUsuarios.module.css" // ✅ CSS Modules

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

  useEffect(() => {
    const tokenGuardado = localStorage.getItem("token")
    if (tokenGuardado) setToken(tokenGuardado)
  }, [])

  useEffect(() => {
    if (token) fetchUsuarios()
  }, [token])

  const fetchUsuarios = async () => {
    try {
      const res = await fetch(`${API_URL}/usuarios`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setUsuarios(data)
      } else {
        mostrarNotificacion("Token inválido o expirado", "error")
      }
    } catch {
      mostrarNotificacion("Error al cargar usuarios", "error")
    }
  }

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
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...nuevoUsuario,
          activo: Boolean(nuevoUsuario.activo) // ✅ Asegurar que sea boolean
        })
      })
      if (res.ok) {
        mostrarNotificacion("Usuario agregado correctamente", "success")
        setNuevoUsuario({ nombre: "", password: "", activo: true })
        setModalAgregarAbierto(false)
        fetchUsuarios()
      } else {
        mostrarNotificacion("Error al agregar usuario", "error")
      }
    } catch {
      mostrarNotificacion("Error de conexión", "error")
    }
  }

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
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre: usuarioEditando.nombre,
          activo: Boolean(usuarioEditando.activo) // ✅ Asegurar que sea boolean
        })
      })
      if (res.ok) {
        mostrarNotificacion("Usuario actualizado correctamente", "success")
        setUsuarioEditando(null)
        setModalEditarAbierto(false)
        fetchUsuarios()
      } else {
        const errorData = await res.json().catch(() => null)
        mostrarNotificacion(errorData?.message || "Error al actualizar usuario", "error")
      }
    } catch {
      mostrarNotificacion("Error de conexión", "error")
    }
  }

  const handleEliminarUsuario = async () => {
    try {
      const res = await fetch(`${API_URL}/usuarios/${usuarioAEliminar.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        mostrarNotificacion("Usuario eliminado correctamente", "success")
        setModalEliminarAbierto(false)
        setUsuarioAEliminar(null)
        fetchUsuarios()
      } else {
        mostrarNotificacion("Error al eliminar usuario", "error")
      }
    } catch {
      mostrarNotificacion("Error de conexión", "error")
    }
  }

  const mostrarNotificacion = (mensaje, tipo) => {
    const noti = document.createElement("div")
    noti.className = `${styles.notification} ${tipo === 'success' ? styles.notificationSuccess : styles.notificationError}`
    noti.textContent = mensaje
    document.body.appendChild(noti)
    setTimeout(() => {
      if (document.body.contains(noti)) document.body.removeChild(noti)
    }, 3000)
  }

  return (
    <div className={styles.adminContainer}>
    <nav className="login-nav">
              <button className="menu-toggle" onClick={() => setMenuAbierto(!menuAbierto)} aria-label="Menú">☰</button>
              <div className={`login-links ${menuAbierto ? "open" : ""}`}>
                <a href="/menu" className="nav-button">Menu</a>
                <Link to="/portal" className="nav-button">Portal</Link>
              </div>
              <div className="login-user-info">
                <img src="src/assets/Logos/Favicon3.ico" alt="Logo Niquel" style={{ width: "30px", height: "30px", objectFit: "contain" }} />
              </div>
            </nav>

      <div className={styles.adminContent}>
        <div className={styles.cardHeader}><h2>Administración de Usuarios</h2></div>

        <div className={styles.adminCard}>
          <div className={styles.cardContent}>
            {!token ? (
              <div className={styles.loginSection}>
                <p>Acceso denegado. Iniciá sesión para continuar.</p>
              </div>
            ) : (
              <>
                <div className={styles.sectionHeader}>
                  <h3>👤Usuarios registrados ({usuarios.length})</h3>
                  <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => setModalAgregarAbierto(true)}>
                    ➕ Agregar Usuario
                  </button>
                </div>

                {usuarios.length === 0 ? (
                  <div className={styles.emptyState}>
                    <p>No hay usuarios disponibles.</p>
                  </div>
                ) : (
                  <div className={styles.tableContainer}>
                    <table className={styles.usersTable}>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Nombre</th>
                          <th>Estado</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usuarios.map((u) => (
                          <tr key={u.id}>
                            <td data-label="ID">{u.id}</td>
                            <td data-label="Nombre">{u.nombre}</td>
                            <td data-label="Estado">
                              <span className={`${styles.badge} ${u.activo ? styles.badgeActive : styles.badgeInactive}`}>
                                {u.activo ? "Activo" : "Inactivo"}
                              </span>
                            </td>
                            <td data-label="Acciones">
                              <div className={styles.actions}>
                                <button className={`${styles.btn} ${styles.btnSmall} ${styles.btnOutline}`} onClick={() => {
                                  setUsuarioEditando({
                                    ...u,
                                    activo: Boolean(u.activo) // ✅ Asegurar que sea boolean
                                  })
                                  setModalEditarAbierto(true)
                                }}>✏️</button>
                                <button className={`${styles.btn} ${styles.btnSmall} ${styles.btnDanger}`} onClick={() => {
                                  setUsuarioAEliminar(u)
                                  setModalEliminarAbierto(true)
                                }}>🗑️</button>
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

      {/* Modales */}
      {modalAgregarAbierto && (
        <div className={styles.modalOverlay} onClick={() => setModalAgregarAbierto(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Agregar Usuario</h3>
              <button className={styles.modalClose} onClick={() => setModalAgregarAbierto(false)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Nombre:</label>
                <input type="text" value={nuevoUsuario.nombre} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })} />
              </div>
              <div className={styles.formGroup}>
                <label>Contraseña:</label>
                <input type="password" value={nuevoUsuario.password} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })} />
              </div>
              <div className={styles.formGroup}>
                <label>Estado:</label>
                <select 
                  value={nuevoUsuario.activo ? "true" : "false"} 
                  onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, activo: e.target.value === "true" })}
                >
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={`${styles.btn} ${styles.btnOutline}`} onClick={() => setModalAgregarAbierto(false)}>Cancelar</button>
              <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleAgregarUsuario}>Agregar</button>
            </div>
          </div>
        </div>
      )}

      {modalEditarAbierto && usuarioEditando && (
        <div className={styles.modalOverlay} onClick={() => setModalEditarAbierto(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Editar Usuario</h3>
              <button className={styles.modalClose} onClick={() => setModalEditarAbierto(false)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Nombre:</label>
                <input type="text" value={usuarioEditando.nombre} onChange={(e) => setUsuarioEditando({ ...usuarioEditando, nombre: e.target.value })} />
              </div>
              <div className={styles.formGroup}>
                <label>Estado:</label>
                <select 
                  value={usuarioEditando.activo ? "true" : "false"} 
                  onChange={(e) => setUsuarioEditando({ ...usuarioEditando, activo: e.target.value === "true" })}
                >
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={`${styles.btn} ${styles.btnOutline}`} onClick={() => setModalEditarAbierto(false)}>Cancelar</button>
              <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleEditarUsuario}>Guardar</button>
            </div>
          </div>
        </div>
      )}

      {modalEliminarAbierto && usuarioAEliminar && (
        <div className={styles.modalOverlay} onClick={() => setModalEliminarAbierto(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Eliminar Usuario</h3>
              <button className={styles.modalClose} onClick={() => setModalEliminarAbierto(false)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <p>¿Estás seguro de desactivar al usuario <strong>{usuarioAEliminar.nombre}</strong>?</p>
            </div>
            <div className={styles.modalFooter}>
              <button className={`${styles.btn} ${styles.btnOutline}`} onClick={() => setModalEliminarAbierto(false)}>Cancelar</button>
              <button className={`${styles.btn} ${styles.btnDanger}`} onClick={handleEliminarUsuario}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}