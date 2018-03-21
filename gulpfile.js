const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir: 'dest'
    },
  });
});

gulp.task('sass', function(){
  return gulp.src('src/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('dest'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('src/*.scss', ['sass']);
  gulp.watch('dest/*.html', browserSync.reload);
});
