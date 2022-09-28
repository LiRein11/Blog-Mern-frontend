import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4444',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');

  return config;
}); // Когда любой запрос происходит, проверяй есть ли в локалсторедж токен авторизации

export default instance;
