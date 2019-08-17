var gulp = require('gulp'),
    pug = require('gulp-pug');

// run this task by typing in gulp pug in CLI
gulp.task('pug', function() {
  return gulp.src('templates/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('build'));
});