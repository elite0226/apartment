import React, { useState, useEffect } from 'react';
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
import { isRealtorManageAllowed } from '../../utils/role';
import useStyles from './style';

function HomePage () {
  const classes = useStyles();
  const dispatch = useDispatch();
  const apartments = useSelector(state => state.apartment.apartments);
  const role = useSelector(state => state.auth.user.role);
  // const apartmentError = useSelector(state => state.apartment.error);
  // const apartmentStatus = useSelector(state => state.apartment.status);
  const [infoWindowOpen, setInfoWindowOpen] = useState([]);

  useEffect(() => {
    dispatch(getApartments());
  }, []);

  useEffect(() => {
    if (apartments.length == 0) return;
    setInfoWindowOpen(new Array(apartments.length).fill(false));
  }, [apartments]);

  const toggleOpenInfoWindow = (index) => {
    const newInfoWindowOpen = new Array(...infoWindowOpen);
    newInfoWindowOpen[index] = !newInfoWindowOpen[index];
    setInfoWindowOpen(newInfoWindowOpen);
  }

  return (
    <Container maxWidth={false}>
      <Grid container spacing={4}>
        <Grid className={classes.noPadding} item md={6}>
          <ApartmentMap
            apartments={apartments}
            actionable={isRealtorManageAllowed(role)}
            isOpen={infoWindowOpen}
            onToggleOpen={toggleOpenInfoWindow}
          />
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
