import { FETCH_TAGS } from '../constants';

export function fetchTags(tags) {
  console.log(tags)
  return {
    type: FETCH_TAGS,
    payload: { tags }
  }
}
