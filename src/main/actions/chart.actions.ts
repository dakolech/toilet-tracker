import { SelectedDate } from '../reducers/chart.reducer';

export const SELECT_DATE = '[Chart] select date';
export const PREPARE_DATA = '[Chart] Prepare data';
export const CHANGE_COLOR = '[Chart] Change color';

export const selectDate = (payload: SelectedDate) => ({ type: SELECT_DATE, payload });
export const savePreparedData = (payload: any) => ({ type: PREPARE_DATA, payload });
export const changeColor = (payload: any) => ({ type: CHANGE_COLOR, payload });