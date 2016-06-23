import { expect } from '../../helpers/utility';
import alertReducer from 'shared/reducers/alerts';
import { CREATE_ALERT, DELETE_ALERT } from 'shared/constants/actions';

const INITIAL_STATE = {
  hasAlert: false,
  message: '',
  kind: ''
};

describe('Alert Reducer', () => {

  it('handles action with unknown type', () => {
    expect(alertReducer(INITIAL_STATE, {})).to.eql(INITIAL_STATE);
  });

  it('handles action of type CREATE_ALERT', () => {
    
    const alert = {
      hasAlert: true,
      message: 'message',
      kind: 'error'
    };
    
    const action = {
      type: CREATE_ALERT,
      payload: alert 
    };

    expect(alertReducer({}, action)).to.eql(alert);
  });

  it('handles action of type DELETE_ALERT', () => {

    const state = {
      hasAlert: true,
      message: 'message',
      kind: 'error'
    };

    const action = { type: DELETE_ALERT };

    expect(alertReducer(state, action)).to.eql(INITIAL_STATE);
  });

  
});