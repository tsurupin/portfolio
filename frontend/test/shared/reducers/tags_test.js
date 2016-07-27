import { expect } from '../../helpers/utility';
import tagReducer from 'shared/reducers/tags';
import {
  FETCH_TAGS,
  FETCH_TAGS_FORM,
  CREATE_TAG,
  DELETE_TAG,
} from 'shared/constants/actions';

describe('Tag Reducer', () => {
  const INITIAL_STATE = { tags: [], tagSuggestions: [] };

  it('handles action with unknown type', () => {
    expect(tagReducer(INITIAL_STATE, {})).to.eql(INITIAL_STATE);
  });

  it('handles action of type FETCH_TAGS', () => {
    const action = { type: FETCH_TAGS, payload: { tags: [{ id: 1, name: 'hoge' }] } };
    const expectedResponse = { tags: [{ id: 1, name: 'hoge' }] };
    expect(tagReducer([], action)).to.eql(expectedResponse);
  });

  it('handles action of type FETCH_TAGS_FORM', () => {
    const action = {
      type: FETCH_TAGS_FORM,
      payload: { tags: [{ text: 'hoge' }], tagSuggestions: ['hoge'] } };
    const expectedResponse = { tags: [{ text: 'hoge' }], tagSuggestions: ['hoge'] };
    expect(tagReducer([], action)).to.eql(expectedResponse);
  });

  it('handles action of type CREATE_TAG', () => {
    const action = {
      type: CREATE_TAG,
      payload: {
        tag: { text: 'hoge2' },
      },
    };

    const state = {
      tags: [{ text: 'hoge1' }],
      tagSuggestions: ['hoge'],
    };

    const expectedResponse = {
      tags: [{ text: 'hoge1' }, { text: 'hoge2' }],
      tagSuggestions: ['hoge'],
    };

    expect(tagReducer(state, action)).to.eql(expectedResponse);
  });

  it('handles action of type DELETE_TAG', () => {
    const action = {
      type: DELETE_TAG,
      payload: {
        sortRank: 1,
      },
    };

    const state = {
      tags: [{ text: 'hoga' }, { text: 'hogo' }],
      tagSuggestions: ['hoge'],
    };

    const expectedResponse = {
      tags: [{ text: 'hoga' }],
      tagSuggestions: ['hoge'],
    };

    expect(tagReducer(state, action)).to.eql(expectedResponse);
  });
});
