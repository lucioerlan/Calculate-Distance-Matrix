/* eslint-disable consistent-return */
import React, { useState } from 'react';
import {
  Box,
  Button,
  Select,
  Snackbar,
  SnackbarContent,
  makeStyles,
  Typography,
  TextField,
} from '@material-ui/core';
import { red, green, amber } from '@material-ui/core/colors';
import PublishIcon from '@material-ui/icons/Publish';
import './styles.css';
import api from 'src/service/api';
import Progress from 'src/components/Progress';
import Files from './Return-Docs';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  success: {
    backgroundColor: green[800],
  },
  error: {
    backgroundColor: red[600],
  },
  warning: {
    backgroundColor: amber[600],
  },
});

export default () => {
  const classes = useStyles();
  const [fileName, setFileName] = useState('');
  const [item, setItem] = useState({
    message: null,
    variant: null,
    loading: false,
  });
  const [state, setState] = useState({
    docFile: '',
    fullname: '',
    chooseDistances: '',
  });

  const handledocFileChange = e => {
    setState({ ...state, docFile: e.target.files[0] });
    setFileName(e.target.files[0].name);
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      setTimeout(() => setItem({ message: null, variant: null }), 4000);

      if (!state.docFile || !state.fullname || !state.chooseDistances) {
        return setItem({
          message: 'Fill in all fields to save!',
          variant: 'warning',
        });
      }

      const data = new FormData();
      data.append('docFile', state.docFile);
      data.append('fullname', state.fullname);
      data.append('chooseDistances', state.chooseDistances);

      await api.post('process-files', data, setItem({ loading: true }));

      setItem({
        message: 'Data successfully saved!',
        variant: 'success',
        loading: false,
      });
    } catch (error) {
      setItem({
        message: 'Error saving!',
        variant: 'error',
        loading: false,
      });
    }
  };

  const MySnackbar = () => (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={!!item.message}
    >
      <SnackbarContent
        className={classes[item.variant]}
        message={item.message}
      />
    </Snackbar>
  );

  return (
    <React.Fragment>
      <Box component="form" id="new-post" onSubmit={handleSubmit}>
        <TextField
          required
          value={state.fullname}
          name="fullname"
          type="text"
          label="Enter a name for the file"
          margin="normal"
          fullWidth
          color="primary"
          variant="outlined"
          onChange={e => setState({ ...state, fullname: e.target.value })}
        />
        <Select
          required
          value={state.chooseDistances}
          name="chooseDistances"
          native
          style={{ marginTop: 15, marginBottom: 5 }}
          color="primary"
          variant="outlined"
          onChange={e =>
            setState({ ...state, chooseDistances: e.target.value })
          }
        >
          <option value={0}>Select Method</option>
          <option value="distance.text">Distance Time</option>
          <option value="distance.value">Distance Value</option>
          <option value="duration.text">Duration Time</option>
          <option value="duration.value">Duration Value</option>
        </Select>
        <Box
          component="input"
          accept=".csv"
          id="upload-button-file"
          type="file"
          onChange={handledocFileChange}
        />
        <Box component="label" htmlFor="upload-button-file">
          <Button
            color="primary"
            style={{ marginTop: '20px', borderRadius: '10px' }}
            variant="contained"
            component="span"
            startIcon={<PublishIcon />}
            aria-describedby="component-error-text"
          >
            Attach file
          </Button>
          <Typography variant="h6">{fileName}</Typography>
        </Box>

        <Button
          label="Salvar"
          variant="contained"
          color="primary"
          size="large"
          type="submit"
        >
          Submit
        </Button>

        {item.loading ? <Progress /> : null}
        <MySnackbar />
      </Box>
      <Files />
    </React.Fragment>
  );
};
