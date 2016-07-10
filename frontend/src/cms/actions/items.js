import {
  FETCH_ITEMS,
  CREATE_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
} from 'shared/constants/actions';


export function fetchItems(items) {
  return {
    type: FETCH_ITEMS,
    payload: { items },
  };
}

export function createItem(targetType) {
  return {
    type: CREATE_ITEM,
    payload: {
      item: {
        targetType,
        editing: true,
        isNew: true,
      },
    },
  };
}

export function updateItem(sortRank, item) {
  return {
    type: UPDATE_ITEM,
    payload: {
      sortRank,
      item,
    },
  };
}

export function deleteItem(sortRank) {
  return {
    type: DELETE_ITEM,
    payload: { sortRank },
  };
}


export function moveItem(sortRank, type) {
  return {
    type,
    payload: { sortRank },
  };
}

