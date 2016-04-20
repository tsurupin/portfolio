// import { expect } from '../test_helper';
// import { fetchPosts, fetchPost, createPost, deletePost, togglePost } from '../../../../src/cms/actions/posts';
// import {
//     ROOT_URL, POST_PATH,
//     FETCH_POSTS, FETCH_POST, CREATE_POST, DELETE_POST, TOGGLE_POST
// } from '../../../../src/cms/constants';
// import configureMockStore from 'redux-mock-store'
// import thunk from 'redux-thunk'
// import nock from 'nock'
//
// const middlewares = [ thunk ];
// const mockStore = configureMockStore(middlewares);
//
// describe('actions', () => {
//    describe('fetchPosts', () => {
//        afterEach(() => {
//            nock.cleanAll()
//        });
//
//      it('has the correct type', () => {
//          const action = fetchPostsl(FETCH_POSTS);
//          expect(action.payload).to.equal(FETCH_POSTS);
//      });
//
//        it('fetch posts jas been done', () => {
//            nock('127.0.0.1')
//                .get(`${ROOT_URL}${POST_PATH}`)
//                .reply(200, { body: { data: [{title: 'hoge', description: 'description', id: 1}] }});
//
//
//            const expectedActions = { data: [{title: 'hoge', description: 'description', id: 1}]}
//            const store = mockStore({ })
//
//            return store.dispatch(fetchPosts())
//                .then(() => { // return of async actions
//                    expect(store.getActions()).toEqual(expectedActions)
//                })
//        })
//    });
// });