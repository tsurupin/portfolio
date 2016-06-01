import { combineReducers } from 'redux';
import postReducer from './posts';
import projectReducer from './projects';
import itemReducer from './items';
import tagReducer from './tags';


const rootReducer = combineReducers({
  posts: postReducer,
  projects: projectReducer,
  items: itemReducer,
  tags: tagReducer
});

export default rootReducer;

