import { FETCH_PROJECTS } from 'shared/constants/actions';
import { PROJECT_PATH } from 'shared/constants/apis';
import { axios } from 'client/utilities';
import { createError } from 'shared/actions/errors';

function fetchProjectRequest() {
  return {
    type: FETCH_PROJECTS.REQUEST,
  };
}

function fetchProjectsSuccess({ projects }) {
  return {
    type: FETCH_PROJECTS.SUCCESS,
    payload: { projects },
  };
}

function fetchProjectsFailure() {
  return {
    type: FETCH_PROJECTS.FAILURE,
  };
}

export function fetchProjects(params = {}) {
  const url = params.tagId ? `${PROJECT_PATH}?tag-id=${params.tagId}` : PROJECT_PATH;
  const request = axios.get(url);
  return dispatch => {
    dispatch(fetchProjectRequest());
    return (
      request
        .then(response => dispatch(fetchProjectsSuccess(response.data)))
        .catch(error => {
          dispatch(fetchProjectsFailure());
          dispatch(createError(error));
        })
    );
  };
}

