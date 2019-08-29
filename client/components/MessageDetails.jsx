import React, { Component } from "react";

class MessageDetails extends Component {

  /*
    Here we have a message detail container;
    This container is divided into 4 parts (Method-Types, Headers, Body, Cookies);
  */
  render () {
    return (
      <div className="message-details">
        <div className="header-info">
          <pre> 
            <h3>Header:</h3> 
            {this.props.headArr}
          </pre>
        </div>
        <div className="body-info">
          <pre>
            <h3>Body:</h3>
            {this.props.bodyArr}
          </pre>
        </div>
        <div className="cookies-info">
          <pre>{this.props.cookieArr}</pre>
        </div>
      </div>
    )
  }
}
export default MessageDetails;