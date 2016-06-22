import { FETCH_HOME } from 'shared/constants/actions';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_HOME.SUCCESS:
      return action.payload;
    
    // case FETCH_HOME.FAILURE:
    //   return { ...state, errorMessage: action.payload.errorMessage };
    //
    default:
      return state;  
  }
}