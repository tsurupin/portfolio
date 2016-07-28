import { FETCH_HOME } from 'shared/constants/actions';
import { HOME_PATH } from 'shared/constants/apis';
import { axios } from 'client/utilities';
import { createError } from 'shared/actions/errors';

function fetchHomeSuccess(response) {
  return {
    type: FETCH_HOME.SUCCESS,
    payload: {
      introduction: response.introduction,
      image: response.image,
      latestPosts: response.latestPosts,
      latestProject: response.latestProject,
    },
  };
}

export function fetchHome() {
  const request = axios.get(HOME_PATH);
  return dispatch => {
    return request
      .then(response => dispatch(fetchHomeSuccess(response.data)))
      .catch(error => dispatch(createError(error)));
  };
}
