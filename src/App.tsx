import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  VStack, 
  useColorModeValue, 
  Button, 
  Flex,
  Heading
} from '@chakra-ui/react';
import EstudianteTable from './components/EstudianteTable';
import UserTable from './components/UserTable';
import Login from './components/Login';
import AuthService from './services/AuthService';
import { User } from './types/Auth';
import './utils/axiosConfig';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const bgColor = useColorModeValue('gray.50', 'gray.800');

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setIsAuthenticated(true);
      setUsername(user.username);
      setCurrentUser(user);
    }
  }, []);

  const handleLoginSuccess = (user: User) => {
    setIsAuthenticated(true);
    setUsername(user.username);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    setUsername('');
    setCurrentUser(null);
  };

  return (
    <Box bg={bgColor} minH="100vh" py={5}>
      <Container maxW="container.xl" centerContent px={[4, 6, 8]}>
        {!isAuthenticated ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          <VStack spacing={5} w="100%">
            <Flex w="100%" justify="space-between" align="center">
              <Heading size="xl" color={useColorModeValue('gray.700', 'white')}>
                Sistema de Gestión
              </Heading>
              <Flex align="center" gap={4}>
                <Box>Bienvenido, {username}</Box>
                <Button colorScheme="red" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              </Flex>
            </Flex>

            {/* Sección de Estudiantes */}
            <VStack w="100%" spacing={4}>
              <Heading size="lg" alignSelf="start">
                Gestión de Estudiantes
              </Heading>
              <EstudianteTable />
            </VStack>

            {/* Sección de Administración - Solo visible para admin */}
            {currentUser?.role === 'ADMIN' && (
              <VStack w="100%" spacing={4}>
                <Heading size="lg" alignSelf="start">
                  Gestión de Usuarios
                </Heading>
                <UserTable />
              </VStack>
            )}
          </VStack>
        )}
      </Container>
    </Box>
  );
};

export default App;