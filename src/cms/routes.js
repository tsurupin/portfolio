import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App/index';
import PostsIndex from './containers/posts/Index/index';
import PostsForm from './containers/posts/Form/index';
import ProjectsIndex from './containers/projects/index';
import ProjectsForm from './containers/projects/form';
import SitesForm from './containers/sites/form';
import AuthorsForm from './containers/authors/Form/index';
import AuthorsSinUp from './containers/authors/SignUp/index';
import AuthorsSingIn from './containers/authors/SignIn/index';
import NotFound from './components/NotFound/index';

export default (
  <Route path="/cms" component={App}>
    <IndexRoute component={PostsIndex}/>
      <Route path="/cms/posts/new" component={PostsForm}/>
      <Route path="/cms/posts/:id/edit" component={PostsForm}/>
      <Route path="/cms/posts/:id" component={PostsForm}/>
      <Route path="/cms/projects" component={ProjectsIndex}/>
      <Route path="/cms/projects/new" component={ProjectsForm}/>
      <Route path="/cms/projects/:id/edit" component={ProjectsForm}/>
      <Route path="/cms/authors/sign-up" component={AuthorsSinUp}/>
      <Route path="/cms/authors/sign-in" component={AuthorsSingIn}/>
      <Route path="/cms/authors/edit" component={AuthorsForm}/>
      <Route path="/cms/sites/new" component={SitesForm}/>
      <Route path="/cms/sites/:id/edit" component={SitesForm}/>
      <Route path="*" component={NotFound} />
  </ Route>
);