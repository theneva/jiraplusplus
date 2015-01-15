var db = require('../db');

var Project = db.model('Project', {
    name: {type: String, required: true},
    members: {type: [String], required: true}
});

module.exports = Project;
