import {
  FETCH_TAGS, CREATE_TAG, DELETE_TAG
} from '../constants';


export function fetchTags(response) {
  
  return {
    type: FETCH_TAGS,
    payload: { 
      tags: response.tags,
      tagSuggestions: response.tagSuggestions
    }
  }
}

export function createTag(tag) {
  return {
    type: CREATE_TAG,
    payload: { tag }
  }
}

export function deleteTag(sortRank) {
  return {
    type: DELETE_TAG,
    payload: { sortRank }
  }
}


