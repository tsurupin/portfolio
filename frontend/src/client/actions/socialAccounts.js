import { FETCH_SOCIAL_ACCOUNTS } from 'shared/constants/actions';

export function fetchSocialAccounts({ socialAccounts }) {
  return {
    type: FETCH_SOCIAL_ACCOUNTS,
    payload: { socialAccounts },
  };
}
