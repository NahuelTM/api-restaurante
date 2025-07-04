import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminPlatos.css";
import "./AdminUsuarios.css";

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
    disponible: "",
    imagen: "",
    imagenFile: null,
  });
  const [showModal, setShowModal] = useState(false);
  const [accesoDenegado, setAccesoDenegado] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAccesoDenegado(true);
      return;
    }
    const fetchPlatos = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/platos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlatos(res.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setAccesoDenegado(true);
        } else {
          console.error("Error al obtener platos:", error);
        }
      }
    };
    fetchPlatos();
  }, []);

  const resetEditData = () => {
    setEditData({
      nombre: "",
      descripcion: "",
      alergenos: "",
      categoria: "",
      subcategoria: "",
      precio: "",
      disponible: "",
      imagen: "",
      imagenFile: null,
    });
  };

  const handleAddPlato = async () => {
    try {
      const token = localStorage.getItem("token");
      let platoDataToSave = { ...editData };

      if (!platoDataToSave.nombre || !platoDataToSave.precio || !platoDataToSave.categoria) {
        alert("Por favor, completa al menos el Nombre, Precio y Categoría.");
        return;
      }

      const { imagen, imagenFile, ...platoDataWithoutImage } = platoDataToSave;

      const res = await axios.post(
        "http://localhost:3001/api/platos",
        platoDataWithoutImage,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const nuevoPlatoId = res.data.id;
      let finalImagenUrl = "https://via.placeholder.com/150?text=Sin+Imagen";

      if (editData.imagenFile) {
        const formData = new FormData();
        formData.append("foto", editData.imagenFile);

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
        finalImagenUrl = imageUploadRes.data.url;
      }

      setPlatos((prev) => [...prev, { ...res.data, imagen: finalImagenUrl }]);
      setShowModal(false);
      resetEditData();
      alert("Plato agregado con éxito.");
    } catch (error) {
      console.error("Error al agregar el plato:", error.response ? error.response.data : error.message);
      alert(`Error al agregar el plato: ${error.response && error.response.data && error.response.data.error ? error.response.data.error : error.message}. Consulta la consola para más detalles.`);
      if (error.response && error.response.status === 401) {
        setAccesoDenegado(true);
      }
    }
  };

  const handleEditClick = (plato) => {
    setEditandoId(plato.id);
    setEditData({ ...plato, imagenFile: null });
  };

  const handleCancel = () => {
    setEditandoId(null);
    resetEditData();
  };

  const convertirArchivoABase64 = (file) => {
    return new Promise((resolve, reject) => {
      const lector = new FileReader();
      lector.onloadend = () => resolve(lector.result);
      lector.onerror = reject;
      lector.readAsDataURL(file);
    });
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

      if (!editData.nombre || !editData.precio || !editData.categoria) {
        alert("Por favor, completa al menos el Nombre, Precio y Categoría.");
        return;
      }

      let updatedImageUrl = editData.imagen;

      if (editData.imagenFile) {
        const formData = new FormData();
        formData.append("foto", editData.imagenFile);

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
        updatedImageUrl = imageRes.data.url;
      }

      const { imagenFile, ...restData } = editData;
      const platoDataToUpdate = { ...restData, imagen: updatedImageUrl };

      await axios.put(`http://localhost:3001/api/platos/${id}`, platoDataToUpdate, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPlatos((prev) =>
        prev.map((plato) =>
          plato.id === id ? { ...plato, ...platoDataToUpdate } : plato
        )
      );

      setEditandoId(null);
      resetEditData();
      alert("Plato actualizado con éxito.");
    } catch (error) {
      console.error("Error al actualizar el plato:", error.response ? error.response.data : error.message);
      alert(`Error al actualizar el plato: ${error.response && error.response.data && error.response.data.error ? error.response.data.error : error.message}. Consulta la consola para más detalles.`);
      if (error.response && error.response.status === 401) {
        setAccesoDenegado(true);
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
 
      alert("Plato eliminado con éxito.");
      // *** ESTA ES LA LÍNEA MODIFICADA ***
      const res = await axios.get("http://localhost:3001/api/platos");
      setPlatos(res.data);
 
    } catch (error) {
      console.error("Error al eliminar el plato:", error.response ? error.response.data : error.message);
      alert("Error al eliminar el plato. Por favor, intenta de nuevo.");
      if (error.response && error.response.status === 401) {
        handleLogout();
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const platosFiltrados = platos.filter((plato) =>
    plato && plato.nombre && plato.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

if (accesoDenegado) {
  return (
    <div className="admin-container">
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
      <main className="admin-content">
        <div className="admin-header">
          <h2 className="admin-title">Administración de Platos</h2>
          <div className="admin-divider"></div>
        </div>
        <div
          className="empty-state"
          style={{
            textAlign: "center",
            marginTop: "2rem",
            fontSize: "1.2rem",
            color: "#c00",
            background: "#fff",
            borderRadius: "10px",
            width: "100vw",
            maxWidth: "100vw",
            padding: "40px 20px",
            marginLeft: "auto",
            marginRight: "auto",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}
        >
          Acceso denegado. Iniciá sesión para continuar.
        </div>
      </main>
    </div>
  );
}

  return (
    <div className="admin-container">
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
                type="text"
                name="disponible"
                placeholder="Disponible"
                value={editData.disponible || ""}
                onChange={handleChange}
              />
              <input
                type="file"
                name="imagen"
                accept="image/*"
                onChange={handleChange}
              />
              {editData.imagen && (
                <img src={editData.imagen} alt="Previsualización" style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px', display: 'block' }} />
              )}
              <div className="modal-actions">
                <button onClick={handleAddPlato}>Guardar</button>
                <button onClick={() => { setShowModal(false); resetEditData(); }}>Cancelar</button>
              </div>
            </div>
          </div>
        )}

        {/* Cards de platos */}
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
                  <br />
                  <strong>Disponible:</strong>{" "}
                  {editandoId === plato.id ? (
                    <input type="text" name="disponible" value={editData.disponible || ""} onChange={handleChange} />
                  ) : (
                    plato.disponible
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

        {/* Tabla de platos */}
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
                <th>Disponible</th>
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
                        <input
                          type="text"
                          name="disponible"
                          value={editData.disponible || ""}
                          onChange={handleChange}
                        />
                      ) : (
                        plato.disponible
                      )}
                    </td>
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
                  <td colSpan="9" className="empty-state">No hay platos para mostrar.</td>
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