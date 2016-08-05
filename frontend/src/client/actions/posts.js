import { FETCH_POSTS_INFINITELY, FETCH_POST, RESET_POST } from 'shared/constants/actions';
import { POST_PATH } from 'shared/constants/apis';
import { fetchTags } from './tags';
import { fetchItems } from './items';
import { axios } from 'client/utilities';
import { browserHistory } from 'react-router';
import { createError } from 'shared/actions/errors';


function fetchPostsRequest() {
  return {
    type: FETCH_POSTS_INFINITELY.REQUEST,
  };
}
function fetchPostsSuccess({ posts, meta }) {
  return {
    type: FETCH_POSTS_INFINITELY.SUCCESS,
    payload: {
      posts,
      total: meta.pagination.total,
      page: meta.pagination.page,
      limit: meta.pagination.limit,
    },
  };
}

function fetchPostsFailure() {
  return {
    type: FETCH_POSTS_INFINITELY.FAILURE,
  };
}

export function fetchPosts(params = { page: 1 }) {
  let url = `${POST_PATH}?page=${params.page}`;

  if (params.tagId) {
    url += `&tag-id=${params.tagId}`;
  }

  const request = axios.get(url);
  return dispatch => {
    if (params.page === 1) {
      dispatch(fetchPostsRequest());
    }
    return (
      request
        .then(response => dispatch(fetchPostsSuccess(response.data)))
        .catch(error => {
          dispatch(fetchPostsFailure());
          dispatch(createError(error));
        })
    );
  };
}

function fetchPostSuccess(response) {
  return {
    type: FETCH_POST.SUCCESS,
    payload: {
      post: {
        title: response.title,
        publishedAt: response.publishedAt,
        prevId: response.prevId,
        prevTitle: response.prevTitle,
        nextId: response.nextId,
        nextTitle: response.nextTitle,
      },
      items: response.items,
      tags: response.tags,
    },
  };
}

export function fetchPost(path) {
  const request = axios.get(`${POST_PATH}/${path}`);
  return dispatch => {
    return request
      .then(response => dispatch(fetchPostSuccess(response.data)))
      .then((response) => {
        dispatch(fetchItems(response.payload.items));
        dispatch(fetchTags(response.payload.tags));
      })
      .catch(() => browserHistory.push('/not-found'));
  };
}

export function resetPost() {
  return {
    type: RESET_POST,
  };
}

