import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './pages/Home';
import NotFound from './pages/NotFoundPage';

export default () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="*" component={NotFound} />
    </Switch>
  </HashRouter>
);
