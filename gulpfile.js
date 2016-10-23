var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');

// CSS
gulp.task('build-css', function() {
  gulp.src('./css/style.css')
    .pipe(plumber())
    .pipe(autoprefixer({
      browsers: [
        '> 1%',
        'last 2 versions',
        'firefox >= 4',
        'safari >= 7',
        'IE 9',
        'IE 10',
        'IE 11'
      ],
      cascade: false
    }))
    .pipe(gulp.dest('./prod'));
});

// Watching
gulp.task('watch', function() {
  gulp.watch('./css/*.css', ['build-css']);
});

// Commands
gulp.task('default', [
  'build-css', 'watch'
]);
