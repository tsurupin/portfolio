import { FETCH_HOME } from 'shared/constants/actions';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_HOME.SUCCESS:
      // payload -> { introduction, image, latestPosts[{id, title}], latestProject{id, image} }
      return action.payload;

    default:
      return state;
  }
}
