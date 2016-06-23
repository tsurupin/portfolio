import { expect } from '../../helpers/utility';
import { createAlert, deleteAlert } from 'shared/actions/alerts';

import { CREATE_ALERT, DELETE_ALERT } from 'shared/constants/actions';

describe('shared alerts actions', () => {
  describe('createAlert', () => {
    it('creates CREATE_ALERT and alert message', () => {
      const action = createAlert({ errorMessage: 'errorMessage'}, 'error');
      const expectedResponse = {
        type: CREATE_ALERT,
        payload: {
          hasAlert: true,
          message: 'errorMessage',
          kind: 'error'
        }
      };
      expect(action).to.eql(expectedResponse);
    });
  });

  describe('deleteAlert', () => {
    it('creates DELETE_ALERT and change hasAlert false from true', () => {
      const action = deleteAlert();
      const expectedResponse = {
        type: DELETE_ALERT,
        payload: {
          hasAlert: false
        }
      };
      expect(action).to.eql(expectedResponse);
    });
  });

});
