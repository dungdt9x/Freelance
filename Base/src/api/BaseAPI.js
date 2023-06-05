import axios from 'axios';
import {Storages} from '../commons/Storages';
import _ from 'lodash';

const baseURL = 'https://app.slogcom.vn:32675/api/v1.0/mobile_route_app/';

const AXIOS = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
});

AXIOS.interceptors.request.use(async function (config) {
  let token = JSON.parse(Storages.getString('token') ?? '{}');
  if (!_.isEmpty(token)) {
    let {access_token} = token;
    config.headers.Authorization = 'Bearer ' + access_token ?? '';
  }
  return config;
});

const AXIOS_AUTH = axios.create({
  baseURL: baseURL,
  timeout: 60000,
});

AXIOS_AUTH.interceptors.request.use(async function (config) {
  return config;
});

const AXIOS_MULTI = axios.create({
  baseURL: baseURL,
  timeout: 60000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

const AXIOS_MULTI_AUTH = axios.create({
  baseURL: baseURL,
  timeout: 1000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

AXIOS_MULTI_AUTH.interceptors.request.use(async function (config) {
  return config;
});

export default {
  AXIOS_MULTI_AUTH,
  AXIOS,
  AXIOS_AUTH,
  AXIOS_MULTI,
};
