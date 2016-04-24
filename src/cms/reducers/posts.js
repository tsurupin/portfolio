import { FETCH_POSTS, FETCH_POST, CREATE_POST, UPDATE_POST, DELETE_POST, TOGGLE_POST } from '../constants';

const INITIAL_STATE = { all: [], post: null, error: null , message: null };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_POSTS.SUCCESS:
            return { ...state, all: action.payload };
        case FETCH_POST.SUCCESS:
            return { ...state, post: action.payload };
        case CREATE_POST.SUCCESS:
        case UPDATE_POST.SUCCESS:    
            return { ...state, message: 'Successfully Saved' };
        case DELETE_POST.SUCCESS:
            return { ...state, message: 'Successfully Deleted' };
        case TOGGLE_POST.SUCCESS:
            return { ...state, message: 'Successfully Change Published Status' };
        case FETCH_POSTS.FAILURE:
        case FETCH_POST.FAILURE:
        case CREATE_POST.FAILURE:
        case UPDATE_POST.FAILURE:
        case DELETE_POST.FAILURE:    
        case TOGGLE_POST.FAILURE:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}