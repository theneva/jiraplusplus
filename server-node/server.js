var express = require('express');
var bodyParser = require('body-parser');

var port = 5678;

var app = express();

app.use(bodyParser.json());

app.get('/', function (req, res) {
    return res.json({message: 'Hello'});
});

app.get('/projects', function (req, res) {
    return res.json([
        {name: 'Project 1', members: ['Frank', 'Martin']},
        {name: 'Project 2', members: ['Martin']}
    ]);
});

app.listen(port);
console.log('app listening on port: ' + port);
