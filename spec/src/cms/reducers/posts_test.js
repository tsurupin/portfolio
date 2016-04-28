import { expect } from '../utility';
import postReducer from '../../../../src/cms/reducers/posts';
import {
  FETCH_POSTS,
  FETCH_POST,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  TOGGLE_POST
} from '../../../../src/cms/constants';

describe('Post Reducer', () => {

  it('handles action with unknown type', () => {
    expect(postReducer([], {})).to.eql([]);
  });

  it('handles action of type FETCH_POSTS_SUCCESS', () => {
    const action = { type: FETCH_POSTS.SUCCESS, payload: [] };
    const expectedResponse = { all: [] };
    expect(postReducer([], action)).to.eql(expectedResponse);
  });

  it('handles action of type FETCH_POST_SUCCESS', () => {
    const action = { type: FETCH_POST.SUCCESS, payload: { post: { id: 1 } } };
    const expectedResponse = { post: { id: 1 } };
    expect(postReducer([], action)).to.eql(expectedResponse);
  });

  it('handles action of type CREATE_POST_SUCCESS', () => {
    const action = { type: CREATE_POST.SUCCESS };
    const expectedResponse = { message: 'Successfully Saved', loading: false };
    expect(postReducer([], action)).to.eql(expectedResponse);
  });

  // it('handles action of type UPDATE_POST_SUCCESS', () => {
  //   const action = { type: UPDATE_POST.SUCCESS };
  //   const expectedResponse = { message: 'Successfully Saved' };
  //   expect(postReducer([], action)).to.eql(expectedResponse);
  // });

  it('handles action of type DELETE_POST_SUCCESS', () => {
    const action = { type: DELETE_POST.SUCCESS };
    const expectedResponse = { message: 'Successfully Deleted' };
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