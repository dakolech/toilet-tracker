import {
  FETCH_CHART_DATA,
  FETCH_CHART_DATA_SUCCESS,
  // FETCH_CHART_DATA_ERROR,
} from './../actions/main.actions';
import { put, takeEvery } from 'redux-saga/effects';
import { WCStatus } from '../reducers/main.reducer';
import { savePreparedData } from '../actions/chart.actions';
import { environment } from '../../environments/environment';
import * as moment from 'moment';

export function* fetchChartData() {
  const response = yield fetch(environment.URL + 'wcstatuses/', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })

  let json;
  let error;

  try {
    json = yield response.json();
  } catch (_) {
    error = `${response.status} ${response.statusText}`;
  }

  yield put({
    payload: json,
    type: FETCH_CHART_DATA_SUCCESS,
  });

  // yield put(api.get('wcstatuses/', {
  //   success: FETCH_CHART_DATA_SUCCESS,
  //   failure: FETCH_CHART_DATA_ERROR,
  // }));
}

function* prepareData(action: any) {
  // const state: AppState = yield select();
  const data: WCStatus[] = action.payload.data.map((item: any) => item.attributes);

  const preparedData = data
    .map(datum => moment(datum['created-at']))
    .reduce((acc, date) => {
      const stringDate = date.format('dddd, MMMM Do YYYY');
      if (!acc[stringDate]) {
        acc[stringDate] = Array.from({ length: 24 }).fill(0);
        acc[stringDate][date.hour()] += 1;
      } else {
        acc[stringDate][date.hour()] += 1;
      }
      return acc;
    }, {});

  yield put(savePreparedData(preparedData));
}

export function* mainSaga() {
  yield takeEvery(FETCH_CHART_DATA, fetchChartData);
  yield takeEvery(FETCH_CHART_DATA_SUCCESS, prepareData);
}
