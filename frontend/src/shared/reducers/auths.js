import { AUTH, SIGN_OUT } from 'shared/constants/actions';

const INITIAL_STATE = { errorMessage: '', authenticated: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    
    case AUTH.SUCCESS:
      return { ...state, errorMessage: '', authenticated: true };

    case SIGN_OUT.SUCCESS:
      return { ...state, errorMessage: '', authenticated: false };
    
    case AUTH.FAILURE:
      return { ...state, errorMessage: action.payload.errorMessage };
 
    default:
      return state;
  }
}