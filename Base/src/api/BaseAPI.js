import axios from 'axios';

const baseURL = 'https://api.openweathermap.org/data/3.0';

const AXIOS = axios.create({
  baseURL: baseURL,
  timeout: 60000,
});

export default {AXIOS};
