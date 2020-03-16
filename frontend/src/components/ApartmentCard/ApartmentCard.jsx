import React from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Typography,
} from '@material-ui/core';
import LocationIcon from '@material-ui/icons/LocationOn';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import UpdateIcon from '@material-ui/icons/Create';
import Geocode from 'react-geocode';

import { deleteApartment } from '../../store/reducers/apartment';
import useStyles from './style';

function ApartmentCard({ apartment, maxWidth, actionable }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API_KEY);

  const getAddress = (lat, lng) => {
    Geocode.fromLatLng(lat, lng).then(
      response => {
        const address = response.results[0].formatted_address;
        console.log(address);
      },
      error => {
        console.error(error);
      }
    );
  };

  const handleEditApartment = () => {
    history.push(`/apartment/${apartment.id}`);
  };

  const handleDeleteApartment = () => {
    // TODO: confirm deletion
    dispatch(deleteApartment({ id: apartment.id }));
  };

  return (
    <Card
      className={classes.root}
      style={{
        maxWidth: maxWidth ? `${maxWidth}px` : 'unset',
      }}
    >
      <CardHeader
        classes={{
          title: classes.cardTitle,
        }}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {apartment.realtor.firstName[0].toUpperCase()}
          </Avatar>
        }
        action={
          actionable && (
            <Box className={classes.actions}>
              <IconButton color="primary" onClick={handleEditApartment}>
                <UpdateIcon fontSize="small" />
              </IconButton>
              <IconButton color="secondary" onClick={handleDeleteApartment}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          )
        }
        title={`${apartment.realtor.firstName} ${apartment.realtor.lastName}`}
        subheader={apartment.addedDate}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2">
          {apartment.name} 
          <Chip
            size="small"
            label={apartment.status}
            color={apartment.status === 'AVAILABLE' ? 'primary' : 'secondary'}
            classes={{
              root: classes.status,
              colorPrimary: classes.availableStatus,
              colorSecondary: classes.rentedStatus,
            }}
          />
        </Typography>
        <Typography className={classes.description} variant="body2" color="textSecondary" component="p">
          {apartment.description}
        </Typography>
      </CardContent>
      <hr className={classes.divider} />
      <CardActions classes={{ root: classes.actionsPadding }}>
        <Typography classes={{ root: classes.fs13 }}>
          ${apartment.price} / Month
        </Typography>
        <Typography classes={{ root: classes.fs13 }}>
          {apartment.rooms} Room(s)
        </Typography>
        <div className={classes.grow} />
        <div className={clsx(classes.flex, classes.justify)}>
          <LocationIcon className={classes.mr4} fontSize="small" />
          <Typography classes={{ root: classes.fs13 }}>
            {apartment.address}
          </Typography>
        </div>
      </CardActions>
    </Card>
  );
}

export default ApartmentCard;
