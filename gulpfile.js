var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');

var bases = {
    app: 'app/',
    dist: 'dist/'
};

var paths = {
    html: './**/*.html',
    scripts: ['./js/**/*.js', './app.js'],
    styles: './scss/**/*.scss'
};

// Clean Tasks
gulp.task('clean:html', function() {
    return gulp.src(paths.html, { cwd: bases.dist, read: false })
        .pipe(clean());
});

gulp.task('clean:scripts', function() {
    return gulp.src(paths.scripts, { cwd: bases.dist, read: false })
        .pipe(clean());
});

gulp.task('clean:styles', function() {
    return gulp.src('./css/', { cwd: bases.dist, read: false })
        .pipe(clean());
});

// Copy Tasks
gulp.task('html', ['clean:html'], function() {
    return gulp.src(paths.html, { cwd: bases.app })
        .pipe(gulp.dest(bases.dist));
});

gulp.task('scripts', ['clean:scripts'], function() {
    return gulp.src(paths.scripts, { cwd: bases.app })
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest(bases.dist + './js/'));
});

gulp.task('styles', ['clean:styles'], function() {
    return gulp.src(paths.styles, { cwd: bases.app })
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(bases.dist + './css/'));
});

// Jshint Task
gulp.task('jshint', function() {
    return gulp.src(paths.scripts, { cwd: bases.app })
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
});

// Sass compile Task
gulp.task('sass', function() {
    return gulp.src(paths.styles, { cwd: bases.app })
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(bases.app + './css/'));
});

// Serve Task
gulp.task('serve', function() {
    browserSync.init({
        server: 'app/',
        port: 8080
    });

    gulp.watch(bases.app + paths.html).on('change', browserSync.reload);
    gulp.watch(bases.app + paths.scripts, ['jshint']).on('change', browserSync.reload);
    gulp.watch(bases.app + paths.styles, ['sass']).on('change', browserSync.reload);
});