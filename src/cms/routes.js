import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import ArticlesIndex from './containers/articles/index';
import ArticlesForm from './containers/articles/form';

export default (
    <Route path="/cms" component={App}>
        <IndexRoute component={ArticlesIndex} />
        <Route path="/cms/articles/new" component={ArticlesForm} />
        <Route path="/cms/articles/:id/edit" component={ArticlesForm} />
    </ Route>
);