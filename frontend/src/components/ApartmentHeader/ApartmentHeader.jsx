import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';

import useStyles from './style';

function ApartmentHeader() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box className={classes.root}>
      <Typography variant="h4">
        Available apartments
      </Typography>
      <Button variant="contained" color="primary" onClick={() => history.push('/apartment')}>
        Add apartment
      </Button>
    </Box>
  );
}

export default ApartmentHeader;
