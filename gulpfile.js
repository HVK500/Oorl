var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    tsc = require('gulp-typescript');

var tsConfig = tsc.createProject('tsconfig.json');

gulp.task('build', ['compile', 'compress']);

gulp.task('compile', function() {
    return gulp.src('*.ts')
    .pipe(tsc(tsConfig))
    .js.pipe(gulp.dest('src/'))
});
 
gulp.task('compress', function() {
  return gulp.src('src/*.js')
    .pipe(concat('Oorl.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./'));
});