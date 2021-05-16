/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Box, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

export const SkeletonDocs = () => {
  return (
    <>
      {Array.from(new Array(5)).map((row, i) => (
        <Grid key={i} style={{ marginBottom: -30 }} spacing={3}>
          <Box>
            <Skeleton animation="wave" height={130} />
          </Box>
        </Grid>
      ))}
    </>
  );
};
