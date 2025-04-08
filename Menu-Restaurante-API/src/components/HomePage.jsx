"use client";

import { useState, useEffect } from "react";
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
          <div className="brand-name">
            <h1>niquel</h1>
          </div>

          <div className="hero-content">
            <h2 className="experience-text">Experiencia Culinaria</h2>
            <h3 className="country-name">Argentina</h3>
            <p className="tagline">
              Viví una experiencia única con nuestra cocteleria y restaurante de
              autor.
            </p>
          </div>
        </div>

        <div className="menu-container">
          <main className="menu-content">
            <nav className="menu-nav">
              <a href="#entrantes">Entrantes</a>
              <a href="#ensaladas">Ensaladas</a>
              <a href="#platos">Platos</a>
              <a href="#postres">Postres</a>
              <a href="#bebidas">Bebidas</a>
            </nav>

            {/* Sección Entrantes */}
            <section id="entrantes" className="menu-section">
              <div className="section-container">
                <h2>Entrantes</h2>

                <div className="dish-card">
                  <img
                    src="src\assets\Imagenes\entrantes\tartarDeSalmon.jpg"
                    className="dish-image"
                    alt="Carpaccio de Trufa"
                  />
                  <div className="dish-info">
                    <h3>Tartar de Salmón</h3>
                    <p>Salmón fresco con aguacate y caviar negro.</p>
                    <p>
                      <span className="highlight">Alérgenos:</span> Pescado,
                      Moluscos, Lácteos.
                    </p>
                    <p>
                      <span className="highlight">Precio:</span> $20,000
                    </p>
                  </div>
                </div>

                <div className="dish-card">
                  <img
                    src="src\assets\Imagenes\entrantes\carpaccioDeRes.jpg"
                    className="dish-image"
                    alt="Burrata"
                  />
                  <div className="dish-info">
                    <h3>Carpaccio de Trufa</h3>
                    <p>Finas láminas de res con aceite de trufa y parmesano.</p>
                    <p>
                      <span className="highlight">Alérgenos:</span> Lácteos.
                    </p>
                    <p>
                      <span className="highlight">Precio:</span> $16,500
                    </p>
                  </div>
                </div>

                <div className="dish-card">
                  <img
                    src="src\assets\Imagenes\entrantes\burrata.jpg"
                    className="dish-image"
                    alt="Burrata"
                  />
                  <div className="dish-info">
                    <h3>Burrata</h3>
                    <p>Burrata cremosa con tomates y vinagreta balsámico.</p>
                    <p>
                      <span className="highlight">Alérgenos:</span> Lácteos.
                    </p>
                    <p>
                      <span className="highlight">Precio:</span> $16,500
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Sección Ensaladas */}
            <section id="ensaladas" className="menu-section">
              <div className="section-container">
                <h2>Ensaladas</h2>
                <div className="dish-card">
                  <img
                    src="src\assets\Imagenes\ensaladas\ensaladaLangostaPomelo.jpg"
                    className="dish-image"
                    alt="Burrata"
                  />
                  <div className="dish-info">
                    <h3>Langosta y Pomelo</h3>
                    <p> Langosta, pomelo y vinagreta de miel y mostaza.</p>
                    <p>
                      <span className="highlight">Alérgenos:</span> Mariscos,
                      Mostaza.
                    </p>
                    <p>
                      <span className="highlight">Precio:</span> $22,500
                    </p>
                  </div>
                </div>

                <div className="dish-card">
                  <img
                    src="src\assets\Imagenes\ensaladas\quinoaGranada.jpg"
                    className="dish-image"
                    alt="Burrata"
                  />
                  <div className="dish-info">
                    <h3>Quinoa y Granada</h3>
                    <p> Quinoa, verduras asadas y semillas de granada.</p>
                    <p>
                      <span className="highlight">Alérgenos:</span> Ninguno.
                    </p>
                    <p>
                      <span className="highlight">Precio:</span> $16,500
                    </p>
                  </div>
                </div>

                <div className="dish-card">
                  <img
                    src="src\assets\Imagenes\ensaladas\capresse.jpg"
                    className="dish-image"
                    alt="Burrata"
                  />
                  <div className="dish-info">
                    <h3>Capresse</h3>
                    <p>Tomates frescos, mozzarella de búfala, y albahaca.</p>
                    <p>
                      <span className="highlight">Alérgenos:</span> Lácteos.
                    </p>
                    <p>
                      <span className="highlight">Precio:</span> $18,500
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Sección Platos principales */}
            <section id="platos" className="menu-section">
              <div className="section-container">
                <h2>Principales</h2>
                <h3 className="menu-subtitle">Carnes rojas</h3>
                <div className="dish-card">
                  <img
                    src="src\assets\Imagenes\Platos\fileteDeRes.jpg"
                    className="dish-image"
                    alt="Burrata"
                  />
                  <div className="dish-info">
                    <h3>Filete de res</h3>
                    <p>
                      Filete de res con salsa de vino tinto y puré de trufas.
                    </p>
                    <p>
                      <span className="highlight">Alérgenos:</span> Lácteos,
                      Sulfitos.
                    </p>
                    <p>
                      <span className="highlight">Precio:</span> $36,500
                    </p>
                  </div>
                </div>

                <div className="dish-card">
                  <img
                    src="src\assets\Imagenes\Platos\costillasDeCordero.jpg"
                    className="dish-image"
                    alt="Burrata"
                  />
                  <div className="dish-info">
                    <h3>Costillas de Cordero</h3>
                    <p>
                      Costillas asadas con reducción de romero y papas
                      gratinadas.
                    </p>
                    <p>
                      <span className="highlight">Alérgenos:</span> Lácteos.
                    </p>
                    <p>
                      <span className="highlight">Precio:</span> $30,500
                    </p>
                  </div>
                </div>

                <h3 className="menu-subtitle">Carnes blancas</h3>
                <div className="dish-card">
                  <img
                    src="src\assets\Imagenes\Platos\pechugaDePato.jpg"
                    className="dish-image"
                    alt="Burrata"
                  />
                  <div className="dish-info">
                    <h3>Pechuga de Pato</h3>
                    <p>Pato con salsa de oporto y frutos rojos.</p>
                    <p>
                      <span className="highlight">Alérgenos:</span> Sulfitos.
                    </p>
                    <p>
                      <span className="highlight">Precio:</span> $28,500
                    </p>
                  </div>
                </div>

                <div className="dish-card">
                  <img
                    src="src\assets\Imagenes\Platos\polloDeCorral.jpg"
                    className="dish-image"
                    alt="Pollo de corral"
                  />
                  <div className="dish-info">
                    <h3>Pollo de Corral</h3>
                    <p> Pollo asado con salsa de limón y espárragos.</p>
                    <p>
                      <span className="highlight">Alérgenos:</span> Ninguno.
                    </p>
                    <p>
                      <span className="highlight">Precio:</span> $18,500
                    </p>
                  </div>
                </div>

                <h3 className="menu-subtitle">Pescados</h3>
                <div className="dish-card">
                  <img
                    src="src\assets\Imagenes\Platos\lubina.jpg"
                    className="dish-image"
                    alt="Lubina con espárragos y salsa de azafrán"
                  />
                  <div className="dish-info">
                    <h3>Lubina con Azafrán</h3>
                    <p>Lubina con espárragos y salsa de azafrán.</p>
                    <p>
                      <span className="highlight">Alérgenos:</span> Pescado.
                    </p>
                    <p>
                      <span className="highlight">Precio:</span> $24,500
                    </p>
                  </div>
                </div>

                <div className="dish-card">
                  <img
                    src="src\assets\Imagenes\Platos\truchaAlcaparras.jpg"
                    className="dish-image"
                    alt="Trucha y alcaparras"
                  />
                  <div className="dish-info">
                    <h3>Trucha y Alcaparras</h3>
                    <p> Trucha con mantequilla de limón y alcaparras.</p>
                    <p>
                      <span className="highlight">Alérgenos:</span> Lácteos.
                    </p>
                    <p>
                      <span className="highlight">Precio:</span> $26,400
                    </p>
                  </div>
                </div>

                <h3 className="menu-subtitle">Pastas</h3>
                <div className="dish-card">
                  <img
                    src="src\assets\Imagenes\Pastas\tagliatelleTrufas.jpg"
                    className="dish-image"
                    alt="Tagliatelle con trufa"
                  />
                  <div className="dish-info">
                    <h3>Tagliatelle con Trufa</h3>
                    <p>Pasta fresca con salsa de trufa y parmesano.</p>
                    <p>
                      <span className="highlight">Alérgenos:</span> Gluten,
                      Lácteos.
                    </p>
                    <p>
                      <span className="highlight">Precio:</span> $22,700
                    </p>
                  </div>
                </div>
                <div className="dish-card">
                  <img
                    src="src\assets\Imagenes\Pastas\ravioli.jpg"
                    className="dish-image"
                    alt="Ravioli de ricota y espinaca"
                  />
                  <div className="dish-info">
                    <h3>Ravioli Ricotta y Espinaca</h3>
                    <p>Ravioli con salsa de mantequilla y salvia.</p>
                    <p>
                      <span className="highlight">Alérgenos:</span> Gluten,
                      Lácteos.
                    </p>
                    <p>
                      <span className="highlight">Precio:</span> $21,500
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Sección Postres */}
            <section id="postres" className="menu-section">
              <div className="section-container">
                <h2>Postres</h2>
                <div className="dish-card">
                  <img
                    src="src\assets\Imagenes\Postres\mouseChocolate.jpg"
                    className="dish-image"
                    alt="Mouse de chocolate con frambuesas"
                  />
                  <div className="dish-info">
                    <h3>Mousse Chocolate</h3>
                    <p>Mousse de chocolate con frambuesas frescas.</p>
                    <p>
                      <span className="highlight">Alérgenos:</span> Lácteos,
                      Soja.
                    </p>
                    <p>
                      <span className="highlight">Precio:</span> $15,500
                    </p>
                  </div>
                </div>

                <div className="dish-card">
                  <img
                    src="src\assets\Imagenes\Postres\lemonPie.jpg"
                    className="dish-image"
                    alt="Lemon Pie"
                  />
                  <div className="dish-info">
                    <h3>Lemon Pie</h3>
                    <p>Tarta de limón con base de almendra.</p>
                    <p>
                      <span className="highlight">Alérgenos:</span> Gluten,
                      Frutos secos, Lácteos.
                    </p>
                    <p>
                      <span className="highlight">Precio:</span> $13,500
                    </p>
                  </div>
                </div>
                <div className="dish-card">
                  <img
                    src="src\assets\Imagenes\Postres\macarronesPistacchio.jpg"
                    className="dish-image"
                    alt="Macarons de Pistacchio y Frambuesas"
                  />
                  <div className="dish-info">
                    <h3>Macarons de Pistacho y Frambuesa</h3>
                    <p>Macarons rellenos de pistacho y frambuesa.</p>
                    <p>
                      <span className="highlight">Alérgenos:</span> Lácteos.
                    </p>
                    <p>
                      <span className="highlight">Precio:</span> $12,200
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Sección Bebidas */}
            {/* Sección Bebidas con alcohol */}

            <section id="bebidas" className="menu-section">
              <div className="section-container">
                <h2>Bebidas</h2>
                <div className="dish-card">
                  <img
                    src="src\assets\Imagenes\Tragos\atelierMartini.jpg"
                    className="dish-image"
                    alt="Atelier Martini"
                  />
                  <div className="dish-info">
                    <h3>Atelier Martini</h3>
                    <p>Gin, vermouth seco y esencia cítrica artesana.</p>
                    <p>
                      <span className="highlight">Alérgenos:</span> Ninguno.
                    </p>
                    <p>
                      <span className="highlight">Precio:</span> $10,500
                    </p>
                  </div>
                </div>

                <div className="dish-card">
                  <img
                    src="src\assets\Imagenes\Tragos\nocturnoSpritz.png"
                    className="dish-image"
                    alt="Nocturno Spritz"
                  />
                  <div className="dish-info">
                    <h3>Nocturno Spritz</h3>
                    <p>
                      {" "}
                      Aperol, espumante rosado, frutos rojos y albahaca fresca.
                    </p>
                    <p>
                      <span className="highlight">Alérgenos:</span> Ninguno.
                    </p>
                    <p>
                      <span className="highlight">Precio:</span> $11,500
                    </p>
                  </div>
                </div>

                <div className="dish-card">
                  <img
                    src="src\assets\Imagenes\Tragos\brisaDelPlata.png"
                    className="dish-image"
                    alt="Brisa del Plata"
                  />
                  <div className="dish-info">
                    <h3>Brisa del Plata</h3>
                    <p>Vodka Grey Goose, lima fresca y almíbar de jazmín.</p>
                    <p>
                      <span className="highlight">Alérgenos:</span> Ninguno.
                    </p>
                    <p>
                      <span className="highlight">Precio:</span> $15,500
                    </p>
                  </div>
                </div>

                <div className="dish-card">
                  <img
                    src="src\assets\Imagenes\Tragos\negroniReserva.jpg"
                    className="dish-image"
                    alt="Negroni Reserva"
                  />
                  <div className="dish-info">
                    <h3>Negroni Reserva</h3>
                    <p>Gin, vermouth seco y esencia cítrica artesanal.</p>
                    <p>
                      <span className="highlight">Alérgenos:</span> Ninguno.
                    </p>
                    <p>
                      <span className="highlight">Precio:</span> $10,500
                    </p>
                  </div>
                </div>

                <div className="dish-card">
                  <img
                    src="src\assets\Imagenes\Tragos\goldenMule.jpg"
                    className="dish-image"
                    alt="Golden Mule"
                  />
                  <div className="dish-info">
                    <h3>Golden Mule</h3>
                    <p>
                      Aperol, espumante rosado, frutos rojos y albahaca fresca.
                    </p>
                    <p>
                      <span className="highlight">Alérgenos:</span> Ninguno.
                    </p>
                    <p>
                      <span className="highlight">Precio:</span> $11,500
                    </p>
                  </div>
                </div>

                {/* Sección Bebidas sin alcohol */}

                <h2>Bebidas sin alcohol</h2>

                <div className="dish-card">
                  <img
                    src="src\assets\Imagenes\BebidasSinAlcohol\limonadaFizz.jpg"
                    className="dish-image"
                    alt="Limonada Fizz"
                  />
                  <div className="dish-info">
                    <h3>Limonada Fizz</h3>
                    <p>Limonada con un toque de menta fresca y jengibre.</p>
                    <p>
                      <span className="highlight">Alérgenos:</span> Ninguno.
                    </p>
                    <p>
                      <span className="highlight">Precio:</span> $9,500
                    </p>
                  </div>
                </div>

                <div className="dish-card">
                  <img
                    src="src\assets\Imagenes\BebidasSinAlcohol\aguaManantial.jpg"
                    className="dish-image"
                    alt="Agua manantial"
                  />
                  <div className="dish-info">
                    <h3>Agua manantial</h3>
                    <p>Agua mineral premium de los Andes.</p>
                    <p>
                      <span className="highlight">Alérgenos:</span> Ninguno.
                    </p>
                    <p>
                      <span className="highlight">Precio:</span> $3,500
                    </p>
                  </div>
                </div>
                <div className="dish-card">
                  <img
                    src="src\assets\Imagenes\BebidasSinAlcohol\gaseosas.jpg"
                    className="dish-image"
                    alt="Gaseosas"
                  />
                  <div className="dish-info">
                    <h3>Gaseosa</h3>
                    <p>Exclusiva selección de gaseosas de Coca-Cola.</p>
                    <p>
                      <span className="highlight">Alérgenos:</span> Ninguno.
                    </p>
                    <p>
                      <span className="highlight">Precio:</span> $5,500
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </main>
      
  
  );
}
