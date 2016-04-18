import { FETCH_POSTS } from '../constants';

const INITIAL_STATE = { all: [], article: null };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
    case FETCH_POSTS:
        return { ...state, all: action.payload.data };
    default:
        return state;
    }
}