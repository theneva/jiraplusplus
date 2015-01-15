var router = require('express').Router();
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
        return res.status(401).send('Request must contain username and password');
    }

    var user = new User({username: req.body.username});
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        user.password = hash;
        user.save(function (err, user) {
            if (err) return next(err);
            res.json(201, user);
        });
    });
});

module.exports = router;
