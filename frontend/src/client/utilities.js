import client from 'axios';
import { CLIENT_ROOT_URL } from 'shared/constants/apis';
import { getCSRFToken } from 'shared/utilities';

export const axios = client.create({

  baseURL: CLIENT_ROOT_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': getCSRFToken(),
  },
});

