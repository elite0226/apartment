import { takeLatest } from 'redux-saga/effects';

import { GET_APARTMENTS_REQUEST } from '../types';
import request  from '../../utils/request';

const getApartments = request({
  type: GET_APARTMENTS_REQUEST,
  method: 'get',
  path: '/api/apartment/',
});

export default function* authSaga() {
  yield takeLatest(GET_APARTMENTS_REQUEST, getApartments);
}
