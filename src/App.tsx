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
import Login from './components/Login';
import AuthService from './services/AuthService';
import { User } from './types/Auth'; // Crea este archivo si no existe
import './utils/axiosConfig';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string>('');
  const bgColor = useColorModeValue('gray.50', 'gray.800');

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setIsAuthenticated(true);
      setUsername(user.username);
    }
  }, []);

  const handleLoginSuccess = (user: User) => {
    setIsAuthenticated(true);
    setUsername(user.username);
  };

  const handleLogout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    setUsername('');
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
                Gestión de Estudiantes
              </Heading>
              <Flex align="center" gap={4}>
                <Box>Bienvenido, {username}</Box>
                <Button colorScheme="red" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              </Flex>
            </Flex>
            <EstudianteTable />
          </VStack>
        )}
      </Container>
    </Box>
  );
};

export default App;