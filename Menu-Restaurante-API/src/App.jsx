// App.jsx
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'

import HomePage from './components/HomePage'
import Footer from './components/Footer'
import Login from './components/Login'
import PortalEmpleados from './components/PortalEmpleados'
import AdminUsuarios from './components/AdminUsuarios'
import AdminPlatos from './components/AdminPlatos'

function App() {
  const [logueado, setLogueado] = useState(!!localStorage.getItem('token'))

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta de login */}
        <Route path="/login" element={<Login onLogin={() => setLogueado(true)} />} />

        {/* Ruta protegida: si está logueado muestra HomePage, si no redirige */}
        <Route
          path="/"
          element={logueado ? <HomePage /> : <Navigate to="/login" />}
        />

        {/* Portal de empleados */}
        <Route path="/portal" element={<PortalEmpleados />} />

        {/* Nuevas páginas de administración */}
        <Route path="/admin-usuarios" element={<AdminUsuarios />} />
        <Route path="/admin-platos" element={<AdminPlatos />} />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App
