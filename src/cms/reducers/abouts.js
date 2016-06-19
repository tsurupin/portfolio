import { FETCH_ABOUT } from '../constants';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_ABOUT.SUCCESS:
      return action.payload.about;
    
    case FETCH_ABOUT.FAILURE:
      return {...state, error: action.payload.error };
    
    default:
      return state;  
  }
}