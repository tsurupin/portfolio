import 'shared/styles/vendors';
import 'shared/styles/globals';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import useScroll from 'react-router-scroll';
import { createStore, applyMiddleware } from 'redux';
import { AUTH } from 'shared/constants/actions';

import routes from './routes';
import reducers from './reducers';
import injectTapEventPlugin from 'react-tap-event-plugin';
import thunk from 'redux-thunk';
const store = createStore(reducers, applyMiddleware(thunk));
injectTapEventPlugin();

const accessToken = localStorage.getItem('accessToken');
if (accessToken) {
  store.dispatch({ type: AUTH.SUCCESS });
}

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={browserHistory}
      routes={routes}
      render={applyRouterMiddleware(useScroll())}
    />
  </Provider>
  , document.querySelector('.container'));
