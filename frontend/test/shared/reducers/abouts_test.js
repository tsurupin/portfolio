import { expect } from '../../helpers/utility';
import aboutReducer from 'shared/reducers/abouts';
import { FETCH_ABOUT } from 'shared/constants/actions';

describe('About Reducer', () => {
  it('handles action with unknown type', () => {
    expect(aboutReducer({}, {})).to.eql({});
  });

  it('handles action of type FETCH_ABOUT_SUCCESS', () => {
    const about = {
      description: 'rich text',
      image: 'http://image1.png',
    };

    const action = {
      type: FETCH_ABOUT.SUCCESS,
      payload: about,
    };

    expect(aboutReducer({}, action)).to.eql(about);
  });
});
