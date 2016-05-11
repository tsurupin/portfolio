import axios from 'axios';

import {
  ROOT_URL, AUTHOR_PATH, AUTH, SIGN_UP_AUTHOR, SIGN_IN_AUTHOR,
  SIGN_OUT_AUTHOR, UPDATE_AUTHOR, FETCH_AUTHOR
} from "../constants";
import { browserHistory } from 'react-router';

const AUTHOR_URL = `${ROOT_URL}${AUTHOR_PATH}`;

export function fetchAuthor(id) {
  const request = axios.get(`${AUTHOR_URL}/${id}`, { headers: { 'Authorization': localStorage.getItem('accessToken')}});
  return dispatch => {
    return (
      request
        .then(response => {

          //sessionStorate.setItem('accessToken', response.accessToken);
        })
        .catch(error => {


        })
    );
  };
}
  
function fetchAuthorSuccess(response) {
  return {
    type: FETCH_AUTHOR.SUCCESS,
    payload: {
      author: response.author
    }
  };
}

function fetchAuthorFailure(error) {
  return {
    type: FETCH_AUTHOR.FAILURE,
    payload: error
  }
};


export function updateAuthor(author) {
  const request = axios.patch(`${AUTHOR_URL}/${author.id}`, { author });
  
  return dispatch => {
    dispatch(updateAuthorRequest());
    return request.then(
      () => dispatch(updateAuthorSuccess()),
      error => dispatch(updateAuthorFailure(error.data))
    )
  };
}

export function updateAuthorRequest() {
  return {
    type: UPDATE_AUTHOR.REQUEST
  };
}

function updateAuthorSuccess() {
  return {
    type: UPDATE_AUTHOR.SUCCESS
  };
}

function updateAuthorFailure(error) {
  return {
    type: UPDATE_AUTHOR.FAILURE,
    payload: error
  };
}

export function signUpAuthor(params) {
  const request = axios.post(`${AUTHOR_URL}/sign-up`, params);
  return dispatch => {
    return (
      request
        .then( response => dispatch(authSuccess(response.data.accessToken)))
        .catch( error => dispatch(authFailure(error.data)))
    );
  };
}

function authSuccess(accessToken) {
  localStorage.setItem('accessToken', accessToken)
  browserHistory.push('/cms');
  return { type: AUTH.SUCCESS };
}

function authFailure(error) {
  return {
    type: AUTH.FAILURE,
    payload: error
  };
}

export function signInAuthor(params) {
  const request = axios.post(`${AUTHOR_URL}/sign-in`, params);

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

export function signOutAuthor() {
  const request = axios.delete(`${AUTHOR_URL}/sign-out`);
  return dispatch => {
    return(
    request
      .then(
      () => {
        localStorage.removeItem('accessToken');
        dispatch(signOutAuthorSuccess());
        browserHistory.push('/cms/sign-in')
      })
      .catch(error => dispatch(signOutAuthorFailure(error.data)))
    );
  };
}

function signOutAuthorSuccess() {
  return {
    type: SIGN_OUT_AUTHOR.SUCCESS
  };
}

function signOutAuthorFailure(error) {
  return {
    type: SIGN_OUT_AUTHOR.FAILURE,
    payload: error
  };
}



