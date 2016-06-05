import { FETCH_ITEMS } from '../constants';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_ITEMS:
      return [...action.payload.items];
    default:
      return state;
  }
}
