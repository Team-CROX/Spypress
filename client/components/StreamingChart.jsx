import React, { Component } from "react";
import 'chartjs-plugin-streaming';
import { Line } from 'react-chartjs-2';

import { Bubble } from 'react-chartjs-2';
// import 'chartjs-plugin-streaming';

class StreamingChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      systemUsageAvg: this.props && this.props.messageArr && this.props.messageArr.systemUsage ? this.props.messageArr.systemUsage : 0,
      systemUsageSum: this.props && this.props.messageArr && this.props.messageArr.systemUsage ? this.props.messageArr.systemUsage : 0,
      applicationUsageAvg: this.props && this.props.messageArr && this.props.messageArr.applicationUsage ? this.props.messageArr.applicationUsage : 0,
      applicationUsageSum: this.props && this.props.messageArr && this.props.messageArr.applicationUsage ? this.props.messageArr.applicationUsage : 0,
      elapsedTimeAvg: this.props && this.props.messageArr && this.props.messageArr.elapsedTime ? this.props.messageArr.elapsedTime : 0,
      elapsedTimeSum: this.props && this.props.messageArr && this.props.messageArr.elapsedTime ? this.props.messageArr.elapsedTime : 0,
      heapPercAvg: 0,
      heapPercSum: 0,
      messageCount: this.props && this.props.messageArr ? this.props.messageArr.length : 0
    }
  }
  shouldComponentUpdate(nextProps, nextState){
    return false;
  }

  render(){
    console.log("RENDER");
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
              label: 'removeme',
              borderColor: 'rgba(0,0,0,0)',
              fill: false,
              pointRadius: 10,
              pointBackgroundColor: '#d1552e',

              data: []
            },
            {
              label: 'System Usage',
              fill: false,
              borderColor: '#9f5a70',
              pointRadius: 0,
              pointBackgroundColor: 'rgba(0,0,0,0)',

              data: []
            },
            {
              label: 'Application Usage',
              fill: false,
              borderColor: '#398eba',
              pointRadius: 0,
              pointBackgroundColor: 'rgba(0,0,0,0)',

              data: []
            },
            {
              label: 'Elapsed Time',
              fill: false,
              borderColor: '#679d70',
              pointRadius: 0,
              pointBackgroundColor: 'rgba(0,0,0,0)',

              data: []
            },
            {
              label: '% of Heap Used',
              fill: false,
              borderColor: '#d1552e',
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

                let latestSystemUsage;
                let latestApplicationUsage;
                let latestElapsedTime;
                let latestHeapPerc;
                if (messageArr.length > 0){
                  latestSystemUsage = messageArr[messageArr.length - 1].systemUsage;
                  latestApplicationUsage = messageArr[messageArr.length - 1].applicationUsage;
                  latestElapsedTime = messageArr[messageArr.length - 1].elapsedTime;
                  
                  
                  let heapUsed = messageArr[messageArr.length - 1].processMemoryUsage.heapUsed;
                  let heapTotal = messageArr[messageArr.length - 1].processMemoryUsage.heapTotal;
                  latestHeapPerc = Math.floor((heapUsed/heapTotal)*100);
                }

                

                // if we have only one message
                if (messageArr.length === 1){
                  this.setState({
                    systemUsageAvg: latestSystemUsage,
                    systemUsageSum: latestSystemUsage,
                    applicationUsageAvg: latestApplicationUsage,
                    applicationUsageSum: latestApplicationUsage,
                    elapsedTimeAvg: latestElapsedTime,
                    elapsedTimeSum: latestElapsedTime,
                    heapPercAvg: latestHeapPerc,
                    heapPercSum: latestHeapPerc,
                  })
                }
                //calculate new avgs
                let systemUsageAvg = ((this.state.systemUsageSum + latestSystemUsage)/(this.state.messageCount +1));
                let applicationUsageAvg = ((this.state.applicationUsageSum + latestApplicationUsage)/(this.state.messageCount +1));
                let elapsedTimeAvg = ((this.state.elapsedTimeSum + latestElapsedTime)/(this.state.messageCount +1));
                let heapPercAvg = ((this.state.heapPercSum + latestHeapPerc)/(this.state.messageCount +1));
                //calculate new sums
                let systemUsageSum =  this.state.systemUsageSum + latestSystemUsage;
                let applicationUsageSum =  this.state.applicationUsageSum + latestApplicationUsage;
                let elapsedTimeSum =  this.state.elapsedTimeSum + latestElapsedTime;
                let heapPercSum =  this.state.heapPercSum + latestHeapPerc;

                // if we have more than one message and a new unplotted message
                if(this.state && this.state.messageCount && messageArr.length>this.state.messageCount){

                  this.setState({
                    systemUsageAvg: systemUsageAvg,
                    systemUsageSum:systemUsageSum,
                    applicationUsageAvg: applicationUsageAvg,
                    applicationUsageSum:applicationUsageSum,
                    elapsedTimeAvg: elapsedTimeAvg,
                    elapsedTimeSum:elapsedTimeSum,
                    heapPercAvg: heapPercAvg,
                    heapPercSum:heapPercSum,
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

                    // datasets[3] is  heapPerc
                    chart.data.datasets[3].data.push({
                      x: Date.now(),
                      y: latestHeapPerc,
                    });
                }

                  // regardless of whether we have a new message, plot the current avgs
                    // datasets[4] is  systemUsageAvg
                  chart.data.datasets[4].data.push({
                    x: Date.now(),
                    y: systemUsageAvg,
                  });

                  // datasets[5] is  applicationUsageAvg
                  chart.data.datasets[5].data.push({
                    x: Date.now(),
                    y: applicationUsageAvg,
                  });

                  // datasets[6] is  elapsedTimeAvg
                  chart.data.datasets[6].data.push({
                    x: Date.now(),
                    y: elapsedTimeAvg,
                  });

                  // datasets[7] is  heapPercAvg
                  chart.data.datasets[7].data.push({
                    x: Date.now(),
                    y: heapPercAvg,
                  });
                  this.setState({messageCount: messageArr.length});

              }.bind(this),

              delay: 300,
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

export default StreamingChart;