import { expect } from '../../helpers/utility';
import postReducer from 'shared/reducers/posts';
import {
  FETCH_POSTS,
  FETCH_POSTS_INFINITELY,
  FETCH_POST,
  FETCH_EDIT_POST,
  FETCH_NEW_POST,
  SAVE_POST,
  TOGGLE_POST,
  RESET_POST,
} from 'shared/constants/actions';


const INITIAL_STATE = {
  posts: [],
  loading: false,
  limit: 20,
  page: 1,
  total: 0,
  post: { title: '', publishedAt: '' },
  postForm: { },
  errorMessage: '',
};

describe('Post Reducer', () => {
  it('handles action with unknown type', () => {
    expect(postReducer(INITIAL_STATE, {})).to.eql(INITIAL_STATE);
  });

  it('handles action of type FETCH_POSTS_SUCCESS', () => {
    const fetchedPosts = [{
      id: 2,
      title: 'title',
      accepted: true,
      leadSentence: 'lead sentence',
      publishedAt: 'June 06, 2016',
      status: 2,
      tags: [{ id: 2, name: 'hoge' }],
    }];

    const action = {
      type: FETCH_POSTS.SUCCESS,
      payload: {
        posts: fetchedPosts,
        page: 1,
        limit: 20,
        total: 30,
      } };

    const expectedResponse = {
      posts: fetchedPosts,
      page: 1,
      limit: 20,
      total: 30,
    };

    const state = {
      posts: [{
        id: 1,
        title: 'old title',
        accepted: true,
        leadSentence: 'old lead sentence',
        publishedAt: 'June 06, 2016',
        status: 1,
        tags: [{ id: 1, name: 'hoge' }],
      }],
    };
    expect(postReducer(state, action)).to.eql(expectedResponse);
  });


  describe('handles action of type FETCH_POSTS_INFINITELY_SUCCESS', () => {
    const fetchedPosts = [{
      id: 2,
      title: 'title',
      accepted: true,
      leadSentence: 'lead sentence',
      publishedAt: 'June 06, 2016',
      status: 2,
      tags: [{ id: 2, name: 'hoge' }],
    }];

    const oldPosts = [{
      id: 1,
      title: 'old title',
      accepted: true,
      leadSentence: 'old lead sentence',
      publishedAt: 'June 06, 2016',
      status: 1,
      tags: [{ id: 1, name: 'hoge' }],
    }];


    const state = {
      posts: oldPosts,
    };

    it('handles action of type FETCH_POSTS_INFINITELY_SUCCESS when current page is 1', () => {
      const action = {
        type: FETCH_POSTS_INFINITELY.SUCCESS,
        payload: {
          posts: fetchedPosts,
          page: 1,
          limit: 20,
          total: 30,
        } };

      const expectedResponse = {
        posts: fetchedPosts,
        loading: false,
        page: 1,
        limit: 20,
        total: 30,
      };

      expect(postReducer(state, action)).to.eql(expectedResponse);
    });

    it('handles action of type FETCH_POSTS_INFINITELY_SUCCESS when current page is more than 2', () => {
      const action = {
        type: FETCH_POSTS_INFINITELY.SUCCESS,
        payload: {
          posts: fetchedPosts,
          page: 2,
          limit: 20,
          total: 30,
        } };

      const expectedResponse = {
        posts: [...oldPosts, ...fetchedPosts],
        loading: false,
        page: 2,
        limit: 20,
        total: 30,
      };
      expect(postReducer(state, action)).to.eql(expectedResponse);
    });
  });

  it('handles action of type FETCH_POST_SUCCESS', () => {
    const post = {
      id: 1,
      title: 'old title',
      accepted: true,
      leadSentence: 'old lead sentence',
      publishedAt: 'June 06, 2016',
      status: 1,
      tags: [{ id: 1, name: 'hoge' }],
    };

    const action = {
      type: FETCH_POST.SUCCESS,
      payload: { post },
    };
    const expectedResponse = { post, errorMessage: '' };
    expect(postReducer([], action)).to.eql(expectedResponse);
  });

  it('handles action of type FETCH_EDIT_POST_SUCCESS', () => {
    const postForm = {
      id: 1,
      title: 'old title',
      accepted: true,
      leadSentence: 'old lead sentence',
      publishedAt: 'June 06, 2016',
      status: 1,
      tags: [{ id: 1, name: 'hoge' }],
    };

    const action = {
      type: FETCH_EDIT_POST.SUCCESS,
      payload: { postForm },
    };
    const expectedResponse = { postForm, errorMessage: '' };
    expect(postReducer([], action)).to.eql(expectedResponse);
  });

  it('handles action of type FETCH_NEW_POST_SUCCESS', () => {
    const postForm = {
      id: 1,
      title: 'old title',
      accepted: true,
      leadSentence: 'old lead sentence',
      publishedAt: 'June 06, 2016',
      status: 1,
      tags: [{ id: 1, name: 'hoge' }],
    };

    const state = {
      postForm, errorMessage: 'errorMessage',
    };

    const action = { type: FETCH_NEW_POST.SUCCESS };
    const expectedResponse = {
      postForm: {},
      errorMessage: '',
    };
    expect(postReducer(state, action)).to.eql(expectedResponse);
  });

  it('handles action of type TOGGLE_POST_SUCCESS', () => {
    const action = {
      type: TOGGLE_POST.SUCCESS,
      payload: {
        sortRank: 1,
        accepted: false,
        status: 1,
      },
    };

    const state = {
      posts: [
        {
          id: 1,
          title: 'title',
          accepted: true,
          leadSentence: 'lead sentence',
          publishedAt: 'June 06, 2016',
          status: 1,
          tags: [{ id: 1, name: 'hoge' }],
        },
        {
          id: 2,
          title: 'title',
          accepted: true,
          leadSentence: 'lead sentence',
          publishedAt: 'June 06, 2016',
          status: 2,
          tags: [{ id: 1, name: 'hoge' }],
        },
      ],
    };
    const expectedResponse = {
      posts: [
        {
          id: 1,
          title: 'title',
          accepted: true,
          leadSentence: 'lead sentence',
          publishedAt: 'June 06, 2016',
          status: 1,
          tags: [{ id: 1, name: 'hoge' }],
        },
        {
          id: 2,
          title: 'title',
          accepted: false,
          leadSentence: 'lead sentence',
          publishedAt: 'June 06, 2016',
          status: 1,
          tags: [{ id: 1, name: 'hoge' }],
        },
      ],
    };
    expect(postReducer(state, action)).to.eql(expectedResponse);
  });


  it('handles action of type SAVE_POST_FAILURE', () => {
    const action = {
      type: SAVE_POST.FAILURE,
      payload: {
        errorMessage: 'errorMessage',
      },
    };
    const expectedResponse = { errorMessage: 'errorMessage' };
    expect(postReducer([], action)).to.eql(expectedResponse);
  });

  it('handles action of type RESET_POST', () => {
    const action = {
      type: RESET_POST,
    };
    const state = { post: { title: 'sample' }, errorMessage: 'errorMessage' };

    const expectedResponse = { post: {}, errorMessage: '' };
    expect(postReducer(state, action)).to.eql(expectedResponse);
  });
});
