import { FETCH_POSTS_INFINITELY, FETCH_POST } from "shared/constants/actions";
import { POST_PATH } from "shared/constants/apis";
import { fetchTags } from "./tags";
import { fetchItems } from "./items";
import { axios } from "client/utilities";
import { browserHistory } from "react-router";
import { createAlert } from "shared/actions/alerts";

export function fetchPosts(params = { page: 1 }) {
  let url = `${POST_PATH}?page=${params.page}`;
  
  if (params.tag) {
    url += `&tag=${params.tag}`;
  }

  const request = axios.get(url);
  return dispatch => {
    return (
      request
        .then(response => dispatch(fetchPostsSuccess(response.data)))
        .catch(error => dispatch(createAlert(error.data, "error")))
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

export function fetchPost(id) {
  const request = axios.get(`${POST_PATH}/${id}`);
  return dispatch => {
    return request
      .then(response => dispatch(fetchPostSuccess(response.data)))
      .then((response) => {
        dispatch(fetchItems(response.payload.items));
        dispatch(fetchTags(response.payload.tags))
      })
      .catch(error => dispatch(createAlert(error.data, "error")))
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

