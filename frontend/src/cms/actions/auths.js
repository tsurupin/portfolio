import { axios } from 'cms/utilities';
import { AUTH, SIGN_OUT } from 'shared/constants/actions';
import { AUTHOR_PATH } from 'shared/constants/apis';
import { browserHistory } from 'react-router';

function authSuccess(accessToken) {
  localStorage.setItem('accessToken', accessToken);
  return { type: AUTH.SUCCESS };
}

function authFailure({ errorMessage }) {
  return {
    type: AUTH.FAILURE,
    payload: { errorMessage },
  };
}


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

function signOutSuccess() {
  localStorage.removeItem('accessToken');
  return {
    type: SIGN_OUT.SUCCESS,
  };
}

function signOutFailure({ errorMessage }) {
  return {
    type: SIGN_OUT.FAILURE,
    payload: { errorMessage },
  };
}

export function signOut() {
  const request = axios.delete(`${AUTHOR_PATH}/sign-out`);
  return dispatch => {
    return (
      request
        .then(() => dispatch(signOutSuccess()))
        .then(() => browserHistory.push('/cms/sign-in'))
        .catch(error => dispatch(signOutFailure(error.data)))
    );
  };
}
