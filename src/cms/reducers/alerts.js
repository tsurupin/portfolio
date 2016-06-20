import { CREATE_ALERT, DELETE_ALERT } from '../constants';

const INITIAL_STATE = { hasAlert: false, message: null, kind: null };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    
    case CREATE_ALERT:
      return { ...action.payload };

    case DELETE_ALERT:
      return { ...INITIAL_STATE };
    
    default:
      return state;
  }
}