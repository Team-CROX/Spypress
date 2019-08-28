import React, { Component } from "react";
import { connect } from "react-redux"; //Will need to use mapStateToProps & mapDispatchToProps
import * as actions from "../actions/actions"; //Get all actions from actions folder;
import MessageContainer from "./MessageContainer.jsx";
import ChartContainer from "./ChartContainer.jsx";

//Grab messageArray from state for props to use;
const mapStateToProps = store => ({
  messageArr: store.messageArray
});

//Initialize method for props to use;
const mapDispatchToProps = dispatch => ({
  socketMessage: data => dispatch(actions.addMessage(data))
});

//Created Class component called Connection => THIS IS OUR MAIN CONTAINER TO RENDER;
class Connection extends Component {
  //Need constructor to send props down into child components;
  constructor(props) {
    super(props);
  }

  //Lifecycle method to connect WebSocket with front-end;
  componentDidMount() {
    //Connect to port 2000 WebSocket;
    const socket = new WebSocket("ws://localhost:2000");

    //Added eventListener to listen for any data coming inside websocket server;
    socket.addEventListener ('message', (event) => {
      //Send data received to reducer function;
      this.props.socketMessage(JSON.parse(event.data));
    });
  }

  render() {
    const { messageArr } = this.props;
    return(
      <div>
        <h1>goodbye </h1>
        <ChartContainer messageArr={messageArr}/>
        <MessageContainer messageArr={messageArr}/>
      </div>
    )
  }
}


//Needed to use mapStateToProps & mapDispatchToProps then export Main Container;
export default connect(mapStateToProps,mapDispatchToProps)(Connection);
