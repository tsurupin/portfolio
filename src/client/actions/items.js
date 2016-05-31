import { FETCH_ITEMS } from '../constants';

export function fetchItems(items) {
  return {
    type: FETCH_ITEMS,
    payload: { items }
  }
}


