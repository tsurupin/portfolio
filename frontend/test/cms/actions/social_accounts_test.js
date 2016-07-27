import { expect } from '../../helpers/utility';
import {
  fetchSocialAccounts,
  updateSocialAccount,
} from 'cms/actions/socialAccounts';

import {
  FETCH_SOCIAL_ACCOUNTS,
  UPDATE_SOCIAL_ACCOUNT,
} from 'shared/constants/actions';

describe('cms socialAccount actions', () => {
  describe('fetchSocialAccounts', () => {
    it('creates FETCH_SOCIAL_ACCOUNTS', () => {
      const action = fetchSocialAccounts({
        socialAccounts: [
          {
            accountType: 'twitter',
            url: 'http://twitter.com',
          }],
      });
      const expectedResponse = {
        type: FETCH_SOCIAL_ACCOUNTS,
        payload: { socialAccounts: [
          {
            accountType: 'twitter',
            url: 'http://twitter.com',
          },
        ] },
      };
      expect(action).to.eql(expectedResponse);
    });
  });

  describe('updateSocialAccount', () => {
    it('creates UPDATE_SOCIAL_ACCOUNT and updates socialAccount', () => {
      const action = updateSocialAccount(1, 'url');
      const expectedResponse = {
        type: UPDATE_SOCIAL_ACCOUNT,
        payload: {
          sortRank: 1,
          url: 'url',
        },
      };
      expect(action).to.eql(expectedResponse);
    });
  });
});
