import { FETCH_SOCIAL_ACCOUNTS, UPDATE_SOCIAL_ACCOUNT } from '../constants';

export function fetchSocialAccounts(response) {
  return {
    type: FETCH_SOCIAL_ACCOUNTS,
    payload: {
      socialAccounts: response.socialAccounts
    }
  }
}

export function updateSocialAccount(sortRank, url) {
  console.log(url)
  return {
    type: UPDATE_SOCIAL_ACCOUNT,
    payload: { sortRank, url }
  }
}

