import React, { Component } from "react";
import 'chartjs-plugin-streaming';
import { Line } from 'react-chartjs-2';

import { Bubble } from 'react-chartjs-2';
// import 'chartjs-plugin-streaming';

class StreamingChart extends Component {
  constructor(props) {
    super(props)
    // this.onRef = this.onRef.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState){
    return false;
  }

  render(){
    return (
      
      <Line
        data={{
          datasets: [
            {
              label: 'removeme',
              borderColor: 'rgba(0,0,0,0)',
              fill: false,
              pointRadius: 10,
              pointBackgroundColor: '#9f5a70',

              data: []
            },
            {
              label: 'removeme',
              borderColor: 'rgba(0,0,0,0)',
              fill: false,
              pointRadius: 10,
              pointBackgroundColor: '#398eba',

              data: []
            },
            {
              label: 'removeme',
              borderColor: 'rgba(0,0,0,0)',
              fill: false,
              pointRadius: 10,
              pointBackgroundColor: '#679d70',

              data: []
            },
            {
              label: 'systemUsage',
              fill: false,
              borderColor: '#9f5a70',
              pointRadius: 0,
              pointBackgroundColor: 'rgba(0,0,0,0)',

              data: []
            },
            {
              label: 'applicationUsage',
              fill: false,
              borderColor: '#398eba',
              pointRadius: 0,
              pointBackgroundColor: 'rgba(0,0,0,0)',

              data: []
            },
            {
              label: 'elapsedTime',
              fill: false,
              borderColor: '#679d70',
              pointRadius: 0,
              pointBackgroundColor: 'rgba(0,0,0,0)',

              data: []
            },
          ]
        }}
        options={{
          plugins: {
            streaming: {
              onRefresh: function(chart) {
                let messageArr = JSON.parse(JSON.parse(globalThis.localStorage["persist:root"]).messageArray);
                let latestSystemUsage = messageArr[messageArr.length - 1].systemUsage;
                let latestApplicationUsage = messageArr[messageArr.length - 1].applicationUsage;
                let latestElapsedTime = messageArr[messageArr.length - 1].elapsedTime;

                // if we have only one message
                if (messageArr.length === 1){
                  this.setState({
                    systemUsageAvg: latestSystemUsage,
                    systemUsageSum: latestSystemUsage,
                    applicationUsageAvg: latestApplicationUsage,
                    applicationUsageSum: latestApplicationUsage,
                    elapsedTimeAvg: latestElapsedTime,
                    elapsedTimeSum: latestElapsedTime,
                  })
                }
                // if we have more than one message and a new unplotted message
                if(this.state && this.state.messageCount && messageArr.length>this.state.messageCount){
                  //calculate new avgs
                  this.setState({
                    systemUsageAvg: ((this.state.systemUsageSum + latestSystemUsage)/(this.state.messageCount +1)),
                    systemUsageSum: this.state.systemUsageSum + latestSystemUsage,
                    applicationUsageAvg: ((this.state.applicationUsageSum + latestApplicationUsage)/(this.state.messageCount +1)),
                    applicationUsageSum: this.state.applicationUsageSum + latestApplicationUsage,
                    elapsedTimeAvg: ((this.state.elapsedTimeSum + latestElapsedTime)/(this.state.messageCount +1)),
                    elapsedTimeSum: this.state.elapsedTimeSum + latestElapsedTime,
                  })
                  
                  // plot new data Dots
                  
                  // datasets[0] is  systemUsage
                  chart.data.datasets[0].data.push({
                    x: Date.now(),
                    y: latestSystemUsage,
                  });

                  // datasets[1] is  applicationUsage
                  chart.data.datasets[1].data.push({
                    x: Date.now(),
                    y: latestApplicationUsage,
                  });

                  // datasets[2] is  elapsedTime
                  chart.data.datasets[2].data.push({
                    x: Date.now(),
                    y: latestElapsedTime,
                  });
                }

                // regardless of whether we have a new message, plot the current avgs
                  // datasets[3] is  systemUsageAvg
                chart.data.datasets[3].data.push({
                  x: Date.now(),
                  y: latestSystemUsage,
                });

                // datasets[4] is  applicationUsageAvg
                chart.data.datasets[4].data.push({
                  x: Date.now(),
                  y: latestApplicationUsage,
                });

                // datasets[5] is  elapsedTimeAvg
                chart.data.datasets[5].data.push({
                  x: Date.now(),
                  y: latestElapsedTime,
                });

                this.setState({messageCount: messageArr.length});

              }.bind(this),
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
          },
          legend: {
            labels: {
              filter: function(item, chart) {
                // Logic to remove a particular legend item goes here
                return !item.text.includes('removeme');
              }
            }
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