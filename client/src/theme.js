import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const defaultTheme = {
  palette: {
    primary: {
      main: '#41436A',
    },
    secondary: {
      main: '#4285F4',
    },
  },
  error: '#8B0000',
};

const theme = createMuiTheme(defaultTheme);

export const customTheme = option => {
  return createMuiTheme({ ...defaultTheme, ...option });
};

export default theme;
