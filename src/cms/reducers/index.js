import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import articleReducer from './articles';

const rootReducer = combineReducers({
    form: formReducer,
    articles: articleReducer
});

export default rootReducer;

