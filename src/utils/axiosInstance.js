import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://3.133.0.29',
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
