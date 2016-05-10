import axios from 'axios';

import {
  ROOT_URL, AUTHOR_PATH, SIGN_UP_AUTHOR, SIGN_IN_AUTHOR,
  SIGN_OUT_AUTHOR, UPDATE_AUTHOR, FETCH_AUTHOR
} from "../constants";

const AUTHOR_URL = `${ROOT_URL}${AUTHOR_PATH}`;
export function fetchAuthor(id) {
  const request = axios.get(`${AUTHOR_URL}/${id}`);
  return dispatch => {
    return request.then(
      response => dispatch(fetchAuthorSuccess(reponse.data)),
      error => dispatch(fetchAuthorFailure(error.data))
    )
  };
}
  
function fetchAuthorSuccess(response) {
  return {
    type: FETCH_AUTHOR.SUCCESS,
    payload: {
      author: response.author,
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
  const request = axios.post(`${AUTHOR_URL}/sign_up`, params);
  return dispatch => {
    return request.then(
      () => dispatch(signUpAuthorSuccess()),
      error => dispatch(signUpAuthrFailure(error.data))
    )
  };
}

function signUpAuthorSuccess() {
  return {
    type: SIGN_UP_AUTHOR.SUCCESS
  };
}

function signUpAuthorFailure(error) {
  return {
    type: SIGN_UP_AUTHOR.FAILURE,
    payload: error
  };
}

export function signInAuthor(params) {
  const request = axios.post(`${AUTHOR_URL}/sign_in`, params);
  return dispatch => {
    return request.then(
      () => dispatch(signInAuthorSuccess()),
      error => dispatch(signInAuthrFailure(error.data))
    )
  };
}

function signInAuthorSuccess() {
  return {
    type: SIGN_IN_AUTHOR.SUCCESS
  };
}

function signInAuthorFailure(error) {
  return {
    type: SIGN_IN_AUTHOR.FAILURE,
    payload: error
  };
}

export function signOutAuthor(params) {
  const request = axios.delete(`${AUTHOR_URL}/sign_out`, params);
  return dispatch => {
    return request.then(
      () => dispatch(signOutAuthorSuccess()),
      error => dispatch(signOutAuthrFailure(error.data))
    )
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



