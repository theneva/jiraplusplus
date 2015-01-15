var mongoose = require('mongoose');

var path = 'localhost/jiraplusplus';

mongoose.connect('mongodb://' + path, function() {
   console.log('connected to MongoDB on ' + path);
});

module.exports = mongoose;
