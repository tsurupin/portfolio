import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App/index';
import PostIndex from './containers/posts/Index/index';
import PostShow from './containers/posts/Show/index';
import ProjectIndex from './containers/projects/Index/index';
import AboutShow from './containers/abouts/Show/index';
import HomeShow from './containers/homes/Show/index';

import NotFound from './components/NotFound/index';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomeShow} />
      <Route path="/posts" component={PostIndex} />
      <Route path="/posts/:id" component={PostShow} />
      <Route path="/projects" component={ProjectIndex} />
      <Route path="/about" component={AboutShow} />
      <Route path="*" component={NotFound} />
  </ Route>
);