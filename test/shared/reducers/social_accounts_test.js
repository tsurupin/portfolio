import { expect } from '../../helpers/utility';
import socialAccountReducer from '../../../../src/cms/reducers/socialAccounts';
import {
  CREATE_SOCIAL_ACCOUNT,
  UPDATE_SOCIAL_ACCOUNT,
  DELETE_SOCIAL_ACCOUNT
} from '../../../../src/cms/constants';

describe('SocialAccount Reducer', () => {

  it('handles action with unknown type', () => {
    expect(socialAccountReducer([], {})).to.eql([]);
  });
  

  it('handles action of type CREATE_SOCIAL_ACCOUNT', () => {
    const action = {
      type: CREATE_SOCIAL_ACCOUNT,
      payload: { socialAccount: { } }
    };

    const state = [
      { name: 'name' }
    ];

    const expectedResponse = [
      { name: 'name' },
      { }
    ];

    expect(socialAccountReducer(state, action)).to.eql(expectedResponse);
  });

  it('handles action of type UPDATE_SOCIAL_ACCOUNT', () => {
    const action = {
      type: UPDATE_SOCIAL_ACCOUNT,
      payload: {
        sortRank: 1,
        socialAccount: { name: "hoge" }
      }
    };

    const state = [
      { name: 'test1' },
      { name: 'test2' },
      { name: 'test3' }
    ];

    const expectedResponse = [
      { name: 'test1' },
      { name: 'hoge' },
      { name: 'test3' }
    ];

    expect(socialAccountReducer(state, action)).to.eql(expectedResponse);
  });

  it('handles action of type DELETE_SOCIAL_ACCOUNT', () => {
    const action = {
      type: DELETE_SOCIAL_ACCOUNT,
      payload: {
        sortRank: 1
      }
    };

    const state = [
      { name: 'test1' },
      { name: 'test2' },
      { name: 'test3' }
    ];

    const expectedResponse = [
      { name: 'test1' },
      { name: 'test3' }
    ];

    expect(socialAccountReducer(state, action)).to.eql(expectedResponse);
  });


});