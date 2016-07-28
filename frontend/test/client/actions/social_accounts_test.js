import { expect } from '../../helpers/utility';
import { fetchSocialAccounts } from 'client/actions/socialAccounts';

import { FETCH_SOCIAL_ACCOUNTS } from 'shared/constants/actions';

describe('client socialAccount actions', () => {
  describe('fetchSocialAccount', () => {
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
});
