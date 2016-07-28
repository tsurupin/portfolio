import { expect } from '../../helpers/utility';
import { fetchTags } from 'cms/actions/tags';

import { FETCH_TAGS } from 'shared/constants/actions';

describe('client tag actions', () => {
  describe('fetchTags', () => {
    it('creates FETCH_TAGS and get tags', () => {
      const action = fetchTags([{ id: 1, name: 'hoge' }]);
      const expectedResponse = {
        type: FETCH_TAGS,
        payload: {
          tags: [{ id: 1, name: 'hoge' }],
        },
      };
      expect(action).to.eql(expectedResponse);
    });
  });
});
