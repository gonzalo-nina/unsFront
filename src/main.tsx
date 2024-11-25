// Importaciones necesarias
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './theme';
import App from './App';
import './index.css';

// Obtener el elemento raíz del DOM
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('No se pudo encontrar el elemento raíz');

// Renderizar la aplicación
createRoot(rootElement).render(
  <StrictMode>
    {/* Inicializar el modo de color de Chakra UI */}
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    {/* Proporcionar el tema de Chakra UI a toda la aplicación */}
    <ChakraProvider theme={theme}>
      {/* Componente principal de la aplicación */}
      <App />
    </ChakraProvider>
  </StrictMode>,
);
