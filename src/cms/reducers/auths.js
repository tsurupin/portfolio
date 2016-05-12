import { AUTH, SIGN_OUT } from '../constants';

const INITIAL_STATE = { error: '', authenticated: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    
    case AUTH.SUCCESS:
      return { ...state, error: '', authenticated: true };

    case SIGN_OUT.SUCCESS:
      return { ...state, error: '', authenticated: false };
    
    case AUTH.FAILURE:
    case SIGN_OUT.FAILURE:
      return { ...state, error: action.payload.error };

    default:
      return state;
  }
}