import {
  FETCH_SOCIAL_ACCOUNTS,
  UPDATE_SOCIAL_ACCOUNT
} from 'shared/constants/actions';

export default function (state = [], action) {
  switch (action.type) {

    case FETCH_SOCIAL_ACCOUNTS:
      return action.payload.socialAccounts;

    case UPDATE_SOCIAL_ACCOUNT:
      const account = { ...state[action.payload.sortRank], url: action.payload.url };
      return [...state.slice(0, action.payload.sortRank), account, ...state.slice(action.payload.sortRank + 1)];
    
    default:
      return state;
  }
}
