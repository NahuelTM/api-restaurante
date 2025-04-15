"use client";

import React, { useState, useEffect } from "react";
import menuData from "../assets/menuData.json";
import "./HomePage.css";

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null); // Estado para el modal

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  }, []);

  const handleDishClick = (dish) => {
    setSelectedDish(dish); // Establece el plato seleccionado
  };

  const closeModal = () => {
    setSelectedDish(null); // Cierra el modal
  };

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
            {menuData.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.title}
              </a>
            ))}
          </nav>

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
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))
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
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
