function createRequestTypes(base) {
  const requestType = {};
  [REQUEST, SUCCESS, FAILURE].forEach(type => requestType[type] = `${base}_${type}`);
  return requestType;
}

export const ROOT_URL     = '/cms/api/v1';
export const POST_PATH    = '/posts';
export const AUTHOR_PATH  = '/authors';
export const PROJECT_PATH = '/projects';
export const TWITTER_PATH = '/services/twitter';
export const TEST_DOMAIN  = 'http://localhost:80';

const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export const FETCH_POSTS        = createRequestTypes('FETCH_POSTS');
export const FETCH_POST         = createRequestTypes('FETCH_POST');
export const FETCH_NEW_POST     = createRequestTypes('FETCH_NEW_POST');
export const SAVE_POST          = createRequestTypes('SAVE_POST');
export const TOGGLE_POST        = createRequestTypes('TOGGLE_POST');
export const FETCH_EDIT_POST    = createRequestTypes('FETCH_EDIT_POST');
export const FETCH_ABOUT        = createRequestTypes('FETCH_ABOUT');
export const FETCH_AUTHOR       = createRequestTypes('FETCH_AUTHOR');
export const UPDATE_AUTHOR      = createRequestTypes('UPDATE_AUTHOR');

export const FETCH_PROJECTS     = createRequestTypes('FETCH_PROJECTS');
export const FETCH_PROJECT      = createRequestTypes('FETCH_PROJECT');
export const FETCH_NEW_PROJECT  = createRequestTypes('FETCH_NEW_PROJECT');
export const SAVE_PROJECT       = createRequestTypes('SAVE_PROJECT');
export const TOGGLE_PROJECT     = createRequestTypes('TOGGLE_PROJECT');

export const SIGN_OUT           = createRequestTypes('SIGN_OUT');
export const AUTH               = createRequestTypes('AUTH');

export const FETCH_ITEMS        = 'FETCH_ITEMS';
export const CREATE_ITEM        = 'CREATE_ITEM';
export const UPDATE_ITEM        = 'UPDATE_ITEM';
export const DELETE_ITEM        = 'DELETE_ITEM';
export const CANCEL_ITEM        = 'CANCEL_ITEM';
export const MOVE_ITEM_TOP      = 'MOVE_ITEM_TOP';
export const MOVE_ITEM_UP       = 'MOVE_ITEM_UP';
export const MOVE_ITEM_DOWN     = 'MOVE_ITEM_DOWN';
export const MOVE_ITEM_BOTTOM   = 'MOVE_ITEM_BOTTOM';

export const FETCH_SOCIAL_ACCOUNTS = 'FETCH_SOCIAL_ACCOUNTS';
export const CREATE_SOCIAL_ACCOUNT = 'CREATE_SOCIAL_ACCOUNT';
export const UPDATE_SOCIAL_ACCOUNT = 'UPDATE_SOCIAL_ACCOUNT';
export const DELETE_SOCIAL_ACCOUNT = 'DELETE_SOCIAL_ACCOUNT';

export const FETCH_TAGS = 'FETCH_TAGS';
export const FETCH_TAGS_FORM = 'FETCH_TAGS_FORM';
export const CREATE_TAG = 'CREATE_TAG';
export const DELETE_TAG = 'DELETE_TAG';

export const CREATE_ALERT = 'CREATE_ALERT';
export const DELETE_ALERT = 'DELETE_ALERT';
