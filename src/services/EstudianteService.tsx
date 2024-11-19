import axios from 'axios';
import { Estudiante } from '../types/Estudiante';
import AuthService from './AuthService';

const API_URL = '/api/estudiantes';

const getAuthHeader = () => {
  const user = AuthService.getCurrentUser();
  return user ? { Authorization: user.authHeader } : {};
};

class EstudianteService {
  getEstudiantes() {
    return axios.get<Estudiante[]>(API_URL, { 
      headers: getAuthHeader() 
    });
  }

  getEstudianteById(id: number) {
    return axios.get<Estudiante>(`${API_URL}/${id}`, {
      headers: getAuthHeader()
    });
  }

  createEstudiante(estudiante: Estudiante) {
    return axios.post<Estudiante>(API_URL, estudiante, {
      headers: getAuthHeader()
    });
  }

  updateEstudiante(id: number, estudiante: Estudiante) {
    return axios.put<Estudiante>(`${API_URL}/${id}`, estudiante, {
      headers: getAuthHeader()
    });
  }

  deleteEstudiante(id: number) {
    return axios.delete<void>(`${API_URL}/${id}`, {
      headers: getAuthHeader()
    });
  }
}

export default new EstudianteService();