import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App/index';
import PostsIndex from './containers/posts/Index/index';
import PostsForm from './containers/posts/Form/index';
import ProjectsIndex from './containers/projects/Index/index';
import ProjectsForm from './containers/projects/Form/index';
import SitesForm from './containers/sites/form';
import AuthorsForm from './containers/authors/Form/index';
import AuthorsSinUp from './containers/authors/SignUp/index';
import AuthorsSingIn from './containers/authors/SignIn/index';
import NotFound from './components/NotFound/index';
import Authentication from './containers/shared/Authentication/index';

export default (
  <Route path="/cms" component={App}>
    <IndexRoute component={PostsIndex}/>
      <Route path="/cms/posts/new" component={Authentication(PostsForm)}/>
      <Route path="/cms/posts/:id/edit" component={Authentication(PostsForm)}/>
      <Route path="/cms/posts/:id" component={Authentication(PostsForm)}/>
      <Route path="/cms/projects" component={Authentication(ProjectsIndex)}/>
      <Route path="/cms/projects/new" component={Authentication(ProjectsForm)}/>
      <Route path="/cms/projects/:id/edit" component={Authentication(ProjectsForm)}/>
      <Route path="/cms/sign-up" component={AuthorsSinUp}/>
      <Route path="/cms/sign-in" component={AuthorsSingIn}/>
      <Route path="/cms/about" component={Authentication(AuthorsForm)}/>
      <Route path="/cms/about/edit" component={Authentication(AuthorsForm)}/>
      <Route path="/cms/sites/edit" component={Authentication(SitesForm)}/>
      <Route path="*" component={NotFound} />
  </ Route>
);