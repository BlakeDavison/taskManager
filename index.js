const express = require('express');
const wagner = require('wagner-core');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');

require('./models/models')(wagner);

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
app.use(session({secret:"ThisIsHereForDevOnly", resave:false, saveUninitialized:false}));
app.use('/api/v1', require('./api')(wagner));

//This makes the html files avalible to the server.
app.use(express.static(__dirname + '/front'));      // set the static files location /public/img will be /img for users
app.get('*', function(req, res)
{ // load the single view file (angular will handle the page changes on the front-end)
    res.sendFile(__dirname + '/front/index.html');
});
app.listen(3000, "0.0.0.0");
console.log('It is working! It is functioning properly.');
