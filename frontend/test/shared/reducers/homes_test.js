import { expect } from '../../helpers/utility';
import homeReducer from 'shared/reducers/homes';
import { FETCH_HOME } from 'shared/constants/actions';

describe('Home Reducer', () => {
  it('handles action with unknown type', () => {
    expect(homeReducer({}, {})).to.eql({});
  });

  it('handles action of type FETCH_HOME_SUCCESS', () => {
    const home = {
      introduction: 'rich text',
      image: 'http://image1.png',
      latestPosts: [
        { id: 1, title: 'title' },
      ],
      latestProject: {
        id: 1, image: 'http://image.png',
      },
    };

    const action = {
      type: FETCH_HOME.SUCCESS,
      payload: home,
    };

    expect(homeReducer({}, action)).to.eql(home);
  });
});
