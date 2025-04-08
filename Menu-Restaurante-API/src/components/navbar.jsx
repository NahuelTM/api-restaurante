import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import logo from '../assets/logos/logo.jpg'; // Importa el logo

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('menu');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{
        width: { xs: '90%', sm: '60%', md: '30%' }, // Ancho responsive: más ancho en pantallas pequeñas
        position: 'fixed',
        bottom: 10, // Margen inferior
        left: '50%',
        transform: 'translateX(-50%)', // Centra horizontalmente
        zIndex: 1000,
        justifyContent: 'space-between', // Espaciado entre elementos
        alignItems: 'center',
        borderRadius: '32px', // Bordes redondeados
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Sombra
        backgroundColor: '#fff', // Fondo blanco
        padding: '0 16px', // Espaciado interno
      }}
      showLabels
      value={value}
      onChange={handleChange}
    >
      {/* Icono fijo de la copa */}
      <img
        src={logo}
        alt="Logo"
        style={{
          height: '32px', // Ajusta el tamaño del logo
          marginRight: '1px', // Espaciado a la derecha
        }}
      />
      {/* Opciones de navegación con estilos personalizados */}
      <BottomNavigationAction
        label="Menu"
        value="menu"
        sx={{
          minWidth: 'auto', // Ajusta el tamaño de los botones
          fontWeight: 'bold', // Negrita si está seleccionado
          fontSize: value === 'menu' ? '1.1rem' : '1rem', // Fuente más grande si está seleccionado
          color: 'black', // Siempre negro
          '&.Mui-selected': {
            color: 'black',
          },
          borderRight: '1px solid rgba(0, 0, 0, 0.2)', // Línea delgada gris
          paddingRight: '16px', // Espaciado interno para separar del borde
        }}
      />
      <BottomNavigationAction
        label="Restaurante"
        value="restaurante"
        sx={{
          minWidth: 'auto',
          fontWeight: 'bold',
          fontSize: value === 'restaurante' ? '1.1rem' : '1rem',
          color: 'black',
          '&.Mui-selected': {
            color: 'black',
          },
          borderRight: '1px solid rgba(0, 0, 0, 0.2)', // Línea delgada gris
          paddingRight: '16px', // Espaciado interno para separar del borde
        }}
      />
      <BottomNavigationAction
        label="Reserva"
        value="reserva"
        sx={{
          minWidth: 'auto',
          fontWeight: 'bold',
          fontSize: value === 'reserva' ? '1.1rem' : '1rem',
          color: 'black',
          '&.Mui-selected': {
            color: 'black',
          },
        }}
      />
    </BottomNavigation>
  );
}