import { expect } from '../../helpers/utility';
import {
  fetchTags,
  fetchTagsForm,
  createTag,
  deleteTag,
} from 'cms/actions/tags';

import {
  FETCH_TAGS,
  FETCH_TAGS_FORM,
  CREATE_TAG,
  DELETE_TAG,
} from 'shared/constants/actions';

describe('tag actions', () => {
  describe('fetchTags', () => {
    it('creates FETCH_TAGS and get tags', () => {
      const action = fetchTags({
        tags: [{ text: 'hoge' }],
        tagSuggestions: ['hoge'],
      });
      const expectedResponse = {
        type: FETCH_TAGS,
        payload: {
          tags: {
            tags: [{ text: 'hoge' }],
            tagSuggestions: ['hoge'],
          },
        },
      };
      expect(action).to.eql(expectedResponse);
    });
  });

  describe('fetchTagsForm', () => {
    it('creates FETCH_TAGS_FORM and get tags', () => {
      const action = fetchTagsForm({
        tags: [{ text: 'hoge' }],
        tagSuggestions: ['hoge'],
      });
      const expectedResponse = {
        type: FETCH_TAGS_FORM,
        payload: {
          tags: [{ text: 'hoge' }],
          tagSuggestions: ['hoge'],
        },
      };
      expect(action).to.eql(expectedResponse);
    });
  });

  describe('createTag', () => {
    it('creates CREATE_TAG and get tag', () => {
      const action = createTag({ text: 'hoge' });
      const expectedResponse = {
        type: CREATE_TAG,
        payload: { tag: { text: 'hoge' } },
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
          sortRank: 1,
        },
      };
      expect(action).to.eql(expectedResponse);
    });
  });
});
