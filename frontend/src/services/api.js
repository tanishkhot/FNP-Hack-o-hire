import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000', // Adjust this to match your backend URL
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;