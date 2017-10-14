import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchData } from './actions/main.actions';
import { AppState } from '../configureStore';
import { WCStatus } from './reducers/main.reducer';

interface Props {
  model: WCStatus[];
}

function Main(props: Props) {
  return (<div>{JSON.stringify(props.model)}</div>);
}

const mapStateToProps = (state: AppState) => ({ model: state.main.fetchChartData.model });
const mapDispatchToProps = (dispatch: Dispatch<AppState>) => bindActionCreators({ fetchData }, dispatch);

export const MainComponent = connect(mapStateToProps, mapDispatchToProps)(Main);
