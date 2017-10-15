import * as React from 'react';
import { WCStatus } from '../reducers/main.reducer';
import { Line } from 'react-chartjs-2';
import * as moment from 'moment';
import { SelectedDate } from '../reducers/chart.reducer';

interface Props {
  data: WCStatus[];
  dates: SelectedDate[];
  dataSets: any;
}

const hours = Array.from({ length: 24 }, (_,x) => x).map(item => item.toString());

export function ChartComponent(props: Props) {
  const datasets = props.dates
    .map((item) => {
      return {
        data: props.dataSets[item.date.format('dddd, MMMM Do YYYY')],
        date: item,
      };
    })
    .map(item => {
      return ({
        label: moment(item.date.date).format('dddd, MMMM Do YYYY'),
        data: item.data,
        borderColor: `${item.date.color} 1)`,
        backgroundColor: `${item.date.color} 0.2)`,
        borderWidth: 1
      })
    });
  const chartData = {
    labels: hours,

    datasets,
  };

  return (
    <Line data={chartData} width={600} height={250}/>
  );
}
