import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
} from '@material-ui/core';

import LoadingFallback from '../../components/LoadingFallback';
import ApartmentMap from '../../components/ApartmentMap';
import ApartmentList from '../../components/ApartmentList';
import { getApartments } from '../../store/reducers/apartment';

function HomePage () {
  const dispatch = useDispatch();
  const apartments = useSelector(state => state.apartment.apartments);
  // const apartmentError = useSelector(state => state.apartment.error);
  // const apartmentStatus = useSelector(state => state.apartment.status);

  useEffect(() => {
    dispatch(getApartments());
  }, []);

  return apartments.length > 0 ? (
    <Container maxWidth={false}>
      <Grid container spacing={4}>
        <Grid item md={6}>
          <ApartmentMap />
        </Grid>
        <Grid item md={6}>
          <Typography variant="h5">Available Apartments</Typography>
          <ApartmentList apartments={apartments} />
        </Grid>
      </Grid>
    </Container>
  ) : (
    <LoadingFallback />
  );
}

export default HomePage;
