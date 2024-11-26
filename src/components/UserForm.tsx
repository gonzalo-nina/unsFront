// src/components/UserForm.tsx
import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useToast,
  Select,
} from '@chakra-ui/react';
import UserService from '../services/UserService';

const UserForm: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ 
  isOpen, 
  onClose 
}) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    nombre: '',
    apellido: '',
    email: '',
    roleId: '1' // Default role USER (ID: 1)
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await UserService.createUser({
        ...formData,
        roleId: parseInt(formData.roleId)
      });
      
      toast({
        title: 'Usuario creado',
        status: 'success',
        duration: 3000,
      });
      onClose();
      setFormData({
        username: '',
        password: '',
        nombre: '',
        apellido: '',
        email: '',
        roleId: '1'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo crear el usuario',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Registrar Usuario</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Usuario</FormLabel>
                <Input
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Contraseña</FormLabel>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Nombre</FormLabel>
                <Input
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Apellido</FormLabel>
                <Input
                  value={formData.apellido}
                  onChange={(e) => setFormData({...formData, apellido: e.target.value})}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Rol</FormLabel>
                <Select 
                  value={formData.roleId}
                  onChange={(e) => setFormData({...formData, roleId: e.target.value})}
                >
                  <option value="1">Usuario</option>
                  <option value="2">Administrador</option>
                </Select>
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                width="100%"
                isLoading={isSubmitting}
              >
                Registrar
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserForm;