import { FETCH_ABOUT } from 'shared/constants/actions';
import { ABOUT_PATH } from 'shared/constants/apis';
import { axios } from "client/utilities";
import { fetchSocialAccounts } from "./socialAccounts";
import { createAlert } from "sharedActions/alerts";

export function fetchAbout(){
  const request = axios.get(ABOUT_PATH);
  return dispatch => {
    return (
      request
        .then((response) => {
          dispatch(fetchAboutSuccess(response.data));
          dispatch(fetchSocialAccounts(response.data));
        })
        .catch(error => dispatch(createAlert(error.data, "error")))
    )
  }
}

function fetchAboutSuccess(about) {
  return {
    type: FETCH_ABOUT.SUCCESS,
    payload: about
  };
}
