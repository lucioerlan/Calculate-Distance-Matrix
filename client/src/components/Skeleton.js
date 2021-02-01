import React, { Fragment } from 'react';
import { Box, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

export default function SkeletonDocs() {
  return (
    <Fragment>
      {Array.from(new Array(5)).map((row, i) => (
        <Grid key={i} container justify="center" spacing={3}>
          <Box>
            <Skeleton animation="wave" width="100vh" height={60} />
          </Box>
        </Grid>
      ))}
    </Fragment>
  );
}
