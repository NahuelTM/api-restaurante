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
      </div>

  <div class="menu-container">
    <main class="menu-content">
      <section class="menu-section">

      <nav className="menu-nav">
          <a href="#entrantes">Entrantes</a>
          <a href="#ensaladas">Ensaladas</a>
          <a href="#platos">Platos</a>
          <a href="#postres">Postres</a>
          <a href="#bebidas">Bebidas</a>
        </nav>
    

        <div class="dish-card">
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836" class="dish-image" alt="Carpaccio de Trufa" />
          <div class="dish-info">
            <h3>Carpaccio de Trufa</h3>
            <p>Finas láminas de res con aceite de trufa y parmesano.</p>
            <p><span class="highlight">Alérgenos:</span> Lácteos.</p>
            <p><span class="highlight">Precio:</span> $20,000</p>
          </div>
        </div>

        <div class="dish-card">
          <img src="https://images.unsplash.com/photo-1505253758473-96b7015fcd40" class="dish-image" alt="Burrata" />
          <div class="dish-info">
            <h3>Burrata</h3>
            <p>Burrata cremosa con tomates y vinagreta balsámico.</p>
            <p><span class="highlight">Alérgenos:</span> Lácteos.</p>
            <p><span class="highlight">Precio:</span> $16,500</p>
          </div>
        </div>

        <div class="dish-card">
          <img src="https://images.unsplash.com/photo-1505253758473-96b7015fcd40" class="dish-image" alt="Burrata" />
          <div class="dish-info">
            <h3>Burrata</h3>
            <p>Burrata cremosa con tomates y vinagreta balsámico.</p>
            <p><span class="highlight">Alérgenos:</span> Lácteos.</p>
            <p><span class="highlight">Precio:</span> $16,500</p>
          </div>
        </div>

        <div class="dish-card">
          <img src="https://images.unsplash.com/photo-1505253758473-96b7015fcd40" class="dish-image" alt="Burrata" />
          <div class="dish-info">
            <h3>Burrata</h3>
            <p>Burrata cremosa con tomates y vinagreta balsámico.</p>
            <p><span class="highlight">Alérgenos:</span> Lácteos.</p>
            <p><span class="highlight">Precio:</span> $16,500</p>
          </div>
        </div>

        <div class="dish-card">
          <img src="https://images.unsplash.com/photo-1505253758473-96b7015fcd40" class="dish-image" alt="Burrata" />
          <div class="dish-info">
            <h3>Burrata</h3>
            <p>Burrata cremosa con tomates y vinagreta balsámico.</p>
            <p><span class="highlight">Alérgenos:</span> Lácteos.</p>
            <p><span class="highlight">Precio:</span> $16,500</p>
          </div>
        </div>

        <div class="dish-card">
          <img src="https://images.unsplash.com/photo-1505253758473-96b7015fcd40" class="dish-image" alt="Burrata" />
          <div class="dish-info">
            <h3>Burrata</h3>
            <p>Burrata cremosa con tomates y vinagreta balsámico.</p>
            <p><span class="highlight">Alérgenos:</span> Lácteos.</p>
            <p><span class="highlight">Precio:</span> $16,500</p>
          </div>
        </div>

        <div class="dish-card">
          <img src="https://images.unsplash.com/photo-1505253758473-96b7015fcd40" class="dish-image" alt="Burrata" />
          <div class="dish-info">
            <h3>Burrata</h3>
            <p>Burrata cremosa con tomates y vinagreta balsámico.</p>
            <p><span class="highlight">Alérgenos:</span> Lácteos.</p>
            <p><span class="highlight">Precio:</span> $16,500</p>
          </div>
        </div>

        <div class="dish-card">
          <img src="https://images.unsplash.com/photo-1505253758473-96b7015fcd40" class="dish-image" alt="Burrata" />
          <div class="dish-info">
            <h3>Burrata</h3>
            <p>Burrata cremosa con tomates y vinagreta balsámico.</p>
            <p><span class="highlight">Alérgenos:</span> Lácteos.</p>
            <p><span class="highlight">Precio:</span> $16,500</p>
          </div>
        </div>
      </section>
    </main>
  </div>
    </main>

    
  )
}
