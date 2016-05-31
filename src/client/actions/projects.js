import {
  PROJECT_PATH, 
  FETCH_PROJECTS
} from '../constants';
import { axios } from '../utilities';
import { browserHistory } from 'react-router';

export function fetchProjects() {
  const request = axios.get(`${PROJECT_PATH}`);
  return dispatch => {
    return (
      request
        .then(response => {
          dispatch(fetchProjectsSuccess(response.data))
        })
        .catch(error => {
          dispatch(fetchProjectsFailure(error.data))
        })
    );
  };
}

function fetchProjectsSuccess(response) {
  return {
    type: FETCH_PROJECTS.SUCCESS,
    payload: { projects: response.projects }
  };
}

function fetchProjectsFailure(error) {
  return {
    type: FETCH_PROJECTS.FAILURE,
    payload: error
  };
}

