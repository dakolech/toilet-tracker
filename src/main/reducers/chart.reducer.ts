import * as moment from 'moment';
import { CHANGE_COLOR, PREPARE_DATA, SELECT_DATE } from '../actions/chart.actions';

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
    date: moment('10.08.2017'),
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

export function savePreparedData(state: ChartState, action: Action): ChartState {
  return {
    ...state,
    dataSets: action.payload
  };
}

export function changeColor(state: ChartState, action: Action): ChartState {
  return {
    ...state,
    selectedDates: state.selectedDates.map(item => {
      if (item.date.format('dddd, MMMM Do YYYY') === action.payload.date.format('dddd, MMMM Do YYYY')) {
        item.color = action.payload.color;
      }
      return item;
    })
  };
}

function selectReducer(actionType: string) {
  const actionToReducerMap = {
    [SELECT_DATE]: selectDateReducer,
    [PREPARE_DATA]: savePreparedData,
    [CHANGE_COLOR]: changeColor,
  };

  const stateChangingFn = actionToReducerMap[actionType];

  return stateChangingFn != null ? stateChangingFn : (state: ChartState) => state;
}

export function chartReducer(state = chartInitialState, action: Action): ChartState {
  return selectReducer(action.type)(state, action);
}
