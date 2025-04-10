"use client"
import { useEffect, useState } from "react"
import BottomNavigation from "@mui/material/BottomNavigation"
import Box from "@mui/material/Box"

export default function LabelBottomNavigation() {
  // Inicializar con null para que ninguna opción esté seleccionada al inicio
  const [value, setValue] = useState(null)

  const handleChange = (event, newValue) => {
    setValue(newValue)

    // Scroll a la sección entrantes cuando se hace clic en "Menu"
    if (newValue === "menu") {
      const menuSection = document.getElementById("menu")
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: "smooth" })
      }
    }

    // Scroll al footer cuando se hace clic en "Nosotros"
    if (newValue === "nosotros") {
      const footerElement = document.querySelector("footer")
      if (footerElement) {
        footerElement.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  // Usar scroll event para detectar la posición y actualizar la selección
  useEffect(() => {
    // Función para determinar qué sección está visible
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      // Obtener las posiciones de las secciones
      const heroSection = document.querySelector(".hero-content")
      const menuSection = document.getElementById("menu")
      const footerElement = document.querySelector("footer")

      if (!heroSection || !menuSection || !footerElement) return

      const heroRect = heroSection.getBoundingClientRect()
      const menuRect = menuSection.getBoundingClientRect()
      const footerRect = footerElement.getBoundingClientRect()

      const heroTop = heroRect.top + window.scrollY
      const heroBottom = heroRect.bottom + window.scrollY
      const menuTop = menuRect.top + window.scrollY
      const menuBottom = menuRect.bottom + window.scrollY
      const footerTop = footerRect.top + window.scrollY

      if (scrollPosition >= footerTop) {
        setValue("nosotros")
      } else if (scrollPosition >= menuTop && scrollPosition < footerTop) {
        setValue("menu")
      } else if (scrollPosition < menuTop) {
        setValue(null)
      }
    }

    handleScroll()

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Color naranja para los elementos seleccionados
  const orangeGradient = "linear-gradient(to right, #CA652D, #E89454, #FEB473, #E4884F)"

  return (
    <BottomNavigation
      sx={{
        width: { xs: "260px", sm: "300px", md: "340px" },
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        borderRadius: "50px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        backgroundColor: "#fff",
        padding: "0",
        height: "56px",
        overflow: "hidden",
      }}
      value={value}
      onChange={handleChange}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 15px",
        }}
      >
        { /*Logo navbar*/}
        <Box sx={{ width: "36px", display: "flex", justifyContent: "center" }}>
          {}
          <img
            src="src\assets\Logos\Favicon3.ico"
            alt="Logo Niquel"
            style={{
              width: "30px",
              height: "30px",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Sección central con opciones */}
        <Box
          sx={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* Opción Menu */}
          <Box
            onClick={() => handleChange(null, "menu")}
            sx={{
              cursor: "pointer",
              padding: "0 16px",
              fontWeight: "700",
              fontSize: value === "menu" ? "17px" : "15px",
              color: value === "menu" ? "transparent" : "black",
              backgroundImage: value === "menu" ? orangeGradient : "none",
              backgroundClip: value === "menu" ? "text" : "none",
              WebkitBackgroundClip: value === "menu" ? "text" : "none",
              display: "flex",
              alignItems: "center",
              height: "100%",
              position: "relative",
              transition: "all 0.3s ease",
            }}
          >
            Menu
          </Box>

          {/* Línea divisoria vertical - ahora como un elemento independiente */}
          <Box
            sx={{
              height: "20px", 
              width: "1px", 
              backgroundColor: "rgba(128, 128, 128, 0.3)",
              margin: "0 10px",
            }}
          />

          {/* Opción Nosotros */}
          <Box
            onClick={() => handleChange(null, "nosotros")}
            sx={{
              cursor: "pointer",
              padding: "0 16px",
              fontWeight: "700",
              fontSize: value === "nosotros" ? "17px" : "15px",
              color: value === "nosotros" ? "transparent" : "black",
              backgroundImage: value === "nosotros" ? orangeGradient : "none",
              backgroundClip: value === "nosotros" ? "text" : "none",
              WebkitBackgroundClip: value === "nosotros" ? "text" : "none",
              display: "flex",
              alignItems: "center",
              height: "100%",
              position: "relative",
              transition: "all 0.3s ease",
            }}
          >
            Nosotros
          </Box>
        </Box>
      </Box>
    </BottomNavigation>
  )
}
