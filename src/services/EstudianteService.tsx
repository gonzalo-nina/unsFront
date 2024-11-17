import axios from 'axios';
import { Estudiante } from '../types/Estudiante';

const API_URL = '/api/estudiantes';

class EstudianteService {
    getEstudiantes() {
        return axios.get<Estudiante[]>(API_URL);
    }

    getEstudianteById(id: number) {
        return axios.get<Estudiante>(`${API_URL}/${id}`);
    }

    createEstudiante(estudiante: Estudiante) {
        return axios.post<Estudiante>(API_URL, estudiante);
    }

    updateEstudiante(id: number, estudiante: Estudiante) {
        return axios.put<Estudiante>(`${API_URL}/${id}`, estudiante);
    }

    deleteEstudiante(id: number) {
        return axios.delete<void>(`${API_URL}/${id}`);
    }
}

export default new EstudianteService();