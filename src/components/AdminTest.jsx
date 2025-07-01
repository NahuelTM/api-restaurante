import { useState, useEffect } from 'react';
import './Login.css'; // Asegurate de tener los estilos del nav acá o importarlos

const API_URL = 'http://localhost:3001/api';

export default function AdminTest() {
  const [token, setToken] = useState('');
  const [platos, setPlatos] = useState([]);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    alergenos: '',
    precio: '',
    categoria: '',
    subcategoria: '',
  });

  const handleLogin = async () => {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: 'admin', password: 'admin123' })
    });
    const data = await res.json();
    setToken(data.token);
  };

  const fetchPlatos = async () => {
    const res = await fetch(`${API_URL}/platos?disponible=true`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setPlatos(data);
  };

  const crearPlato = async () => {
    const res = await fetch(`${API_URL}/platos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ ...form, precio: parseInt(form.precio), disponible: true })
    });
    const data = await res.json();
    alert(`Plato creado: ID ${data.id}`);
    fetchPlatos();
  };

  const eliminarPlato = async (id) => {
    await fetch(`${API_URL}/platos/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchPlatos();
  };

  useEffect(() => {
    if (token) fetchPlatos();
  }, [token]);

  return (
    <div className="admin-test-container">
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
         {/* <a href="/Login" className="header-login-link">Iniciar sesión</a> */}
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
      <div style={{ padding: 20 }}>
        <h2>🧪 Admin Test</h2>

        {!token ? (
          <button onClick={handleLogin}>Iniciar sesión como admin</button>
        ) : (
          <>
            <h3>Crear nuevo plato</h3>
            <input placeholder="Nombre" onChange={e => setForm({ ...form, nombre: e.target.value })} />
            <input placeholder="Descripción" onChange={e => setForm({ ...form, descripcion: e.target.value })} />
            <input placeholder="Alergenos" onChange={e => setForm({ ...form, alergenos: e.target.value })} />
            <input placeholder="Precio" type="number" onChange={e => setForm({ ...form, precio: e.target.value })} />
            <input placeholder="Categoría" onChange={e => setForm({ ...form, categoria: e.target.value })} />
            <input placeholder="Subcategoría" onChange={e => setForm({ ...form, subcategoria: e.target.value })} />
            <button onClick={crearPlato}>Crear plato</button>

            <h3>Platos existentes</h3>
            <ul>
              {platos.map(p => (
                <li key={p.id}>
                  {p.nombre} - ${p.precio} - {p.id}
                  <button onClick={() => eliminarPlato(p.id)}>Eliminar</button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
