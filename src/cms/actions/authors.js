import { axios } from '../utilities';
import { AUTHOR_PATH, UPDATE_AUTHOR, FETCH_AUTHOR } from "../constants";
import { browserHistory } from 'react-router';


export function fetchAuthor(id) {
  const request = axios.get(`${AUTHOR_PATH}/${id}`);
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
  const request = axios.patch(`${AUTHOR_PATH}/${author.id}`, { author });
  
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




