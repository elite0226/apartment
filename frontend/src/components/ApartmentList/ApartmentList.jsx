import React from 'react';
import {
  Box,
  Grid,
} from '@material-ui/core';

import ApartmentCard from '../ApartmentCard';

function ApartmentList ({ apartments }) {
  return (
    <Box>
      <h4>Apartment List</h4>
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
