import axios from 'axios';
import { CREATE_ITEM, DELETE_ITEM, UPDATE_ITEM } from '../constants';


export function fetchItems(items) {
    return {
        type: FETCH_ITEMS,
        payload: {
            items
        }
    }
};

export function createItem(type) {
    console.log('create'+ type);
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
};

export function updateItem(item, sortRank) {
    return {
        type: UPDATE_ITEM,
        payload: {
            sortRank,
            item
        }
    }
};

export function deleteItem(sortRank) {
    return {
        type: DELETE_ITEM,
        payload: { sortRank }
    }
};