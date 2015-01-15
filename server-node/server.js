global.jwtSecret = 'peanutbutterjelly';

var express = require('express');
var bodyParser = require('body-parser');
var Project = require('./models/project');
var User = require('./models/user');

var port = 5678;
var app = express();

app.use(express.static(__dirname + '/../angular'));

app.use(bodyParser.json());
app.use('/api', require('./controllers'));

app.listen(port);
console.log('app listening on port: ' + port);
