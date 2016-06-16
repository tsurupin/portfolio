import { FETCH_HOME, HOME_PATH } from '../constants';
import { axios } from '../utilities';

export function fetchHome() {
  const request = axios.get(HOME_PATH);
  return dispatch => {
    return (
      request
        .then(response => {
          dispatch(fetchHomeSuccess(response.data))
        })
        .catch(error => {
          dispatch(fetchHomeFailure(error.data))
        })
    )
  }
}

function fetchHomeSuccess(home) {
  console.log(home)
  console.log('home')
  return {
    type: FETCH_HOME.SUCCESS,
    payload: { home }
  }
}

function fetchHomeFailure(error) {
  return {
    type: FETCH_HOME.FAILURE,
    payload: { error }
  }
}
