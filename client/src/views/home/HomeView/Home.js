import React, { useState } from 'react';
import {
  Box, Snackbar, SnackbarContent, makeStyles
} from '@material-ui/core';
import { red, green, amber } from '@material-ui/core/colors';
import api from 'src/services/api';
import Progress from 'src/components/Progress';
import { FileList, FileAction, FileExample } from './components';

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '50px auto 0',
    padding: theme.spacing(3, 3, 6, 3),
    paddingTop: '20px',
    background: theme.palette.background.default,
    border: '1px solid #ddd',
    display: 'flex',
    flexDirection: 'column'
  },
  success: {
    backgroundColor: green[800]
  },
  error: {
    backgroundColor: red[600]
  },
  warning: {
    backgroundColor: amber[600]
  },
  formControl: {
    marginTop: 15,
    marginBottom: 5
  },
  inputType: {
    display: 'none'
  },
  btnAttach: {
    marginTop: '20px',
    borderRadius: '10px'
  },
  btnSubmit: {
    height: '55px',
    marginTop: '25px'
  }
}));

const Home = () => {
  const classes = useStyles();
  const [alert, setAlert] = useState({
    message: null,
    variant: null,
    loading: false
  });
  const [state, setState] = useState({
    docFile: '',
    fullname: '',
    chooseDistances: ''
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setTimeout(() => setAlert({ message: null, variant: null }), 4000);

      const data = new FormData();
      data.append('docFile', state.docFile);
      data.append('fullname', state.fullname);
      data.append('chooseDistances', state.chooseDistances);

      await api.post('process-files', data, setAlert({ loading: true }));

      setAlert({
        message: 'Data successfully saved!',
        variant: 'success',
        loading: false
      });
    } catch (error) {
      setAlert({
        message: 'Error saving!',
        variant: 'error',
        loading: false
      });
    }
  };

  const MySnackbar = () => (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      open={!!alert.message}
    >
      <SnackbarContent
        className={classes[alert.variant]}
        message={alert.message}
      />
    </Snackbar>
  );

  return (
    <>
      <Box component="form" className={classes.root} onSubmit={handleSubmit}>
        <FileAction
          state={state}
          setState={setState}
          formControl={classes.formControl}
          inputType={classes.inputType}
          btnAttach={classes.btnAttach}
          btnSubmit={classes.btnSubmit}
        />
        {alert.loading ? <Progress /> : null}
      </Box>
      <FileExample />
      <FileList />
      <MySnackbar />
    </>
  );
};

export default Home;
