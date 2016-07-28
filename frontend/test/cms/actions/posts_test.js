import { expect, sinon } from '../../helpers/utility';
import {
  fetchPosts,
  fetchEditPost,
  fetchNewPost,
  savePost,
  togglePost,
} from 'cms/actions/posts';
import {
  FETCH_POSTS,
  FETCH_EDIT_POST,
  FETCH_NEW_POST,
  SAVE_POST,
  TOGGLE_POST,
  FETCH_ITEMS,
  FETCH_TAGS_FORM,
  CREATE_ERROR,
} from 'shared/constants/actions';
import {
  CMS_ROOT_URL,
  POST_PATH,
  TEST_DOMAIN,
} from 'shared/constants/apis';
import { trimPost } from 'cms/utilities';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import browserHistory from 'react-router/lib/browserHistory';
import thunk from 'redux-thunk';
const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);

const headerConfig = { headers: { 'authorization': localStorage.getItem('accessToken') } };
const postUrl = `${CMS_ROOT_URL}${POST_PATH}`;

describe('cms post actions', () => {
  beforeEach(() => {
    // TODO: figure out how to test browserHistory
    sinon.stub(browserHistory, 'push');
  });

  afterEach(() => {
    nock.cleanAll();
    browserHistory.push.restore();
  });

  describe('fetchPosts', () => {
    it('creates FETCH_POSTS_SUCCESS when fetching posts has been done', () => {
      nock(TEST_DOMAIN, headerConfig)
        .get(`${postUrl}?page=1`)
        .reply(200, {
          posts: [{ title: 'hoge', description: 'description', id: 1 }],
          meta: {
            pagination: {
              page: 1,
              limit: 20,
              total: 30,
            },
          },
        });

      const store = mockStore({});
      const expectedResponse = [{
        type: FETCH_POSTS.SUCCESS,
        payload: {
          posts: [{ title: 'hoge', description: 'description', id: 1 }],
          page: 1,
          limit: 20,
          total: 30,
        },
      }];

      return store.dispatch(fetchPosts())
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse);
        });
    });

    it('creates FETCH_POSTS_FAILURE when fetching posts has been failed', () => {
      nock(TEST_DOMAIN, headerConfig)
        .get(`${postUrl}?page=1`)
        .reply(400, { errorMessage: 'errorMessage' });

      const store = mockStore({});
      const expectedResponse = [{
        payload: {
          hasAlert: true,
          message: 'errorMessage',
        },
        type: CREATE_ERROR,
      }];

      return store.dispatch(fetchPosts())
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse);
        });
    });
  });

  describe('fetchNewPost', () => {
    it('create FETCH_NEW_POST_SUCCESS when fetching new post has been done', () => {
      nock(TEST_DOMAIN, headerConfig)
        .get(`${postUrl}/new`)
        .reply(200, { tags: [], tagSuggestions: [] });

      const store = mockStore({});
      const expectedResponse = [
        {
          payload: {
            items: [],
            tags: {
              tagSuggestions: [],
              tags: [],
            },
          },
          type: FETCH_NEW_POST.SUCCESS,
        },
        {
          payload: { items: [] },
          type: FETCH_ITEMS,
        },
        {
          payload: {
            tagSuggestions: [],
            tags: [],
          },
          type: FETCH_TAGS_FORM,
        },
      ];

      return store.dispatch(fetchNewPost())
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse);
        });
    });

    it('create FETCH_NEW_POST_FAILURE when fetching new post has been failed', () => {
      nock(TEST_DOMAIN, headerConfig)
        .get(`${postUrl}/new`)
        .reply(400, { errorMessage: 'errorMessage' });

      const store = mockStore({});
      const expectedResponse = [{
        payload: {
          hasAlert: true,
          message: 'errorMessage',
        },
        type: CREATE_ERROR,
      }];


      return store.dispatch(fetchNewPost())
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse);
        });
    });
  });

  describe('fetchEditPost', () => {
    it('create FETCH_EDIT_POST_SUCCESS when fetching post has been done', () => {
      nock(TEST_DOMAIN, headerConfig)
        .get(`${postUrl}/1/edit`)
        .reply(200, {
          id: 1,
          leadSentence: 'leadSentence',
          publishedAt: '2015/10/10',
          title: 'hoge',
          items: [{ }],
          tags: [],
          tagSuggestions: [],
        });

      const store = mockStore({});
      const expectedResponse = [
        {
          payload: {
            items: [{}],
            postForm: {
              id: 1,
              leadSentence: 'leadSentence',
              publishedAt: '2015/10/10',
              title: 'hoge',
            },
            tags: {
              tagSuggestions: [],
              tags: [],
            },
          },
          type: FETCH_EDIT_POST.SUCCESS,
        },
        {
          payload: { items: [{}] },
          type: FETCH_ITEMS,
        },
        {
          payload: {
            tagSuggestions: [],
            tags: [],
          },
          type: FETCH_TAGS_FORM,
        },
      ];

      return store.dispatch(fetchEditPost(1))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse);
        });
    });

    it('create FETCH_EDIT_POST_FAILURE when fetching post has been failed', () => {
      nock(TEST_DOMAIN, headerConfig)
        .get(`${postUrl}/1/edit`)
        .reply(400, { errorMessage: 'errorMessage' });

      const store = mockStore({});
      const expectedResponse = [{
        payload: {
          hasAlert: true,
          message: 'errorMessage',
        },
        type: CREATE_ERROR,
      }];

      return store.dispatch(fetchEditPost(1))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse);
        });
    });
  });


  describe('savePost', () => {
    let props;
    beforeEach(() => {
      props = {
        post: {
          title: 'hoge',
          description: 'description',
          itemsAttributes: [{
            targetType: 'ItemHeading',
            editing: false,
          }],
        },
      };
    });

    it('create SAVE_POST_SUCCESS when creating post has been done', () => {
      nock(TEST_DOMAIN, headerConfig)
        .post(`${postUrl}`, { post: trimPost(props.post) })
        .reply(201);

      const store = mockStore({});
      const expectedResponse = [
        { type: SAVE_POST.REQUEST },
        { type: SAVE_POST.SUCCESS },
      ];

      return store.dispatch(savePost(props))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse);
        });
    });

    it('create SAVE_POST_SUCCESS when updating post has been done', () => {
      props.post.id = 1;
      nock(TEST_DOMAIN, headerConfig)
        .patch(`${postUrl}/1`, { post: trimPost(props.post) })
        .reply(200);

      const store = mockStore({});
      const expectedResponse = [
        { type: SAVE_POST.REQUEST },
        { type: SAVE_POST.SUCCESS },
      ];

      return store.dispatch(savePost(props))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse);
        });
    });

    it('create SAVE_POST_FAILURE when creating post has been done', () => {
      nock(TEST_DOMAIN, headerConfig)
        .post(`${postUrl}`, { post: trimPost(props.post) })
        .reply(400, { errorMessage: 'errorMessage' });

      const store = mockStore({});
      const expectedResponse = [
        { type: SAVE_POST.REQUEST },
        {
          type: SAVE_POST.FAILURE,
          payload: {
            errorMessage: 'errorMessage',
          },
        },
      ];

      return store.dispatch(savePost(props))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse);
        });
    });
  });

  describe('togglePosts', () => {
    it('create TOGGLE_POST_SUCCESS when toggling post has been done', () => {
      nock(TEST_DOMAIN, headerConfig)
        .patch(`${postUrl}/1/acceptance`)
        .reply(200, { status: 1, accepted: true });


      const store = mockStore({});
      const expectedResponse = [{
        type: TOGGLE_POST.SUCCESS,
        payload: {
          sortRank: 1,
          status: 1,
          accepted: true,
        },
      }];

      return store.dispatch(togglePost(1, 1))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse);
        });
    });

    it('create TOGGLE_POST_FAILURE when toggling post has been failed', () => {
      nock(TEST_DOMAIN, headerConfig)
        .patch(`${postUrl}/1/acceptance`)
        .reply(400, { errorMessage: 'errorMessage' });

      const store = mockStore({});
      const expectedResponse = [{
        payload: {
          hasAlert: true,
          message: 'errorMessage',
        },
        type: CREATE_ERROR,
      }];

      return store.dispatch(togglePost(1, 1))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse);
        });
    });
  });
});
