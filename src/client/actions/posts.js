import {
  POST_PATH, 
  FETCH_POSTS, 
  FETCH_POST
} from '../constants';
import { fetchTags } from'./tags';
import { fetchItems } from'./items';
import { axios } from '../utilities';
import { browserHistory } from 'react-router';

export function fetchPosts(params = {}) {
  let url = `${POST_PATH}`;
  url = params.page ? `${url}?page=${params.page}` : `${url}?page=1`;

  if (params.tag) {
    url = `${url}&tag=${params.tag}`;
  }
  
  const request = axios.get(url);
  return dispatch => {
    return (
      request
        .then(response => dispatch(fetchPostsSuccess(response.data)))
        .catch(error => dispatch(fetchPostsFailure(error.data)))
    );
  };
}

function fetchPostsSuccess(response) {
  console.log(response)
  console.log('response')
  return {
    type: FETCH_POSTS.SUCCESS,
    payload: {
      posts: response.posts,
      total: response.meta.pagination.total,
      page:  response.meta.pagination.page,
      limit: response.meta.pagination.limit
    }
  };
}

function fetchPostsFailure(error) {
  return {
    type: FETCH_POSTS.FAILURE,
    payload: error
  };
}



export function fetchPost(id) {
  const request = axios.get(`${POST_PATH}/${id}`);
  return dispatch => {
    return request
      .then(response => dispatch(fetchPostSuccess(response.data)))
      .then((response) => {
        dispatch(fetchItems(response.payload.items));
        dispatch(fetchTags(response.payload.tags))
      })
      .catch(error => dispatch(fetchPostFailure(error.data)))
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
        nextTitle: response.nextTitle
      },
      items: response.items,
      tags: response.tags
    }
  };
}

function fetchPostFailure(error) {
  return {
    type: FETCH_POST.FAILURE,
    payload: error
  };
}

