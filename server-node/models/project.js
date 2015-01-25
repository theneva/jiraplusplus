var db = require('../db');
var Issue = require('./issue.js');


var Project = db.model('Project', {
    name: {type: String, required: true},
    members: {type: [String], required: true},
    issues: {type: [Issue]},
    billableCompany: {type: String}, // TODO: own billable company type 
    clientCompany: {type: String} // TODO: own client company type
});

module.exports = Project;
