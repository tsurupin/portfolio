import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import ArticlesIndex from './containers/articles/index';
import ArticlesForm from './containers/articles/form';
import ProjectsIndex from './containers/projects/index';
import ProjectsForm from './containers/projects/form';
import SitesForm from './containers/sites/form';
import AuthorsForm from './containers/authors/form';
export default (
    <Route path="/cms" component={App}>
        <IndexRoute component={ArticlesIndex} />
        <Route path="/cms/articles/new" component={ArticlesForm} />
        <Route path="/cms/projects" component={ProjectsIndex} />
        <Route path="/cms/projects/new" component={ProjectsForm} />
        <Route path="/cms/projects/:id/edit" component={ProjectsForm} />
        <Route path="/cms/authors/new" component={AuthorsForm} />
        <Route path="/cms/authors/:id/edit" component={AuthorsForm} />
        <Route path="/cms/sites/new" component={SitesForm} />
        <Route path="/cms/sites/:id/edit" component={SitesForm} />
    </ Route>
);