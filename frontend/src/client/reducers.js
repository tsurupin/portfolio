import { combineReducers } from 'redux';
import posts from 'shared/reducers/posts';
import projects from 'shared/reducers/projects';
import items from 'shared/reducers/items';
import tags from 'shared/reducers/tags';
import about from 'shared/reducers/abouts';
import socialAccounts from 'shared/reducers/socialAccounts';
import home from 'shared/reducers/homes';
import error from 'shared/reducers/errors';

const rootReducer = combineReducers({
  posts,
  projects,
  items,
  tags,
  socialAccounts,
  about,
  home,
  error,
});

export default rootReducer;

