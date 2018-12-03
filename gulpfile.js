const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const babelify = require('babelify');
const browserify = require('browserify');
const browserSync = require('browser-sync').create();
const buffer = require('vinyl-buffer');
const cache = require('gulp-cache');
const cssnano = require('gulp-cssnano');
const del = require('del');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const gutil = require('gulp-util');
const imagemin = require('gulp-imagemin');
const ngAnnotate = require('browserify-ngannotate');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const useref = require('gulp-useref');

const config = {
  sourcemaps: './maps',
  browserSync: {
    baseDir: ['./', 'dist']
  },
  assets: {
    src: 'app/assets/**/*',
    dest: 'dist/assets'
  },
  fonts: {
    src: 'app/fonts/**/*',
    dest: 'dist/fonts'
  },
  images: {
    src: 'app/img/**/*',
    dest: 'dist/img'
  },
  index: {
    src: 'app/index.html',
    dest: 'dist'
  },
  sass: {
    src: 'app/scss/**/*.scss',
    dest: 'dist/css'
  },
  scripts: {
    src: 'app/js/**/*.js',
    dest: 'dist/js'
  },
  views: {
    src: 'app/views/**/*.html',
    dest: 'dist/views'
  }
};

/**
 * Run BrowserSync
 */
gulp.task('browserSync', () =>
  browserSync.init({
    server: {
      baseDir: config.browserSync.baseDir
    }
  })
);

/**
 * Clean dist directory
 */
gulp.task('clean:dist', () => del.sync('dist'));

/**
 * Copy static files
 */
gulp.task('copy', () => {
  gulp.src(config.index.src).pipe(gulp.dest(config.index.dest));
  gulp.src(config.views.src).pipe(gulp.dest(config.views.dest));
  gulp.src(config.fonts.src).pipe(gulp.dest(config.fonts.dest));
  gulp.src(config.images.src).pipe(gulp.dest(config.images.dest));
  gulp.src(config.assets.src).pipe(gulp.dest(config.assets.dest));
});

/**
 * Compile SASS files
 */
gulp.task('sass', () =>
  gulp
    .src(config.sass.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write(config.sourcemaps))
    .pipe(gulp.dest(config.sass.dest))
    .pipe(
      browserSync.reload({
        stream: true
      })
    )
);

/**
 * Bundle and transpile scripts
 */
gulp.task('scripts', () => {
  gulp
    .src('app/js/main.js')
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(gulp.dest(config.scripts.dest));

  const b = browserify({
    entries: 'app/js/app.js'
  });

  return b
    .transform(babelify, { presets: ['@babel/preset-env'] })
    .transform(ngAnnotate)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .on('error', gutil.log)
    .pipe(gulp.dest(config.scripts.dest));
});

/**
 * Parse styles and scripts from index.html
 */
gulp.task('useref', () =>
  gulp
    .src('dist/index.html')
    .pipe(useref())
    .pipe(gulpif('*.css', autoprefixer()))
    .pipe(gulpif('*.css', cssnano()))
    .pipe(gulpif('*.js', uglify()))
    .on('error', gutil.log)
    .pipe(gulp.dest(config.index.dest))
);

/**
 * Minify images
 */
gulp.task('images', () =>
  gulp
    .src(config.images.src)
    .pipe(cache(imagemin()))
    .pipe(gulp.dest(config.images.dest))
);

/**
 * Watch for changes
 */
gulp.task('watch', ['browserSync'], () => {
  gulp.watch([config.index.src, config.views.src], ['copy']).on('change', browserSync.reload);
  gulp.watch(config.sass.src, ['sass']).on('change', browserSync.reload);
  gulp.watch(config.scripts.src, ['scripts']).on('change', browserSync.reload);
});

/**
 * Serve application
 */
gulp.task('default', cb => {
  runSequence('clean:dist', ['sass', 'scripts', 'copy'], 'watch', cb);
});

/**
 * Build application
 */
gulp.task('build', cb => {
  runSequence('clean:dist', ['sass', 'scripts', 'copy'], ['useref', 'images'], cb);
});
