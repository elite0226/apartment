import { createAction, createReducer } from '@reduxjs/toolkit';

import {
  GET_APARTMENTS_REQUEST,
  GET_APARTMENT_REQUEST,
  ADD_APARTMENT_REQUEST,
  UPDATE_APARTMENT_REQUEST,
  DELETE_APARTMENT_REQUEST,
} from '../types';
import { requestSuccess, requestFail } from '../../utils/request';

const initialState = {
  apartments: [],
  apartment: null,
  status: 'INIT',
  error: null,
};

export const getApartments = createAction(GET_APARTMENTS_REQUEST);
export const getApartment = createAction(GET_APARTMENT_REQUEST);
export const addApartment = createAction(ADD_APARTMENT_REQUEST);
export const updateApartment = createAction(UPDATE_APARTMENT_REQUEST);
export const deleteApartment = createAction(DELETE_APARTMENT_REQUEST);

export default createReducer(initialState, {
  [requestSuccess(GET_APARTMENTS_REQUEST)]: (state, { payload }) => ({
    apartments: payload,
    apartment: null,
    status: requestSuccess(GET_APARTMENTS_REQUEST),
    error: null,
  }),

  [requestFail(GET_APARTMENTS_REQUEST)]: (state, { payload }) => ({
    apartments: [],
    apartment: null,
    status: requestFail(GET_APARTMENTS_REQUEST),
    error: payload.error,
  }),

  [requestSuccess(GET_APARTMENT_REQUEST)]: (state, { payload }) => ({
    apartment: payload,
    status: requestSuccess(GET_APARTMENT_REQUEST),
    error: null,
  }),

  [requestFail(GET_APARTMENT_REQUEST)]: (state, { payload }) => ({
    apartment: null,
    status: requestFail(GET_APARTMENT_REQUEST),
    error: payload.error,
  }),

  [requestSuccess(ADD_APARTMENT_REQUEST)]: (state, { payload }) => {
    state.push(payload);
    state.apartment = payload;
    state.status = requestSuccess(ADD_APARTMENT_REQUEST);
    state.error = null;
  },

  [requestFail(ADD_APARTMENT_REQUEST)]: (state, { payload }) => ({
    apartment: null,
    status: requestFail(ADD_APARTMENT_REQUEST),
    error: payload.error,
  }),

  [requestSuccess(UPDATE_APARTMENT_REQUEST)]: (state, { payload }) => {
    const index = state.apartments.findIndex(apartment => apartment.id === payload.id);
    state.apartments[index] = payload;
    state.apartment = payload;
    state.status = requestSuccess(UPDATE_APARTMENT_REQUEST);
    state.error = null;
  },

  [requestFail(UPDATE_APARTMENT_REQUEST)]: (state, { payload }) => ({
    apartment: null,
    status: requestFail(UPDATE_APARTMENT_REQUEST),
    error: payload.error,
  }),

  [requestSuccess(DELETE_APARTMENT_REQUEST)]: (state, { payload }) => {
    state.apartments = state.apartments.filter(apartment => apartment.id !== payload.id);
    state.status = requestSuccess(DELETE_APARTMENT_REQUEST);
    state.error = null;
  },

  [requestFail(DELETE_APARTMENT_REQUEST)]: (state, { payload }) => ({
    status: requestFail(DELETE_APARTMENT_REQUEST),
    error: payload.error,
  }),
});
