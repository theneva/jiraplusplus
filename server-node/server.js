global.jwtSecret = 'peanutbutterjelly';

var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');
var Project = require('./models/project');
var User = require('./models/user');

var app = express();

app.use(express.static(__dirname + '/../angular'));

app.use(bodyParser.json());
app.use('/api', require('./controllers'));

app.listen(config.port);
console.log('app listening on port: ' + config.port);
