import { FETCH_TAGS } from '../constants';

const INITIAL_STATE = { tags: [] };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_TAGS:
      return { tags: action.payload.tags };
    default:
      return state;
  }
}
