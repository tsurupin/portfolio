import axios from 'axios';

import {
  ROOT_URL, AUTHOR_PATH, AUTH, SIGN_OUT,
} from "../constants";
import { browserHistory } from 'react-router';

const AUTH_URL = `${ROOT_URL}${AUTHOR_PATH}`;


export function signUp(params) {
  const request = axios.post(`${AUTH_URL}/sign-up`, params);
  return dispatch => {
    return (
      request
        .then( response => dispatch(authSuccess(response.data.accessToken)))
        .catch( error => dispatch(authFailure(error.data)))
    );
  };
}


export function signIn(params) {
  const request = axios.post(`${AUTH_URL}/sign-in`, params);

  return dispatch => {
    return (
      request
        .then(response => {
          dispatch(authSuccess(response.data.accessToken))
        })
        .catch(error => {
          dispatch(authFailure(error.data))
        })
    );
  };
}

function authSuccess(accessToken) {
  localStorage.setItem('accessToken', accessToken);
  browserHistory.push('/cms');
  return { type: AUTH.SUCCESS };
}

function authFailure(response) {
  return {
    type: AUTH.FAILURE,
    payload: {
      errorMessage: response.errorMessage
    }
  };
}

export function signOut() {
  const request = axios.delete(`${AUTH_URL}/sign-out`);
  return dispatch => {
    return(
      request
        .then(() => {
            localStorage.removeItem('accessToken');
            dispatch(signOutSuccess());
          })
        .catch(error => dispatch(signOutFailure(error.data)))
    );
  };
}

function signOutSuccess() {
  browserHistory.push('/cms/sign-in');
  return {
    type: SIGN_OUT.SUCCESS
  };
}

function signOutFailure(response) {
  return {
    type: SIGN_OUT.FAILURE,
    payload: {
      errorMessage: response.errorMessage
    }
  };
}