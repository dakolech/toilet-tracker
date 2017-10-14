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

interface OwnProps {
  data: WCStatus[];
}

interface StateProps {
  selectDate: (payload: SelectedDate) => Action;
  selectedDates: moment.Moment;
}

class DatePicker extends React.Component<OwnProps&StateProps> {

  handleChangeComplete() {
  }

  handleChange(e: any) {
    this.props.selectDate({
      date: moment(e.target.value),
      color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, `,
    });
  }

  render() {
    const dates = uniq(
      this.props.data.map(item => moment(item['created-at']))
    );

    return (
      <div>
        <select onChange={this.handleChange.bind(this)}>>
          {dates.map((date, index) => (
            <option key={index} value={date.toISOString()}>{date.format('dddd, MMMM Do YYYY')}</option>
          ))}
        </select>
        {/*<SliderPicker onChangeComplete={this.handleChangeComplete} />*/}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): any => ({ selectedDates: state.chart.selectedDates });
const mapDispatchToProps = (dispatch: Dispatch<AppState>) => bindActionCreators({ selectDate }, dispatch);

export const DatePickerComponent = connect<StateProps, any, any>(mapStateToProps, mapDispatchToProps)(DatePicker);
