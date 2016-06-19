import client from "axios";
import { ROOT_URL } from './constants';
import  { getCSRFToken, capitalize } from 'shared/utilities';

export const axios = client.create({

  baseURL: ROOT_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRF-Token': getCSRFToken()
  }
});

