import {
  FETCH_CHART_DATA,
  FETCH_CHART_DATA_SUCCESS,
  FETCH_CHART_DATA_ERROR,
} from './../actions/main.actions';
import { put, takeEvery } from 'redux-saga/effects';
import { api } from 'redux-middleware-api-fetch';

export function* fetchChartData() {
  yield put(api.get('wcstatuses/', {
    success: FETCH_CHART_DATA_SUCCESS,
    failure: FETCH_CHART_DATA_ERROR,
  }));
}

export function* mainSaga() {
  yield takeEvery(FETCH_CHART_DATA, fetchChartData);
}
