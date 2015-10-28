var gulp = require('gulp');
var babel = require('gulp-babel');
var connect = require('gulp-connect');
var proxy = require('proxy-middleware');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var runSequence = require('run-sequence');

var paths = {
  scripts: 'app/js/**/*.js',
  assets: ['app/index.html', 'app/en/index.html', 'app/api/**/*', 'app/admin/**/*', 'app/admin/**/.htaccess', 'app/favicon.ico', 'app/.htaccess', 'app/lib/**/*', 'app/css/**/*.css', 'app/fonts/**/*', 'app/img/**/*']
};

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('clean-bower', function() {
  return del(['app/lib']);
});

gulp.task('js', function () {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

gulp.task('assets', function () {
  return gulp.src(paths.assets, {'base' : 'app'})
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('connect', function () {
  return connect.server({
    root: 'dist',
    port: 8080,
    livereload: true,
    middleware: function () {
      function createProxy(path) {
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
  gulp.watch(paths.scripts, ['js']);
  gulp.watch(paths.assets, ['assets']);
});

gulp.task('build', ['js', 'assets']);
gulp.task('dist', function (callback) {
  runSequence('clean', 'build', callback);
});
gulp.task('server', ['build', 'connect', 'watch']);
gulp.task('default', ['server']);
