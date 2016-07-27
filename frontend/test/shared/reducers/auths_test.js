import { expect } from '../../helpers/utility';
import authReducer from 'shared/reducers/auths';
import { AUTH, SIGN_OUT } from 'shared/constants/actions';

describe('Auth Reducer', () => {
  const INITIAL_STATE = { errorMessage: '', authenticated: false };

  it('handles action with unknown type', () => {
    expect(authReducer(INITIAL_STATE, {})).to.eql(INITIAL_STATE);
  });

  it('handles action of type AUTH_SUCCESS', () => {
    const action = { type: AUTH.SUCCESS };
    const expectedResponse = { errorMessage: '', authenticated: true };
    expect(authReducer([], action)).to.eql(expectedResponse);
  });

  it('handles action of type SING_OUT_SUCCESS', () => {
    const action = { type: SIGN_OUT.SUCCESS };
    const expectedResponse = { errorMessage: '', authenticated: false };
    expect(authReducer([], action)).to.eql(expectedResponse);
  });

  it('handles action of type AUTH_FAILURE', () => {
    const action = { type: AUTH.FAILURE, payload: { errorMessage: 'errorMessage' } };
    const expectedResponse = { errorMessage: 'errorMessage', authenticated: true };
    expect(authReducer({ authenticated: true }, action)).to.eql(expectedResponse);
  });
});
