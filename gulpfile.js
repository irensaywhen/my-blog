// Modules
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

function styles() {
  return gulp
    .src('./_scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['defaults'],
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./assets/css/'));
  //.pipe(reload());
}

function serve(done) {
  browserSync.init(
    {
      server: {
        baseDir: './_site',
      },
      port: 8000,
      host: '0.0.0.0',
    },
    done
  );
}

function reload() {
  browserSync.reload();
}

function watch() {
  gulp.watch('_scss/**/*.scss', styles);
  gulp.watch('./_site/*.html').on('change', reload);
  gulp.watch('./_site/**/*.js').on('change', reload);
  gulp.watch('./_site/**/*.md').on('change', reload);
  //gulp.watch('./assets/css/**/*.css').on('change', browserSync.stream);
}

exports.develop = gulp.series(styles, serve, watch);
