import { FETCH_AUTHOR, UPDATE_AUTHOR } from '../constants';

const INITIAL_STATE = { author: {}, error: null, loading: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {

    case FETCH_AUTHOR.SUCCESS:
      return { ...state, author: action.payload.author, loading: false, errorMessage: '' };
    
    case UPDATE_AUTHOR.REQUEST:
      return { ...state, loading: true };
    case UPDATE_AUTHOR.SUCCESS:
      return { ...state, author: {}, errorMessage: '' };
    case UPDATE_AUTHOR.FAILURE:
      return { ...state, errorMessage: action.payload.errorMessage };

    default:
      return state;
  }
}