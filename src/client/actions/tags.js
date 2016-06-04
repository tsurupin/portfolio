import { FETCH_TAGS } from '../constants';

export function fetchTags(response) {
  return {
    type: FETCH_TAGS,
    payload: { tags: response }
  }
}
