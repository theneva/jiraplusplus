var db = require('../db');

var Issue = db.model('Issue', {
    name: {type: String, required: true}
});

module.exports = Issue;