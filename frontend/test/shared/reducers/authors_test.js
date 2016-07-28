import { expect } from '../../helpers/utility';
import authorReducer from 'shared/reducers/authors';
import { FETCH_AUTHOR, UPDATE_AUTHOR } from 'shared/constants/actions';

const INITIAL_STATE = {
  author: {},
  errorMessage: '',
};

describe('Author Reducer', () => {
  const state = {
    author: {
      id: 1,
      email: 'sample1@gmail.com',
      name: 'hoge1',
      image: 'http://image1.png',
      description: 'rich text1',
      introduction: 'rich text1',
    },
    errorMessage: 'errorMessage',
  };

  it('handles action with unknown type', () => {
    expect(authorReducer(INITIAL_STATE, {})).to.eql(INITIAL_STATE);
  });

  it('handles action of type FETCH_AUTHOR_SUCCESS', () => {
    const author = {
      id: 2,
      email: 'sample2@gmail.com',
      name: 'hoge2',
      image: 'http://image2.png',
      description: 'rich text2',
      introduction: 'rich text2',
    };

    const action = {
      type: FETCH_AUTHOR.SUCCESS,
      payload: { author },
    };
    const expectedResponse = { author, errorMessage: '' };
    expect(authorReducer(state, action)).to.eql(expectedResponse);
  });

  it('handles action of type UPDATE_AUTHOR_SUCCESS', () => {
    const action = { type: UPDATE_AUTHOR.SUCCESS };
    const expectedResponse = { author: {}, errorMessage: '' };
    expect(authorReducer(state, action)).to.eql(expectedResponse);
  });

  it('handles action of type UPDATE_AUTHOR_FAILURE', () => {
    const action = {
      type: UPDATE_AUTHOR.FAILURE,
      payload: { errorMessage: 'errorMessage' },
    };
    const expectedResponse = { author: state.author, errorMessage: 'errorMessage' };
    expect(authorReducer(state, action)).to.eql(expectedResponse);
  });
});
