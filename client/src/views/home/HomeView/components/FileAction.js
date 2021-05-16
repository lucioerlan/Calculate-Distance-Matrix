import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField
} from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';

export const FileAction = ({
  setState,
  state,
  formControl,
  inputType,
  btnAttach,
  btnSubmit
}) => (
  <>
    <TextField
      required
      value={state.fullname}
      name="fullname"
      type="text"
      label="File Name"
      margin="normal"
      fullWidth
      color="primary"
      variant="outlined"
      onChange={(e) => setState({ ...state, fullname: e.target.value })}
    />
    <FormControl required className={formControl} variant="outlined">
      <InputLabel id="demo-simple-select-outlined-label">
        Select Method
      </InputLabel>
      <Select
        value={state.chooseDistances}
        onChange={(e) => setState({ ...state, chooseDistances: e.target.value })}
        color="primary"
        label="Select Method"
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
      >
        <MenuItem value="distance.text">Distance Time</MenuItem>
        <MenuItem value="distance.value">Distance Value</MenuItem>
        <MenuItem value="duration.text">Duration Time</MenuItem>
        <MenuItem value="duration.value">Duration Value</MenuItem>
      </Select>
    </FormControl>
    <Box
      className={inputType}
      value={state.fileName}
      component="input"
      accept=".csv"
      id="upload-button-file"
      type="file"
      onChange={(e) => setState({ ...state, docFile: e.target.files[0] })}
    />
    <Box component="label" htmlFor="upload-button-file">
      <Button
        className={btnAttach}
        color="primary"
        variant="contained"
        component="span"
        startIcon={<PublishIcon />}
      >
        Attach file
      </Button>
      <Typography variant="h6">{state.docFile.name}</Typography>
    </Box>

    <Button
      className={btnSubmit}
      variant="contained"
      color="primary"
      size="large"
      type="submit"
    >
      Submit
    </Button>
  </>
);

FileAction.propTypes = {
  setState: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired
};
