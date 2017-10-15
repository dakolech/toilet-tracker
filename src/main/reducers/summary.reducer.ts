import * as moment from 'moment';
import { pathOr } from 'ramda';
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

type SummaryReducer = (state: SummaryState, action: Action) => SummaryState;

export interface ActionToReducerMap {
  [key: string]: SummaryReducer;
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

const selectStartDateReducer: SummaryReducer = (state, action) => ({
  ...state,
  dates: {
    ...state.dates,
    startDate: action.payload,
  },
});

const selectEndDateReducer: SummaryReducer = (state, action) => ({
  ...state,
  dates: {
    ...state.dates,
    endDate: action.payload,
  },
});

const getSummaryReducer: SummaryReducer = (state, action) => ({
  ...state,
  getSummary: {
    error: false,
    pending: true,
    model: state.getSummary.model,
  },
});

const getSummarySuccessReducer: SummaryReducer = (state, action) => ({
  ...state,
  getSummary: {
    error: false,
    pending: false,
    model: {
      totalMin: pathOr(0, [ 'payload', 'meta', 'total-min' ], action),
    },
  },
});

const getSummaryErrorReducer: SummaryReducer = (state, action) => ({
  ...state,
  getSummary: {
    error: true,
    pending: false,
    model: state.getSummary.model,
  },
});

const actionToReducerMap = {
  [SELECT_START_DATE]: selectStartDateReducer,
  [SELECT_END_DATE]: selectEndDateReducer,
  [GET_SUMMARY]: getSummaryReducer,
  [GET_SUMMARY_SUCCESS]: getSummarySuccessReducer,
  [GET_SUMMARY_ERROR]: getSummaryErrorReducer,
};

const selectReducer = (actionToReducerObj: ActionToReducerMap, actionType: string): SummaryReducer => {
  const selectedReducer: SummaryReducer = actionToReducerObj[actionType];
  const identityReducer: SummaryReducer = (state, _) => state;
  return selectedReducer != null ? selectedReducer : identityReducer;
};

export function summaryReducer(state = summaryInitialState, action: Action): SummaryState {
  const reducer = selectReducer(actionToReducerMap, action.type);
  return reducer(state, action);
}
