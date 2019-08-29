import React, { Component } from "react";
import 'chartjs-plugin-streaming';
import { Line } from 'react-chartjs-2';

import { Bubble } from 'react-chartjs-2';
// import 'chartjs-plugin-streaming';

class StreamingChart extends Component {
  constructor(props) {
    super(props)
    this.messages = this.messages.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState){
    return false;
  }

  messages() {return this.props.messageArr}
  render(){
    return (
      
      <Line
        data={{
          datasets: [
            {
              label: 'systemUsage',
              borderColor: '#9f5a70',
              fill: false,
              data: []
            },
            {
              label: 'applicationUsage',
              borderColor: '#398eba',
              fill: false,
              data: []
            },
            {
              label: 'elapsedTime',
              borderColor: '#679d70',
              fill: false,
              data: []
            },
          ]
        }}
        options={{
          plugins: {
            streaming: {
              onRefresh: function(chart) {
                let messageArr = JSON.parse(JSON.parse(globalThis.localStorage["persist:root"]).messageArray);
                // datasets[0] is  systemUsage
                chart.data.datasets[0].data.push({
                  x: Date.now(),
                  y: messageArr[messageArr.length - 1].systemUsage,
                });
                // datasets[1] is  applicationUsage
                chart.data.datasets[1].data.push({
                  x: Date.now(),
                  y: messageArr[messageArr.length - 1].applicationUsage,
                });
                // datasets[2] is  elapsedTime
                chart.data.datasets[2].data.push({
                  x: Date.now(),
                  y: messageArr[messageArr.length - 1].elapsedTime,
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
              type: 'realtime',
              realtime: {
                duration: 20000,
                refresh: 1000,
                delay: 2000,
                // onRefresh: onRefresh
              }
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