import client from "axios";
import { ROOT_URL } from './constants';


function getCSRFToken() {
  const el = document.querySelector('meta[name="csrf-token"]');
  return el ? el.getAttribute('content') : '';
}


export const axios = client.create({

  baseURL: ROOT_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRF-Token': getCSRFToken()
  }
});

