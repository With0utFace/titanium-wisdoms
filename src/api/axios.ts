import axios from 'axios';

const token = localStorage.getItem('token');

const axiosConfig = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Content-Type': 'application/vnd.github.v3+json',
    Authorization: 'token ' + token,
  },
});

export default axiosConfig;
