import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchData } from './actions/main.actions';
import { AppState } from '../configureStore';
import { WCStatus } from './reducers/main.reducer';
import { ChartComponent } from './components/chart.component';

interface Props {
  model: WCStatus[];
}

function Main(props: Props) {
  return (<ChartComponent data={props.model} />);
}

const mapStateToProps = (state: AppState) => ({ model: state.main.fetchChartData.model });
const mapDispatchToProps = (dispatch: Dispatch<AppState>) => bindActionCreators({ fetchData }, dispatch);

export const MainComponent = connect(mapStateToProps, mapDispatchToProps)(Main);
