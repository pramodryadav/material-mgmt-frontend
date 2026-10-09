import axios from "axios";
import { CONFIG } from "./config";

// Create an Axios instance with base configuration
const apiClient = axios.create({
    baseURL: CONFIG.baseURL, // Change this when deploying
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor (Optional: Add token if needed)
apiClient.interceptors.request.use(
    (config) => {
        // Example: If using auth, attach token
        // const token = localStorage.getItem("token");
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor (Optional: Handle errors globally)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data?.message || error.message);
        return Promise.reject(error);
    }
);

export default apiClient;
