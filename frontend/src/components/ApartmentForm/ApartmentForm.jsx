import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useForm, Controller, ErrorMessage } from 'react-hook-form';
import {
  Button,
  Grid,
  InputAdornment,
  InputLabel,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import SizeIcon from '@material-ui/icons/AccountBalance';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import RoomIcon from '@material-ui/icons/ContactSupport';
import LocationIcon from '@material-ui/icons/LocationOn';
import AddressIcon from '@material-ui/icons/PersonPinCircle';

import { GET_APARTMENT_REQUEST } from '../../store/types';
import { requestSuccess } from '../../utils/request';
import useStyles from './style';

function ApartmentForm({
  apartment,
  latLng,
  onSubmit,
}) {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();
  const user = useSelector(state => state.auth.user);
  const apartmentStatus = useSelector(state => state.apartment.status);
  const { control, handleSubmit, setValue, errors } = useForm();

  useEffect(() => {
    if (!apartment || apartmentStatus !== requestSuccess(GET_APARTMENT_REQUEST)) return;
    setValue('name', apartment.name);
    setValue('status', apartment.status);
    setValue('description', apartment.description);
    setValue('size', apartment.size);
    setValue('price', apartment.price);
    setValue('rooms', apartment.rooms);
    setValue('latitude', apartment.latitude);
    setValue('longitude', apartment.longitude);
  }, [apartment]);

  useEffect(() => {
    if (!latLng) return;
    setValue('latitude', latLng.lat);
    setValue('longitude', latLng.lng);
  }, [latLng])

  const handleGoBack = () => {
    history.goBack();
  };

  return (!params.id || apartment) && (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Grid item sm={4}>
          <Controller
            as={
              <TextField
                margin="normal"
                fullWidth
                label="Name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreateIcon />
                    </InputAdornment>
                  ),
                }}
                autoFocus
              />
            }
            name="name"
            control={control}
            rules={{
              required: 'Name is required',
            }}
            defaultValue=""
          />
          <ErrorMessage as={<Typography color="error" />} errors={errors} name="name" />
        </Grid>
        <Grid item sm={4}>
          <Controller
            as={
              <>
                <InputLabel className={classes.label}>Associated realtor</InputLabel>
                <Select
                  className={classes.select}
                  onChange={(event) => setValue('realtor', event.target.value)}
                  native
                >
                  <option value={user.id}>{`${user.firstName} ${user.lastName}`}</option>
                </Select>
              </>
            }
            name="realtor"
            control={control}
            rules={{
              required: 'Realtor is required',
            }}
            defaultValue=""
          />
        </Grid>
        <Grid item sm={4}>
          <Controller
            as={
              <>
                <InputLabel className={classes.label}>Status</InputLabel>
                <Select
                  className={classes.select}
                  defaultValue={(apartment && apartment.status) || 'AVAILABLE'}
                  onChange={(event) => setValue('status', event.target.value)}
                  native
                >
                  <option value="AVAILABLE">Available</option>
                  <option value="RENTED">Rented</option>
                </Select>
              </>
            }
            name="status"
            control={control}
            rules={{
              required: 'status is required',
            }}
            defaultValue="AVAILABLE"
          />
        </Grid>
        <Grid item sm={12}>
          <Controller
            as={
              <TextField
                variant="outlined"
                margin="normal"
                label="Description"
                fullWidth
                multiline
                rows="5"
              />
            }
            name="description"
            control={control}
            rules={{
              required: 'Description is required',
            }}
            defaultValue=""
          />
          <ErrorMessage as={<Typography color="error" />} errors={errors} name="description" />
        </Grid>
        <Grid item sm={4}>
          <Controller
            as={
              <TextField
                margin="normal"
                fullWidth
                label="Floor area size"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SizeIcon />
                    </InputAdornment>
                  ),
                }}
              />
            }
            name="size"
            control={control}
            rules={{
              required: 'Floor area size is required',
            }}
            defaultValue=""
          />
          <ErrorMessage as={<Typography color="error" />} errors={errors} name="size" />
        </Grid>
        <Grid item sm={4}>
          <Controller
            as={
              <TextField
                margin="normal"
                fullWidth
                label="Price per month"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MoneyIcon />
                    </InputAdornment>
                  ),
                }}
              />
            }
            name="price"
            control={control}
            rules={{
              required: 'Price is required',
            }}
            defaultValue=""
          />
          <ErrorMessage as={<Typography color="error" />} errors={errors} name="price" />
        </Grid>
        <Grid item sm={4}>
          <Controller
            as={
              <TextField
                margin="normal"
                fullWidth
                label="Number of rooms"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <RoomIcon />
                    </InputAdornment>
                  ),
                }}
              />
            }
            name="rooms"
            control={control}
            rules={{
              required: 'Number of rooms is required',
            }}
            defaultValue=""
          />
          <ErrorMessage as={<Typography color="error" />} errors={errors} name="rooms" />
        </Grid>
        <Grid item sm={6}>
          <Controller
            as={
              <TextField
                margin="normal"
                fullWidth
                label="Latitude"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationIcon />
                    </InputAdornment>
                  ),
                }}
                disabled
              />
            }
            name="latitude"
            control={control}
            rules={{
              required: 'Latitude is required',
            }}
            defaultValue=""
          />
          <ErrorMessage as={<Typography color="error" />} errors={errors} name="latitude" />
        </Grid>
        <Grid item sm={6}>
          <Controller
            as={
              <TextField
                margin="normal"
                fullWidth
                label="Longitude"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationIcon />
                    </InputAdornment>
                  ),
                }}
                disabled
              />
            }
            name="longitude"
            control={control}
            rules={{
              required: 'Longitude is required',
            }}
            defaultValue=""
          />
          <ErrorMessage as={<Typography color="error" />} errors={errors} name="longitude" />
        </Grid>
        <Grid item sm={12}>
          <TextField
            margin="normal"
            fullWidth
            label="Address"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AddressIcon />
                </InputAdornment>
              ),
            }}
            value="Toronto, Canada"
            disabled
          />
        </Grid>
        <Grid container>
          <Grid item xs>
            <Button color="primary" onClick={handleGoBack}>Back</Button>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              {params.id ? 'Update' : 'Add'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default ApartmentForm;
