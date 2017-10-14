import * as React from 'react';
import { WCStatus } from '../reducers/main.reducer';
import { Line } from 'react-chartjs-2';
import * as moment from 'moment';

interface Props {
  data: WCStatus[];
}

// const chartOptions = {
//   scales: {
//     yAxes: [{
//       ticks: {
//         beginAtZero:true
//       }
//     }]
//   }
// };

const hours = Array.from({ length: 24 }, (_,x) => x).map(item => item.toString());


export function ChartComponent(props: Props) {

  const data = props.data.reduce((acc: number[], item: WCStatus) => {
    acc[moment(item['created-at']).hour()] += 1;
    return acc;
  }, Array.from({ length: 24 }).fill(0));

  const chartData = {
    labels: hours,
    datasets: [{
      label: '# of Votes',
      data,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };

  return (
    <Line data={chartData} width={600} height={250}/>
  );
}
