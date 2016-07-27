import { createAuthorizedRequest, trimAuthor } from 'cms/utilities';
import { UPDATE_AUTHOR, FETCH_AUTHOR } from 'shared/constants/actions';

import { AUTHOR_PATH } from 'shared/constants/apis';
import { browserHistory } from 'react-router';
import { fetchSocialAccounts } from './socialAccounts';
import { createError } from 'shared/actions/errors';

function fetchAuthorSuccess(response) {
  return {
    type: FETCH_AUTHOR.SUCCESS,
    payload: { author: {
      id: response.id,
      email: response.email,
      name: response.name,
      image: response.image,
      description: response.description,
      introduction: response.introduction,
    } },
  };
}

export function fetchAuthor() {
  const request = createAuthorizedRequest('get', `${AUTHOR_PATH}/edit`);
  return dispatch => {
    return (
      request
        .then((response) => {
          dispatch(fetchAuthorSuccess(response.data));
          dispatch(fetchSocialAccounts(response.data));
        })
        .catch(error => dispatch(createError(error)))
    );
  };
}


function updateAuthorSuccess() {
  return {
    type: UPDATE_AUTHOR.SUCCESS,
  };
}

function updateAuthorFailure({ errorMessage }) {
  return {
    type: UPDATE_AUTHOR.FAILURE,
    payload: { errorMessage },
  };
}

export function updateAuthor(props) {
  const author = trimAuthor(props.author);
  const request = createAuthorizedRequest('patch', `${AUTHOR_PATH}`, { author });

  return dispatch => {
    return (
      request
        .then(() => dispatch(updateAuthorSuccess()))
        .then(() => browserHistory.push('/cms/about'))
        .catch(error => dispatch(updateAuthorFailure(error.data)))
    );
  };
}

