import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostsIndex from './containers/posts/index';
import PostsForm from './containers/posts/form';
import ProjectsIndex from './containers/projects/index';
import ProjectsForm from './containers/projects/form';
import SitesForm from './containers/sites/form';
import AuthorsForm from './containers/authors/form';
import NotFound from './components/not_found';

export default (
  <Route path="/cms" component={App}>
    <IndexRoute component={PostsIndex}/>
    <Route path="/cms/posts/new" component={PostsForm}/>
    <Route path="/cms/posts/:id/edit" component={PostsForm}/>
    <Route path="/cms/posts/:id" component={PostsForm}/>
    <Route path="/cms/projects" component={ProjectsIndex}/>
    <Route path="/cms/projects/new" component={ProjectsForm}/>
    <Route path="/cms/projects/:id/edit" component={ProjectsForm}/>
    <Route path="/cms/authors/new" component={AuthorsForm}/>
    <Route path="/cms/authors/:id/edit" component={AuthorsForm}/>
    <Route path="/cms/sites/new" component={SitesForm}/>
    <Route path="/cms/sites/:id/edit" component={SitesForm}/>
    <Route path="*" component={NotFound} />
  </ Route>
);