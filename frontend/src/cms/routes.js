import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App/index';
import PostIndex from './containers/posts/Index/index';
import PostForm from './containers/posts/Form/index';
import PostShow from 'client/containers/posts/Show/index';
import ProjectIndexPreview from 'client/containers/projects/Index/index';
import ProjectIndex from './containers/projects/Index/index';
import ProjectForm from './containers/projects/Form/index';
import AboutShow from '../client/containers/abouts/Show/index';
import AuthorForm from './containers/authors/Form/index';
import AuthorSinUp from './containers/authors/SignUp/index';
import AuthorSingIn from './containers/authors/SignIn/index';
import NotFound from 'shared/containers/NotFound/index';
import Authentication from './containers/shared/Authentication/index';
import Alert from 'shared/containers/Alert/index';
import ProgressBar from 'shared/containers/ProgressBar/index';

export default (
  <Route path="/cms" component={App}>
    <IndexRoute component={ProgressBar(Alert(Authentication(PostIndex)))} />
    <Route path="/cms/posts" component={ProgressBar(Alert(Authentication(PostIndex)))} />
    <Route path="/cms/posts/new" component={ProgressBar(Alert(Authentication(PostForm)))} />
    <Route path="/cms/posts/:id/edit" component={ProgressBar(Alert(Authentication(PostForm)))} />
    <Route path="/cms/posts/:id/preview" component={ProgressBar(PostShow)} />
    <Route path="/cms/projects" component={ProgressBar(Alert(Authentication(ProjectIndex)))} />
    <Route path="/cms/projects/preview" component={ProgressBar(ProjectIndexPreview)} />
    <Route path="/cms/projects/new" component={ProgressBar(Alert(Authentication(ProjectForm)))} />
    <Route path="/cms/projects/:id/edit" component={ProgressBar(Alert(Authentication(ProjectForm)))} />
    <Route path="/cms/sign-up" component={AuthorSinUp} />
    <Route path="/cms/sign-in" component={AuthorSingIn} />
    <Route path="/cms/about" component={ProgressBar(AboutShow)} />
    <Route path="/cms/about/edit" component={ProgressBar(Alert(Authentication(AuthorForm)))} />
    <Route path="*" component={NotFound} />
    <Route path="/not-found" component={NotFound} />
  </ Route>
);
