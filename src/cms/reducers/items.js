import { CREATE_ITEM, DELETE_ITEM, UPDATE_ITEM } from '../constants';

const INITIAL_STATE = { items: [] };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case CREATE_ITEM:
            console.log(action);
            return [...state, action];
        case UPDATE_ITEM:
            return [...state.slice(0, action.sortRank), action.item, ...state.slice(action.sortRank+1)];
        case DELETE_ITEM:
            return; [...state.slice(0, action.sortRank), ...state.slice(action.sortRank+1)];
        default:
            return INITIAL_STATE;
    }
}
