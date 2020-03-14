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
import { requestSuccess } from '../../utils/request';
import { getApartments } from '../../store/reducers/apartment';
import { GET_APARTMENTS_REQUEST } from '../../store/types';

function HomePage () {
  const dispatch = useDispatch();
  const apartments = useSelector(state => state.apartment.apartments);
  const apartmentError = useSelector(state => state.apartment.error);
  const apartmentStatus = useSelector(state => state.apartment.status);

  useEffect(() => {
    dispatch(getApartments());
  }, []);

  return apartmentStatus === requestSuccess(GET_APARTMENTS_REQUEST) ? (
    <Container maxWidth={false}>
      <Grid container spacing={4}>
        <Grid item md={6}>
          <ApartmentMap apartments={apartments} />
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
