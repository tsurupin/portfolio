import axios from 'axios';
import { ROOT_URL, FETCH_ARTICLES } from '../constants';

export function fetchArticles() {
    const request = acios.get(`${ROOT_URL}`);
    return {
        type: FETCH_ARTICLES,
        payload: request
    };
}
