import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://3.133.0.29', // Replace with your API base URL
  timeout: 5000, // Set the timeout value as per your requirement
  headers: {
    'Content-Type': 'application/json',
    // Add any additional headers you need
  },
});

export default axiosInstance;
