import React, { useState, useEffect } from "react";
import "./HomePage.css";

export default function HomePage() {
  const [platos, setPlatos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  useEffect(() => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwibm9tYnJlIjoiYWRtaW4iLCJpYXQiOjE3NTE0MTYwMzMsImV4cCI6MTc1MTQxOTYzM30.a8dRwK6dsnoeLhGnG-wvPYs9NXL9ROF9G6Bop2y5OvY";
    fetch("http://localhost:3001/api/platos?disponible=true", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
<<<<<<< Updated upstream
            {menuData.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.title}
=======
            {Object.keys(categorias).map((cat) => (
              <a key={cat} href={`#${cat.replace(/\s/g, "").toLowerCase()}`}>
                {cat}
>>>>>>> Stashed changes
              </a>
            ))}
          </nav>

<<<<<<< Updated upstream
          {menuData.map((section) => (
            <section key={section.id} id={section.id} className="menu-section">
              <div className="section-container">
                <h2>{section.title}</h2>
                {section.subsections
                  ? section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex}>
                        <h3 className="menu-subtitle">{subsection.subtitle}</h3>
                        {subsection.dishes.map((dish, index) => (
                          <div
                            key={index}
                            className="dish-card"
                            onClick={() => handleDishClick(dish)} // Maneja el clic
                          >
                            <img
                              src={dish.image}
                              className="dish-image"
                              alt={dish.name}
                            />
                            <div className="dish-info">
                              <h3>{dish.name}</h3>
                              <p>{dish.description}</p>
                              <p>
                                <span className="highlight">Alérgenos:</span>{" "}
                                {dish.allergens}
                              </p>
                              <p>
                                <span className="highlight">Precio:</span>{" "}
                                {dish.price}
=======
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
>>>>>>> Stashed changes
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))
<<<<<<< Updated upstream
                  : section.dishes.map((dish, index) => (
                      <div
                        key={index}
                        className="dish-card"
                        onClick={() => handleDishClick(dish)} // Maneja el clic
                      >
                        <img
                          src={dish.image}
                          className="dish-image"
                          alt={dish.name}
                        />
                        <div className="dish-info">
                          <h3>{dish.name}</h3>
                          <p>{dish.description}</p>
                          <p>
                            <span className="highlight">Alérgenos:</span>{" "}
                            {dish.allergens}
                          </p>
                          <p>
                            <span className="highlight">Precio:</span>{" "}
                            {dish.price}
                          </p>
                        </div>
                      </div>
                    ))}
=======
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
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
              src={selectedDish.image}
              alt={selectedDish.name}
              className="modal-image"
            />
            <div className="modal-info">
              <h3>{selectedDish.name}</h3>
              <p>{selectedDish.description}</p>
              <p>
                <span className="highlight">Alérgenos:</span>{" "}
                {selectedDish.allergens}
              </p>
              <p>
                <span className="highlight">Precio:</span> {selectedDish.price}
=======
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
>>>>>>> Stashed changes
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}