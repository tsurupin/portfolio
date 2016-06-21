import { 
  PROJECT_PATH, 
  FETCH_PROJECTS, 
  FETCH_PROJECT, 
  FETCH_NEW_PROJECT, 
  SAVE_PROJECT,
  TOGGLE_PROJECT
} from '../constants';
import { fetchTagsForm } from'./tags';
import { createAlert } from'./alerts';
import { axios, trimProject } from '../utilities';
import { browserHistory } from 'react-router';

export function fetchProjects() {
  const request = axios.get(`${PROJECT_PATH}`);
  return dispatch => {
    return (
      request
        .then(response => dispatch(fetchProjectsSuccess(response.data)))
        .catch(error => dispatch(createAlert(error.data, "error")))
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

export function fetchProject(id) {
  const request = axios.get(`${PROJECT_PATH}/${id}/edit`);
  return dispatch => {
    return request
      .then(response => dispatch(fetchProjectSuccess(response.data)))
      .then(response => dispatch(fetchTagsForm(response.payload.tags)))
      .catch(error => dispatch(createAlert(error.data, "error")))
  };
}

function fetchProjectSuccess(response) {
  return {
    type: FETCH_PROJECT.SUCCESS,
    payload: {
      project: response,
      tags: {
        tags: response.tags,
        tagSuggestions: response.tagSuggestions
      }
    }
  };
}

export function fetchNewProject() {
  const request = axios.get(`${PROJECT_PATH}/new`);
  return dispatch => {
    return request
      .then(response => dispatch(fetchNewProjectSuccess(response.data)))
      .then(response => dispatch(fetchTagsForm(response.payload.tags)))
      .catch(error => {
        console.log(error)
        dispatch(createAlert(error.data, "error"))
      })
    }
};


function fetchNewProjectSuccess(response) {
  return {
    type: FETCH_NEW_PROJECT.SUCCESS,
    payload: { 
      tags: { 
        tags: [], 
        tagSuggestions: response.tagSuggestions 
      }
    }
  };
}


export function saveProject(props) {
  const project = trimProject(props.project);
  let request;
  if (project.id) {
    request = axios.patch(`${PROJECT_PATH}/${project.id}`, { project });
  } else {
    request = axios.post(`${PROJECT_PATH}`, { project });
  }
  return dispatch => {
    // dispatch(saveProjectRequest());
    return (
      request
      .then(() => dispatch(saveProjectSuccess()))
      .catch(error => dispatch(saveProjectFailure(error.data)))
    )
  }
}


function saveProjectRequest() {
  return {
    type: SAVE_PROJECT.REQUEST
  }
}

function saveProjectSuccess() {
  browserHistory.push("/cms/projects");
  return {
    type: SAVE_PROJECT.SUCCESS
  }
}

function saveProjectFailure(response) {
  return {
    type: SAVE_PROJECT.FAILURE,
    payload: {
      errorMessage: response.errorMessage 
    }
  }
}

export function toggleProject(sortRank, id) {
  const request = axios.patch(`${PROJECT_PATH}/${id}/acceptance`);
  return dispatch => {
    return request
      .then(response => dispatch(toggleProjectSuccess(sortRank, response.data)))
      .catch(error => dispatch(createAlert(error.data, "error")))
  }
}

function toggleProjectSuccess(sortRank, response) {
  return {
    type: TOGGLE_PROJECT.SUCCESS,
    payload: { 
      sortRank,
      accepted: response.accepted
    }
  }
}

