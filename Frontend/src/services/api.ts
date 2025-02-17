import axios from 'axios';

// Cria uma instancia do axios com a baseURL igual a http://localhost:3000
const api = axios.create({
    baseURL: 'http://localhost:3000' 
});

// Exporta a instancia do axios criada acima
export default api;

