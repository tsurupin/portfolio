import {
  POST_PATH, 
  FETCH_POSTS,
  FETCH_POST_FORM,
  FETCH_NEW_POST,
  SAVE_POST,  
  TOGGLE_POST
} from '../constants';
import { fetchTagsFrom } from'./tags';
import { fetchItems } from'./items';
import { axios, trimPost } from '../utilities';
import { browserHistory } from 'react-router';

export function fetchPosts(page = 1) {
  const request = axios.get(`${POST_PATH}?page=${page}`);
  return dispatch => {
    return (
      request
        .then(response => dispatch(fetchPostsSuccess(response.data)))
        .catch(error => dispatch(fetchPostsFailure(error.data)))
    );
  };
}

function fetchPostsSuccess(response) {
  console.log(response.posts)
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



export function fetchPostForm(id) {
  const request = axios.get(`${POST_PATH}/${id}/edit`);
  return dispatch => {
    return request
      .then(response => dispatch(fetchPostSuccess(response.data)))
      .then((response) => {
        dispatch(fetchItems(response.payload.items));
        dispatch(fetchTagsFrom(response.payload.tags))
      })
      .catch(error => dispatch(fetchPostFailure(error.data)))
  };
}

function fetchPostFormSuccess(response) {
  console.log(response.items)
  return {
    type: FETCH_POST_FORM.SUCCESS,
    payload: {
      post: {
        id: response.id,
        title: response.title,
        description: response.description,
        publishedAt: response.publishedAt
      },
      items: response.items,
      tags: {
        tags: response.tags,
        tagSuggestions: response.tagSuggestions
      }
    }
  };
}

function fetchPostFormFailure(error) {
  return {
    type: FETCH_POST_FORM.FAILURE,
    payload: error
  };
}

export function fetchNewPost() {
  const request = axios.get(`${POST_PATH}/new`);
  return dispatch => {
    return request
      .then(response => dispatch(fetchNewPostSuccess(response.data)))
      .then(response => dispatch(fetchTagsFrom(response.payload.tags)))
      .catch(error => dispatch(fetchNewPostFailure(error.data)))
  };
}

function fetchNewPostSuccess(response) {

  return {
    type: FETCH_NEW_POST.SUCCESS,
    payload: { tags: { tags: [], tagSuggestions: response.tagSuggestions } }
  };
}


function fetchNewPostFailure(error) {
  return {
    type: FETCH_NEW_POST.FAILURE,
    payload: error
  };
}


export function savePost(props) {
  console.log(props)
  const post = trimPost(props.post);
  let request;
  if (props.post.id) {
    request = axios.patch(`${POST_PATH}/${post.id}`, { post });
  } else {
    request = axios.post(`${POST_PATH}`, { post });
  }
  return dispatch => {
    dispatch(savePostRequest());
    return (
      request
        .then(() => dispatch(savePostSuccess()))
        .catch(error => dispatch(savePostFailure(error.data)))
    );
  };
}

export function savePostRequest() {
  return {
    type: SAVE_POST.REQUEST
  }
}

function savePostSuccess() {
  browserHistory.push('/cms');
  return {
    type: SAVE_POST.SUCCESS
  }
}

function savePostFailure(error) {
  return {
    type: SAVE_POST.FAILURE,
    payload: error
  }
}

export function togglePost(sortRank, id) {
  const request = axios.patch(`${POST_PATH}/${id}/acceptance`);
  return dispatch => {
    return (
      request
        .then(response => dispatch(togglePostSuccess(sortRank, response.data)))
        .catch(error => dispatch(togglePostFailure(error.data)))
    )
  }
}

function togglePostSuccess(sortRank, response) {
  console.log(response)
  return {
    type: TOGGLE_POST.SUCCESS,
    payload: {
      sortRank,
      status: response.status,
      accepted: response.accepted
    }
  }
}
function togglePostFailure(error) {
  return {
    type: TOGGLE_POST.FAILURE,
    payload: error
  }
}
