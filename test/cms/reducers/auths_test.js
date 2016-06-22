import { expect } from '../utility';
import authReducer from '../../../../src/cms/reducers/auths';
import { AUTH, SIGN_OUT } from '../../../../src/cms/constants';

describe('Auth Reducer', () => {

  it('handles action with unknown type', () => {
    expect(authReducer([], {})).to.eql([]);
  });

  it('handles action of type AUTH_SUCCESS', () => {
    const action = { type: AUTH.SUCCESS };
    const expectedResponse = { error: '', authenticated: true };
    expect(authReducer([], action)).to.eql(expectedResponse);
  });
  
  it('handles action of type SING_OUT_SUCCESS', () => {
    const action = { type: SIGN_OUT.SUCCESS };
    const expectedResponse = { error: '', authenticated: false };
    expect(authReducer([], action)).to.eql(expectedResponse);
  });

  it('handles action of type AUTH_FAILURE', () => {
    const action = { type: AUTH.FAILURE, payload: { error: 'error' } };
    const expectedResponse = { error: 'error', authenticated: true };
    expect(authReducer({ authenticated: true }, action)).to.eql(expectedResponse);
  });

  it('handles action of type SIGN_OUT_FAILURE', () => {
    const action = { type: SIGN_OUT.FAILURE, payload: { error: 'error' } };
    const expectedResponse = { error: 'error', authenticated: false };
    expect(authReducer({ authenticated: false }, action)).to.eql(expectedResponse);
  });

});