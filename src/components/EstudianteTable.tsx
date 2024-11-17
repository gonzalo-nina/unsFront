import React, { useEffect, useState } from 'react';
import EstudianteService from '../services/EstudianteService';
import { Estudiante } from '../types/Estudiante';
import EstudianteForm from './EstudianteForm';

const EstudianteTable: React.FC = () => {
    const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
    const [estudianteToEdit, setEstudianteToEdit] = useState<Estudiante | undefined>(undefined);

    useEffect(() => {
        fetchEstudiantes();
    }, []);

    const fetchEstudiantes = async () => {
        try {
            const response = await EstudianteService.getEstudiantes();
            setEstudiantes(response.data);
        } catch (error) {
            console.error('Error fetching estudiantes:', error);
        }
    };

    const handleEstudianteAdded = (newEstudiante: Estudiante) => {
        setEstudiantes([...estudiantes, newEstudiante]);
    };

    const handleEstudianteUpdated = (updatedEstudiante: Estudiante) => {
        setEstudiantes(estudiantes.map(est => (est.id === updatedEstudiante.id ? updatedEstudiante : est)));
        setEstudianteToEdit(undefined);
    };

    const handleDeleteEstudiante = async (id: number) => {
        try {
            await EstudianteService.deleteEstudiante(id);
            setEstudiantes(estudiantes.filter(estudiante => estudiante.id !== id));
        } catch (error) {
            console.error('Error deleting estudiante:', error);
        }
    };

    const handleEditEstudiante = (estudiante: Estudiante) => {
        setEstudianteToEdit(estudiante);
    };

    return (
        <div>
            <h2>Estudiantes</h2>
            <EstudianteForm
                onEstudianteAdded={handleEstudianteAdded}
                onEstudianteUpdated={handleEstudianteUpdated}
                estudianteToEdit={estudianteToEdit}
            />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {estudiantes.map(estudiante => (
                        <tr key={estudiante.id}>
                            <td>{estudiante.id}</td>
                            <td>{estudiante.nombre}</td>
                            <td>{estudiante.apellido}</td>
                            <td>{estudiante.email}</td>
                            <td>
                                <button onClick={() => handleEditEstudiante(estudiante)}>Editar</button>
                                <button onClick={() => handleDeleteEstudiante(estudiante.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EstudianteTable;