import { combineReducers } from 'redux';
import postReducer from './posts';
import itemReducer from './items';
import tagReducer from './tags';



const rootReducer = combineReducers({
  posts: postReducer,
  items: itemReducer,
  tags: tagReducer
});

export default rootReducer;

