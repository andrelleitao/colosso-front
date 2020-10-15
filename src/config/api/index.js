import axios from "axios";
import { getToken } from '../../storage/auth';

const API_URL = "http://localhost:8080/colosso-backend";

const apiClient = axios.create({
    baseURL: API_URL
});

apiClient.interceptors.request.use(config => {
    const token = getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, error => Promise.reject(error));

apiClient.interceptors.response.use((response) =>
  response,
  async (error) => {    
    return Promise.reject(error.response.data);
  },
);

const { get, post, patch, delete: destroy } = apiClient;
export { get, post, patch, destroy };