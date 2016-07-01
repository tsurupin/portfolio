import { FETCH_ITEMS } from 'shared/constants/actions';

export function fetchItems(items) {
  return {
    type: FETCH_ITEMS,
    payload: { items },
  };
}

