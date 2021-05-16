import React, { useState, useEffect } from 'react';
import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import { Typography, Tooltip } from '@material-ui/core';
import { SkeletonDocs } from 'src/components/Skeleton';
import io from 'socket.io-client';
import api from 'src/services/api';
import { FileCard } from './FileCard';

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3, 3, 6, 3),
    marginTop: theme.spacing(2)
  },
  paginate: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center'
  }
}));

export const FileList = () => {
  const classes = useStyles();
  const [files, setfiles] = useState([]);
  const itemsPerPage = 4;
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const socket = io(process.env.REACT_APP_SOCKET_URL, {
        transports: ['websocket'],
        upgrade: false
      });
      try {
        const { data } = await api.get('/get-files');

        setfiles(data.message);
        setNoOfPages(Math.ceil(data.message.length / itemsPerPage));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
      socket.once('post', () => {
        fetchData();
      });
    };
    fetchData();
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className={classes.root}>
      <Typography color="textSecondary" gutterBottom variant="body2">
        You have
        {' '}
        {files.length}
        {' '}
        documents found. Page
        {' '}
        {page}
        {' '}
        of
        {' '}
        {noOfPages}
      </Typography>
      {loading ? <SkeletonDocs /> : null}
      {files.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((file) => {
        return <FileCard key={file.id} file={file} />;
      })}

      <div className={classes.paginate}>
        <Tooltip title={`Página ${page}`}>
          <Pagination
            count={noOfPages}
            page={page}
            onChange={handleChange}
            defaultPage={1}
            showFirstButton
            showLastButton
            color="primary"
            size="small"
          />
        </Tooltip>
      </div>
    </div>
  );
};
