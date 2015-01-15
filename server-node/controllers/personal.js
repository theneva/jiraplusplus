var router = require('express').Router();
var jwt = require('jwt-simple');
var User = require('../models/user');

router.get('/', function (req, res) {
    return res.json({message: 'Hello'});
});

router.get('/user', function (req, res, next) {
    var token = req.headers['x-auth'];

    if (!token) {
        return res.status(401).send('No token supplied');
    }

    var jwtUser = jwt.decode(token, jwtSecret);

    User.findOne({username: jwtUser.username}, function (err, user) {
        if (err) return next(err);
        if (!user) return res.status(401).send('No such user');
        res.json(user);
    });
});

module.exports = router;
