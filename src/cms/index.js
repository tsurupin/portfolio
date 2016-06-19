import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import useScroll from 'react-router-scroll';
import { createStore, applyMiddleware } from 'redux';
import { AUTH } from './constants';

import routes from './routes';
import reducers from './reducers';
import injectTapEventPlugin from 'react-tap-event-plugin';
import thunkMiddleware from 'redux-thunk'
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers);

injectTapEventPlugin();

const accessToken = localStorage.getItem('accessToken');
if(accessToken) {
  store.dispatch({ type: AUTH.SUCCESS })
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
