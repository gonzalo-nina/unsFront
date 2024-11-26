// src/services/UserService.ts
import axios from 'axios';
import { User, Role } from '../types/Auth';

const API_URL = '/api/users';

class UserService {
    getUsers() {
        return axios.get<User[]>(API_URL);
    }

    getUserById(id: number) {
        return axios.get<User>(`${API_URL}/${id}`);
    }

    createUser(user: Omit<User, 'id'> & { roleId: number }) {
        return axios.post<User>(API_URL, {
            ...user,
            roles: [{ id: user.roleId }]
        });
    }

    updateUser(id: number, user: Partial<User>) {
        return axios.put<User>(`${API_URL}/${id}`, user);
    }

    deleteUser(id: number) {
        return axios.delete<void>(`${API_URL}/${id}`);
    }

    getRoles() {
        return axios.get<Role[]>('/api/roles');
    }
}

export default new UserService();