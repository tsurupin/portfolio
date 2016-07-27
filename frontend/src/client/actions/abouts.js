import { FETCH_ABOUT } from 'shared/constants/actions';
import { ABOUT_PATH } from 'shared/constants/apis';
import { axios } from 'client/utilities';
import { fetchSocialAccounts } from './socialAccounts';
import { createError } from 'shared/actions/errors';

function fetchAboutSuccess(response) {
  return {
    type: FETCH_ABOUT.SUCCESS,
    payload: {
      name: response.name,
      email: response.email,
      image: response.image,
      description: response.description,
    },
  };
}

export function fetchAbout() {
  const request = axios.get(ABOUT_PATH);
  return dispatch => {
    return request
      .then((response) => {
        dispatch(fetchAboutSuccess(response.data));
        dispatch(fetchSocialAccounts(response.data));
      })
      .catch(error => dispatch(createError(error)));
  };
}
