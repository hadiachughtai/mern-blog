import axios from 'axios';

// Change this to your deployed backend URL after deployment
const API_BASE_URL = 'https://mern-blog-backend-pink-two.vercel.app/api';
const api = axios.create({
  baseURL: API_BASE_URL
});

// Attach token automatically if logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
