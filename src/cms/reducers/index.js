import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import postReducer from './posts';
import itemReducer from './items';

const rootReducer = combineReducers({
  posts: postReducer,
  items: itemReducer,
  form: formReducer
});

export default rootReducer;

