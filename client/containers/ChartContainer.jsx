import React, { Component } from "react";
import StreamingChart from "../components/StreamingChart.jsx";

class ChartContainer extends Component {
  constructor(props) {
    super(props)
    this.getResponseTimes = this.getResponseTimes.bind(this);
  }

  getResponseTimes(messageArr) {
    for (let i = 0; i < messageArr.length; i++) {
      console.log("messageArr: ", messageArr[i])
    }
  }

  render() {
    console.log("hi this is render")
    this.getResponseTimes(this.props.messageArr);
    return (
      <div className="charts-container">
        
        <StreamingChart />
      </div>
    )
  }
}

export default ChartContainer;