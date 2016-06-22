import { FETCH_HOME } from 'shared/constants/actions';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_HOME.SUCCESS:
      return action.payload;
    
    default:
      return state;  
  }
}