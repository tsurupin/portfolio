import {
  FETCH_SOCIAL_ACCOUNTS,
  UPDATE_SOCIAL_ACCOUNT,
} from 'shared/constants/actions';

export function fetchSocialAccounts({ socialAccounts }) {
  return {
    type: FETCH_SOCIAL_ACCOUNTS,
    payload: { socialAccounts },
  };
}

export function updateSocialAccount(sortRank, url) {
  return {
    type: UPDATE_SOCIAL_ACCOUNT,
    payload: { sortRank, url },
  };
}

