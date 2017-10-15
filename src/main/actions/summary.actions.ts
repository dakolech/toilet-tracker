import { Summary, SummaryReq } from './../reducers/summary.reducer';
import { momentDate } from '../reducers/summary.reducer';

export const SELECT_START_DATE =
  '[Main-Summary] Select start date';
export const SELECT_END_DATE =
  '[Main-Summary] Select end date';

export const GET_SUMMARY =
  '[Main-Summary] Get summary';
export const GET_SUMMARY_SUCCESS =
  '[Main-Summary] Get summary success';
export const GET_SUMMARY_ERROR =
  '[Main-Summary] Get summary error';

export const selectStartDate =
  (payload: momentDate) => ({ payload, type: SELECT_START_DATE });
export const selectEndDate =
  (payload: momentDate) => ({ payload, type: SELECT_END_DATE });

export const getSummary =
  (payload: SummaryReq) => ({ payload, type: GET_SUMMARY });
export const getSummarySuccess =
  (payload: Summary) => ({ payload, type: GET_SUMMARY_SUCCESS });
export const getSummaryError =
  (payload: any) => ({ payload, type: GET_SUMMARY_ERROR });
