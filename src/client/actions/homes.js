import { FETCH_HOME } from 'shared/constants/actions';
import { HOME_PATH } from "shared/constants/apis";
import { axios } from "client/utilities";
import { createAlert } from "sharedActions/alerts";

export function fetchHome() {
  const request = axios.get(HOME_PATH);
  return dispatch => {
    return (
      request
        .then(response => dispatch(fetchHomeSuccess(response.data)))
        .catch(error => dispatch(createAlert(error.data, "error")))
    )
  }
}

function fetchHomeSuccess(home) {
  return {
    type: FETCH_HOME.SUCCESS,
    payload: home 
  }
}
