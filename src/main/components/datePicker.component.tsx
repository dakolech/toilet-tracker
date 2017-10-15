import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { AppState } from '../../configureStore';
import { WCStatus } from '../reducers/main.reducer';
import { selectDate } from '../actions/chart.actions';
import { Action, SelectedDate } from '../reducers/chart.reducer';
import * as moment from 'moment';
import { uniq } from 'ramda';
// import { SliderPicker } from 'react-color';
import './datePicker.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface OwnProps {
  data: WCStatus[];
}

interface StateProps {
  selectDate: (payload: SelectedDate) => Action;
  selectedDates: moment.Moment;
}

class DatePickerLocal extends React.Component<OwnProps&StateProps> {

  handleChange(date: any): any {
    this.props.selectDate({
      date: moment(date),
      color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, `,
    });
  }

  render(): any {
    const dates = uniq(
      this.props.data.map(item => moment(item['created-at']))
    );

    return (
      <div>
        <span>Select date to show: </span>
        <DatePicker
          selected={moment()}
          onChange={this.handleChange.bind(this)}
          includeDates={dates}
        />
        {/*<SliderPicker onChangeComplete={this.handleChangeComplete} />*/}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): any => ({ selectedDates: state.chart.selectedDates });
const mapDispatchToProps = (dispatch: Dispatch<AppState>) => bindActionCreators({ selectDate }, dispatch);

export const DatePickerComponent = connect<StateProps, any, any>(mapStateToProps, mapDispatchToProps)(DatePickerLocal);
