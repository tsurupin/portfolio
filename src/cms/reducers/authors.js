import {
  FETCH_AUTHOR, SIGN_UP_AUTHOR, SIGN_IN_AUTHOR, SIGN_OUT_AUTHOR
} from '../constants';

const INITIAL_STATE = { author: null, error: null, message: null, loading: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    
    case FETCH_AUTHOR.SUCCESS:
      return { ...state, author: action.payload.author };

    case SIGN_UP_AUTHOR.SUCCESS:
      return { ...state, message: 'Successfully Sign Up' };
    
    case SIGN_IN_AUTHOR.SUCCESS:
      return { ...state, message: 'Successfully Sign In' };

    case SIGN_OUT_AUTHOR.SUCCESS:
      return { ...state, message: 'Successfully Sign Out' };
    
    case UPDATE_AUTHOR.SUCCESS: 
      return { ...state, message: 'Successfully Sign Up', loading: false }
    
    case UPDATE_AUTHOR.REQUEST:
      return { ...state, loading: true };
    
    case UPDATE_AUTHOR.FAILURE:
      return { ...state, error: action.payload, loading: false };
    
    case FETCH_AUTHOR.FAILURE:
    case SIGN_UP_AUTHOR.FAILURE:
    case SIGN_IN_AUTHOR.FAILURE:
    case SING_OUT_AUTHOR.FAILURE:
      return { ...state, error: action.payload };

    default:
      return state;
  }
}