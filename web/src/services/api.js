import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:30333'
});

export default api