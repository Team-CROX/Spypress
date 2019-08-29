const cookieParser = require('cookie-parser');
const WebSocket = require('ws');
const path = require('path');
const wss = new WebSocket.Server({ port: 2000 });

module.exports = {
    start: function(app, express) {
        //Event listener for WebSocket Connection.
        wss.on("connection", function connection(ws) { 

            //ON Connection parse all requests & cookies
            app.use(express.json());
            app.use(cookieParser());
            //Listen on all Requests
            app.use("*", (req, res, next) => {
        
            //Data we're going to send to the establish WebSocket Server for the Front-end to grab;
            //All set as null until we define the data coming in.
            const data1 = {
                header: null,
                cookies: null,
                body: null,
                type:null
            };
        
            //Defining any requests that comes in such as Methods, Headers, Cookies & Body.
            !req.method ? data1.type = 'Method not sent' : data1.type = req.method;
            !req.headers ? data1.header = 'Headers not sent' : data1.header = req.headers;
            !req.cookies ? data1.cookies = 'There are no cookies' : data1.cookies = req.cookies;
            !req.body ? data1.body = 'There is no body' : data1.body = req.body;
        
            res.on('finish', function(err, data) {
                //Sending data object to WebSocket Server for Front-End to grab.
                ws.send(JSON.stringify(data1));
            })
            
            //Connection Confirmation.
            next();
            });
        });

        //Running NPM START. Need to go to localhost:3000/prod to view page.
        app.use('/build', express.static(path.join(__dirname, '../build')))

        app.get('/prod', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/index.html'));
        })
    }
};