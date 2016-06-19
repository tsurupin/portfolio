import { 
  PROJECT_PATH, 
  FETCH_PROJECTS, 
  FETCH_PROJECT, 
  FETCH_NEW_PROJECT, 
  SAVE_PROJECT,
  TOGGLE_PROJECT
} from '../constants';
import { fetchTagsForm } from'./tags';
import { axios, trimProject } from '../utilities';
import { browserHistory } from 'react-router';

export function fetchProjects() {
  const request = axios.get(`${PROJECT_PATH}`);
  return dispatch => {
    return (
      request
        .then(response => dispatch(fetchProjectsSuccess(response.data)))
        .catch(error => dispatch(fetchProjectsFailure(error.data)))
    )
  }
}

function fetchProjectsSuccess(response) {
  console.log('admin')
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

export function fetchProject(id) {
  const request = axios.get(`${PROJECT_PATH}/${id}/edit`);
  return dispatch => {
    return request
      .then(response => dispatch(fetchProjectSuccess(response.data)))
      .then(response => dispatch(fetchTagsForm(response.payload.tags)))
      .catch(error => dispatch(fetchProjectFailure(error.data)))
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

function fetchProjectFailure(error) {
  return {
    type: FETCH_PROJECT.FAILURE,
    payload: error
  };
}

export function fetchNewProject() {
  const request = axios.get(`${PROJECT_PATH}/new`);
  return dispatch => {
    return request
      .then(response => dispatch(fetchNewProjectSuccess(response.data)))
      .then(response => dispatch(fetchTagsForm(response.payload.tags)))
      .catch(error => dispatch(fetchNewProjectFailure(error.data)))
    }
};


function fetchNewProjectSuccess(response) {
  return {
    type: FETCH_NEW_PROJECT.SUCCESS,
    payload: { tags: { tags: [], tagSuggestions: response.tagSuggestions } }
  };
}


function fetchNewProjectFailure(error) {
  return {
    type: FETCH_NEW_PROJECT.FAILURE,
    payload: error
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
    dispatch(saveProjectRequest());
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
  browserHistory.push('/cms/projects');
}

function saveProjectFailure(error) {
  return {
    type: SAVE_PROJECT.FAILURE,
    payload: error
  }
}

export function toggleProject(id) {
  const request = axios.patch(`${PROJECT_PATH}/${id}/acceptance`);
  return dispatch => {
    return request
      .then(response => dispatch(toggleProjectSuccess()))
      .catch(error => dispatch(toggleProjectFailure(error.data)))
  }
}

function toggleProjectSuccess() {
  browserHistory.push('/cms/projects')
};

function toggleProjectFailure(error) {
  return {
    type: TOGGLE_PROJECT.FAILURE,
    payload: error
  }
}


