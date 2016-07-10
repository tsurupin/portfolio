import {
  FETCH_ITEMS,
  CREATE_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
  MOVE_ITEM_TOP,
  MOVE_ITEM_UP,
  MOVE_ITEM_DOWN,
  MOVE_ITEM_BOTTOM,
} from 'shared/constants/actions';


export default function (state = [], action) {
  switch (action.type) {
    case FETCH_ITEMS:
      return action.payload.items;

    case CREATE_ITEM:
      return [...state, action.payload.item];

    case UPDATE_ITEM:
      return [
        ...state.slice(0, action.payload.sortRank),
        action.payload.item,
        ...state.slice(action.payload.sortRank + 1),
      ];

    case DELETE_ITEM:
      return [
        ...state.slice(0, action.payload.sortRank),
        ...state.slice(action.payload.sortRank + 1),
      ];

    case MOVE_ITEM_TOP:
      if (state.length > 0 && action.payload.sortRank !== 0) {
        const topItem = state.slice(action.payload.sortRank, action.payload.sortRank + 1);
        return [
          ...topItem,
          ...state.slice(0, action.payload.sortRank),
          ...state.slice(action.payload.sortRank + 1),
        ];
      }
      return state;

    case MOVE_ITEM_UP:
      if (state.length > 0) {
        const subject = state.slice(action.payload.sortRank, action.payload.sortRank + 1);
        const prevItem = state.slice(action.payload.sortRank - 1, action.payload.sortRank);
        return [
          ...state.slice(0, action.payload.sortRank - 1),
          ...subject,
          ...prevItem,
          ...state.slice(action.payload.sortRank + 1),
        ];
      }
      return state;

    case MOVE_ITEM_DOWN:
      if (state.length > action.payload.sortRank) {
        const subject = state.slice(action.payload.sortRank, action.payload.sortRank + 1);
        const succItem = state.slice(action.payload.sortRank + 1, action.payload.sortRank + 2);
        return [
          ...state.slice(0, action.payload.sortRank),
          ...succItem,
          ...subject,
          ...state.slice(action.payload.sortRank + 2),
        ];
      }
      return state;

    case MOVE_ITEM_BOTTOM:
      if (state.length > 0 && state.length - 1 !== action.payload.sortRank) {
        const bottomItem = state.slice(action.payload.sortRank, action.payload.sortRank + 1);
        return [
          ...state.slice(0, action.payload.sortRank),
          ...state.slice(action.payload.sortRank + 1),
          ...bottomItem,
        ];
      }
      return state;

    default:
      return state;
  }
}
