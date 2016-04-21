import axios from 'axios';
import {
    ROOT_URL, POST_PATH,
    FETCH_POSTS, FETCH_POST, CREATE_POST, DELETE_POST, TOGGLE_POST
    } from '../constants';


export function fetchPosts() {
    const request = axios.get(`${ROOT_URL}${POST_PATH}`);
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
        payload: response
    };
}

function fetchPostsFailure(error) {
    return {
        type: FETCH_POSTS.FAILURE,
        payload: error
    };
}

export function fetchPost(id) {
    const request = axios.get(`${ROOT_URL}${POST_PATH}/${id}`);
    return {
        type: FETCH_POST,
        payload: request
    }
}

export function createPost(props) {
    const request = axios.post(`${ROOT_URL}${POST_PATH}`, props);
    return {
        type: CREATE_POST,
        payload: request
    }
}

export function deletePost(id) {
    const request = axios.delete(`${ROOT_URL}${POST_PATH}/${id}`);
    return {
        type: DELETE_POST,
        payload: request
    }
}

export function togglePost(id) {
    const request = axios.patch(`${ROOT_URL}${POST_PATH}/${id}/acceptance`);
    return {
        type: TOGGLE_POST,
        payload: request
    }
}
