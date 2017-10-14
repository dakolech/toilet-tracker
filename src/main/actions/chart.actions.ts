import { SelectedDate } from '../reducers/chart.reducer';

export const SELECT_DATE = '[Chart] SELECT_DATE';

export const selectDate = (payload: SelectedDate) => ({ type: SELECT_DATE, payload });
