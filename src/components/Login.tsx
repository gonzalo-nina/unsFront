// src/components/Login.tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
} from '@chakra-ui/react';
import AuthService from '../services/AuthService';
import { User } from '../types/Auth';

// Definición de las propiedades del componente Login
interface LoginProps {
  onLoginSuccess: (user: User) => void;
}

// Componente funcional Login
const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  // Estados para el nombre de usuario, contraseña y estado de carga
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Hook para mostrar notificaciones toast
  const toast = useToast();

  // Manejador del envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Intenta iniciar sesión con las credenciales proporcionadas
      const user = await AuthService.login(username, password);
      if (user) {
        // Muestra un toast de éxito si el inicio de sesión es correcto
        toast({
          title: 'Login exitoso',
          status: 'success',
          duration: 3000,
        });
        // Llama a la función de éxito pasada como prop
        onLoginSuccess(user);
      }
    } catch (error) {
      // Muestra un toast de error si las credenciales son incorrectas
      toast({
        title: 'Error de autenticación',
        description: 'Usuario o contraseña incorrectos',
        status: 'error',
        duration: 3000,
      });
    } finally {
      // Desactiva el estado de carga
      setIsLoading(false);
    }
  };

  // Renderizado del componente
  return (
    <Box maxW="md" mx="auto" mt={8}>
      <VStack spacing={8}>
        <Heading>Iniciar Sesión</Heading>
        <form onSubmit={handleSubmit} style={{ width: '100%' }} autoComplete="off">
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Usuario</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="teal"
              width="100%"
              isLoading={isLoading}
            >
              Ingresar
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};

export default Login;