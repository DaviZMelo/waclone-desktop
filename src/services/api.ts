import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:45541',
});

export default api;
