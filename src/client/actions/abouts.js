import { ABOUT_PATH, FETCH_ABOUT } from '../constants';
import { axios } from '../utilities';
import { fetchSocialAccounts } from'./socialAccounts';

export function fetchAbout(){
  const request = axios.get(ABOUT_PATH);
  return dispatch => {
    return (
      request
        .then((response) => {
          dispatch(fetchAboutSuccess(response.data));
          dispatch(fetchSocialAccounts(response.data));
        })
        .catch(error => dispatch(fetchAboutFailure(error)))
    )
  }
}

function fetchAboutSuccess(about) {
  return {
    type: FETCH_ABOUT.SUCCESS,
    payload: { about: {
      email: about.email,
      name: about.name,
      image: about.image,
      description: about.description
    } }
  };
}
function fetchAboutFailure(error) {
  return {
    type: FETCH_ABOUT.FAILURE,
    payload: error
  }
}