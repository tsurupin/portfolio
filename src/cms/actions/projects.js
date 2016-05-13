import { PROJECT_PATH, FETCH_PROJECTS } from '../constants';
import { axios } from '../utilities';


export function fetchProjects(page = 1) {
  const request = axios.get(`${PROJECT_PATH}?page=${page}`);
  return dispatch => {
    return (
      request
        .then(response => dispatch(fetchProjectsSuccess(response.data)))
        .catch(error => dispatch(fetchProjectsFailure(error.data)))
    )
  }
}

function fetchProjectsSuccess(response) {
  return {
    type: FETCH_PROJECTS.SUCCESS,
    payload: {
      projects: response.projects
    }
  }
}

function fetchProjectsFailure(error) {
  return {
    type: FETCH_PROJECTS.FAILURE,
    payload: { error }
  }
}