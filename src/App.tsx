import React from 'react';
import EstudianteTable from './components/EstudianteTable';

const App: React.FC = () => {
  return (
    <div>
      <h1>Gestión de Estudiantes</h1>
      <EstudianteTable />
    </div>
  );
};

export default App;