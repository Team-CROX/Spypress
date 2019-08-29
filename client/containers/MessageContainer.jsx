import Message from "../components/Message.jsx"; //import child component (Message);
import React, { Component } from "react";
// import { connect } from "react-redux"; //Will need to use mapStateToProps & mapDispatchToProps


class MessageContainer extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    //Initalize empty array to render each child component. (We're going to have more than one depending on how many requests we received)
    let messageComponentArr = [];
    //Destructure messageArr from this.props;
    
    let messageArr = this.props.messageArr;
    //Loop through each element inside messageArr (which is an object and send it down to child components);
    messageArr.forEach((el, index) => {
      //el = data object we pushed in. => send it down into the child component as a property/attribute;
      messageComponentArr.push(<Message key={`${el}` + index } info={el}/>);
    })
    /*
    We want every new request to be on the top when we render, 
    therefore we want to reverse the array because otherwise every new request will be on the bottom
    */
    messageComponentArr.reverse();
    //then return it to render;
    return (
      <div className="messages-container">
        {messageComponentArr}
      </div>
      );
  }
}


// const mapStateToProps = store => {
//   return {
//   marketList: store.markets.marketList,
// }};

// export default connect(mapStateToProps,mapDispatchToProps)(MessageContainer);

export default MessageContainer;