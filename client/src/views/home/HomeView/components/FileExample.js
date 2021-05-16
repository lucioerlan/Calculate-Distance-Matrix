import React, { useState } from 'react';
import clsx from 'clsx';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Tooltip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  GetAppOutlined as GetAppOutlinedIcon,
  HelpOutlineOutlined as HelpOutlineOutlinedIcon
} from '@material-ui/icons';
import ExampleFile from 'src/files/example/example-doc.csv';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: 32,
    right: 32,
    zIndex: theme.zIndex.drawer - 100
  }
}));

export const FileExample = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <span
        className={clsx(classes.fab, {
          [classes.shiftFab]: open
        })}
      >
        <Tooltip title="Download sample file" aria-label="Download sample file">
          <Fab color="primary" onClick={handleClickOpen}>
            <HelpOutlineOutlinedIcon />
          </Fab>
        </Tooltip>
      </span>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Download sample file</DialogTitle>
        <DialogContent />
        <DialogActions>
          <Button
            target="_blank"
            rel="noopener noreferrer"
            href={ExampleFile}
            color="primary"
            size="small"
            variant="outlined"
            startIcon={<GetAppOutlinedIcon />}
          >
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
