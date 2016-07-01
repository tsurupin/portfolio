import {
  FETCH_TAGS,
  FETCH_TAGS_FORM,
  CREATE_TAG,
  DELETE_TAG,
} from 'shared/constants/actions';


export function fetchTags(tags) {
  return {
    type: FETCH_TAGS,
    payload: { tags },
  };
}

export function fetchTagsForm(response) {
  return {
    type: FETCH_TAGS_FORM,
    payload: {
      tags: response.tags,
      tagSuggestions: response.tagSuggestions,
    },
  };
}

export function createTag(tag) {
  return {
    type: CREATE_TAG,
    payload: { tag },
  };
}

export function deleteTag(sortRank) {
  return {
    type: DELETE_TAG,
    payload: { sortRank },
  };
}

