import { expect } from '../../helpers/utility';
import errorReducer from 'shared/reducers/errors';
import { CREATE_ERROR, DELETE_ERROR } from 'shared/constants/actions';

const INITIAL_STATE = {
  hasAlert: false,
  message: '',
  kind: '',
};

describe('Alert Reducer', () => {
  it('handles action with unknown type', () => {
    expect(errorReducer(INITIAL_STATE, {})).to.eql(INITIAL_STATE);
  });

  it('handles action of type CREATE_ERROR', () => {
    const error = {
      hasAlert: true,
      message: 'message',
      kind: 'error',
    };

    const action = {
      type: CREATE_ERROR,
      payload: error,
    };

    expect(errorReducer({}, action)).to.eql(error);
  });

  it('handles action of type DELETE_ERROR', () => {
    const state = {
      hasAlert: true,
      message: 'message',
      kind: 'error',
    };

    const action = { type: DELETE_ERROR };

    expect(errorReducer(state, action)).to.eql(INITIAL_STATE);
  });
});
