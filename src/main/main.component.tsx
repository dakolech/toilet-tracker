import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import './main.css';

import { fetchData } from './actions/main.actions';
import { AppState } from '../configureStore';
import { WCStatus } from './reducers/main.reducer';
import { ChartComponent } from './components/chart.component';
import { DatePickerComponent } from './components/datePicker.component';
import { SummaryComponent } from './components/summary.component';
import { SelectedDate } from './reducers/chart.reducer';

interface Props {
  model: WCStatus[];
  selectedDates: SelectedDate[];
  dataSets: any;
}

function Main(props: Props) {
  return (
    <main>
      <div className="container">
        <DatePickerComponent data={props.model} />
        <ChartComponent data={props.model} dates={props.selectedDates} dataSets={props.dataSets} />
        <SummaryComponent />
      </div>
    </main>
  );
}

const mapStateToProps = (state: AppState) => ({
  model: state.main.fetchChartData.model,
  selectedDates: state.chart.selectedDates,
  dataSets: state.chart.dataSets,
});
const mapDispatchToProps = (dispatch: Dispatch<AppState>) => bindActionCreators({ fetchData }, dispatch);

export const MainComponent = connect(mapStateToProps, mapDispatchToProps)(Main);
