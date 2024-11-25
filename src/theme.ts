// Importamos las funciones y tipos necesarios de Chakra UI
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// Configuración del tema
const config: ThemeConfig = {
  initialColorMode: 'light', // Modo de color inicial
  useSystemColorMode: false, // No usar el modo de color del sistema
};

// Definición y extensión del tema personalizado
const theme = extendTheme({
  config, // Aplicamos la configuración
  colors: {
    // Definimos una paleta de colores personalizados
    primary: {
      100: '#E3F2F9',
      200: '#C5E4F3',
      300: '#A2D4EC',
      400: '#7AC1E4',
      500: '#47A9DA',
      600: '#0088CC',
      700: '#007AB8',
      800: '#006BA1',
      900: '#005885',
    },
  },
  styles: {
    global: {
      // Estilos globales para el body
      body: {
        bg: 'white', // Fondo blanco
        color: 'gray.800', // Color de texto oscuro
      },
    },
  },
});

// Exportamos el tema para su uso en la aplicación
export default theme;