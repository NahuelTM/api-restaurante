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
        width: "100%", // Asegura que el footer ocupe todo el ancho
        boxSizing: "border-box", // Evita que el padding aumente el ancho
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          {/* Logo y nombre */}
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
              Síguenos
            </Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: { xs: "center", sm: "flex-start" } }}>
              {/* Iconos de redes sociales */}
              <Link href="#" color="inherit" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
              <Link href="#" color="inherit" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </Link>
              <Link href="#" color="inherit" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </Link>
            </Box>
          </Grid>
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
