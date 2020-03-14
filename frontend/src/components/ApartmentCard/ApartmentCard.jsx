import React from 'react';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import LocationIcon from '@material-ui/icons/LocationOn';
import Geocode from 'react-geocode';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardTitle: {
    textTransform: 'capitalize',
  },
  divider: {
    margin: theme.spacing(0, 2),
  },
  actionsPadding: {
    padding: theme.spacing(1, 2),
  },
  grow: {
    flexGrow: 1,
  },
  justify: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fs13: {
    fontSize: '13px',
  },
  mr4: {
    marginRight: '4px',
  },
}));

function ApartmentCard({ apartment }) {
  const classes = useStyles();

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
  }

  return (
    <Card className={classes.root}>
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
          <Chip
            size="small"
            label={apartment.status}
            color={apartment.status === 'RENTED' ? 'secondary' : 'primary'}
          />
        }
        title={`${apartment.realtor.firstName} ${apartment.realtor.lastName}`}
        subheader={apartment.addedDate}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2">
          {apartment.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {apartment.description}
        </Typography>
      </CardContent>
      <hr className={classes.divider} />
      <CardActions classes={{ root: classes.actionsPadding }}>
        <Typography classes={{ root: classes.fs13 }}>
          ${apartment.price}/Month
        </Typography>
        <Typography classes={{ root: classes.fs13 }}>
          {apartment.rooms} Room(s)
        </Typography>
        <div className={classes.grow} />
        <div className={classes.justify}>
          <LocationIcon className={classes.mr4} fontSize="small" />
          <Typography classes={{ root: classes.fs13 }}>
            Toronto, Canada
          </Typography>
        </div>
      </CardActions>
    </Card>
  );
}

export default ApartmentCard;
