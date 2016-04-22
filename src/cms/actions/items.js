import { 
    FETCH_ITEMS, CREATE_ITEM, DELETE_ITEM, UPDATE_ITEM, 
    MOVE_ITEM_TOP, MOVE_ITEM_UP, MOVE_ITEM_DOWN, MOVE_ITEM_BOTTOM 
} from '../constants';


export function fetchItems(items) {
    return {
        type: FETCH_ITEMS,
        payload: {
            items
        }
    }
}

export function createItem(type) {
    return {
        type: CREATE_ITEM,
        payload: {
            item: {
                type,
                editing: true,
                isNew: true
            }
        }
    }
}

export function updateItem(sortRank, item) {
    return {
        type: UPDATE_ITEM,
        payload: {
            sortRank,
            item
        }
    }
}

export function deleteItem(sortRank) {
    return {
        type: DELETE_ITEM,
        payload: { sortRank }
    }
}

export function moveItem(sortRank, type) {
    return {
        type,
        payload: { sortRank }
    }
}
