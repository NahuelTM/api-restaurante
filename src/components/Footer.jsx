import { Box, Container, Typography, Grid, Link } from "@mui/material"

export default function Footer() {
  return (
    <Box
      id="footer"
      component="footer"
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        backdropFilter: "blur(10px)",
        color: "white",
        py: 6,
        position: "relative",
        zIndex: 2,
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        width: "100%", 
        boxSizing: "border-box",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={3} sx={{ textAlign: { xs: "center", sm: "left" } }}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 300,
                letterSpacing: 1,
                mb: 2,
                fontFamily: "'Chillax', sans-serif",
              }}
            >
              niquel.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 2,
                opacity: 0.7,
                maxWidth: "240px",
                mx: { xs: "auto", sm: 0 },
              }}
            >
              Experiencia culinaria argentina con ingredientes de primera calidad y sabores auténticos.
            </Typography>
          </Grid>

          {/* Información de contacto */}
          <Grid item xs={12} sm={6} md={3} sx={{ textAlign: { xs: "center", sm: "left" } }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                mb: 2,
                fontFamily: "'Chillax', sans-serif",
                fontSize: "1.1rem",
                background: "linear-gradient(to right, #CA652D, #E89454, #FEB473, #E4884F)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Contacto
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Dirección:</strong> Av. Corrientes 1234, CABA
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Teléfono:</strong>{" "}
              <Link href="tel:+541123456789" color="inherit" underline="hover">
                +54 11 2345-6789
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Email:</strong>{" "}
              <Link href="mailto:info@niquel.com.ar" color="inherit" underline="hover">
                info@niquel.com.ar
              </Link>
            </Typography>
          </Grid>

          {/* Horarios */}
          <Grid item xs={12} sm={6} md={3} sx={{ textAlign: { xs: "center", sm: "left" } }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                mb: 2,
                fontFamily: "'Chillax', sans-serif",
                fontSize: "1.1rem",
                background: "linear-gradient(to right, #CA652D, #E89454, #FEB473, #E4884F)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Horarios
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Lunes a Jueves:</strong> 19:00 - 00:00
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Viernes y Sábados:</strong> 19:00 - 02:00
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Domingos:</strong> 19:00 - 23:00
            </Typography>
          </Grid>

          {/* Redes sociales */}
          
        </Grid>

        {/* Línea divisoria */}
        <Box
          sx={{
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            mt: 4,
            pt: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © 2025 Niquel. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
