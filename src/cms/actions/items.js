import axios from 'axios';
import { CREATE_ITEM, DELETE_ITEM, UPDATE_ITEM } from '../constants';


export function createItem(targetType) {
    return {
        type: CREATE_ITEM,
        payload: {
            item: {
                targetType,
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