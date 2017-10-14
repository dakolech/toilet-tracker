import * as React from 'react';
import './App.css';
import { CounterComponent } from './counter/components/counter.component';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

class App extends React.Component {
  render() {
    return (
      <CounterComponent />
    );
  }
}

export default App;
