global.jwtSecret = 'peanutbutterjelly';

var express = require('express');
var bodyParser = require('body-parser');
var Project = require('./models/project');
var User = require('./models/user');

var port = 5678;
var app = express();

app.use(bodyParser.json());

app.use('/', require('./controllers/personal'));
app.use('/sessions', require('./controllers/sessions'));
app.use('/users', require('./controllers/users'));
app.use('/projects', require('./controllers/projects'));

app.listen(port);
console.log('app listening on port: ' + port);
