import {
  FETCH_AUTHOR,
  UPDATE_AUTHOR,
  AUTH,
  SIGN_OUT_AUTHOR
} from '../constants';

const INITIAL_STATE = { author: null, error: null, authenticated: false, loading: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    
    case FETCH_AUTHOR.SUCCESS:
      return { ...state, author: action.payload.author };

    case AUTH.SUCCESS:
      return { ...state, error: '', authenticated: true };

    case SIGN_OUT_AUTHOR.SUCCESS:
      return { ...state, authenticated: false };
    
    case UPDATE_AUTHOR.SUCCESS: 
      return { ...state, message: 'Successfully Updated', loading: false }
    
    case UPDATE_AUTHOR.REQUEST:
      return { ...state, loading: true };
    
    case UPDATE_AUTHOR.FAILURE:
      return { ...state, error: action.payload, loading: false };
    
    case FETCH_AUTHOR.FAILURE:
    case AUTH.FAILURE:
    case SIGN_OUT_AUTHOR.FAILURE:
      return { ...state, error: action.payload };

    default:
      return state;
  }
}