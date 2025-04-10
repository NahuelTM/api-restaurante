"use client";

import { useState, useEffect } from "react";
import menuData from "../assets/menuData.json";
import "./HomePage.css";

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  }, []);

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
                {section.dishes.map((dish, index) => (
                  <div key={index} className="dish-card">
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
                        <span className="highlight">Precio:</span> {dish.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>
    </main>
  );
}
