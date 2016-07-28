import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import posts from 'shared/reducers/posts';
import items from 'shared/reducers/items';
import tags from 'shared/reducers/tags';
import authors from 'shared/reducers/authors';
import auth from 'shared/reducers/auths';
import socialAccounts from 'shared/reducers/socialAccounts';
import projects from 'shared/reducers/projects';
import about from 'shared/reducers/abouts';
import error from 'shared/reducers/errors';

const rootReducer = combineReducers({
  form,
  posts,
  items,
  tags,
  authors,
  socialAccounts,
  projects,
  auth,
  about,
  error,
});

export default rootReducer;

