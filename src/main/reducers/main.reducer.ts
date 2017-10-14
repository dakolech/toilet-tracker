import {
  FETCH_CHART_DATA,
  FETCH_CHART_DATA_SUCCESS,
  FETCH_CHART_DATA_ERROR,
} from './../actions/main.actions';

export interface Action {
  type: string;
  payload?: any;
}

export interface WCStatus {
  'is-busy': boolean;
  'created-at': string;
}

export interface Data {
  id: string;
  type: string;
  attributes: WCStatus;
}

export interface MainStateItem {
  error: boolean;
  model: WCStatus[];
  pending: boolean;
}

export interface MainState {
  fetchChartData: MainStateItem;
}

export const mainInitialState: MainState = {
  fetchChartData: {
    error: false,
    model: [],
    pending: false,
  },
};

export function fetchChartDataReducer(state: MainState, action: Action): MainState {
  return {
    ...state,
    fetchChartData: {
      error: false,
      model: state.fetchChartData.model,
      pending: true,
    },
  };
}

export function fetchChartDataSuccessReducer(state: MainState, action: Action): MainState {
  const data: Data[] = action.payload.data;

  const model: WCStatus[] = data.map(({ attributes }) => attributes);

  return {
    ...state,
    fetchChartData: {
      model,
      error: false,
      pending: false,
    },
  };
}

export function fetchChartDataErrorReducer(state: MainState, action: Action): MainState {
  return {
    ...state,
    fetchChartData: {
      error: true,
      model: state.fetchChartData.model,
      pending: false,
    },
  };
}

function selectReducer(actionType: string) {
  const actionToReducerMap = {
    [FETCH_CHART_DATA]: fetchChartDataReducer,
    [FETCH_CHART_DATA_SUCCESS]: fetchChartDataSuccessReducer,
    [FETCH_CHART_DATA_ERROR]: fetchChartDataErrorReducer,
  };

  const stateChangingFn = actionToReducerMap[actionType];

  return stateChangingFn != null ? stateChangingFn : (state: MainState) => state;
}

export function mainReducer(state = mainInitialState, action: Action): MainState {
  return selectReducer(action.type)(state, action);
}
