var gulp = require('gulp');
var connect = require('gulp-connect');

var paths = {
  assets: ['./admin/**/*.html', './index.html', './js/**/*.js', './css/**/*.css']
}

gulp.task('reload', function () {
  return gulp.src(paths.assets)
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
      return [createProxy('/api'), createProxy('/admin/news/api'), createProxy('/admin/offers/api')];
    }
  });
});

gulp.task('watch', function () {
  gulp.watch(paths.assets, ['reload']);
});

gulp.task('default', ['connect', 'watch']);
