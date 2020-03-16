import { createAction, createReducer } from '@reduxjs/toolkit';

import {
  GET_USERS_REQUEST,
  GET_USER_REQUEST,
  ADD_USER_REQUEST,
  UPDATE_USER_REQUEST,
  DELETE_USER_REQUEST,
} from '../types';
import { requestSuccess, requestFail } from '../../utils/request';

const initialState = {
  users: [],
  user: null,
  status: 'INIT',
  error: null,
};

export const getUsers = createAction(GET_USERS_REQUEST);
export const getUser = createAction(GET_USER_REQUEST);
export const addUser = createAction(ADD_USER_REQUEST);
export const updateUser = createAction(UPDATE_USER_REQUEST);
export const deleteUser = createAction(DELETE_USER_REQUEST);

export default createReducer(initialState, {
  [requestSuccess(GET_USERS_REQUEST)]: (state, { payload }) => ({
    users: payload,
    user: null,
    status: requestSuccess(GET_USERS_REQUEST),
    error: null,
  }),

  [requestFail(GET_USERS_REQUEST)]: (state, { payload }) => ({
    users: [],
    user: null,
    status: requestFail(GET_USERS_REQUEST),
    error: payload.error,
  }),

  [requestSuccess(GET_USER_REQUEST)]: (state, { payload }) => ({
    ...state,
    user: payload,
    status: requestSuccess(GET_USER_REQUEST),
    error: null,
  }),

  [requestFail(GET_USER_REQUEST)]: (state, { payload }) => ({
    ...state,
    user: null,
    status: requestFail(GET_USER_REQUEST),
    error: payload.error,
  }),

  [requestSuccess(ADD_USER_REQUEST)]: (state, { payload }) => {
    state.users.push(payload);
    state.user = payload;
    state.status = requestSuccess(ADD_USER_REQUEST);
    state.error = null;
  },

  [requestFail(ADD_USER_REQUEST)]: (state, { payload }) => ({
    ...state,
    user: null,
    status: requestFail(ADD_USER_REQUEST),
    error: payload.error,
  }),

  [requestSuccess(UPDATE_USER_REQUEST)]: (state, { payload }) => {
    const index = state.users.findIndex(user => user.id === payload.id);
    if (index >= 0) state.users[index] = payload;
    state.user = payload;
    state.status = requestSuccess(UPDATE_USER_REQUEST);
    state.error = null;
  },

  [requestFail(UPDATE_USER_REQUEST)]: (state, { payload }) => ({
    ...state,
    user: null,
    status: requestFail(UPDATE_USER_REQUEST),
    error: payload.error,
  }),

  [requestSuccess(DELETE_USER_REQUEST)]: (state, { payload }) => {
    state.users = state.users.filter(user => user.id !== payload.id);
    state.status = requestSuccess(DELETE_USER_REQUEST);
    state.error = null;
  },

  [requestFail(DELETE_USER_REQUEST)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DELETE_USER_REQUEST),
    error: payload.error,
  }),
});
