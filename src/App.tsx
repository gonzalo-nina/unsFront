import React from 'react';
import { Box, Heading, Container, VStack, useColorModeValue } from '@chakra-ui/react';
import EstudianteTable from './components/EstudianteTable';

const App: React.FC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');

  return (
    <Box bg={bgColor} minH="100vh" py={5}>
      <Container 
        maxW="container.xl" 
        centerContent
        px={[4, 6, 8]} // padding horizontal responsivo
      >
        <VStack spacing={5} w="100%">
          <Heading size="xl" color={useColorModeValue('gray.700', 'white')}>
            Gestión de Estudiantes
          </Heading>
          <EstudianteTable />
        </VStack>
      </Container>
    </Box>
  );
};

export default App;