import { expect } from '../../helpers/utility';
import { createError, deleteError } from 'shared/actions/errors';

import { CREATE_ERROR, DELETE_ERROR, SIGN_OUT } from 'shared/constants/actions';

describe('shared errors actions', () => {
  describe('createError', () => {
    it('creates SIGN_OUT.SUCCESS', () => {
      const error = { status: 401, data: { errorMessage: 'errorMessage' } };
      const action = createError(error);
      const expectedResponse = {
        type: SIGN_OUT.SUCCESS,
      };
      expect(action).to.eql(expectedResponse);
    });

    it('creates CREATE_ERROR and error message with response data', () => {
      const error = { status: 400, data: { errorMessage: 'errorMessage' } };
      const action = createError(error);
      const expectedResponse = {
        type: CREATE_ERROR,
        payload: {
          hasAlert: true,
          message: 'errorMessage',
        },
      };
      expect(action).to.eql(expectedResponse);
    });

    it('creates CREATE_ERROR and error message', () => {
      const action = createError('errorMessage');
      const expectedResponse = {
        type: CREATE_ERROR,
        payload: {
          hasAlert: true,
          message: 'errorMessage',
        },
      };
      expect(action).to.eql(expectedResponse);
    });
  });

  describe('deleteError', () => {
    it('creates DELETE_ERROR and change hasAlert false from true', () => {
      const action = deleteError();
      const expectedResponse = {
        type: DELETE_ERROR,
        payload: {
          hasAlert: false,
        },
      };
      expect(action).to.eql(expectedResponse);
    });
  });
});
