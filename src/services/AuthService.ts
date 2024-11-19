// src/services/AuthService.ts
import axios from 'axios';
import { User } from '../types/Auth';

const API_URL = '/authenticate'; // Remove /api prefix

class AuthService {
  async login(username: string, password: string): Promise<User | null> {
    try {
      const response = await axios.post(API_URL, null, {
        params: {
          username,
          password
        }
      });
      
      if (response.data.token) {
        const userData: User = { 
          username, 
          token: response.data.token 
        };
        localStorage.setItem('user', JSON.stringify(userData));
        axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
        return userData;
      }
      return null;

    } catch (error) {
      throw new Error('Credenciales inválidas');
    }
  }

  logout() {
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user: User = JSON.parse(userStr);
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
      return user;
    }
    return null;
  }
}

export default new AuthService();