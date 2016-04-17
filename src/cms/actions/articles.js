import axios from 'axios';
import {
    ROOT_URL, ARTICLE_PATH,
    FETCH_ARTICLES, FETCH_ARTICLE, CREATE_ARTICLE, DELETE_ARTICLE, TOGGLE_ARTICLE
    } from '../constants';


export function fetchArticles() {
    const request = axios.get(`${ROOT_URL}${ARTICLE_PATH}`);
    return {
        type: FETCH_ARTICLES,
        payload: request
    };
}

export function fetchArticle(id) {
    const request = axios.get(`${ROOT_URL}${ARTICLE_PATH}/${id}`);
    return {
        type: FETCH_ARTICLE,
        payload: request
    }
}

export function createArticle(props) {
    const request = axios.post(`${ROOT_URL}${ARTICLE_PATH}`, props);
    return {
        type: CREATE_ARTICLE,
        payload: request
    }
}

export function deleteArticle(id) {
    const request = axios.delete(`${ROOT_URL}${ARTICLE_PATH}/${id}`);
    return {
        type: DELETE_ARTICLE,
        payload: request
    }
}

export function toggleArticle(id) {
    const request = axios.patch(`${ROOT_URL}${ARTICLE_PATH}/${id}/acceptance`);
    return {
        type: TOGGLE_ARTICLE,
        payload: request
    }
}
