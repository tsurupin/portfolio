import { FETCH_POSTS_INFINITELY, FETCH_POST } from "shared/constants/actions";
import { POST_PATH } from "shared/constants/apis";
import { fetchTags } from "./tags";
import { fetchItems } from "./items";
import { axios } from "client/utilities";
import { browserHistory } from "react-router";

export function fetchPosts(params = { page: 1 }) {
  let url;
  // url = params.page ? `${url}?page=${params.page}` : `${url}?page=1`;

  if (params.tag) {
    url = `${POST_PATH}&tag=${params.tag}`;
  } else {
    url = `${POST_PATH}?page=${params.page}`
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

function fetchPostsSuccess({ posts, meta }) {
  return {
    type: FETCH_POSTS_INFINITELY.SUCCESS,
    payload: {
      posts,
      total: meta.pagination.total,
      page:  meta.pagination.page,
      limit: meta.pagination.limit
    }
  };
}

function fetchPostsFailure({ errorMessage }) {
  return {
    type: FETCH_POSTS_INFINITELY.FAILURE,
    payload: errorMessage
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

