import { FETCH_PROJECTS } from "shared/constants/actions";
import { PROJECT_PATH } from "shared/constants/apis";
import { axios } from "client/utilities";
import { browserHistory } from "react-router";
import { createAlert } from "sharedActions/alerts";

export function fetchProjects(params = {}) {
  const url =  params.tag ? `${PROJECT_PATH}?tag=${params.tag}` : PROJECT_PATH;

  const request = axios.get(url);
  return dispatch => {
    return (
      request
        .then(response => dispatch(fetchProjectsSuccess(response.data)))
        .catch(error => dispatch(createAlert(error.data, "error")))
    );
  };
}

function fetchProjectsSuccess(response) {
  return {
    type: FETCH_PROJECTS.SUCCESS,
    payload: { projects: response.projects }
  };
}
