import { FETCH_ABOUT } from 'shared/constants/actions';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_ABOUT.SUCCESS:
      // payload -> { image, description }
      return action.payload;

    default:
      return state;
  }
}
