import router from "@/router";
import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Se la risposta è 401 e non è già stato fatto il refresh
        if (error.response.status === 401 && !originalRequest._retry && originalRequest.url !== '/auth/refresh-tokens') {
            originalRequest._retry = true;

            try {
                // Recupera il Refresh Token dal client
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                const response = await apiClient.post('/auth/refresh-tokens', {
                    refreshToken,
                });

                // Salva i nuovi token
                const { access, refresh } = response.data;
                localStorage.setItem('accessToken', access.token);
                localStorage.setItem('refreshToken', refresh.token);

                // Aggiorna l'header Authorization e riprova la richiesta originale
                originalRequest.headers.Authorization = `Bearer ${access.token}`;
                return apiClient(originalRequest);
            } catch (err) {
                console.error('Refresh token failed:', err);
                // Redirigi al login se il refresh fallisce
                router.push({ name: 'LoginPage' });
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
