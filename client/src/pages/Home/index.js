import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Header from '../../components/Header';
import Form from '../Form';
import './styles.css';
import defaultTheme from '../../theme';

export default () => {
  const [theme] = useState(defaultTheme);
  return (
    <MuiThemeProvider theme={theme}>
      <Header />
      <Switch>
        <Route component={Form} />
      </Switch>
    </MuiThemeProvider>
  );
};
