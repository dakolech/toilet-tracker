import * as moment from 'moment';
import {
  SELECT_START_DATE,
  SELECT_END_DATE,
  GET_SUMMARY,
  GET_SUMMARY_SUCCESS,
  GET_SUMMARY_ERROR,
} from '../actions/summary.actions';

export type momentDate = moment.Moment;

export interface Action {
  type: string;
  payload?: any;
}

export interface Summary {
  totalMin: number;
}

export interface SummaryReq {
  startDate: momentDate;
  endDate: momentDate;
}

export interface ActionToReducerMap {
  [key: string]: (state: SummaryState, action: Action) => SummaryState;
}

export interface SummaryState {
  getSummary: {
    error: boolean;
    pending: boolean;
    model: Summary;
  };
  dates: {
    startDate: momentDate;
    endDate: momentDate;
  };
}

export const summaryInitialState: SummaryState = {
  getSummary: {
    error: false,
    pending: false,
    model: {
      totalMin: 0,
    },
  },
  dates: {
    startDate: moment(),
    endDate: moment(),
  },
};

function selectStartDateReducer(state: SummaryState, action: Action): SummaryState {
  return {
    ...state,
    dates: {
      ...state.dates,
      startDate: action.payload,
    },
  };
}

function selectEndDateReducer(state: SummaryState, action: Action): SummaryState {
  return {
    ...state,
    dates: {
      ...state.dates,
      endDate: action.payload,
    },
  };
}

function getSummaryReducer(state: SummaryState, action: Action): SummaryState {
  return {
    ...state,
    getSummary: {
      error: false,
      pending: true,
      model: state.getSummary.model,
    },
  };
}

function getSummarySuccessReducer(state: SummaryState, action: Action): SummaryState {
  const totalMin = action.payload.meta['total-min'];
  return {
    ...state,
    getSummary: {
      error: false,
      pending: false,
      model: { totalMin },
    },
  };
}

function getSummaryErrorReducer(state: SummaryState, action: Action): SummaryState {
  return {
    ...state,
    getSummary: {
      error: true,
      pending: false,
      model: state.getSummary.model,
    },
  };
}

const actionToReducerMap: ActionToReducerMap = {
  [SELECT_START_DATE]: selectStartDateReducer,
  [SELECT_END_DATE]: selectEndDateReducer,
  [GET_SUMMARY]: getSummaryReducer,
  [GET_SUMMARY_SUCCESS]: getSummarySuccessReducer,
  [GET_SUMMARY_ERROR]: getSummaryErrorReducer,
};

function selectReducer(actionToReducerObj: ActionToReducerMap, actionType: string) {
  const stateChangingFn = actionToReducerObj[actionType];
  return stateChangingFn != null ? stateChangingFn : (state: SummaryState, _: Action) => state;
}

export function summaryReducer(state = summaryInitialState, action: Action): SummaryState {
  const reducer = selectReducer(actionToReducerMap, action.type);
  return reducer(state, action);
}
