import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:3000/api/v1", // URL base del backend
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

export default apiClient;
