import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ApartmentMap from '../../components/ApartmentMap';
import ApartmentForm from '../../components/ApartmentForm';
import LoadingFallback from '../../components/LoadingFallback';
import { getApartment, addApartment, updateApartment } from '../../store/reducers/apartment';
import { GET_APARTMENT_REQUEST } from '../../store/types';
import { requestSuccess } from '../../utils/request';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(8, 2),
    alignItems: 'center',
  }
}));

function ApartmentEdit () {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const apartment = useSelector(state => state.apartment.apartment);
  const apartmentStatus = useSelector(state => state.apartment.status);
  const [latLng, setLatLng] = useState();

  useEffect(() => {
    if (params.id) {
      dispatch(getApartment({
        id: params.id,
      }));
    }
  }, []);

  useEffect(() => {
    if (!apartment || apartmentStatus !== requestSuccess(GET_APARTMENT_REQUEST)) return;
    setLatLng({
      lat: apartment.latitude,
      lng: apartment.longitude,
    });
  }, [apartment]);

  const handleMapClick = (e) => {
    setLatLng({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  const handleSubmit = (data) => {
    console.log('apartment: ', data);
    if (params.id) {
      dispatch(updateApartment({
        id: params.id,
        body: data,
        success: (res) => history.goBack(),
      }));
    } else {
      dispatch(addApartment({
        body: data,
        success: (res) => history.goBack(),
      }));
    }
  }

  return (
    <Container maxWidth={false}>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <ApartmentMap position={latLng} onMapClick={handleMapClick} />
        </Grid>
        <Grid item md={6}>
          <Box className={classes.paper}>
            <Typography variant="h4">
              {params.id ? 'Edit apartment' : 'Add a new apartment'}
            </Typography>
            <ApartmentForm
              latLng={latLng}
              apartment={apartment}
              onSubmit={handleSubmit}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ApartmentEdit;