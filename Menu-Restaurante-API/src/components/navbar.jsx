"use client"

import * as React from "react"
import BottomNavigation from "@mui/material/BottomNavigation"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import { accordionDetailsClasses } from "@mui/material"

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState(null)

  const handleChange = (event, newValue) => {
    setValue(newValue)

    // Scroll a la sección entrantes cuando se hace clic en "Menu"
    if (newValue === "menu") {
      const entrantesSection = document.getElementById("menu")
      if (entrantesSection) {
        entrantesSection.scrollIntoView({ behavior: "smooth" })
      }
    }

    // Scroll al footer cuando se hace clic en "Menu"
    if (newValue === "nosotros") {
      const footerSection = document.getElementById("footer")
      if (footerSection) {
        footerSection.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

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
        {/* Icono de copa a la izquierda */}
        <Box sx={{ width: "36px", display: "flex", justifyContent: "center" }}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: "black" }}
          >
            <path
              d="M8 22H16M12 17V22M17.5 2H6.5L7.5 9.5C7.5 11.5 9.5 13 12 13C14.5 13 16.5 11.5 16.5 9.5L17.5 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Box>

        {/* Sección central con opciones */}
        <Box
          sx={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
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

          {/* Línea divisoria */}
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              backgroundColor: "rgba(128, 128, 128, 0.3)",
              height: "60%",
              margin: "0 5px",
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
