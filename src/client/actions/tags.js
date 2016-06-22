import { FETCH_TAGS } from '../constants';

export function fetchTags(tags) {
  return {
    type: FETCH_TAGS,
    payload: { tags }
  }
}
