import React from 'react';
import {
  Grid,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';

function ApartmentFilter({ filterParams, onChangeFilterParams }) {
  return (
    <Toolbar>
        <Typography variant="h6" style={{width: '200px'}}>
          Filter by:
        </Typography>
        <Grid container spacing={0} justify="space-between">
          <Grid item>
            <TextField
              variant="outlined"
              margin="normal"
              type="number"
              name="size"
              label="Size"
              size="small"
              value={filterParams.size}
              onChange={onChangeFilterParams}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              margin="normal"
              type="number"
              name="price"
              label="Price"
              size="small"
              value={filterParams.price}
              onChange={onChangeFilterParams}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              margin="normal"
              type="number"
              name="rooms"
              label="Number of rooms"
              size="small"
              value={filterParams.rooms}
              onChange={onChangeFilterParams}
            />
          </Grid>
        </Grid>
    </Toolbar>
  );
}

export default ApartmentFilter;
