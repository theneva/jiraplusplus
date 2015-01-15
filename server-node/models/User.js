var db = require('../db');

var User = db.model('User', {
    username: {type: String, required: true},
    password: {type: String, required: true}
});

module.exports = User;
