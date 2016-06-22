function createRequestTypes(base) {
  const requestType = {};
  [REQUEST, SUCCESS, FAILURE].forEach(type => requestType[type] = `${base}_${type}`);
  return requestType;
}

export const ROOT_URL     = '/api/v1';
export const POST_PATH    = '/posts';
export const ABOUT_PATH  = '/about';
export const HOME_PATH  = '/home';
export const PROJECT_PATH = '/projects';
export const TEST_DOMAIN  = 'http://localhost:80';

const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export const FETCH_POSTS        = createRequestTypes('FETCH_POSTS');
export const FETCH_POST         = createRequestTypes('FETCH_POST');
export const FETCH_ABOUT       = createRequestTypes('FETCH_ABOUT');
export const FETCH_HOME       = createRequestTypes('FETCH_HOME');
export const FETCH_AUTHOR       = createRequestTypes('FETCH_AUTHOR');
export const FETCH_PROJECTS     = createRequestTypes('FETCH_PROJECTS');

export const FETCH_ITEMS        = 'FETCH_ITEMS';
export const FETCH_SOCIAL_ACCOUNTS = 'FETCH_SOCIAL_ACCOUNTS';
export const FETCH_TAGS = 'FETCH_TAGS';

