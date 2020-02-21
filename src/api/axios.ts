import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Content-Type': 'application/vnd.github.v3+json',
    Authorization: 'token ' + process.env.REACT_APP_TOKEN,
  },
});

export default axiosConfig;
