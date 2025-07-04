import React, { useState, useEffect } from "react";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const [platos, setPlatos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/platos?disponible=true", {})
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
    <main className={`${styles["home-container"]} ${isLoaded ? styles.loaded : ""}`}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <div className={styles["hero-content"]}>
          <h2 className={styles["experience-text"]}>Descubre</h2>
          <h3 className={styles["country-name"]}>niquel</h3>
          <p className={styles.tagline}>
            Comida y tragos de selección, creaciones exclusivas.
          </p>
        </div>
      </div>

      <div id="menu" className={styles["menu-container"]}>
        <main className={styles["menu-content"]}>
          <nav className={styles["menu-nav"]}>
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
              className={styles["menu-section"]}
            >
              <div className={styles["section-container"]}>
                <h2>{cat}</h2>
                {Object.keys(subs).length > 1
                  ? Object.entries(subs).map(([subcat, platosArr]) => (
                      <div key={subcat || "sin-subcategoria"}>
                        {subcat && (
                          <h3 className={styles["menu-subtitle"]}>{subcat}</h3>
                        )}
                        {platosArr.map((dish) => (
                          <div
                            key={dish.id}
                            className={styles["dish-card"]}
                            onClick={() => handleDishClick(dish)}
                          >
                            <img
                              src={dish.imagen}
                              className={styles["dish-image"]}
                              alt={dish.nombre}
                            />
                            <div className={styles["dish-info"]}>
                              <h3>{dish.nombre}</h3>
                              <p>{dish.descripcion}</p>
                              <p>
                                <span className={styles.highlight}>Alérgenos:</span>{" "}
                                {dish.alergenos}
                              </p>
                              <p>
                                <span className={styles.highlight}>Precio:</span> ${dish.precio}
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
                          className={styles["dish-card"]}
                          onClick={() => handleDishClick(dish)}
                        >
                          <img
                            src={dish.imagen}
                            className={styles["dish-image"]}
                            alt={dish.nombre}
                          />
                          <div className={styles["dish-info"]}>
                            <h3>{dish.nombre}</h3>
                            <p>{dish.descripcion}</p>
                            <p>
                              <span className={styles.highlight}>Alérgenos:</span>{" "}
                              {dish.alergenos}
                            </p>
                            <p>
                              <span className={styles.highlight}>Precio:</span> ${dish.precio}
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
        <div className={styles["modal-overlay"]} onClick={closeModal}>
          <div className={styles["modal-content"]} onClick={(e) => e.stopPropagation()}>
            <button className={styles["close-button"]} onClick={closeModal}>
              &times;
            </button>
            <img
              src={selectedDish.imagen}
              alt={selectedDish.nombre}
              className={styles["modal-image"]}
            />
            <div className={styles["modal-info"]}>
              <h3>{selectedDish.nombre}</h3>
              <p>{selectedDish.descripcion}</p>
              <p>
                <span className={styles.highlight}>Alérgenos:</span>{" "}
                {selectedDish.alergenos}
              </p>
              <p>
                <span className={styles.highlight}>Precio:</span> ${selectedDish.precio}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}