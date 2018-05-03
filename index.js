var express = require('express');
var wagner = require('wagner-core');

require('./models/models')(wagner);

var app = express();
//attaches a subrouter for URL_ROOT/api/v1/
app.use('/api/v1', require('./api')(wagner));

app.listen(3000);
console.log('Listening on port 3000!');
