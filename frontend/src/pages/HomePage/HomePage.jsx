import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Grid,
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
      <Grid container>
        <Grid item md={6}>
          <ApartmentMap />
        </Grid>
        <Grid item md={6}>
          <ApartmentList />
        </Grid>
      </Grid>
    </Container>
  ) : (
    <LoadingFallback />
  );
}

export default HomePage;
