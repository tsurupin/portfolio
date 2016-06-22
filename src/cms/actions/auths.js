
import { axios } from '../utilities';
import {
  AUTHOR_PATH, AUTH, SIGN_OUT,
} from "../constants";
import { browserHistory } from 'react-router';

export function signUp(params) {
  const request = axios.post(`${AUTHOR_PATH}/sign-up`, params);
  return dispatch => {
    return (
      request
        .then(response => dispatch(authSuccess(response.data.accessToken)))
        .catch(error => dispatch(authFailure(error.data)))
    );
  };
}


export function signIn(params) {
  const request = axios.post(`${AUTHOR_PATH}/sign-in`, params);

  return dispatch => {
    return (
      request
        .then(response => dispatch(authSuccess(response.data.accessToken)))
        .then(() => browserHistory.push('/cms'))
        .catch(error => dispatch(authFailure(error.data)))
    );
  };
}

function authSuccess(accessToken) {
  localStorage.setItem('accessToken', accessToken);
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
  const request = axios.delete(`${AUTHOR_PATH}/sign-out`);
  return dispatch => {
    return(
      request
        .then(() => dispatch(signOutSuccess()))
        .then(() => browserHistory.push('/cms/sign-in'))
        .catch(error => dispatch(signOutFailure(error.data)))
    );
  };
}

function signOutSuccess() {
  localStorage.removeItem('accessToken');
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