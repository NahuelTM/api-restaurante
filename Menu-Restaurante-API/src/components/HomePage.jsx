"use client"

import { useState, useEffect } from "react"
import "./HomePage.css"

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 300)
  }, [])

  return (
    <main className={`home-container ${isLoaded ? "loaded" : ""}`}>
      <div className="overlay"></div>

      <div className="content">
        <div className="brand-name">
          <h1>niquel.</h1>
        </div>

        <div className="hero-content">
          <h2 className="experience-text">Experiencia Culinaria</h2>
          <h3 className="country-name">Argentina</h3>
          <p className="tagline">
            Vivi una experiencia única con
            <br />
            nuestras creaciones de autor.
          </p>
        </div>

        <div className="dish-card">
          <img src="/tartar-salmon.jpg" alt="Tartar de Salmón" className="dish-image" />
          <div className="dish-info">
            <h3>Tartar de Salmón</h3>
            <p>Salmon fresco con aguacate y caviar negro.</p>
            <p><span className="highlight">Alérgenos:</span> Pescado, Moluscos, Lácteos.</p>
            <p><span className="highlight">Precio:</span> $18,000</p>
          </div>
        </div>
      </div>
    </main>
  )
}
