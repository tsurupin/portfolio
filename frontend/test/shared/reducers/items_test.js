import { expect } from '../../helpers/utility';
import itemReducer from 'shared/reducers/items';
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
import TARGET_TYPES from 'shared/constants/targetTypes';

describe('Item Reducer', () => {
  it('handles action with unknown type', () => {
    expect(itemReducer([], {})).to.eql([]);
  });

  it('handles action of type FETCH_ITEMS', () => {
    const items = [
      {
        id: 1,
        targetId: 1,
        targetType: TARGET_TYPES.TWITTER,
        sortRank: 1,
        twitterId: '12345',
      },
      {
        id: 2,
        targetId: 1,
        targetType: TARGET_TYPES.TEXT,
        sortRank: 2,
        description: 'rich text',
      },
      {
        id: 3,
        targetId: 1,
        targetType: TARGET_TYPES.IMAGE,
        sortRank: 3,
        image: 'http://image.png',
        caption: 'image caption',
      },
    ];

    const action = {
      type: FETCH_ITEMS,
      payload: { items },
    };
    expect(itemReducer([], action)).to.eql(items);
  });

  it('handles action of type CREATE_ITEM', () => {
    const action = {
      type: CREATE_ITEM,
      payload: {
        item: { type: TARGET_TYPES.IMAGE },
      },
    };

    const state = [
      { type: TARGET_TYPES.TEXT },
    ];

    const expectedResponse = [
      { type: TARGET_TYPES.TEXT },
      { type: TARGET_TYPES.IMAGE },
    ];

    expect(itemReducer(state, action)).to.eql(expectedResponse);
  });

  it('handles action of type UPDATE_ITEM', () => {
    const action = {
      type: UPDATE_ITEM,
      payload: {
        sortRank: 1,
        item: { type: TARGET_TYPES.IMAGE },
      },
    };

    const state = [
      { type: TARGET_TYPES.TEXT },
      { type: TARGET_TYPES.TEXT },
      { type: TARGET_TYPES.TEXT },
    ];

    const expectedResponse = [
      { type: TARGET_TYPES.TEXT },
      { type: TARGET_TYPES.IMAGE },
      { type: TARGET_TYPES.TEXT },
    ];

    expect(itemReducer(state, action)).to.eql(expectedResponse);
  });

  it('handles action of type DELETE_ITEM', () => {
    const action = {
      type: DELETE_ITEM,
      payload: {
        sortRank: 1,
      },
    };

    const state = [
      { type: TARGET_TYPES.TWITTER },
      { type: TARGET_TYPES.TEXT },
      { type: TARGET_TYPES.IMAGE },
    ];

    const expectedResponse = [
      { type: TARGET_TYPES.TWITTER },
      { type: TARGET_TYPES.IMAGE },
    ];

    expect(itemReducer(state, action)).to.eql(expectedResponse);
  });

  it('handles action of type MOVE_ITEM_TOP', () => {
    const action = {
      type: MOVE_ITEM_TOP,
      payload: {
        sortRank: 1,
      },
    };

    const state = [
      { type: TARGET_TYPES.TWITTER },
      { type: TARGET_TYPES.TEXT },
      { type: TARGET_TYPES.IMAGE },
    ];

    const expectedResponse = [
      { type: TARGET_TYPES.TEXT },
      { type: TARGET_TYPES.TWITTER },
      { type: TARGET_TYPES.IMAGE },
    ];

    expect(itemReducer(state, action)).to.eql(expectedResponse);
  });

  it('handles action of type MOVE_ITEM_TOP when state is empty', () => {
    const action = {
      type: MOVE_ITEM_TOP,
      payload: {
        sortRank: 0,
      },
    };

    const state = [
      { type: TARGET_TYPES.TWITTER },
    ];

    const expectedResponse = [
      { type: TARGET_TYPES.TWITTER },
    ];

    expect(itemReducer(state, action)).to.eql(expectedResponse);
  });

  it('handles action of type MOVE_ITEM_UP', () => {
    const action = {
      type: MOVE_ITEM_UP,
      payload: {
        sortRank: 1,
      },
    };

    const state = [
      { type: TARGET_TYPES.TWITTER },
      { type: TARGET_TYPES.TEXT },
    ];

    const expectedResponse = [
      { type: TARGET_TYPES.TEXT },
      { type: TARGET_TYPES.TWITTER },
    ];

    expect(itemReducer(state, action)).to.eql(expectedResponse);
  });

  it('handles action of type MOVE_ITEM_UP when state is empty', () => {
    const action = {
      type: MOVE_ITEM_UP,
      payload: {
        sortRank: 0,
      },
    };

    const state = [
      { type: TARGET_TYPES.TWITTER },
    ];

    const expectedResponse = [
      { type: TARGET_TYPES.TWITTER },
    ];

    expect(itemReducer(state, action)).to.eql(expectedResponse);
  });

  it('handles action of type MOVE_ITEM_DOWN', () => {
    const action = {
      type: MOVE_ITEM_DOWN,
      payload: {
        sortRank: 0,
      },
    };

    const state = [
      { type: TARGET_TYPES.TWITTER },
      { type: TARGET_TYPES.TEXT },
    ];

    const expectedResponse = [
      { type: TARGET_TYPES.TEXT },
      { type: TARGET_TYPES.TWITTER },
    ];

    expect(itemReducer(state, action)).to.eql(expectedResponse);
  });

  it('handles action of type MOVE_ITEM_DOWN when sortRanks equals to state length', () => {
    const action = {
      type: MOVE_ITEM_DOWN,
      payload: {
        sortRank: 1,
      },
    };

    const state = [
      { type: TARGET_TYPES.TWITTER },
      { type: TARGET_TYPES.TEXT },
    ];

    const expectedResponse = [
      { type: TARGET_TYPES.TWITTER },
      { type: TARGET_TYPES.TEXT },
    ];

    expect(itemReducer(state, action)).to.eql(expectedResponse);
  });

  it('handles action of type MOVE_ITEM_BOTTOM', () => {
    const action = {
      type: MOVE_ITEM_BOTTOM,
      payload: {
        sortRank: 0,
      },
    };

    const state = [
      { type: TARGET_TYPES.TWITTER },
      { type: TARGET_TYPES.TEXT },
    ];

    const expectedResponse = [
      { type: TARGET_TYPES.TEXT },
      { type: TARGET_TYPES.TWITTER },
    ];

    expect(itemReducer(state, action)).to.eql(expectedResponse);
  });

  it('handles action of type MOVE_ITEM_DOWN when sortRanks equals to state length', () => {
    const action = {
      type: MOVE_ITEM_BOTTOM,
      payload: {
        sortRank: 1,
      },
    };

    const state = [
      { type: TARGET_TYPES.TWITTER },
      { type: TARGET_TYPES.TEXT },
    ];

    const expectedResponse = [
      { type: TARGET_TYPES.TWITTER },
      { type: TARGET_TYPES.TEXT },
    ];

    expect(itemReducer(state, action)).to.eql(expectedResponse);
  });
});
