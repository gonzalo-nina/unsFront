import React, { useState, useEffect } from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Box,
} from '@chakra-ui/react';
import EstudianteService from '../services/EstudianteService';
import { Estudiante } from '../types/Estudiante';

// Definición de las propiedades del componente EstudianteForm
interface EstudianteFormProps {
  onEstudianteAdded: (estudiante: Estudiante) => void;
  onEstudianteUpdated: (estudiante: Estudiante) => void;
  estudianteToEdit?: Estudiante;
}

const EstudianteForm: React.FC<EstudianteFormProps> = ({
  onEstudianteAdded,
  onEstudianteUpdated,
  estudianteToEdit,
}) => {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  // Efecto para cargar los datos del estudiante a editar
  useEffect(() => {
    if (estudianteToEdit) {
      setNombre(estudianteToEdit.nombre);
      setApellido(estudianteToEdit.apellido);
      setEmail(estudianteToEdit.email);
      setIsEditMode(true);
    }
  }, [estudianteToEdit]);

  // Función para manejar el envío del formulario
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    const estudianteData: Omit<Estudiante, 'id'> = { nombre, apellido, email };

    try {
      if (isEditMode && estudianteToEdit) {
        // Actualizar estudiante existente
        const response = await EstudianteService.updateEstudiante(
          estudianteToEdit.id,
          estudianteData as Estudiante
        );
        onEstudianteUpdated(response.data);
        toast({
          title: 'Estudiante actualizado',
          status: 'success',
          duration: 3000,
        });
      } else {
        // Crear nuevo estudiante
        const response = await EstudianteService.createEstudiante(
          estudianteData as Estudiante
        );
        onEstudianteAdded(response.data);
        toast({
          title: 'Estudiante agregado',
          status: 'success',
          duration: 3000,
        });
      }
      resetForm();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo guardar el estudiante',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función para reiniciar el formulario
  const resetForm = () => {
    setNombre('');
    setApellido('');
    setEmail('');
    setIsEditMode(false);
  };

  return (
    <Box w={['100%', '90%', '70%', '50%']} maxW="md" mx="auto">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          {/* Campo de nombre */}
          <FormControl isRequired>
            <FormLabel>Nombre</FormLabel>
            <Input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingrese nombre"
            />
          </FormControl>

          {/* Campo de apellido */}
          <FormControl isRequired>
            <FormLabel>Apellido</FormLabel>
            <Input
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              placeholder="Ingrese apellido"
            />
          </FormControl>

          {/* Campo de email */}
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingrese email"
            />
          </FormControl>

          {/* Botón de envío */}
          <Button
            type="submit"
            colorScheme="teal"
            isLoading={isSubmitting}
            loadingText="Guardando..."
          >
            {isEditMode ? 'Actualizar Estudiante' : 'Agregar Estudiante'}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default EstudianteForm;