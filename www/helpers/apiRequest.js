import axios from 'axios';
require('es6-promise').polyfill();
require('isomorphic-fetch');
import Cookies from 'js-cookie';
import { getCookieFromReq } from '../helpers/utils';
import config from '../config';

const baseApiURL = `${config.BASE_URL}/api/v1`;

const api = axios.create({
  baseURL: baseApiURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const setAuthHeader = req => {
  const token = req
    ? getCookieFromReq(req, '__token')
    : Cookies.getJSON('__token');

  if (token) {
    return { headers: { Authorization: `Bearer ${token}` } };
  }

  return undefined;
};

const rejectPromise = resError => {
  let error = {};

  if (resError && resError.response && resError.response.data) {
    error = resError.response.data;
  } else {
    error = resError;
  }

  return Promise.reject(error);
};

export const post = async (url, body) => {
  return await api
    .post(url, body, setAuthHeader())
    .then(response => response.data)
    .catch(error => rejectPromise(error));
};

export const get = async url => {
  return await api
    .get(url, setAuthHeader())
    .then(response => response.data)
    .catch(error => rejectPromise(error));
};

export const patch = async (url, body) => {
  return await api
    .patch(url, body, setAuthHeader())
    .then(response => response.data)
    .catch(error => rejectPromise(error));
};

export const put = async (url, body) => {
  return await api
    .put(url, body, setAuthHeader())
    .then(response => response.data)
    .catch(error => rejectPromise(error));
};

export const deleteApi = async url => {
  return await api
    .delete(url, setAuthHeader())
    .then(response => response.data)
    .catch(error => rejectPromise(error));
};

export const fetchApi = async (url, req) => {
  return await fetch(`${baseApiURL}${url}`, setAuthHeader(req))
    .then(data => data.json())
    .catch(e => rejectPromise(e));
};
