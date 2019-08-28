import React from "react";

/*
  Now each data we have access to inside this component is very unpleasing to the eye;
  Especially the body & header;

  ie: 
    Body = {
	    "MARK":"POPEYES",
	    "ANTHONY": "SANDWICH"
    }
  
    Header = {
      "content-type": "application/json",
      "user-agent": "PostmanRuntime/7.15.2",
      "accept": "",
      "cache-control": "no-cache",
      "postman-token": "b8eb9bfc-5606-4c75-9bac-f080984662cc",
      "host": "localhost:3000",
      "accept-encoding": "gzip, deflate",
      "content-length": "45",
      "connection": "keep-alive,
    }

    Visualizers are used to help the user visualize something they can't easily conceive;
    Therefore we want to parse this data and seperate each key and value pair so we can send them as innerHTML;
*/

const Message = props => {
  console.log(props);
  //HEADER
  const headArr = []; //Initalize empty array to render
  const hKArr = Object.keys(props.info.header); // Keys of Header
  const hVArr = Object.values(props.info.header); // Values of Header

  //loop through each key;
  hKArr.forEach((key, index) => {
    //push into initialize empty array a P TAG that seperates keys and values into a sentence w/ unique keys;
    headArr.push(<p key={`${key}` + index} className="header-data">{key} = {hVArr[index]}</p>);
  });

  //BODY
  //Need to parse through due to nested objects and arrays inside body object.
  const flattenObject = object => {
    return Object.assign( {}, ...function _flatten( objectBit, path = '' ) {  
      return [].concat(                                                       
        ...Object.keys( objectBit ).map(
          key => typeof objectBit[ key ] === 'object' ? _flatten( objectBit[ key ], path + '+' ) : 
          ( { [ `${ path }+ ${ key }` ]: objectBit[ key ] } )
          )
      )
    }( object ) );
  };

  const bodyArr = [];
  const newObj = flattenObject(props.info.body);
  const bKArr = Object.keys(newObj);
  const bVArr = Object.values(newObj);

  bKArr.forEach((key, index) => {
    bodyArr.push(<p key={`${key}` + index} className="body-data">{key} = {bVArr[index]}</p>);
  })
  //COOKIES
  const cookieArr = [];
  const cKArr = Object.keys(props.info.cookies);
  const cVArr = Object.values(props.info.cookies);
  cKArr.forEach((key, index) => {
    cookieArr.push(<p key={`${key}` + index} className="cookie-data">Name: {key} | Value: {cVArr[index]}</p>);
  });

  /*
    Here we have a main message container;
    This container is divided into 4 parts (Method-Types, Headers, Body, Cookies);
  */
  return (
    <div className="message-container">
      <div className="method-type">
        <pre>{props.info.type} Request</pre>
      </div>
      <div className="header-info">
        <pre> 
          <h3>Header:</h3> 
          {headArr}
        </pre>
      </div>
      <div className="body-info">
        <pre>
          <h3>Body:</h3>
          {bodyArr}
        </pre>
      </div>
      <div className="cookies-info">
        <pre>{cookieArr}</pre>
      </div>
    </div>
  )
};

export default Message;
