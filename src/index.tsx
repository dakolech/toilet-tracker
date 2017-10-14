import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { configureStore } from './configureStore';
import { Provider } from 'react-redux';
import { fetchData } from './main/actions/main.actions';

const store = configureStore();

store.dispatch(fetchData());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();
