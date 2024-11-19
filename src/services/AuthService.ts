// src/services/AuthService.ts
import axios from 'axios';
import { User } from '../types/Auth';

const API_URL = '/api';

class AuthService {
  async login(username: string, password: string): Promise<User | null> {
    try {
      const authHeader = 'Basic ' + btoa(username + ':' + password);
      const response = await axios.get(`${API_URL}/estudiantes`, {
        headers: { 'Authorization': authHeader }
      });
      
      if (response.status === 200) {
        const userData: User = { username, authHeader };
        localStorage.setItem('user', JSON.stringify(userData));
        // Configura el header por defecto para futuras peticiones
        axios.defaults.headers.common['Authorization'] = authHeader;
        return userData;
      }
    } catch (error) {
      throw new Error('Credenciales inválidas');
    }
    return null;
  }

  logout() {
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      // Restaura el header de autorización
      axios.defaults.headers.common['Authorization'] = user.authHeader;
      return user;
    }
    return null;
  }
}

export default new AuthService();