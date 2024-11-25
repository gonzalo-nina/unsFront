// Interfaz que define la estructura de un usuario
export interface User {
    // Nombre de usuario
    username: string;
    // Token de autenticación
    token: string;
    // Rol del usuario (opcional)
    role?: string;
}