import { expect } from '../../helpers/utility';
import { fetchPosts, fetchPost, resetPost } from 'client/actions/posts';
import {
  FETCH_POSTS_INFINITELY,
  FETCH_POST,
  FETCH_ITEMS,
  FETCH_TAGS,
  CREATE_ERROR,
  RESET_POST,
} from 'shared/constants/actions';
import {
  CLIENT_ROOT_URL,
  POST_PATH,
  TEST_DOMAIN,
} from 'shared/constants/apis';

import nock from 'nock';
import configureMockStore from 'redux-mock-store';

import thunk from 'redux-thunk';
const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);
const postUrl = `${CLIENT_ROOT_URL}${POST_PATH}`;

describe('client post actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('fetchPosts', () => {
    it('creates FETCH_POSTS__INFINITELY_SUCCESS before fetching posts and ' +
      'creates FETCH_POSTS__INFINITELY_SUCCESS when fetching posts has been done', () => {
      nock(TEST_DOMAIN)
        .get(`${postUrl}?page=1`)
        .reply(200, {
          posts: [{
            title: 'hoge',
            description: 'description',
            id: 1,
          }],
          meta: {
            pagination: {
              page: 1,
              limit: 20,
              total: 30,
            },
          },
        });

      const store = mockStore({});
      const expectedResponse = [
        {
          type: FETCH_POSTS_INFINITELY.REQUEST,
        },
        {
          type: FETCH_POSTS_INFINITELY.SUCCESS,
          payload: {
            posts: [{
              title: 'hoge',
              description: 'description',
              id: 1,
            }],
            page: 1,
            limit: 20,
            total: 30,
          },
        },
      ];

      return store.dispatch(fetchPosts())
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse);
        });
    });

    it('creates FETCH_POSTS__INFINITELY_SUCCESS when fetching posts has been done', () => {
      nock(TEST_DOMAIN)
        .get(`${postUrl}?page=2`)
        .reply(200, {
          posts: [{
            title: 'hoge',
            description: 'description',
            id: 1,
          }],
          meta: {
            pagination: {
              page: 2,
              limit: 20,
              total: 30,
            },
          },
        });

      const store = mockStore({});
      const expectedResponse = [
        {
          type: FETCH_POSTS_INFINITELY.SUCCESS,
          payload: {
            posts: [{
              title: 'hoge',
              description: 'description',
              id: 1,
            }],
            page: 2,
            limit: 20,
            total: 30,
          },
        },
      ];

      return store.dispatch(fetchPosts({ page: 2 }))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse);
        });
    });

    it('creates FETCH_POSTS_FAILURE when fetching posts has been failed', () => {
      nock(TEST_DOMAIN)
        .get(`${postUrl}?page=1`)
        .reply(400, { errorMessage: 'errorMessage' });

      const store = mockStore({});
      const expectedResponse = [
        {
          type: FETCH_POSTS_INFINITELY.REQUEST,
        },
        {
          type: FETCH_POSTS_INFINITELY.FAILURE,
        },
        {
          payload: {
            hasAlert: true,
            message: 'errorMessage',
          },
          type: CREATE_ERROR,
        },
      ];

      return store.dispatch(fetchPosts())
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse);
        });
    });
  });

  describe('fetchPost', () => {
    it('create FETCH_POST_SUCCESS when fetching post has been done', () => {
      nock(TEST_DOMAIN)
        .get(`${postUrl}/1`)
        .reply(200, {
          title: 'hoge',
          publishedAt: '2015/10/10',
          prevId: 1,
          prevTitle: 'prevHoge',
          nextId: null,
          nextTitle: null,
          items: [{}],
          tags: [{}],
        });

      const store = mockStore({});
      const expectedResponse = [
        {
          payload: {
            post: {
              title: 'hoge',
              publishedAt: '2015/10/10',
              prevId: 1,
              prevTitle: 'prevHoge',
              nextId: null,
              nextTitle: null,
            },
            items: [{}],
            tags: [{}],
          },
          type: FETCH_POST.SUCCESS,
        },
        {
          payload: { items: [{}] },
          type: FETCH_ITEMS,
        },
        {
          payload: {
            tags: [{}],
          },
          type: FETCH_TAGS,
        },
      ];

      return store.dispatch(fetchPost(1))
        .then(() => {
          expect(store.getActions()).to.eql(expectedResponse);
        });
    });
  });

  describe('resetPost', () => {
    it('creates RESET_POST', () => {
      const action = resetPost();
      const expectedResponse = {
        type: RESET_POST,
      };
      expect(action).to.eql(expectedResponse);
    });
  });
});
