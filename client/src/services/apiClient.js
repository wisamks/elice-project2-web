import axios from 'axios';
import { baseURI } from '../controllers/baseURI';

const apiClient = axios.create({
    baseURL: baseURI,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default apiClient;