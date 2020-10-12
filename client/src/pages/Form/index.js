import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Box,
  LinearProgress,
  FormHelperText,
  Select,
  TextField,
  makeStyles,
  Typography,
} from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

import Files from './files';
import api from '../../service/api';

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: 20
  },
});

export default () => {

  const [loading, setLoading] = useState(false);
  const [setOpen] = useState(false);
  const [errorImage, setErrorImage] = useState('');
  const [state, setState] = useState({
    image: '',
    fullname: '',
    chooseDistances: '',
  });

  const classes = useStyles();
  const [progress, setProgress] = useState(1);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress =>
        prevProgress >= 100 ? 5 : prevProgress + 5
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);


  const handleClose = () => {
    setOpen(false);
  };

  const handleImageChange = e => {
    setState({ ...state, image: e.target.files[0] });
  };


  async function handleSubmit(e) {
    e.preventDefault();

    if (!state.image) {
      setErrorImage(' *Dont forget this option :) ');
    }

    const data = new FormData();
    data.append('image', state.image);
    data.append('fullname', state.fullname);
    data.append('chooseDistances', state.chooseDistances);

    if (!state.image || !state.fullname || !state.chooseDistances) {
      toast.warning('Fill in all the fields!');
    } else {
      confirmAlert({
        message: 'Submit Form ?',
        buttons: [
          {
            label: 'Yes',
            onClick: async () =>
              await api
                .post('process-files', data, setLoading(true))

                .then(response => {
                  toast.success('Form Sent Successfully!');
                  setLoading(false);
                })
                .catch(error => {
                  toast.error('Error sending form!');
                  console.log(error);
                }),
          },
          {
            label: 'No',
            onClick: () => handleClose,
          },
        ],
      });
    }
  }

  return (
    <React.Fragment>
      <form id="new-post" onSubmit={handleSubmit}>
        <TextField
          required
          value={state.fullname}
          name="fullname"
          type="text"
          label="Full name"
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
          <option value={0}>Select distance calculation</option>
          <option value={'distance.text'}>Distance Time</option>
          <option value={'distance.value'}>Distance Value</option>
          <option value={'duration.text'}>Duration Time</option>
          <option value={'duration.value'}>Duration Value</option>
        </Select>

        <input
          accept=".csv"
          id="upload-button-file"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="upload-button-file">
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
        </label>

        {errorImage && (
          <FormHelperText id="component-error-text">
            {errorImage}
          </FormHelperText>
        )}

        <Button
          label="Salvar"
          variant="contained"
          color="primary"
          size="large"
          type="submit"
        >
          Submit
        </Button>

        {loading ?  <div className={classes.root}>
        <LinearProgressWithLabel value={progress} />
      </div> : null}

        <ToastContainer />
      </form>

      <Files />
    </React.Fragment>
  );
};
