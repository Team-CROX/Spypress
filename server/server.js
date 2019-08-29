const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const WebSocket = require("ws");
const path = require('path');

//Websocket Connection to port 2000;
const wss = new WebSocket.Server({ port: 2000 });

// [seconds, nanoseconds] => milliseconds
function secNSec2ms (secNSec) {
  return secNSec[0] * 1000 + secNSec[1] / 1000000;
}

// microseconds => milliseconds
function MSec2ms(MSec) {
  return MSec / 1000;
}

//Event listener for WebSocket Connection.
wss.on("connection", function connection(ws) { 
  
  //ON Connection parse all requests & cookies
  app.use(express.json());
  app.use(cookieParser());

  //Listen on all Requests
  app.use("*", (req, res, next) => {

    //Obtain the request time in milliseconds
    req.requestTime = Date.now();

    // time of request in [seconds, nanoseconds] 
    const requestTimeCalc = process.hrtime();

    // get start CPU time - microseconds
    const startUsage = process.cpuUsage();

    //Data we're going to send to the establish WebSocket Server for the Front-end to grab;
    //All set as null until we define the data coming in.
    const data = {
      header: null,
      cookies: null,
      body: null,
      type:null, 
      statusCode: null, 
      requestTime: null,
      elapsedTime: null,
      systemUsage: null,
      applicationUsage: null
    };

    //Defining any requests that comes in such as Methods, Headers, Cookies & Body.
    !req.method ? data.type = 'Method not sent' : data.type = req.method;
    !req.headers ? data.header = 'Headers not sent' : data.header = req.headers;
    !req.cookies ? data.cookies = 'There are no cookies' : data.cookies = req.cookies;
    !req.body ? data.body = 'There is no body' : data.body = req.body;
    !req.requestTime ? data.requestTime = 'There is no request time' : data.requestTime = req.requestTime;

    //Sending data object to WebSocket Server for Front-End to grab.
    res.on('finish', function (err, dataParam) {
      !res.statusCode ? data.statusCode = 'There is no status code' : data.statusCode = res.statusCode;
      
      //we would like to get the elasedTime in milliseconds(precise!)
      const elapsedTime = process.hrtime(requestTimeCalc);
      const elapsedTimeMS = secNSec2ms(elapsedTime);

      // elapsed time between request received and response sent
      data.elapsedTime = Number(secNSec2ms(elapsedTime).toFixed(3));

      // diff in CPU usage in microseconds
      const elapUsage = process.cpuUsage(startUsage);

      // application's usage
      const elapUser = MSec2ms(elapUsage.user);
      // system's usage
      const elapSystem = MSec2ms(elapUsage.system);

      // percentages of usage by system and application
      data.systemUsage = Number((100 * (elapSystem / elapsedTimeMS)).toFixed(3));
      data.applicationUsage = Number((100 * (elapUser / elapsedTimeMS)).toFixed(3));

      ws.send(JSON.stringify(data));
    });
    //Connection Confirmation.
    next();
  });
  //[INSERT YOUR ROUTES HERE];
});

//Running NPM START. Need to go to localhost:3000/prod to view page.
app.use('/build', express.static(path.join(__dirname, '../package')))

app.get('/prod', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
})

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
