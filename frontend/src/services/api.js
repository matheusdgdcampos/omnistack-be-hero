import axios from 'axios';
/**
 * Neste arquivo estou definindo o axios como protocolo
 * http para as interações nas rotas do backend.
 */
const api = axios.create({
    baseURL: 'http://localhost:3333'    //definindo caminho padrão que o axios irá utilizar.
});

export default api;