var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');

var bases = {
    app: 'app/'
};

var paths = {
    html: './**/*.html',
    styles: './scss/**/*.scss',
    scripts: './js/**/*.js'
}

gulp.task('styles', function() {
    return gulp.src(paths.styles, { cwd: bases.app })
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/', { cwd: bases.app }));
});

gulp.task('serve', function() {
    browserSync.init({
        server: 'app/',
        port: 8080
    });

    gulp.watch(bases.app + paths.html).on('change', browserSync.reload);
    gulp.watch(bases.app + paths.styles, ['styles']).on('change', browserSync.reload);
    gulp.watch(bases.app + paths.scripts).on('change', browserSync.reload);
});