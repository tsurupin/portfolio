import { FETCH_ABOUT } from 'shared/constants/actions';
import { ABOUT_PATH } from 'shared/constants/apis';
import { axios } from "client/utilities";
import { fetchSocialAccounts } from "./socialAccounts";

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
    payload: about
  };
}
function fetchAboutFailure(error) {
  return {
    type: FETCH_ABOUT.FAILURE,
    payload: error
  }
}