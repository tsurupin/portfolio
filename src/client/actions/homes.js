import { FETCH_HOME } from 'shared/constants/actions';
import { HOME_PATH } from "shared/constants/apis";
import { axios } from "client/utilities";

export function fetchHome() {
  const request = axios.get(HOME_PATH);
  return dispatch => {
    return (
      request
        .then(response => dispatch(fetchHomeSuccess(response.data)))
        .catch(error => dispatch(fetchHomeFailure(error.data)))
    )
  }
}

function fetchHomeSuccess(home) {
  return {
    type: FETCH_HOME.SUCCESS,
    payload: home 
  }
}

function fetchHomeFailure(error) {
  return {
    type: FETCH_HOME.FAILURE,
    payload: { error }
  }
}
