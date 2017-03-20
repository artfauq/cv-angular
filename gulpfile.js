var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');

var bases = {
    app: 'app/'
};

gulp.task('sass', function() {
    return gulp.src('./styles/**/*.scss', { cwd: bases.app })
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./styles', { cwd: bases.app }));
});

gulp.task('serve', function() {
    browserSync.init({
        server: 'app/',
        port: 8080
    });

    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch("app/**/*.css").on('change', browserSync.reload);
});
