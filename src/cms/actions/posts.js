import axios from 'axios';
import {
  ROOT_URL, POST_PATH, FETCH_POSTS, FETCH_POST, FETCH_NEW_POST,
  CREATE_POST, DELETE_POST, TOGGLE_POST
} from '../constants';
import { fetchTags } from'./tags';
import { fetchItems } from'./items';
import { trimPost } from '../utilities';

export function fetchPosts(page = 1) {
  const request = axios.get(`${ROOT_URL}${POST_PATH}?page=${page}`);
  return dispatch => {
    return request.then(
      response => dispatch(fetchPostsSuccess(response.data)),
      error => dispatch(fetchPostsFailure(error.data))
    )
  };
}

function fetchPostsSuccess(response) {
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
  const request = axios.get(`${ROOT_URL}${POST_PATH}/${id}/edit`);
  return dispatch => {
    return request.then(
      response => dispatch(fetchPostSuccess(response.data)),
      error => dispatch(fetchPostFailure(error.data))
    ).then(response => {
      if (response.type === FETCH_POST.FAILURE) { return; }
      dispatch(fetchItems(response.payload.items));
      dispatch(fetchTags(response.payload.tags))
    })
  };
}

function fetchPostSuccess(response) {
  console.log(response)
  return {
    type: FETCH_POST.SUCCESS,
    payload: {
      post: response.post,
      items: response.items,
      tags: {
        tags: response.tags,
        tagSuggestions: response.tagSuggestions
      }
    }
  };
}

function fetchPostFailure(error) {
  return {
    type: FETCH_POST.FAILURE,
    payload: error
  };
}

export function fetchNewPost() {
  const request = axios.get(`${ROOT_URL}${POST_PATH}/new`);
  return dispatch => {
    return request.then(
      response => dispatch(fetchNewPostSuccess(response.data)),
      error => dispatch(fetchNewPostFailure(error.data))
    ).then(response => {
      if (response.type === FETCH_NEW_POST.FAILURE) { return; }
      dispatch(fetchTags(response.payload.tags))
    })
  };
}

function fetchNewPostSuccess(response) {
  return {
    type: FETCH_NEW_POST.SUCCESS,
    payload: { tags: { tagSuggestions: response.tagSuggestions } }
  };
}


function fetchNewPostFailure(error) {
  return {
    type: FETCH_NEW_POST.FAILURE,
    payload: error
  };
}


export function createPost(props) {
  const post = trimPost(props.post);
  let request;
  if (props.post.id) {
    request = axios.patch(`${ROOT_URL}${POST_PATH}/${post.id}`, { post });
  } else {
    request = axios.post(`${ROOT_URL}${POST_PATH}`, { post });
  }
  return dispatch => {
    dispatch(createPostRequest());
    return request.then(
      () => dispatch(createPostSuccess()),
      error => dispatch(createPostFailure(error.data))
    )
  };
}

export function createPostRequest() {
  return {
    type: CREATE_POST.REQUEST
  }
}

function createPostSuccess() {
  return {
    type: CREATE_POST.SUCCESS
  }
}

function createPostFailure(error) {
  return {
    type: CREATE_POST.FAILURE,
    payload: error
  }
}
//
// export function updatePost(props) {
//   const request = axios.patch(`${ROOT_URL}${POST_PATH}/${props.id}`, props);
//   return dispatch => {
//     return request.then(
//       () => dispatch(updatePostSuccess()),
//       error => dispatch(updatePostFailure(error.data))
//     )
//   };
// }
//
// function updatePostSuccess() {
//   return {
//     type: UPDATE_POST.SUCCESS
//   }
// }
//
// function updatePostFailure(error) {
//   return {
//     type: UPDATE_POST.FAILURE,
//     payload: error
//   }
// }

export function deletePost(id) {
  const request = axios.delete(`${ROOT_URL}${POST_PATH}/${id}`);
  return dispatch => {
    return request.then(
      () => dispatch(deletePostSuccess()),
      error => dispatch(deletePostFailure(error.data))
    )
  }
}

function deletePostSuccess() {
  return {
    type: DELETE_POST.SUCCESS
  }
}

function deletePostFailure(error) {
  return {
    type: DELETE_POST.FAILURE,
    payload: error
  }
}

export function togglePost(id) {
  const request = axios.patch(`${ROOT_URL}${POST_PATH}/${id}/acceptance`);
  return dispatch => {
    return request.then(
      () => dispatch(togglePostSuccess()),
      error => dispatch(togglePostFailure(error.data))
    )
  }
}

function togglePostSuccess() {
  return {
    type: TOGGLE_POST.SUCCESS
  }
}

function togglePostFailure(error) {
  return {
    type: TOGGLE_POST.FAILURE,
    payload: error
  }
}
