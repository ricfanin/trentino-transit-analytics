import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:3000/api/v1", // URL base del backend
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

export default apiClient;
