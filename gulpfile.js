(function () {
  'use strict';

  var gulp = require('gulp');
  var connect = require('gulp-connect');

  gulp.task('reload', function () {
    return gulp.src('./**/*')
      .pipe(connect.reload());
  });

  gulp.task('connect', function () {
    return connect.server({
      root: '.',
      port: 8080,
      livereload: true
    });
  });

  gulp.task('watch', function () {
    gulp.watch(['index.html', 'js/**/*.js', 'css/**/*.css'], ['reload']);
  });

  gulp.task('default', ['connect', 'watch']);
})();