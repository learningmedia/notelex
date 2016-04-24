import 'babel-register';
import gulp from 'gulp';
import rimraf from 'rimraf';
import mocha from 'gulp-mocha';
import eslint from 'gulp-eslint';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import runSequence from 'run-sequence';
import webpack from 'webpack-stream';

const webpackConfig = {
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  output: {
    library: 'notelex',
    libraryTarget: 'umd'
  }
};

gulp.task('clean', function (done) {
  rimraf('dist', done);
});

gulp.task('lint', function () {
  return gulp.src(['*.js', 'src/**/*.js', 'tests/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('test', function () {
  return gulp.src('tests/**/*.specs.js')
    .pipe(mocha())
    .on('error', function (err) {
      console.error(err.toString());
      this.emit('end');
    });
});

gulp.task('script', function () {
  return gulp.src('src/index.js')
    .pipe(webpack(webpackConfig))
    .pipe(rename('notelex.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('minify', function () {
  return gulp.src('dist/notelex.js')
    .pipe(uglify())
    .pipe(rename('notelex.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', function (done) {
  runSequence('clean', 'lint', 'test', 'script', 'minify', done);
});

gulp.task('watch', function () {
  return gulp.watch(['src/**/*.js', 'tests/**/*.js'], ['test']);
});

gulp.task('default', ['watch']);
