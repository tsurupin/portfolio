import { expect } from '../utility';
import {
  createSocialAccount,
  updateSocialAccount,
  deleteSocialAccount,
} from '../../../../src/cms/actions/socialAccounts';

import {
  CREATE_SOCIAL_ACCOUNT,
  UPDATE_SOCIAL_ACCOUNT,
  DELETE_SOCIAL_ACCOUNT
} from '../../../../src/cms/constants';

describe('socialAccount actions', () => {

  describe('createSocialAccount', () => {
    it('creates CREATE_SOCIAL_ACCOUNT', () => {
      const action = createSocialAccount();
      const expectedResponse = {
        type: CREATE_SOCIAL_ACCOUNT,
        payload: { socialAccount: {} }
      };
      expect(action).to.eql(expectedResponse);
    });
  });

  describe('updateSocialAccount', () => {
    it('creates UPDATE_SOCIAL_ACCOUNT and updates socialAccount', () => {
      const action = updateSocialAccount(1, { name: 'name' });
      const expectedResponse = {
        type: UPDATE_SOCIAL_ACCOUNT,
        payload: {
          sortRank: 1,
          socialAccount: {
            name: 'name'
          }
        }
      };
      expect(action).to.eql(expectedResponse);
    });
  });

  describe('deleteSocialAccount', () => {
    it('creates DELETE_SOCIAL_ACCOUNT and delete socialAccount', () => {
      const action = deleteSocialAccount(1);
      const expectedResponse = {
        type: DELETE_SOCIAL_ACCOUNT,
        payload: {
          sortRank: 1
        }
      };
      expect(action).to.eql(expectedResponse);
    });
  });


});
