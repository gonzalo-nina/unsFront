import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  VStack, 
  useColorModeValue, 
  Button, 
  Flex,
  Heading,
  useDisclosure
} from '@chakra-ui/react';
import EstudianteTable from './components/EstudianteTable';
import Login from './components/Login';
import AuthService from './services/AuthService';
import { User } from './types/Auth';
import './utils/axiosConfig';
import UserForm from './components/UserForm';

const App: React.FC = () => {
  // Estados para manejar la autenticación y el nombre de usuario
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Color de fondo que cambia según el modo de color
  const bgColor = useColorModeValue('gray.50', 'gray.800');

  // Efecto para verificar si hay un usuario autenticado al cargar la aplicación
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setIsAuthenticated(true);
      setUsername(user.username);
      setCurrentUser(user);
    }
  }, []);

  // Manejador para cuando el inicio de sesión es exitoso
  const handleLoginSuccess = (user: User) => {
    setIsAuthenticated(true);
    setUsername(user.username);
    setCurrentUser(user);
  };

  // Manejador para cerrar sesión
  const handleLogout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    setUsername('');
  };

  return (
    <Box bg={bgColor} minH="100vh" py={5}>
      <Container maxW="container.xl" centerContent px={[4, 6, 8]}>
        {!isAuthenticated ? (
          // Mostrar el componente de inicio de sesión si no está autenticado
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          // Mostrar la interfaz principal si está autenticado
          <VStack spacing={5} w="100%">
            <Flex w="100%" justify="space-between" align="center">
              <Heading size="xl" color={useColorModeValue('gray.700', 'white')}>
                Gestión de Estudiantes
              </Heading>
              <Flex align="center" gap={4}>
                <Box>Bienvenido, {username}</Box>
                {currentUser?.role === 'ADMIN' && (
                  <Button colorScheme="green" onClick={onOpen}>
                    Registrar Usuario
                  </Button>
                )}
                <Button colorScheme="red" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              </Flex>
            </Flex>
            {/* Componente principal para la gestión de estudiantes */}
            <EstudianteTable />
            <UserForm isOpen={isOpen} onClose={onClose} />
          </VStack>
        )}
      </Container>
    </Box>
  );
};

export default App;