"use client"

import { useState, useEffect } from "react"
import styles from "./AdminUsuarios.module.css"
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

  // Cargar token del localStorage al montar el componente
  useEffect(() => {
    const tokenGuardado = localStorage.getItem("token")
    if (tokenGuardado) {
      setToken(tokenGuardado)
    }
  }, [])

  // Cargar usuarios si hay token
  useEffect(() => {
    if (token) {
      fetchUsuarios()
    }
  }, [token])

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
      } else {
        mostrarNotificacion("Token inválido o expirado", "error")
      }
    } catch (error) {
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

  const mostrarNotificacion = (mensaje, tipo) => {
    const notificacion = document.createElement("div")
    notificacion.className = `notification ${tipo}`
    notificacion.textContent = mensaje

    document.body.appendChild(notificacion)

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

  return (
    <div className={styles["admin-container"]}>
      <nav className={styles["login-nav"]}>
        <button className={styles["menu-toggle"]} onClick={() => setMenuAbierto(!menuAbierto)} aria-label="Menú">
          ☰
        </button>
        <div className={`${styles["login-links"]} ${menuAbierto ? styles.open : ""}`}>
          <a href="/menu">Menu</a>
          <Link to="/portal">Portal</Link>
        </div>
        <div className={styles["login-user-info"]}>
          <img
            src="src/assets/Logos/Favicon3.ico"
            alt="Logo Niquel"
            style={{ width: "30px", height: "30px", objectFit: "contain" }}
          />
        </div>
      </nav>

      <div className={styles["admin-content"]}>
        <div className={styles["card-header"]}><h2>Administración de Usuarios</h2></div>
        <div className={styles["admin-card"]}>
          <div className={styles["card-content"]}>
            {!token ? (
              <div className={styles["login-section"]}>
                <p>Acceso denegado. Iniciá sesión para continuar.</p>
              </div>
            ) : (
              <>
                <div className={styles["section-header"]}>
                  <h3>👤Usuarios registrados ({usuarios.length})</h3>
                  <button className={`${styles["btn"]} ${styles["btn-primary"]}`} onClick={() => setModalAgregarAbierto(true)}>
                    ➕ Agregar Usuario
                  </button>
                </div>

                {usuarios.length === 0 ? (
                  <div className={styles["empty-state"]}>
                    <p>No hay usuarios disponibles.</p>
                  </div>
                ) : (
                  <div className={styles["table-container"]}>
                    <table className={styles["users-table"]}>
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
                              <span className={`${styles["badge"]} ${usuario.activo ? styles["badge-active"] : styles["badge-inactive"]}`}>
                                {usuario.activo ? "Activo" : "Inactivo"}
                              </span>
                            </td>
                            <td>
                              <div className={styles["actions"]}>
                                <button
                                  className={`${styles["btn"]} ${styles["btn-small"]} ${styles["btn-outline"]}`}
                                  onClick={() => abrirModalEditar(usuario)}
                                  title="Editar"
                                >
                                  ✏️
                                </button>
                                <button
                                  className={`${styles["btn"]} ${styles["btn-small"]} ${styles["btn-danger"]}`}
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

      {/* MODAL AGREGAR */}
      {modalAgregarAbierto && (
        <div className={styles["modal-overlay"]} onClick={() => setModalAgregarAbierto(false)}>
          <div className={styles["modal"]} onClick={(e) => e.stopPropagation()}>
            <div className={styles["modal-header"]}>
              <h3>Agregar Nuevo Usuario</h3>
              <button className={styles["modal-close"]} onClick={() => setModalAgregarAbierto(false)}>✕</button>
            </div>
            <div className={styles["modal-body"]}>
              <div className={styles["form-group"]}>
                <label>Nombre:</label>
                <input
                  type="text"
                  value={nuevoUsuario.nombre}
                  onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
                />
              </div>
              <div className={styles["form-group"]}>
                <label>Contraseña:</label>
                <input
                  type="password"
                  value={nuevoUsuario.password}
                  onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })}
                />
              </div>
              <div className={styles["form-group"]}>
                <label>Estado:</label>
                <select
                  value={nuevoUsuario.activo}
                  onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, activo: e.target.value === "true" })}
                >
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>
              </div>
            </div>
            <div className={styles["modal-footer"]}>
              <button className={styles["btn-outline"]} onClick={() => setModalAgregarAbierto(false)}>Cancelar</button>
              <button className={styles["btn-primary"]} onClick={handleAgregarUsuario}>Agregar Usuario</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDITAR */}
      {modalEditarAbierto && usuarioEditando && (
        <div className={styles["modal-overlay"]} onClick={() => setModalEditarAbierto(false)}>
          <div className={styles["modal"]} onClick={(e) => e.stopPropagation()}>
            <div className={styles["modal-header"]}>
              <h3>Editar Usuario</h3>
              <button className={styles["modal-close"]} onClick={() => setModalEditarAbierto(false)}>✕</button>
            </div>
            <div className={styles["modal-body"]}>
              <div className={styles["form-group"]}>
                <label>Nombre:</label>
                <input
                  type="text"
                  value={usuarioEditando.nombre}
                  onChange={(e) => setUsuarioEditando({ ...usuarioEditando, nombre: e.target.value })}
                />
              </div>
              <div className={styles["form-group"]}>
                <label>Estado:</label>
                <select
                  value={usuarioEditando.activo}
                  onChange={(e) => setUsuarioEditando({ ...usuarioEditando, activo: e.target.value === "true" })}
                >
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>
              </div>
            </div>
            <div className={styles["modal-footer"]}>
              <button className={styles["btn-outline"]} onClick={() => setModalEditarAbierto(false)}>Cancelar</button>
              <button className={styles["btn-primary"]} onClick={handleEditarUsuario}>Guardar Cambios</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ELIMINAR */}
      {modalEliminarAbierto && usuarioAEliminar && (
        <div className={styles["modal-overlay"]} onClick={() => setModalEliminarAbierto(false)}>
          <div className={styles["modal"]} onClick={(e) => e.stopPropagation()}>
            <div className={styles["modal-header"]}>
              <h3>Confirmar Eliminación</h3>
              <button className={styles["modal-close"]} onClick={() => setModalEliminarAbierto(false)}>✕</button>
            </div>
            <div className={styles["modal-body"]}>
              <p>¿Estás seguro de que deseas eliminar al usuario <strong>{usuarioAEliminar.nombre}</strong>?</p>
              <p>Esta acción no se puede deshacer.</p>
            </div>
            <div className={styles["modal-footer"]}>
              <button className={styles["btn-outline"]} onClick={() => setModalEliminarAbierto(false)}>Cancelar</button>
              <button className={styles["btn-danger"]} onClick={handleEliminarUsuario}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}