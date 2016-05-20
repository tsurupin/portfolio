import {
  CREATE_SOCIAL_ACCOUNT,
  UPDATE_SOCIAL_ACCOUNT,
  DELETE_SOCIAL_ACCOUNT
} from '../constants';

export default function (state = [], action) {
  switch (action.type) {

    case CREATE_SOCIAL_ACCOUNT:
      return [...state, action.payload.socialAccount];

    case UPDATE_SOCIAL_ACCOUNT:
      return [...state.slice(0, action.payload.sortRank), action.payload.socialAccount, ...state.slice(action.payload.sortRank + 1)];

    case DELETE_SOCIAL_ACCOUNT:
      return [...state.slice(0, action.payload.sortRank), ...state.slice(action.payload.sortRank + 1)];

    default:
      return state;
  }
}
