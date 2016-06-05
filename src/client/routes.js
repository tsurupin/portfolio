import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App/index';
import PostsIndex from './containers/posts/Index/index';
import PostsShow from './containers/posts/Show/index';
import ProjectsIndex from './containers/projects/Index/index';
// import HomesIndex from './containers/homes/Index/index';
// import AuthorsIndex from './containers/authors/Index/index';
// import AuthorsForm from './containers/authors/Form/index';
// import AuthorsSinUp from './containers/authors/SignUp/index';
// import AuthorsSingIn from './containers/authors/SignIn/index';
import NotFound from './components/NotFound/index';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={PostsIndex} />
      <Route path="/posts" component={PostsIndex} />
      <Route path="/posts/:id" component={PostsShow} />
      <Route path="/projects" component={ProjectsIndex} />
      <Route path="*" component={NotFound} />
  </ Route>
);