import {
    FETCH_ITEMS, CREATE_ITEM, DELETE_ITEM, UPDATE_ITEM,
    MOVE_ITEM_TOP, MOVE_ITEM_UP, MOVE_ITEM_DOWN, MOVE_ITEM_BOTTOM
} from '../constants';

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_ITEMS:
            return [...state, action.payload.items];

        case CREATE_ITEM:
            return [...state, action.payload.item];

        case UPDATE_ITEM:
            return [...state.slice(0, action.payload.sortRank), action.payload.item, ...state.slice(action.payload.sortRank + 1)];

        case DELETE_ITEM:
            return [...state.slice(0, action.payload.sortRank), ...state.slice(action.payload.sortRank + 1)];

        case MOVE_ITEM_TOP:
            if (state.length > 0 && action.payload.sortRank !== 0) {
                const topItem = state.slice(action.payload.sortRank, action.payload.sortRank + 1);
                return [...topItem, ...state.slice(0, action.payload.sortRank), ...state.slice(action.payload.sortRank + 1)];
            }
            return state;
        case MOVE_ITEM_UP:
            if (state.length > 1) {
                const subject = state.slice(action.payload.sortRank, action.payload.sortRank+1);
                const frontItem = state.slice(action.payload.sortRank-1, action.payload.sortRank);
                return [...state.slice(0, action.payload.sortRank-1), ...subject, ...frontItem, ...state.slice(action.payload.sortRank+1)];
            }
            return state;
        case MOVE_ITEM_DOWN:
            if (state.length-1 >= action.payload.sortRank) {
                const subject = state.slice(action.payload.sortRank, action.payload.sortRank+1);
                const backItem = state.slice(action.payload.sortRank+1, action.payload.sortRank+2);
                return [...state.slice(0, action.payload.sortRank), ...backItem, ...subject, ...state.slice(action.payload.sortRank+2)];
            }
            return state;
        case MOVE_ITEM_BOTTOM:
            if (action.payload.sortRank !== state.length-1) {
                const bottomItem = state.slice(action.payload.sortRank, action.payload.sortRank+1);
                return [...state.slice(0, action.payload.sortRank), ...state.slice(action.payload.sortRank+1), ...bottomItem];
            }
            return state;
        default:
            return state;
    }
}
