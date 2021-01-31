import axios from 'axios';

// 封装 axios
const service = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  baseURL: process.env.NODE_ENV === 'production' ? '/api/v1' : '/api',
  timeout: 5000,
});

export default service;
