var router = require('express').Router();
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');
var User = require('../models/user');

router.get('/', function (req, res, next) {
    User.find({}, function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
});

router.post('/', function (req, res, next) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send('Request must contain username and password');
    }

    User.findOne({username: req.body.username}, function (err, existingUser) {
        if (err) return next(err);
        if (existingUser) {
            return res.status(409).send('A user with username \'' + req.body.username + '\' already exists');
        }

        var user = new User({username: req.body.username});
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            user.password = hash;
            user.save(function (err, user) {
                if (err) return next(err);
                return res.status(201).json(user);
            });
        });
    });
});

router.get('/:username', function (req, res, next) {
    var username = req.params.username;
    User.findOne({username: username}, function (err, user) { // TODO
        if (err) next(err);
        if (!user) {
            return res.status(404).send('No user with username \'' + username + '\'');
        }

        res.json(user);
    });
});

module.exports = router;
