import { FETCH_ABOUT } from '../constants';


const INITIAL_STATE = {
  about: {},
  errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_ABOUT.SUCCESS:
      return { about: action.payload.about };
    
    case FETCH_ABOUT.FAILURE:
      return { ...state, errorMessage: action.payload.errorMessage };
    
    default:
      return state;  
  }
}