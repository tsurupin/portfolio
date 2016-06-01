import { FETCH_TAGS } from '../constants';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_TAGS:
      return [ ...state, ...action.payload.tags ];

    default:
      return state;
  }
}
