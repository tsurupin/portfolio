import { expect } from '../../helpers/utility';
import postReducer from '../../../../src/cms/reducers/posts';
import {
  FETCH_POSTS,
  FETCH_POST,
  SAVE_POST,
  TOGGLE_POST
} from '../../../../src/cms/constants';

describe('Post Reducer', () => {

  it('handles action with unknown type', () => {
    expect(postReducer([], {})).to.eql([]);
  });

  it('handles action of type FETCH_POSTS_SUCCESS', () => {
    const action = { type: FETCH_POSTS.SUCCESS, payload: { posts: {}, page: 1, limit: 1, total: 1} };
    const expectedResponse = { posts: {}, page: 1, limit: 1, total: 1 };
    expect(postReducer([], action)).to.eql(expectedResponse);
  });

  it('handles action of type FETCH_POST_SUCCESS', () => {
    const action = { type: FETCH_POST.SUCCESS, payload: { post: { id: 1 } } };
    const expectedResponse = { post: { id: 1 } };
    expect(postReducer([], action)).to.eql(expectedResponse);
  });

  it('handles action of type SAVE_POST_SUCCESS', () => {
    const action = { type: SAVE_POST.SUCCESS };
    const expectedResponse = { message: 'Successfully Saved', loading: false };
    expect(postReducer([], action)).to.eql(expectedResponse);
  });
  
  it('handles action of type TOGGLE_POST_SUCCESS', () => {
    const action = { type: TOGGLE_POST.SUCCESS };
    const expectedResponse = { message: 'Successfully Change Published Status' };
    expect(postReducer([], action)).to.eql(expectedResponse);
  });


  it('handles action of type FETCH_POSTS_FAILURE', () => {
    const action = { type: FETCH_POSTS.FAILURE, payload: 'error' };
    const expectedResponse = { error: 'error' };
    expect(postReducer([], action)).to.eql(expectedResponse);
  });

});