import React from 'react';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';

import ApartmentCard from '../ApartmentCard';
import useStyles from './style.js';

function ApartmentList ({ apartments }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        {apartments.map(apartment => (
          <Grid key={apartment.id} item sm={6} xs={12}>
            <ApartmentCard apartment={apartment} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ApartmentList;
