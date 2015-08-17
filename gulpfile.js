(function () {
  'use strict';

  var gulp = require('gulp');
  var connect = require('gulp-connect');

  gulp.task('reload', function () {
    return gulp.src(['./admin.html', './index.html', './js/**/*.js', './css/**/*.css'])
      .pipe(connect.reload());
  });

  gulp.task('connect', function () {
    return connect.server({
      root: '.',
      port: 8080,
      livereload: true,
      middleware: function () {
        function createProxy(path) {
          var proxy = require('proxy-middleware');
          return proxy({
            port: 8081,
            pathname: path,
            route: path
          });
        }
        return [createProxy('/api')];
      }
    });
  });

  gulp.task('watch', function () {
    gulp.watch(['./admin.html', './index.html', './js/**/*.js', './css/**/*.css'], ['reload']);
  });

  gulp.task('default', ['connect', 'watch']);
})();