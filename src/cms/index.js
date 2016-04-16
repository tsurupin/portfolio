import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import { createStore, applyMiddleware } from 'redux';

import routes from './routes';
import ReduxPromise from 'redux-promise';
import reducers from './reducers';
import injectTapEventPlugin from 'react-tap-event-plugin';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

injectTapEventPlugin();

ReactDOM.render(
<Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes} />
</Provider>
    , document.querySelector('.react-container'));
