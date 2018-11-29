const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const babelify = require('babelify');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const clean = require('gulp-clean');
const cleanCSS = require('gulp-clean-css');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const gutil = require('gulp-util');
const imagemin = require('gulp-imagemin');
const ngAnnotate = require('browserify-ngannotate');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const useref = require('gulp-useref');

const bases = {
  app: 'app/',
  dist: 'dist/'
};

const paths = {
  views: 'views/**',
  assets: ['fonts/**', 'images/**', '*.json'],
  scripts: 'scripts/**',
  styles: 'styles/**'
};

/**
 * Clean dist directory
 */
gulp.task('clean', () =>
  gulp
    .src(bases.dist, {
      read: false
    })
    .pipe(clean())
);

/**
 * Copy assets
 */
gulp.task('copy-assets', () =>
  gulp
    .src(paths.assets, {
      cwd: bases.app,
      base: bases.app
    })
    .pipe(gulp.dest(bases.dist))
);

/**
 * Copy HTML files
 */
gulp.task('copy-html-files', () =>
  gulp
    .src(['index.html', paths.views], {
      cwd: bases.app,
      base: bases.app
    })
    .pipe(useref())
    .on('error', gutil.log)
    .pipe(gulpif('*.css', autoprefixer()))
    .pipe(gulpif('*.css', cleanCSS()))
    .pipe(gulpif('*.css', gulp.dest(bases.dist)))
    .pipe(gulpif('*.js', babel({ presets: ['@babel/env'] })))
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.js', gulp.dest(bases.dist)))
    .pipe(gulp.dest(bases.dist))
);

/**
 * Compile SASS files
 */
gulp.task('sass', () => {
  gulp
    .src(`styles/main.scss`, {
      cwd: bases.app,
      base: bases.app
    })
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(gulp.dest(bases.dist));
});

/**
 * Copy Angular scripts
 */
gulp.task('scripts', () =>
  browserify({ entries: `${bases.app}scripts/app.js` })
    .transform(babelify, { presets: ['@babel/preset-env'] })
    .transform(ngAnnotate)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(gulp.dest(`${bases.dist}/scripts`))
);

/**
 * Minify images
 */
gulp.task('minify-images', () =>
  gulp
    .src('images/**', {
      cwd: bases.dist,
      base: bases.dist
    })
    .pipe(imagemin())
    .pipe(gulp.dest(bases.dist))
);

/**
 * Watch for changes
 */
gulp.task('watch', () => {
  browserSync.init({
    server: {
      baseDir: ['./', bases.dist]
    }
  });

  gulp.watch(bases.app + paths.views, ['copy-html-files']).on('change', browserSync.reload);
  gulp.watch(bases.app + paths.assets, ['copy-assets']).on('change', browserSync.reload);
  gulp.watch(bases.app + paths.styles, ['sass']).on('change', browserSync.reload);
  gulp.watch(bases.app + paths.scripts, ['scripts']).on('change', browserSync.reload);
});

/**
 * Serve application
 */
gulp.task('serve', cb => {
  runSequence('clean', ['copy-html-files', 'copy-assets'], ['sass', 'scripts'], 'watch', cb);
});

/**
 * Build application
 */
gulp.task('build', cb => {
  runSequence('clean', ['copy-html-files', 'copy-assets'], ['sass', 'scripts'], 'minify-images', cb);
});
