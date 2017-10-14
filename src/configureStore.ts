import { MainState, mainInitialState, mainReducer } from './main/reducers/main.reducer';
import { mainSaga } from './main/sagas/main.sagas';
import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import reduxSaga from 'redux-saga';
import { fork } from 'redux-saga/effects';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
import { apiMiddlewareCreator } from 'redux-middleware-api-fetch';

import { environment } from './environments';
import { AppState } from './configureStore';
import { chartInitialState, chartReducer, ChartState } from './main/reducers/chart.reducer';

const apiMiddleware = apiMiddlewareCreator({
  baseUrl: environment.URL,
  headers: {},
});

export const history = createBrowserHistory();
const sagaMiddleware = reduxSaga();

export interface AppState {
  main: MainState;
  chart: ChartState;
}

export function configureStore() {
  const storeKey = 'react-starter';

  const initialState = {
    main: mainInitialState,
    chart: chartInitialState,
  };

  const reducer = storage.reducer(combineReducers({
    router: routerReducer,
    main: mainReducer,
    chart: chartReducer,
  }));

  const devTools = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';
  const composeEnhancers = window[devTools] || compose;

  const engine = createEngine(storeKey);
  const middleware = storage.createMiddleware(engine);
  const createStoreWithMiddleware = composeEnhancers(
    applyMiddleware(...[
      routerMiddleware(history),
      sagaMiddleware,
      middleware,
      apiMiddleware,
    ]))(createStore);

  const load = storage.createLoader(engine);

  const cachedStore = false;

  const store = initialState && !cachedStore ?
    createStoreWithMiddleware(reducer, initialState) :
    createStoreWithMiddleware(reducer);

  if (cachedStore) {
    load(store);
  }

  function* rootSaga() {
    yield [
      fork(mainSaga),
    ];
  }

  sagaMiddleware.run(rootSaga);

  return store;
}
