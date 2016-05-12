import { expect, sinon } from '../utility';
import {
  fetchPosts,
  fetchPost, 
  fetchNewPost,
  createPost,
  deletePost,
  togglePost
} from '../../../../src/cms/actions/posts';
import {
  ROOT_URL, POST_PATH, TEST_DOMAIN, FETCH_POSTS, FETCH_POST, FETCH_NEW_POST,
  CREATE_POST, UPDATE_POST, DELETE_POST, TOGGLE_POST, FETCH_ITEMS, FETCH_TAGS
} from '../../../../src/cms/constants';
import { trimPost } from '../../../../src/cms/utilities';
import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import browserHistory  from 'react-router/lib/browserHistory'
import thunk from 'redux-thunk'
const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);

const headerConfig = { reqheaders: { 'authorization': localStorage.getItem('accessToken') }};

describe('post actions', () => {

  // TODO: figure out how to test browserHistory
  sinon.stub(browserHistory,'push');
  
  afterEach(() => {
    nock.cleanAll()
  });

  describe('fetchPosts', () => {

    it('creates FETCH_POSTS_SUCCESS when fetching posts has been done', () => {
      nock(TEST_DOMAIN, headerConfig )
        .get(`${ROOT_URL}${POST_PATH}?page=1`)
        .reply(200, {
          posts: [{ title: 'hoge', description: 'description', id: 1 }],
          meta: {
            pagination: {
              page: 1,
              limit: 20,
              total: 30
            }
          }
        });


      const store = mockStore({});
      const expectedResponse = [{
        type: FETCH_POSTS.SUCCESS,
        payload: {
          posts: [{ title: 'hoge', description: 'description', id: 1 }],
          page: 1,
          limit: 20,
          total: 30
        }
      }];

      return store.dispatch(fetchPosts())
        .then(() => {
          console.log(store.getActions());
          expect(store.getActions()).to.eql(expectedResponse)
        })
    });

    it('creates FETCH_POSTS_FAILURE when fetching posts has been failed', () => {
      nock(TEST_DOMAIN, headerConfig)
        .get(`${ROOT_URL}${POST_PATH}?page=1`)
        .reply(400);

      const store = mockStore({});
      const expectedResponse = [{
        payload: '', type: FETCH_POSTS.FAILURE
      }];

      return store.dispatch(fetchPosts())
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse)
        })
    });
  });

  describe('fetchPost', () => {

    it('create FETCH_POST_SUCCESS when fetching post has been done', () => {
      nock(TEST_DOMAIN, headerConfig)
        .get(`${ROOT_URL}${POST_PATH}/1/edit`)
        .reply(200, { 
          post: { title: 'hoge', description: 'description', id: 1 },
          items: [{ }],
          tags: [], 
          tagSuggestions:[] 
        });

      const store = mockStore({});
      const expectedResponse = [
        {
          payload: {
            items: [{}],
            post: { 
              description: "description",
              id: 1,
              title: "hoge" 
            },
            tags: {
              tagSuggestions: [],
              tags: []
            }
          },
          type: FETCH_POST.SUCCESS
        }, 
        {
          payload: { items: [{}] },
          type: FETCH_ITEMS
        },
        {
          payload: {
            tagSuggestions: [],
            tags: []
          },
          type: FETCH_TAGS 
        }
      ];

      return store.dispatch(fetchPost(1))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse)
        })
    });

    it('create FETCH_POST_FAILURE when fetching post has been failed', () => {
      nock(TEST_DOMAIN, headerConfig)
        .get(`${ROOT_URL}${POST_PATH}/1/edit`)
        .reply(400);

      const store = mockStore({});
      const expectedResponse = [{
        type: FETCH_POST.FAILURE,
        payload: ''
      }];

      return store.dispatch(fetchPost(1))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse)
        })
    });
  });

  describe('fetchNewPost', () => {

    it('create FETCH_NEW_POST_SUCCESS when fetching new post has been done', () => {
      nock(TEST_DOMAIN, headerConfig)
        .get(`${ROOT_URL}${POST_PATH}/new`)
        .reply(200, { tags: [], tagSuggestions:[] } );

      const store = mockStore({});
      const expectedResponse = [
        {
          payload: {
            tags: {
              tagSuggestions: []
            }
          },
          type: FETCH_NEW_POST.SUCCESS
        },
        {
          payload: {
            tagSuggestions: [],
            tags: undefined
          },
          type: FETCH_TAGS
        }
      ];

      return store.dispatch(fetchNewPost())
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse)
        })
    });

    it('create FETCH_NEW_POST_FAILURE when fetching new post has been failed', () => {
      nock(TEST_DOMAIN, headerConfig)
        .get(`${ROOT_URL}${POST_PATH}/new`)
        .reply(400);

      const store = mockStore({});
      const expectedResponse = [{
        type: FETCH_NEW_POST.FAILURE,
        payload: ''
      }];

      return store.dispatch(fetchNewPost())
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse)
        })
    });
  });

  describe('createPost', () => {
    let props;
    beforeEach(() => {
      props = {
        post: {
          title: 'hoge', description: 'description',
          itemsAttributes: [{ targetType: 'ItemHeading', editing: false }]
        }
      };
    });

    it('create CREATE_POST_SUCCESS when creating post has been done', () => {
      nock(TEST_DOMAIN, headerConfig)
        .post(`${ROOT_URL}${POST_PATH}`, { post: trimPost(props.post) })
        .reply(201);

      const store = mockStore({});
      const expectedResponse = [
        { type: CREATE_POST.REQUEST },
        { type: CREATE_POST.SUCCESS }
      ];

      return store.dispatch(createPost(props))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse)
        })
    });

    it('create CREATE_POST_SUCCESS when updating post has been done', () => {
      props.post.id = 1;
      nock(TEST_DOMAIN, headerConfig)
        .patch(`${ROOT_URL}${POST_PATH}/1`, { post: trimPost(props.post) })
        .reply(200);

      const store = mockStore({});
      const expectedResponse = [
        { type: CREATE_POST.REQUEST },
        { type: CREATE_POST.SUCCESS }
      ];
      
      return store.dispatch(createPost(props))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse)
        })
    });

    it('create CREATE_POST_FAILURE when creating post has been done', () => {
      nock(TEST_DOMAIN, headerConfig)
        .post(`${ROOT_URL}${POST_PATH}`, { post: trimPost(props.post) })
        .reply(400, 'error');

      const store = mockStore({});
      const expectedResponse = [
        { type: CREATE_POST.REQUEST },
        { 
          type: CREATE_POST.FAILURE, 
          payload: 'error' 
        }
      ];

      return store.dispatch(createPost(props)) 
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse)
        })
    });

  });

  // describe('updatePost', () => {
  //
  //   it('create UPDATE_POST_SUCCESS when updating post has been done', () => {
  //     nock(TEST_DOMAIN)
  //       .patch(`${ROOT_URL}${POST_PATH}/1`, { id: 1, title: 'hoge' })
  //       .reply(200);
  //
  //     const store = mockStore({});
  //     const expectedResponse = [{
  //       type: UPDATE_POST.SUCCESS
  //     }];
  //
  //     return store.dispatch(updatePost({ id: 1, title: 'hoge' }))
  //       .then(() => {
  //         expect(store.getActions()).to.eql(expectedResponse)
  //       })
  //   });
  //
  //   it('create UPDATE_POST_FAILURE when creating post has been done', () => {
  //     nock(TEST_DOMAIN)
  //       .patch(`${ROOT_URL}${POST_PATH}/1`, { id: 1, title: 'hoge' })
  //       .reply(400);
  //
  //     const store = mockStore({});
  //     const expectedResponse = [{
  //       type: UPDATE_POST.FAILURE,
  //       payload: ''
  //     }];
  //
  //     return store.dispatch(updatePost({ id: 1, title: 'hoge' }))
  //       .then(() => {
  //         expect(store.getActions()).to.eql(expectedResponse)
  //       })
  //   });
  //
  // });

  describe('deletePost', () => {
    it('create DELETE_POST_SUCCESS when deleting post has been done', () => {
      nock(TEST_DOMAIN, headerConfig)
        .delete(`${ROOT_URL}${POST_PATH}/1`)
        .reply(204);

      
      const store = mockStore({});
      const expectedResponse = [{
        type: DELETE_POST.SUCCESS
      }];

      return store.dispatch(deletePost(1))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse)
        })
    });

    it('create DELETE_POST_FAILURE when deleting post has been failed', () => {
      nock(TEST_DOMAIN, headerConfig)
        .delete(`${ROOT_URL}${POST_PATH}/1`)
        .reply(400);

      const store = mockStore({});
      const expectedResponse = [{
        type: DELETE_POST.FAILURE,
        payload: ''
      }];

      return store.dispatch(deletePost(1))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse)
        })
    });
  });

  describe('togglePosts', () => {

    it('create TOGGLE_POST_SUCCESS when toggling post has been done', () => {
      nock(TEST_DOMAIN, headerConfig)
        .patch(`${ROOT_URL}${POST_PATH}/1/acceptance`)
        .reply(200);


      const store = mockStore({});
      const expectedResponse = [{
        type: TOGGLE_POST.SUCCESS
      }];

      return store.dispatch(togglePost(1))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse)
        })
    });

    it('create TOGGLE_POST_FAILURE when toggling post has been failed', () => {
      nock(TEST_DOMAIN, headerConfig)
        .patch(`${ROOT_URL}${POST_PATH}/1/acceptance`)
        .reply(400);

      const store = mockStore({});
      const expectedResponse = [{
        type: TOGGLE_POST.FAILURE,
        payload: ''
      }];

      return store.dispatch(togglePost(1))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse)
        })
    })

  });
});