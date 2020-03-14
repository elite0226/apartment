import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Grid,
} from '@material-ui/core';

// import LoadingFallback from '../../components/LoadingFallback';
import ApartmentMap from '../../components/ApartmentMap';
import ApartmentHeader from '../../components/ApartmentHeader';
import ApartmentList from '../../components/ApartmentList';
// import { requestSuccess } from '../../utils/request';
import { getApartments } from '../../store/reducers/apartment';
// import { GET_APARTMENTS_REQUEST } from '../../store/types';
import useStyles from './style';

function HomePage () {
  const classes = useStyles();
  const dispatch = useDispatch();
  const apartments = useSelector(state => state.apartment.apartments);
  // const apartmentError = useSelector(state => state.apartment.error);
  // const apartmentStatus = useSelector(state => state.apartment.status);

  useEffect(() => {
    dispatch(getApartments());
  }, []);

  return (
    <Container maxWidth={false}>
      <Grid container spacing={4}>
        <Grid className={classes.noPadding} item md={6}>
          <ApartmentMap apartments={apartments} />
        </Grid>
        <Grid className={classes.noPadding} item md={6}>
          <ApartmentHeader />
          <ApartmentList apartments={apartments} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomePage;
