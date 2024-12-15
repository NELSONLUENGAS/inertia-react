import axios from 'axios';

// Lista de rutas que requieren el token
const protectedRoutes = ['/api/login', '/api/user', '/api/profile'];

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar el token solo a las rutas protegidas
axiosInstance.interceptors.request.use(
    (config) => {
        // Obtener el token del localStorage o el almacenamiento correspondiente
        const token = localStorage.getItem('auth_token');

        // Verificar si la ruta está en la lista de rutas protegidas
        if (token && protectedRoutes.includes(config.url!)) {
            // Si la ruta requiere token, agregarlo en los headers
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

export default axiosInstance;
