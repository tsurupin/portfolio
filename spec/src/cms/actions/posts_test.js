import { expect } from '../test_helper';
import { fetchPosts, fetchPost, createPost, deletePost, togglePost } from '../../../../src/cms/actions/posts';
import {
    ROOT_URL, POST_PATH,
    FETCH_POSTS, FETCH_POST, CREATE_POST, DELETE_POST, TOGGLE_POST
} from '../../../../src/cms/constants';
import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middleWares = [ thunk ];
const mockStore = configureMockStore(middleWares);


describe('actions', () => {
   describe('fetchPosts', () => {
       afterEach(() => {
           nock.cleanAll()
       });
       
       it('creates FETCH_TODO_SUCCESS when fetching posts has been done', () => {
           nock('http://localhost:80')
               .get(`${ROOT_URL}${POST_PATH}`)
               .reply(200,  { data: [ {title: 'hoge', description: 'description', id: 1}] } );
           
           const store = mockStore({});
           const expectedActions = [ {
               type: FETCH_POSTS.SUCCESS,
               payload: {
                    data :[{title: 'hoge', description: 'description', id: 1}]
                }
               
           }];

           return store.dispatch(fetchPosts())
               .then(() => {
                   expect(store.getActions()).to.eql(expectedActions)
               })
       });

       it('creates FETCH_TODO_FAILURE when fetching posts has been failed', () => {
           nock('http://localhost:80')
               .get(`${ROOT_URL}${POST_PATH}`)
               .reply(400);

           const store = mockStore({});
           const expectedActions = [ {
               payload: "", type: FETCH_POSTS.FAILURE
           }];

           return store.dispatch(fetchPosts())
               .then(() => {
                   expect(store.getActions()).to.eql(expectedActions)
               })
       })
   });
});