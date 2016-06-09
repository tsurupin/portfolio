import { FETCH_SOCIAL_ACCOUNTS } from '../constants';

export default function (state = [], action) {
  switch (action.type) {

    case FETCH_SOCIAL_ACCOUNTS:
      return action.payload.socialAccounts;
    
    default:
      return state;
  }
}
