import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { AppState } from '../../configureStore';
import { selectStartDate, selectEndDate, getSummary } from '../actions/summary.actions';
import { Action, SummaryReq, momentDate } from '../reducers/summary.reducer';

interface Props {
  totalMin: string;
  dates: {
    startDate: momentDate;
    endDate: momentDate;
  };
  getSummary: (payload: SummaryReq) => Action;
  selectStartDate: (payload: momentDate) => Action;
  selectEndDate: (payload: momentDate) => Action;
}

export function SummaryComp(props: Props) {
  const dispatchGetSummary = () => props.getSummary(props.dates);

  return (
    <div className="row">
      <h4>Summary</h4>
      <div className="dates-container">
        <span className="start-date">
          Start date:
          <DatePicker
            selected={props.dates.startDate}
            onChange={props.selectStartDate}
          />
        </span>
        <span className="end-date">
          End date:
          <DatePicker
            selected={props.dates.endDate}
            onChange={props.selectEndDate}
          />
        </span>
      </div>
      <h5 className="total-time">Total time: {props.totalMin} min</h5>
      <button
        type="button"
        className="btn btn-primary"
        onClick={dispatchGetSummary}
      >
        Get Summary
      </button>
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  totalMin: String(state.summary.getSummary.model.totalMin),
  dates: state.summary.dates,
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>) =>
  bindActionCreators({ getSummary, selectStartDate, selectEndDate }, dispatch);

export const SummaryComponent = connect(mapStateToProps, mapDispatchToProps)(SummaryComp);
