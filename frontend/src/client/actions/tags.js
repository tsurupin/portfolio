import { FETCH_TAGS } from 'shared/constants/actions';

export function fetchTags(tags) {
  return {
    type: FETCH_TAGS,
    payload: { tags },
  };
}
