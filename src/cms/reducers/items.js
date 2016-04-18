import { FETCH_ITEMS, CREATE_ITEM, DELETE_ITEM, UPDATE_ITEM } from '../constants';

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_ITEMS:
            return [...state, action.payload.items];
        case CREATE_ITEM:
            return [...state, action.payload.item];
        case UPDATE_ITEM:
            return [...state.slice(0, action.payload.sortRank), action.payload.item, ...state.slice(action.payload.sortRank+1)];
        case DELETE_ITEM:
            return; [...state.slice(0, action.payload.sortRank), ...state.slice(action.payload.sortRank+1)];
        default:
            return state;
    }
}
