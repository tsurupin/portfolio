import { axios, trimAuthor } from '../utilities';
import { AUTHOR_PATH, UPDATE_AUTHOR, FETCH_AUTHOR } from "../constants";
import { browserHistory } from 'react-router';
import { fetchSocialAccounts } from'./socialAccounts';

export function fetchAuthor() {
  const request = axios.get(`${AUTHOR_PATH}/`);
  return dispatch => {
    return (
      request
        .then(response => {
          dispatch(fetchAuthorSuccess(response.data));
          dispatch(fetchSocialAccounts(response.data));
        })
        .catch(error => dispatch(fetchAuthorFailure(error.data)))
    );
  };
}

function fetchAuthorSuccess(author) {
  return {
    type: FETCH_AUTHOR.SUCCESS,
    payload: { author: {
      email: author.email,
      name: author.name,
      image: author.image,
      description: author.description
    } }
  };
}

function fetchAuthorFailure(error) {
  return {
    type: FETCH_AUTHOR.FAILURE,
    payload: error
  }
};


export function updateAuthor(props) {
  const author = trimAuthor(props.author);
  const request = axios.patch(`${AUTHOR_PATH}`, { author });
  
  return dispatch => {
    dispatch(updateAuthorRequest());
    return (
      request
        .then(() => dispatch(updateAuthorSuccess()))
        .catch(error => dispatch(updateAuthorFailure(error.data)))
    );
  };
}

export function updateAuthorRequest() {
  return {
    type: UPDATE_AUTHOR.REQUEST
  };
}

function updateAuthorSuccess() {
  browserHistory.push('/cms');
}

function updateAuthorFailure(error) {
  return {
    type: UPDATE_AUTHOR.FAILURE,
    payload: error
  };
}



