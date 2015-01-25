var router = require('express').Router();
var jwt = require('jwt-simple');
var Project = require('../models/project');
var _ = require('underscore');

router.get('/', function (req, res, next) {
    var token = req.headers['x-auth'];
    
    if (!token) {
        return res.status(401).send('No token supplied');
    }

    var jwtUser = jwt.decode(token, global.jwtSecret);

    Project.find({members: jwtUser.username}, function (err, projects) {
        if (err) return next(err);
        res.json(projects);
    });
});

router.post('/', function (req, res, next) {
    if (!req.body.name || !req.body.members) {
        return res.status(401).send('Request must contain name and members');
    }

    var project = new Project({
        name: req.body.name,
        members: req.body.members
    });

    project.save(function (err, project) {
        if (err) return next(err);
        res.json(201, project);
    });
});

router.get('/:projectId', function (req, res, next) {
    var token = req.headers['x-auth'];

    if (!token) {
        return res.status(401).send('No token supplied');
    }

    var jwtUser = jwt.decode(token, global.jwtSecret);

    var projectId = req.params.projectId;

    Project.findOne({_id: projectId}, function (err, project) {
        if (err) return next(err);

        if (!_.contains(project.members, jwtUser.username)) {
            return res.status(401).send('The user \'' + jwtUser.username + '\' does not have access to this project');
        }

        return res.status(200).json(project);
    });
});

module.exports = router;
