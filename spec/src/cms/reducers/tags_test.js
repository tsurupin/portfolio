import { expect } from '../utility';
import tagReducer from '../../../../src/cms/reducers/tags';
import {
  FETCH_TAGS, CREATE_TAG, DELETE_TAG
} from '../../../../src/cms/constants';

describe('Tag Reducer', () => {

  it('handles action with unknown type', () => {
    expect(tagReducer({ tags: [], tagSuggestions: [] }, {})).to.eql({ tags: [], tagSuggestions: [] });
  });

  it('handles action of type FETCH_TAGS', () => {
    const action = { type: FETCH_TAGS, payload: { tags: [{ id: 1, text: 'hoge'}], tagSuggestions: ["hoge"]  } };
    const expectedResponse = { tags: [{ id: 1, text: 'hoge'}], tagSuggestions: ["hoge"]  } ;
    expect(tagReducer([], action)).to.eql(expectedResponse);
  });

  it('handles action of type CREATE_TAG', () => {
    const action = {
      type: CREATE_TAG,
      payload: {
        tag: { id: 2, text: 'hoge' }
      }
    };

    const state = {
      tags: [{ id: 1, text: 'hoge' }],
      tagSuggestions: ["hoge"]
    };

    const expectedResponse = {
      tags: [{ id: 1, text: 'hoge' }, { id: 2, text: 'hoge' }],
      tagSuggestions: ["hoge"]
    };

    expect(tagReducer(state, action)).to.eql(expectedResponse);
  });

  it('handles action of type DELETE_TAG', () => {
    const action = {
      type: DELETE_TAG,
      payload: {
        sortRank: 1
      }
    };

    const state = {
      tags: [{ id: 1, text: 'hoge' }, { id: 2, text: 'hoge' }],
      tagSuggestions: ["hoge"]
    };
    
    const expectedResponse = {
      tags: [{ id: 1, text: 'hoge' }],
      tagSuggestions: ["hoge"]
    };

    expect(tagReducer(state, action)).to.eql(expectedResponse);
  });



});