import * as React from 'react';
import { WCStatus } from '../reducers/main.reducer';
import { Line } from 'react-chartjs-2';
import * as moment from 'moment';
import { SelectedDate } from '../reducers/chart.reducer';
// const icon = require('../../poop.png');
const icon = new Image();
icon.src ='https://cdn.shopify.com/s/files/1/1061/1924/products/Poop_Emoji_7b204f05-eec6-4496-91b1-351acc03d2c7_large.png?v=1480481059';
icon.height = 20;
icon.width = 20;

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
        borderWidth: 1,
        pointStyle: icon,
      })
    });
  const chartData = {
    labels: hours,

    datasets,
  };

  return (
    <Line data={chartData as any} width={600} height={250}/>
  );
}
