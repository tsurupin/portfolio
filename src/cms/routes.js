import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import ArticleIndex from './components/articles/index';
import ArticleForm from './components/articles/form';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={ArticleIndex} />
        <Route path="articles/new" component={ArticleForm} />
        <Route path="articles/:id/edit" component={ArticleForm} />
    </ Route>
);