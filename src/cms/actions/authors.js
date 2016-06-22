import { createAuthorizedRequest, trimAuthor } from "cms/utilities";
import { UPDATE_AUTHOR, FETCH_AUTHOR } from "shared/constants/actions";

import { AUTHOR_PATH } from "shared/constants/apis";
import { browserHistory } from "react-router";
import { fetchSocialAccounts } from "./socialAccounts";
import { createAlert } from "./alerts";


export function fetchAuthor() {
  const request = createAuthorizedRequest("get", `${AUTHOR_PATH}/`);
  return dispatch => {
    return (
      request
        .then((response) => {
          dispatch(fetchAuthorSuccess(response.data));
          dispatch(fetchSocialAccounts(response.data));
        })
        .catch(error => dispatch(createAlert(error.data, "error")))
    );
  };
}

function fetchAuthorSuccess(author) {
  return {
    type: FETCH_AUTHOR.SUCCESS,
    payload: { author: {
      id: author.id,
      email: author.email,
      name: author.name,
      image: author.image,
      description: author.description,
      introduction: author.introduction
    } }
  };
}

export function updateAuthor(props) {
  const author = trimAuthor(props.author);
  const request = createAuthorizedRequest("patch", `${AUTHOR_PATH}`, { author });
  
  return dispatch => {
   // dispatch(updateAuthorRequest());
    return (
      request
        .then(() => dispatch(updateAuthorSuccess()))
        .catch(error =>dispatch(updateAuthorFailure(error.data)))
    );
  };
}

export function updateAuthorRequest() {
  return {
    type: UPDATE_AUTHOR.REQUEST
  };
}

function updateAuthorSuccess() {
  browserHistory.push("/cms/about");
  return {
    type: UPDATE_AUTHOR.SUCCESS
  }
}

function updateAuthorFailure(response) {
  return {
    type: UPDATE_AUTHOR.FAILURE,
    payload: {
      errorMessage: response.errorMessage
    }
  };
}



