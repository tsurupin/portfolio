import { expect } from '../utility';
import {
  fetchTags,
  createTag,
  deleteTag,
} from '../../../../src/cms/actions/tags';

import {
  FETCH_TAGS, CREATE_TAG, DELETE_TAG
} from '../../../../src/cms/constants';

describe('tag actions', () => {
  describe('fetchTags', () => {
    it('creates FETCH_TAGS and get tags', () => {
      const action = fetchTags({
        tags: [{ id: 1, text: 'hoge' }],
        tagSuggestions: ['hoge']
      });
      const expectedResponse = {
        type: FETCH_TAGS,
        payload: {
          tags: [{ id: 1, text: 'hoge' }],
          tagSuggestions: ['hoge']
        }
      };
      expect(action).to.eql(expectedResponse);
    });
  });

  describe('createTag', () => {
    it('creates CREATE_TAG and get tag', () => {
      const action = createTag({ id:1, text:'hoge' });
      const expectedResponse = {
        type: CREATE_TAG,
        payload: { tag: { id:1, text:'hoge' } }
      };
      expect(action).to.eql(expectedResponse);
    });
  });
  
  describe('deleteTag', () => {
    it('creates DELETE_TAG and get sortRank', () => {
      const action = deleteTag(1);
      const expectedResponse = {
        type: DELETE_TAG,
        payload: {
          sortRank: 1
        }
      };
      expect(action).to.eql(expectedResponse);
    });
  });

});
