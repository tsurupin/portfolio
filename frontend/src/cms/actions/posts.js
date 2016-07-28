import {
  FETCH_POSTS,
  FETCH_EDIT_POST,
  FETCH_NEW_POST,
  SAVE_POST,
  TOGGLE_POST,
} from 'shared/constants/actions';
import { POST_PATH } from 'shared/constants/apis';
import { fetchTagsForm } from './tags';
import { fetchItems } from './items';


import { createError } from 'shared/actions/errors';
import { createAuthorizedRequest, trimPost } from 'cms/utilities';
import { browserHistory } from 'react-router';


function fetchPostsSuccess(response) {
  return {
    type: FETCH_POSTS.SUCCESS,
    payload: {
      posts: response.posts,
      total: response.meta.pagination.total,
      page: response.meta.pagination.page,
      limit: response.meta.pagination.limit,
    },
  };
}

export function fetchPosts(page = 1) {
  const request = createAuthorizedRequest('get', `${POST_PATH}?page=${page}`);
  return dispatch => {
    return (
      request
        .then(response => dispatch(fetchPostsSuccess(response.data)))
        .catch(error => dispatch(createError(error)))
    );
  };
}


function fetchNewPostSuccess(response) {
  return {
    type: FETCH_NEW_POST.SUCCESS,
    payload: {
      items: [],
      tags: {
        tags: [],
        tagSuggestions: response.tagSuggestions,
      },
    },
  };
}

export function fetchNewPost() {
  const request = createAuthorizedRequest('get', `${POST_PATH}/new`);
  return dispatch => {
    return request
      .then(response => dispatch(fetchNewPostSuccess(response.data)))
      .then(response => {
        dispatch(fetchItems(response.payload.items));
        dispatch(fetchTagsForm(response.payload.tags));
      })
      .catch(error => dispatch(createError(error)));
  };
}


function fetchEditPostSuccess(response) {
  return {
    type: FETCH_EDIT_POST.SUCCESS,
    payload: {
      postForm: {
        id: response.id,
        title: response.title,
        leadSentence: response.leadSentence,
        publishedAt: response.publishedAt,
      },
      items: response.items,
      tags: {
        tags: response.tags,
        tagSuggestions: response.tagSuggestions,
      },
    },
  };
}

export function fetchEditPost(id) {
  const request = createAuthorizedRequest('get', `${POST_PATH}/${id}/edit`);
  return dispatch => {
    return request
      .then(response => dispatch(fetchEditPostSuccess(response.data)))
      .then((response) => {
        dispatch(fetchItems(response.payload.items));
        dispatch(fetchTagsForm(response.payload.tags));
      })
      .catch(error => dispatch(createError(error)));
  };
}


export function savePostRequest() {
  return {
    type: SAVE_POST.REQUEST,
  };
}

function savePostSuccess() {
  return {
    type: SAVE_POST.SUCCESS,
  };
}

function savePostFailure({ errorMessage }) {
  return {
    type: SAVE_POST.FAILURE,
    payload: { errorMessage },
  };
}

export function savePost(props) {
  const post = trimPost(props.post);
  let request;
  if (props.post.id) {
    request = createAuthorizedRequest('patch', `${POST_PATH}/${post.id}`, { post });
  } else {
    request = createAuthorizedRequest('post', `${POST_PATH}`, { post });
  }
  return dispatch => {
    dispatch(savePostRequest());
    return (
      request
        .then(() => dispatch(savePostSuccess()))
        .then(() => browserHistory.push('/cms'))
        .catch(error => dispatch(savePostFailure(error.data)))
    );
  };
}


function togglePostSuccess(sortRank, response) {
  return {
    type: TOGGLE_POST.SUCCESS,
    payload: {
      sortRank,
      status: response.status,
      accepted: response.accepted,
    },
  };
}

export function togglePost(sortRank, id) {
  const request = createAuthorizedRequest('patch', `${POST_PATH}/${id}/acceptance`);
  return dispatch => {
    return (
      request
        .then(response => dispatch(togglePostSuccess(sortRank, response.data)))
        .catch(error => dispatch(createError(error)))
    );
  };
}
