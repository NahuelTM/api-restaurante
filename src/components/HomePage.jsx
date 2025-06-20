import { useEffect, useState } from 'react';

export default function Homepage() {
  const [platos, setPlatos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token'); // asumimos que lo guardás ahí después del login

    fetch('http://localhost:3001/api/platos?disponible=true', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setPlatos(data));
  }, []);

  // Agrupar por categoría y subcategoría
  const secciones = platos.reduce((acc, plato) => {
    const categoria = plato.categoria || 'Sin categoría';
    const subcategoria = plato.subcategoria || 'General';

    if (!acc[categoria]) acc[categoria] = {};
    if (!acc[categoria][subcategoria]) acc[categoria][subcategoria] = [];

    acc[categoria][subcategoria].push(plato);
    return acc;
  }, {});

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🍽 Carta del Restaurante</h1>

      {Object.entries(secciones).map(([categoria, subs]) => (
        <div key={categoria}>
          <h2>{categoria}</h2>
          {Object.entries(subs).map(([sub, platos]) => (
            <div key={sub}>
              <h3>{sub}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {platos.map(plato => (
                  <div key={plato.id} style={{ border: '1px solid #ccc', padding: '1rem', width: 200 }}>
                    <img src={plato.imagen} alt={plato.nombre} style={{ width: '100%' }} />
                    <h4>{plato.nombre}</h4>
                    <p>{plato.descripcion}</p>
                    <p><strong>${plato.precio}</strong></p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
