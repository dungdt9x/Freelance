import axios from 'axios';

const baseURL = 'https://www.api.tictop.app';
const baseURL1 = 'https://api.openweathermap.org/data/2.5';
const baseURL2 = 'https://pro.openweathermap.org/data/2.5';
const baseURL3 = 'https://maps.googleapis.com/maps/api';

const AXIOS = axios.create({
  baseURL: baseURL,
  timeout: 60000,
});

const AXIOS1 = axios.create({
  baseURL: baseURL1,
  timeout: 30000,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
});

const AXIOS2 = axios.create({
  baseURL: baseURL2,
  timeout: 30000,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
});

const AXIOS3 = axios.create({
  baseURL: baseURL3,
  timeout: 30000,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
});

AXIOS1.interceptors.request.use(async function (config) {
  return config;
});

AXIOS2.interceptors.request.use(async function (config) {
  return config;
});

AXIOS3.interceptors.request.use(async function (config) {
  return config;
});

export default {AXIOS1, AXIOS2, AXIOS3, AXIOS};
