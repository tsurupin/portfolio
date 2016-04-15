import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ArticleReducer from './articles';

const rootReducer = combineReducers({
    form: formReducer,
    articles: ArticleReducer
});

export default rootReducer;

