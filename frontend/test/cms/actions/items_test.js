import { expect } from '../../helpers/utility';
import {
  fetchItems,
  createItem,
  updateItem,
  deleteItem,
  moveItem,
} from 'cms/actions/items';

import {
  FETCH_ITEMS,
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  MOVE_ITEM_TOP,
} from 'shared/constants/actions';

import TARGET_TYPES from 'shared/constants/targetTypes';

describe('cms item actions', () => {
  describe('fetchItems', () => {
    it('creates FETCH_ITEMS and items', () => {
      const action = fetchItems([{ targetType: TARGET_TYPES.IMAGE }]);
      const expectedResponse = {
        type: FETCH_ITEMS,
        payload: {
          items: [{ targetType: TARGET_TYPES.IMAGE }],
        },
      };
      expect(action).to.eql(expectedResponse);
    });
  });

  describe('createItem', () => {
    it('creates CREATE_ITEM and item', () => {
      const action = createItem(TARGET_TYPES.IMAGE);
      const expectedResponse = {
        type: CREATE_ITEM,
        payload: {
          item: {
            targetType: TARGET_TYPES.IMAGE,
            editing: true,
            isNew: true,
          },
        },
      };
      expect(action).to.eql(expectedResponse);
    });
  });

  describe('updateItem', () => {
    it('creates UPDATE_ITEM, item and sortRank', () => {
      const action = updateItem(1, { targetType: TARGET_TYPES.IMAGE });
      const expectedResponse = {
        type: UPDATE_ITEM,
        payload: {
          sortRank: 1,
          item: {
            targetType: TARGET_TYPES.IMAGE,
          },
        },
      };
      expect(action).to.eql(expectedResponse);
    });
  });

  describe('deleteItem', () => {
    it('creates DELETE_ITEM and sortRank', () => {
      const action = deleteItem(1);
      const expectedResponse = {
        type: DELETE_ITEM,
        payload: {
          sortRank: 1,
        },
      };
      expect(action).to.eql(expectedResponse);
    });
  });

  describe('moveItem', () => {
    it('creates MOVE_ITEM_TOP and sortRank', () => {
      const action = moveItem(1, MOVE_ITEM_TOP);
      const expectedResponse = {
        type: MOVE_ITEM_TOP,
        payload: {
          sortRank: 1,
        },
      };
      expect(action).to.eql(expectedResponse);
    });
  });
});
