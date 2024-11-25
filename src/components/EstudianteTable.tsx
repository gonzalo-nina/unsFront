import React, { useEffect, useState } from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td, Button, useToast, VStack, Box, Text,
  AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader,
  AlertDialogContent, AlertDialogOverlay, useDisclosure
} from '@chakra-ui/react';
import EstudianteService from '../services/EstudianteService';
import { Estudiante } from '../types/Estudiante';
import EstudianteForm from './EstudianteForm';

const EstudianteTable: React.FC = () => {
  // Estados para manejar la lista de estudiantes y operaciones
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [estudianteToEdit, setEstudianteToEdit] = useState<Estudiante | undefined>(undefined);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const toast = useToast();

  // Cargar estudiantes al montar el componente
  useEffect(() => {
    fetchEstudiantes();
  }, []);

  // Función para obtener la lista de estudiantes
  const fetchEstudiantes = async () => {
    try {
      const response = await EstudianteService.getEstudiantes();
      setEstudiantes(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los estudiantes',
        status: 'error',
        duration: 3000,
      });
    }
  };

  // Manejador para añadir un nuevo estudiante
  const handleEstudianteAdded = (newEstudiante: Estudiante) => {
    setEstudiantes([...estudiantes, newEstudiante]);
  };

  // Manejador para actualizar un estudiante existente
  const handleEstudianteUpdated = (updatedEstudiante: Estudiante) => {
    setEstudiantes(estudiantes.map(est => 
      est.id === updatedEstudiante.id ? updatedEstudiante : est
    ));
    setEstudianteToEdit(undefined);
  };

  // Manejador para iniciar el proceso de eliminación
  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    onOpen();
  };

  // Manejador para confirmar la eliminación de un estudiante
  const handleDeleteConfirm = async () => {
    if (deleteId) {
      try {
        await EstudianteService.deleteEstudiante(deleteId);
        setEstudiantes(estudiantes.filter(estudiante => estudiante.id !== deleteId));
        toast({
          title: 'Estudiante eliminado',
          status: 'success',
          duration: 3000,
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'No se pudo eliminar el estudiante',
          status: 'error',
          duration: 3000,
        });
      }
    }
    onClose();
  };

  return (
    <VStack spacing={[4, 6, 8]} w="100%">
      {/* Formulario para añadir/editar estudiantes */}
      <EstudianteForm
        onEstudianteAdded={handleEstudianteAdded}
        onEstudianteUpdated={handleEstudianteUpdated}
        estudianteToEdit={estudianteToEdit}
      />

      {/* Tabla de estudiantes */}
      <Box overflowX="auto" w="100%" px={[2, 4, 6]}>
        {estudiantes.length > 0 ? (
          <Table variant="simple" size={['sm', 'md']}>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Nombre</Th>
                <Th>Apellido</Th>
                <Th>Email</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {estudiantes.map(estudiante => (
                <Tr key={estudiante.id}>
                  <Td>{estudiante.id}</Td>
                  <Td>{estudiante.nombre}</Td>
                  <Td>{estudiante.apellido}</Td>
                  <Td>{estudiante.email}</Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      mr={2}
                      onClick={() => setEstudianteToEdit(estudiante)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDeleteClick(estudiante.id)}
                    >
                      Eliminar
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Text>No hay estudiantes registrados</Text>
        )}
      </Box>

      {/* Diálogo de confirmación para eliminar estudiante */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Eliminar Estudiante</AlertDialogHeader>
            <AlertDialogBody>
              ¿Está seguro? Esta acción no se puede deshacer.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleDeleteConfirm} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </VStack>
  );
};

export default EstudianteTable;