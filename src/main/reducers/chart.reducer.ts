import * as moment from 'moment';
import { SELECT_DATE } from '../actions/chart.actions';

export interface Action {
  type: string;
  payload: SelectedDate;
}

export interface SelectedDate {
  date: moment.Moment;
  color: string;
}

export interface ChartState {
  selectedDates: SelectedDate[];
  dataSets: any;
}

export const chartInitialState: ChartState = {
  selectedDates: [{
    date: moment(),
    color: 'rgba(255,99,132,'
  }],
  dataSets: {},
};

export function selectDateReducer(state: ChartState, action: Action): ChartState {
  return {
    ...state,
    selectedDates: [ ...state.selectedDates, action.payload ],
    dataSets: {
      ...state.dataSets
    }
  };
}


function selectReducer(actionType: string) {
  const actionToReducerMap = {
    [SELECT_DATE]: selectDateReducer,
  };

  const stateChangingFn = actionToReducerMap[actionType];

  return stateChangingFn != null ? stateChangingFn : (state: ChartState) => state;
}

export function chartReducer(state = chartInitialState, action: Action): ChartState {
  return selectReducer(action.type)(state, action);
}
