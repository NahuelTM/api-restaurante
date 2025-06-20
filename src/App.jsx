import './App.css'
import HomePage from "./components/HomePage"
import Footer from './components/Footer'
import AdminTest from './components/AdminTest'
import Login from './components/Login';
import { useState, useEffect } from 'react';


function App() {
  const [logueado, setLogueado] = useState(!!localStorage.getItem('token'));

  return (
    <div>
      {logueado ? <HomePage /> : <Login onLogin={() => setLogueado(true)} />}

        <Footer></Footer>
    </div>
    
  );
}


export default App
