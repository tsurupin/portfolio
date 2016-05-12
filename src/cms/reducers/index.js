import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import postReducer from './posts';
import itemReducer from './items';
import tagReducer from './tags';
import authorReducer from './authors';
import authReducer from './auths';

const rootReducer = combineReducers({
  form: formReducer,
  posts: postReducer,
  items: itemReducer,
  tags: tagReducer,
  authors: authorReducer,
  auths: authReducer
});

export default rootReducer;

