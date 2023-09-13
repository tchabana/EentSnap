import axios from 'axios';
export const baseImagePath = `http://10.42.0.1:8000/storage/`;
const api = axios.create({ 
    baseURL: 'http://10.42.0.1:8000/api',
    responseType:'json',
    withCredentials:true}); 
export default api;