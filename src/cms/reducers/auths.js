import { AUTH, SIGN_OUT } from '../constants';

const INITIAL_STATE = { errorMessage: '', authenticated: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    
    case AUTH.SUCCESS:
      return { ...state, errorMessage: '', authenticated: true };

    case SIGN_OUT.SUCCESS:
      return { ...state, errorMessage: '', authenticated: false };
    
    case AUTH.FAILURE:
    case SIGN_OUT.FAILURE:
      return { ...state, errorMessage: action.payload.errorMessage };

    default:
      return state;
  }
}