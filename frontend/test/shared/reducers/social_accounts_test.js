import { expect } from '../../helpers/utility';
import socialAccountReducer from 'shared/reducers/socialAccounts';
import {
  FETCH_SOCIAL_ACCOUNTS,
  UPDATE_SOCIAL_ACCOUNT,
} from 'shared/constants/actions';

describe('SocialAccount Reducer', () => {
  it('handles action with unknown type', () => {
    expect(socialAccountReducer([], {})).to.eql([]);
  });


  it('handles action of type FETCH_SOCIAL_ACCOUNTS', () => {
    const action = {
      type: FETCH_SOCIAL_ACCOUNTS,
      payload: { socialAccounts: [{ accountType: 'twitter', url: 'http://twitter.com' }] },
    };

    const expectedResponse = [{ accountType: 'twitter', url: 'http://twitter.com' }];

    expect(socialAccountReducer([], action)).to.eql(expectedResponse);
  });

  it('handles action of type UPDATE_SOCIAL_ACCOUNT', () => {
    const action = {
      type: UPDATE_SOCIAL_ACCOUNT,
      payload: {
        sortRank: 1,
        url: 'http://twitter10.com',
      },
    };

    const state = [
      { url: 'http://twitter1.com' },
      { url: 'http://twitter2.com' },
      { url: 'http://twitter3.com' },
    ];

    const expectedResponse = [
      { url: 'http://twitter1.com' },
      { url: 'http://twitter10.com' },
      { url: 'http://twitter3.com' },
    ];

    expect(socialAccountReducer(state, action)).to.eql(expectedResponse);
  });
});
