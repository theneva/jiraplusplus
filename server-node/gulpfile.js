var gulp = require('gulp');
var nodemon = require('nodemon');

gulp.task('dev:server', function() {
    nodemon({
        script: 'server.js',
        ext: 'js'
    })
});
