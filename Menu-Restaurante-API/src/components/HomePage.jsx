import React, { useState, useEffect } from "react";
import "./HomePage.css";

export default function HomePage() {
  const [platos, setPlatos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/platos?disponible=true", {
    })
      .then((res) => res.json())
      .then((data) => {
        setPlatos(data);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error("Error al obtener los platos:", err);
        setIsLoaded(true);
      });
  }, []);

  // Agrupar platos por categoria y subcategoria
  const categorias = {};
  platos.forEach((plato) => {
    const categoria = plato.categoria || "Otros";
    const subcategoria = plato.subcategoria || null;
    if (!categorias[categoria]) categorias[categoria] = {};
    if (!categorias[categoria][subcategoria]) categorias[categoria][subcategoria] = [];
    categorias[categoria][subcategoria].push(plato);
  });

  const handleDishClick = (dish) => setSelectedDish(dish);
  const closeModal = () => setSelectedDish(null);

  return (
    <main className={`home-container ${isLoaded ? "loaded" : ""}`}>
      <div className="overlay"></div>
      <div className="content">
        <div className="hero-content">
          <h2 className="experience-text">Descubre</h2>
          <h3 className="country-name">niquel</h3>
          <p className="tagline">
            Comida y tragos de selección, creaciones exclusivas.
          </p>
        </div>
      </div>

      <div id="menu" className="menu-container">
        <main className="menu-content">
          <nav className="menu-nav">
            {Object.keys(categorias).map((cat) => (
              <a key={cat} href={`#${cat.replace(/\s/g, "").toLowerCase()}`}>
                {cat}
              </a>
            ))}
          </nav>

          {Object.entries(categorias).map(([cat, subs]) => (
            <section
              key={cat}
              id={cat.replace(/\s/g, "").toLowerCase()}
              className="menu-section"
            >
              <div className="section-container">
                <h2>{cat}</h2>
                {Object.keys(subs).length > 1
                  ? Object.entries(subs).map(([subcat, platosArr]) => (
                      <div key={subcat || "sin-subcategoria"}>
                        {subcat && (
                          <h3 className="menu-subtitle">{subcat}</h3>
                        )}
                        {platosArr.map((dish) => (
                          <div
                            key={dish.id}
                            className="dish-card"
                            onClick={() => handleDishClick(dish)}
                          >
                            <img
                              src={dish.imagen}
                              className="dish-image"
                              alt={dish.nombre}
                            />
                            <div className="dish-info">
                              <h3>{dish.nombre}</h3>
                              <p>{dish.descripcion}</p>
                              <p>
                                <span className="highlight">Alérgenos:</span>{" "}
                                {dish.alergenos}
                              </p>
                              <p>
                                <span className="highlight">Precio:</span> ${dish.precio}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))
                  : Object.values(subs).map((platosArr) =>
                      platosArr.map((dish) => (
                        <div
                          key={dish.id}
                          className="dish-card"
                          onClick={() => handleDishClick(dish)}
                        >
                          <img
                            src={dish.imagen}
                            className="dish-image"
                            alt={dish.nombre}
                          />
                          <div className="dish-info">
                            <h3>{dish.nombre}</h3>
                            <p>{dish.descripcion}</p>
                            <p>
                              <span className="highlight">Alérgenos:</span>{" "}
                              {dish.alergenos}
                            </p>
                            <p>
                              <span className="highlight">Precio:</span> ${dish.precio}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
              </div>
            </section>
          ))}
        </main>
      </div>

      {/* Modal para mostrar el plato seleccionado */}
      {selectedDish && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <img
              src={selectedDish.imagen}
              alt={selectedDish.nombre}
              className="modal-image"
            />
            <div className="modal-info">
              <h3>{selectedDish.nombre}</h3>
              <p>{selectedDish.descripcion}</p>
              <p>
                <span className="highlight">Alérgenos:</span>{" "}
                {selectedDish.alergenos}
              </p>
              <p>
                <span className="highlight">Precio:</span> ${selectedDish.precio}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}