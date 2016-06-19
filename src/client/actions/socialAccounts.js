import { FETCH_SOCIAL_ACCOUNTS } from '../constants';

export function fetchSocialAccounts(response) {
  return {
    type: FETCH_SOCIAL_ACCOUNTS,
    payload: { socialAccounts: response.socialAccounts }
  }
}
