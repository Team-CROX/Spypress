import React, { Component } from "react";
import 'chartjs-plugin-streaming';
import { Line } from 'chart.js';

import { Bubble } from 'react-chartjs-2';
// import 'chartjs-plugin-streaming';

class StreamingChart extends Component {

render(){
  return (
    
    <Bubble
    data={{
      datasets: [{
        label: 'demo',
        backgroundColor: 'rgba(75,192,192,1)',
        data: []
      }]
    }}
    options={{
      plugins: {
        streaming: {
          onRefresh: function(chart) {
            chart.data.datasets[0].data.push({
              x: Date.now(),
              y: Math.random() * 100,
            });
          },
          delay: 500,
          refresh: 500,
          frameRate: 30,
          duration: 900000 // 3600000 = 1hour
        }
      },
      scales: {
        xAxes: [{
          type: 'realtime'
        }]
      }
    }}
    />
    )
  }
}
  
  // class StreamingChart extends Component {
  // constructor(props) {
  //   super(props)
  // }
  // render() {
  //   return (

  //     <Line

  //       data={{   
  //         datasets: [{
  //           data: [3,6,8],
  //           label: 'Dataset 1',
  //           borderColor: 'rgb(255, 99, 132)',
  //           backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //           lineTension: 0,
  //           borderDash: [8, 4]
  //         }]
  //       }}

  //       options={{
  //         scales: {
  //           xAxes: [{
  //             realtime: {
  //               onRefresh: function(chart) {
  //                 chart.data.datasets.forEach(function(dataset) {
  //                   dataset.data.push({
  //                     x: Date.now(),
  //                     y: Math.random()
  //                   });
  //                 });
  //               },
  //               delay: 2000
  //             }
  //           }]
  //         }
  //       }}

  //     />

  //   );
  // }
  // render() {
  //   return (null);
  // }
// }

export default StreamingChart;