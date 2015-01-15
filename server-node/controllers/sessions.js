var router = require('express').Router();
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');
var User = require('../models/user');

router.post('/', function (req, res, next) {
    if (!req.body.username || !req.body.password) {
        return res.status(401).send('Request must contain username and password');
    }

    User.findOne({username: req.body.username}, function (err, user) {
        if (err) return next(err);

        bcrypt.compare(req.body.password, user.password, function (err, valid) {
            if (err) next(err);
            if (!valid) return res.status(401).send('Wrong password');

            var token = jwt.encode({username: user.username}, global.jwtSecret);
            res.json(token);
        });
    })
});

module.exports = router;
