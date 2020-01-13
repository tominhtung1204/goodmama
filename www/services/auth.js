import React from 'react';
import { get, post } from '../helpers/apiRequest';
import Cookies from 'js-cookie';

export const checkLogin = () => {
  if (!Cookies.getJSON('__token')) {
    return false;
  }
  return true;
};

export const logOut = () => {
  Cookies.remove('__token');
  window.location.reload();
};

export const loginAdmin = body => {
  return post('users/login', body);
};
