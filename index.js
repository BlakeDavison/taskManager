var express = require('express');
var wagner = require('wagner-core');


require('./models/models')(wagner);


var app = express();

app.use('/api/v1', require('./api')(wagner));

//This makes the html files avalible to the server.
//app.use(express.static('../', {magAge: 4 * 60 * 60 * 1000 /*2 hours*/}));
 app.use(express.static(__dirname + '/front'));      // set the static files location /public/img will be /img for users

app.get('*', function(req, res) {
        res.sendFile(__dirname + '/front/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

app.listen(3000);
console.log('It is working! It is functioning properly.');
