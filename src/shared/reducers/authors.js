import { FETCH_AUTHOR, UPDATE_AUTHOR } from 'shared/constants/actions';

const INITIAL_STATE = { 
  author: {}, 
  errorMessage: ''
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {

    case FETCH_AUTHOR.SUCCESS:
      return { ...state, author: action.payload.author,  errorMessage: '' };
    
    // case UPDATE_AUTHOR.REQUEST:
    //   return { ...state };
    case UPDATE_AUTHOR.SUCCESS:
      return { ...state, author: {}, errorMessage: '' };
    case UPDATE_AUTHOR.FAILURE:
      return { ...state, errorMessage: action.payload.errorMessage };

    default:
      return state;
  }
}