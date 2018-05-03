var express = require('express');
var wagner = require('wagner-core');

require('./models/models')(wagner);

var app = express();

app.use('/api/v1', require('./api')(wagner));

app.listen(3000);
console.log('It is working! It is functioning properly.');
