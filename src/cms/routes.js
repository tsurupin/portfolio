import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App/index';
import PostIndex from './containers/posts/Index/index';
import PostForm from './containers/posts/Form/index';
import ProjectIndex from './containers/projects/Index/index';
import ProjectForm from './containers/projects/Form/index';
import HomeIndex from './containers/homes/Index/index';
import AuthorIndex from './containers/authors/Index/index';
import AuthorForm from './containers/authors/Form/index';
import AuthorSinUp from './containers/authors/SignUp/index';
import AuthorSingIn from './containers/authors/SignIn/index';
import NotFound from 'sharedComponents/NotFound/index';
import Authentication from './containers/shared/Authentication/index';

export default (
  <Route path="/cms" component={App}>
    <IndexRoute component={HomeIndex}/>
      <Route path="/cms/posts" component={Authentication(PostIndex)}/>
      <Route path="/cms/posts/new" component={Authentication(PostForm)}/>
      <Route path="/cms/posts/:id/edit" component={Authentication(PostForm)}/>
      <Route path="/cms/posts/:id" component={Authentication(PostForm)}/>
      <Route path="/cms/projects" component={Authentication(ProjectIndex)}/>
      <Route path="/cms/projects/new" component={Authentication(ProjectForm)}/>
      <Route path="/cms/projects/:id/edit" component={Authentication(ProjectForm)}/>
      <Route path="/cms/sign-up" component={AuthorSinUp}/>
      <Route path="/cms/sign-in" component={AuthorSingIn}/>
      <Route path="/cms/about" component={Authentication(AuthorIndex)}/>
      <Route path="/cms/about/edit" component={Authentication(AuthorForm)}/>
      <Route path="*" component={NotFound} />
  </ Route>
);