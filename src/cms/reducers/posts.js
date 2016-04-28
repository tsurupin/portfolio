import { 
  FETCH_POSTS, FETCH_POST, FETCH_NEW_POST, CREATE_POST, DELETE_POST, TOGGLE_POST 
} from '../constants';

const INITIAL_STATE = { all: [], post: null, error: null, message: null };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_POST.REQUEST:
      return { ...state, loading: true };
    
    case FETCH_POSTS.SUCCESS:
      return { ...state, all: action.payload };
    
    case FETCH_POST.SUCCESS:
      return { ...state, post: action.payload.post };
    
    case FETCH_NEW_POST.SUCCESS:
      return { ...state };
    
    case CREATE_POST.SUCCESS:
      return { ...state, message: 'Successfully Saved', loading: false };
    
    case DELETE_POST.SUCCESS:
      return { ...state, message: 'Successfully Deleted' };
    
    case TOGGLE_POST.SUCCESS:
      return { ...state, message: 'Successfully Change Published Status' };
    
    case CREATE_POST.FAILURE:
      return { ...state, error: action.payload, loading: false };
    
    case FETCH_NEW_POST.FAILURE:
    case FETCH_POSTS.FAILURE:
    case FETCH_POST.FAILURE:
    case DELETE_POST.FAILURE:
    case TOGGLE_POST.FAILURE:
      return { ...state, error: action.payload };
    
    default:
      return state;
  }
}