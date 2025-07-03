import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import axios from "axios";
import "./AdminPlatos.css";

function AdminPlatos() {
  const [platos, setPlatos] = useState([]);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [editData, setEditData] = useState({
    nombre: "",
    descripcion: "",
    alergenos: "",
    categoria: "",
    subcategoria: "",
    precio: "",
    imagen: "", // Esto guardará la URL o Base64
    imagenFile: null, // Esto guardará el objeto File
  });
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate(); // Inicializa useNavigate

  // Cargar platos desde la base de datos
  useEffect(() => {
    const fetchPlatos = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3001/api/platos?disponible=true", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlatos(res.data);
      } catch (error) {
        console.error("Error al obtener platos:", error);
        // Si hay un error de autenticación (ej. token expirado), redirige al login
        if (error.response && error.response.status === 401) {
          handleLogout();
        }
      }
    };
    fetchPlatos();
  }, []);

  const convertirArchivoABase64 = (file) => {
    return new Promise((resolve, reject) => {
      const lector = new FileReader();
      lector.onloadend = () => resolve(lector.result);
      lector.onerror = reject;
      lector.readAsDataURL(file);
    });
  };

  // Función para resetear el estado de editData a valores iniciales vacíos
  const resetEditData = () => {
    setEditData({
      nombre: "",
      descripcion: "",
      alergenos: "",
      categoria: "",
      subcategoria: "",
      precio: "",
      imagen: "",
      imagenFile: null,
    });
  };

  const handleAddPlato = async () => {
    try {
      const token = localStorage.getItem("token");
      let platoDataToSave = { ...editData };

      // Validar que los campos obligatorios no estén vacíos antes de enviar
      if (!platoDataToSave.nombre || !platoDataToSave.precio || !platoDataToSave.categoria) {
        alert("Por favor, completa al menos el Nombre, Precio y Categoría.");
        return; // Detiene la ejecución si faltan datos
      }

      // NO enviar la imagen en el POST inicial del plato
      // Elimina imagen y imagenFile de los datos a enviar inicialmente
      const { imagen, imagenFile, ...platoDataWithoutImage } = platoDataToSave;

      const res = await axios.post(
        "http://localhost:3001/api/platos",
        platoDataWithoutImage, // Envía el plato sin la imagen
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const nuevoPlatoId = res.data.id; // Asume que tu backend devuelve el ID del plato creado
      let finalImagenUrl = "https://via.placeholder.com/150?text=Sin+Imagen"; // Imagen por defecto

      // Si hay una imagen seleccionada, subirla por separado
      if (editData.imagenFile) {
        const formData = new FormData();
        formData.append("foto", editData.imagenFile); // El nombre del campo debe ser 'foto'

        const imageUploadRes = await axios.post(
          `http://localhost:3001/api/platos/${nuevoPlatoId}/imagen`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        finalImagenUrl = imageUploadRes.data.url; // Obtiene la URL de la imagen subida desde la respuesta del backend
      }

      // Agrega el nuevo plato a la lista con la URL de imagen correcta
      setPlatos((prev) => [...prev, { ...res.data, imagen: finalImagenUrl }]);
      setShowModal(false);
      resetEditData(); // Limpiar el estado después de agregar
      alert("Plato agregado con éxito.");
    } catch (error) {
      console.error("Error al agregar el plato:", error.response ? error.response.data : error.message);
      alert(`Error al agregar el plato: ${error.response && error.response.data && error.response.data.error ? error.response.data.error : error.message}. Consulta la consola para más detalles.`);
      if (error.response && error.response.status === 401) {
        handleLogout();
      }
    }
  };

  const handleEditClick = (plato) => {
    setEditandoId(plato.id);
    setEditData({ ...plato, imagenFile: null }); // Limpiar imagenFile al editar para que no intente subir el anterior
  };

  const handleCancel = () => {
    setEditandoId(null);
    resetEditData(); // Resetear editData
  };

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "imagen" && files && files.length > 0) {
      const file = files[0];
      const base64 = await convertirArchivoABase64(file);
      setEditData((prev) => ({ ...prev, imagen: base64, imagenFile: file }));
    } else {
      setEditData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async (id) => {
    try {
      const token = localStorage.getItem("token");

      // Validar que los campos obligatorios no estén vacíos al guardar
      if (!editData.nombre || !editData.precio || !editData.categoria) {
        alert("Por favor, completa al menos el Nombre, Precio y Categoría.");
        return;
      }

      let updatedImageUrl = editData.imagen; // Mantener la imagen actual por defecto

      // Si hay una nueva imagen seleccionada para actualizar (editData.imagenFile existe)
      if (editData.imagenFile) {
        const formData = new FormData();
        formData.append("foto", editData.imagenFile); // El nombre del campo debe coincidir con lo que espera tu backend ('foto')

        const imageRes = await axios.post(
          `http://localhost:3001/api/platos/${id}/imagen`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        updatedImageUrl = imageRes.data.url; // Obtiene la nueva URL de la imagen desde el backend
      }

      // Prepara los datos del plato para la actualización (sin imagenFile, pero con la URL de imagen actualizada)
      const { imagenFile, ...restData } = editData;
      const platoDataToUpdate = { ...restData, imagen: updatedImageUrl };

      // Envía los datos del plato (texto)
      await axios.put(`http://localhost:3001/api/platos/${id}`, platoDataToUpdate, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Actualizar la lista de platos en el estado local después de guardar
      setPlatos((prev) =>
        prev.map((plato) =>
          plato.id === id ? { ...plato, ...platoDataToUpdate } : plato
        )
      );

      setEditandoId(null);
      resetEditData(); // Limpiar editData después de guardar
      alert("Plato actualizado con éxito.");
    } catch (error) {
      console.error("Error al actualizar el plato:", error.response ? error.response.data : error.message);
      alert(`Error al actualizar el plato: ${error.response && error.response.data && error.response.data.error ? error.response.data.error : error.message}. Consulta la consola para más detalles.`);
      if (error.response && error.response.status === 401) {
        handleLogout();
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este plato?")) {
      return;
    }
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:3001/api/platos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPlatos((prev) => prev.filter((p) => p.id !== id));
      alert("Plato eliminado con éxito.");
    } catch (error) {
      console.error("Error al eliminar el plato:", error.response ? error.response.data : error.message);
      alert("Error al eliminar el plato. Por favor, intenta de nuevo.");
      if (error.response && error.response.status === 401) {
        handleLogout();
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token del almacenamiento local
    navigate("/login"); // Redirige al usuario a la página de inicio de sesión
  };

  const platosFiltrados = platos.filter((plato) =>
    plato && plato.nombre && plato.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="admin-container">
      <nav className="login-nav">
        <button className="menu-toggle" onClick={() => setMenuAbierto(!menuAbierto)} aria-label="Menú">☰</button>
        <div className={`login-links ${menuAbierto ? "open" : ""}`}>
          <a href="/menu" className="nav-button">Menu</a>
          <Link to="/portal" className="nav-button">Portal</Link>
          {/* BOTÓN CERRAR SESIÓN ELIMINADO */}
        </div>
        <div className="login-user-info">
          <img src="src/assets/Logos/Favicon3.ico" alt="Logo Niquel" style={{ width: "30px", height: "30px", objectFit: "contain" }} />
        </div>
      </nav>

      <main className="admin-content">
        <div className="admin-header">
          <h2 className="admin-title">Administración de Platos</h2>
          <p className="admin-subtitle">Agrega, modifica, visualiza o elimina platos.</p>
          <div className="admin-divider"></div>
        </div>

        <div className="buscador-container">
          <input
            type="text"
            placeholder="Buscar plato por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="buscador-input"
          />
        </div>

        <button className="add-plato-btn" onClick={() => { setShowModal(true); resetEditData(); }}>Agregar Plato</button>

        {/* Modal para agregar un plato */}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h3 className="modal-heading">Agregar Plato</h3>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre del plato *"
                value={editData.nombre || ""}
                onChange={handleChange}
              />
              <textarea
                name="descripcion"
                placeholder="Descripción"
                value={editData.descripcion || ""}
                onChange={handleChange}
                rows="3"
              />
              <input
                type="text"
                name="alergenos"
                placeholder="Alérgenos"
                value={editData.alergenos || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                name="categoria"
                placeholder="Categoría *"
                value={editData.categoria || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                name="subcategoria"
                placeholder="Subcategoría"
                value={editData.subcategoria || ""}
                onChange={handleChange}
              />
              <input
                type="number"
                name="precio"
                placeholder="Precio *"
                value={editData.precio || ""}
                onChange={handleChange}
              />
              <input
                type="file"
                name="imagen"
                accept="image/*"
                onChange={handleChange}
              />
              {editData.imagen && ( // Previsualización de la imagen al agregar
                <img src={editData.imagen} alt="Previsualización" style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px', display: 'block' }} />
              )}
              <div className="modal-actions">
                <button onClick={handleAddPlato}>Guardar</button>
                <button onClick={() => { setShowModal(false); resetEditData(); }}>Cancelar</button>
              </div>
            </div>
          </div>
        )}

        {/* Cards de platos (visibles solo en pantallas pequeñas con CSS) */}
        <div className="plato-cards">
          {platosFiltrados.length > 0 ? (
            platosFiltrados.map((plato) => (
              <div className="plato-card" key={plato.id}>
                {editandoId === plato.id ? (
                  <>
                    <input
                      type="file"
                      name="imagen"
                      accept="image/*"
                      onChange={handleChange}
                    />
                    {editData.imagen && (
                      <img src={editData.imagen} alt="Previsualización" style={{ maxWidth: '100px', maxHeight: '100px', display: 'block', margin: '10px 0' }} />
                    )}
                  </>
                ) : (
                  <img src={plato.imagen} alt={plato.nombre} />
                )}
                <div className="plato-info">
                  <strong>Nombre:</strong>{" "}
                  {editandoId === plato.id ? (
                    <input type="text" name="nombre" value={editData.nombre || ""} onChange={handleChange} />
                  ) : (
                    plato.nombre
                  )}{" "}
                  <br />
                  <strong>Precio:</strong>{" "}
                  {editandoId === plato.id ? (
                    <input type="number" name="precio" value={editData.precio || ""} onChange={handleChange} />
                  ) : (
                    `$${plato.precio}`
                  )}{" "}
                  <br />
                  <strong>Categoría:</strong>{" "}
                  {editandoId === plato.id ? (
                    <input type="text" name="categoria" value={editData.categoria || ""} onChange={handleChange} />
                  ) : (
                    plato.categoria
                  )}{" "}
                  <br />
                  <strong>Subcategoría:</strong>{" "}
                  {editandoId === plato.id ? (
                    <input type="text" name="subcategoria" value={editData.subcategoria || ""} onChange={handleChange} />
                  ) : (
                    plato.subcategoria
                  )}{" "}
                  <br />
                  <strong>Descripción:</strong>{" "}
                  {editandoId === plato.id ? (
                    <textarea name="descripcion" value={editData.descripcion || ""} onChange={handleChange} rows="2" />
                  ) : (
                    plato.descripcion
                  )}
                </div>
                <div className="plato-actions">
                  {editandoId === plato.id ? (
                    <>
                      <button className="edit-btn" onClick={() => handleSave(plato.id)}>💾</button>
                      <button className="delete-btn" onClick={handleCancel}>✖️</button>
                    </>
                  ) : (
                    <>
                      <button className="edit-btn" onClick={() => handleEditClick(plato)}>✏️</button>
                      <button className="delete-btn" onClick={() => handleDelete(plato.id)}>🗑️</button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">No hay platos para mostrar en tarjetas.</div>
          )}
        </div>

        {/* Tabla de platos (visible solo en pantallas grandes con CSS) */}
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Alérgenos</th>
                <th>Categoría</th>
                <th>Subcategoría</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {platosFiltrados.length > 0 ? (
                platosFiltrados.map((plato) => (
                  <tr key={plato.id}>
                    <td>
                      {editandoId === plato.id && editData.imagen ? (
                        <img src={editData.imagen} alt="Previsualización" className="plato-img" />
                      ) : (
                        <img src={plato.imagen} alt={plato.nombre} className="plato-img" />
                      )}
                      {editandoId === plato.id && (
                        <input
                          type="file"
                          name="imagen"
                          accept="image/*"
                          onChange={handleChange}
                          style={{ marginTop: '5px' }}
                        />
                      )}
                    </td>
                    {["nombre", "descripcion", "alergenos", "categoria", "subcategoria", "precio"].map((campo) => (
                      <td key={campo}>
                        {editandoId === plato.id ? (
                          campo === "descripcion" ? (
                            <textarea name={campo} value={editData[campo] || ""} onChange={handleChange} rows="2" />
                          ) : (
                            <input
                              type={campo === "precio" ? "number" : "text"}
                              name={campo}
                              value={editData[campo] || ""}
                              onChange={handleChange}
                            />
                          )
                        ) : (
                          campo === "precio" ? `$${plato[campo]}` : plato[campo]
                        )}
                      </td>
                    ))}
                    <td>
                      {editandoId === plato.id ? (
                        <>
                          <button className="edit-btn" onClick={() => handleSave(plato.id)}>💾</button>
                          <button className="delete-btn" onClick={handleCancel}>✖️</button>
                        </>
                      ) : (
                        <>
                          <button className="edit-btn" onClick={() => handleEditClick(plato)}>✏️</button>
                          <button className="delete-btn" onClick={() => handleDelete(plato.id)}>🗑️</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="empty-state">No hay platos para mostrar.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default AdminPlatos;