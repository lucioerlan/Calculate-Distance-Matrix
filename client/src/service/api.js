import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:7400/api',
});

export default api;
