import { CREATE_ERROR, DELETE_ERROR } from 'shared/constants/actions';

const INITIAL_STATE = { 
  hasAlert: false, 
  message: '', 
  kind: '' 
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    
    case CREATE_ERROR:
      return action.payload;

    case DELETE_ERROR:
      return { ...INITIAL_STATE };
    
    default:
      return state;
  }
}