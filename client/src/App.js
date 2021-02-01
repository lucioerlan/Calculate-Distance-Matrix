import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import theme from 'src/theme';
import {Dashboard} from 'src/pages/Dashboard';
import NotFound from 'src/pages/NotFound';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </ThemeProvider>
  );
};

export default App;
