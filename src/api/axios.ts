import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    "Content-Type": 'application/vnd.github.v3+json',
    "Authorization": 'token 1dfc06a4296b2a724b9006c490b3283c93926f44',
  },
});

export default axiosConfig;
