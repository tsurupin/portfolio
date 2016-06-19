import {
  FETCH_TAGS,
  FETCH_TAGS_FORM,
  CREATE_TAG,
  DELETE_TAG
} from '../constants';

const INITIAL_STATE = { tags: [], tagSuggestions: [] };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_TAGS:
      return { tags: action.payload.tags };

    case FETCH_TAGS_FORM:
      return { ...state, tags: action.payload.tags, tagSuggestions: action.payload.tagSuggestions };

    case CREATE_TAG:
      return { ...state, tags: [...state.tags, action.payload.tag] };
    
    case DELETE_TAG:
      return { ...state, tags: [...state.tags.slice(0, action.payload.sortRank), ...state.tags.slice(action.payload.sortRank + 1)] };
    
    default:
      return state;
  }
}
