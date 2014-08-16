var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('server', function() {
  gulp.src('.')
    .pipe(webserver({
        port: 3000
    }));

});

