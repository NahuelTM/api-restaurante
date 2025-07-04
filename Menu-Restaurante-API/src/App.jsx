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
        
        {/* Menu */}
        <Route path="/" element={<HomePage />} />

        {/* Ruta protegida: si está logueado muestra portal, si no redirige */}
        <Route
          path="/portal"
          element={logueado ? <PortalEmpleados /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin-usuarios"
          element={logueado ? <AdminUsuarios /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin-platos"
          element={logueado ? <AdminPlatos /> : <Navigate to="/login" />}
        />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App
