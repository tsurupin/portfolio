import { combineReducers } from 'redux';
import postReducer from './posts';
import projectReducer from './projects';
import itemReducer from './items';
import tagReducer from './tags';
import aboutReducer from './abouts';
import socialAccountReducer from './socialAccounts';

const rootReducer = combineReducers({
  posts: postReducer,
  projects: projectReducer,
  items: itemReducer,
  tags: tagReducer,
  about: aboutReducer,
  socialAccounts: socialAccountReducer
});

export default rootReducer;

