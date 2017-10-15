import { put, takeEvery } from 'redux-saga/effects';
import { environment } from '../../environments/environment';
import { Action, SummaryReq } from './../reducers/summary.reducer';
import {
  GET_SUMMARY,
  getSummarySuccess,
} from './../actions/summary.actions';

export function* fetchSummaryData(action: Action) {
  let successPayload;
  const payload: SummaryReq = action.payload;
  const startDate = payload.startDate.toISOString();
  const endDate = payload.endDate.toISOString();
  const url = `${environment.URL}wcstatuses?date-from=${startDate}&date-to=${endDate}`;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const response = yield fetch(url, { headers, method: 'GET' });

  try {
    successPayload = yield response.json();
  } catch (err) {
    console.error('Error fetching summary:', err);
  }

  yield put(getSummarySuccess(successPayload));
}

export function* summarySaga() {
  yield takeEvery(GET_SUMMARY, fetchSummaryData);
}
