import { expect } from '../../helpers/utility';
import { fetchItems } from 'cms/actions/items';
import { FETCH_ITEMS } from 'shared/constants/actions';

import TARGET_TYPES from 'shared/constants/targetTypes';

describe('client item actions', () => {
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
});
