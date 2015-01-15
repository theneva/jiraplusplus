var router = require('express').Router();
var Project = require('../models/project');

router.get('/', function (req, res, next) {
    Project.find({}, function (err, projects) {
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

module.exports = router;
