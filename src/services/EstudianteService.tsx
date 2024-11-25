import axios from 'axios';
import { Estudiante } from '../types/Estudiante';

// URL base para las operaciones de API relacionadas con estudiantes
const API_URL = '/api/estudiantes';

class EstudianteService {
  // Obtiene todos los estudiantes
  getEstudiantes() {
    return axios.get<Estudiante[]>(API_URL);
  }

  // Obtiene un estudiante específico por su ID
  getEstudianteById(id: number) {
    return axios.get<Estudiante>(`${API_URL}/${id}`);
  }

  // Crea un nuevo estudiante
  createEstudiante(estudiante: Estudiante) {
    return axios.post<Estudiante>(API_URL, estudiante);
  }

  // Actualiza la información de un estudiante existente
  updateEstudiante(id: number, estudiante: Estudiante) {
    return axios.put<Estudiante>(`${API_URL}/${id}`, estudiante);
  }

  // Elimina un estudiante por su ID
  deleteEstudiante(id: number) {
    return axios.delete<void>(`${API_URL}/${id}`);
  }
}

// Exporta una instancia única del servicio para su uso en toda la aplicación
export default new EstudianteService();