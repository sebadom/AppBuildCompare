var gulp = require('gulp'),
    jscs = require('gulp-jscs'),
    eslint = require('gulp-eslint'),
    istanbul = require('gulp-istanbul'),
    mocha = require('gulp-mocha'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    gutil = require('gulp-util');

gulp.task('style',function() {
  return gulp.src('app/**/*.js')
          .pipe(jscs());
});

gulp.task('lint', function () {
    return gulp.src(['app/**/*.js'])
        .pipe(eslint({
          configFile:'eslint.json'
        }))
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('test', function (cb) {
  gulp.src(['app/**/*.js'])
    .pipe(istanbul()) // Covering files 
    .pipe(istanbul.hookRequire()) // Force `require` to return covered files 
    .on('finish', function () {
      gulp.src(['test/**/*.js'])
        .pipe(mocha({
          reporter: 'spec',
          ui: 'tdd'
        }))
        .pipe(istanbul.writeReports({
          dir: './test/coverage'
        })) // Creating the reports after tests runned 
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } })) // Enforce a coverage of at least 90% 
        .on('end', cb);
    });
});

gulp.task('build', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './app/index.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('app.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['style', 'lint', 'test', 'build']);