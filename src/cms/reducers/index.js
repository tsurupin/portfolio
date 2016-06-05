import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import postReducer from './posts';
import itemReducer from './items';
import tagReducer from './tags';
import authorReducer from './authors';
import authReducer from './auths';
import socialAccountReducer from  './socialAccounts';
import projectReducer from  './projects';

const rootReducer = combineReducers({
  form: formReducer,
  posts: postReducer,
  items: itemReducer,
  tags: tagReducer,
  authors: authorReducer,
  auths: authReducer,
  socialAccounts: socialAccountReducer,
  projects: projectReducer
});

export default rootReducer;

