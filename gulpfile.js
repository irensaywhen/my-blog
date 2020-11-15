// Modules
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const child = require('child_process');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');

function jekyllBuild(done) {
  return child
    .spawn(
      'bundle.bat',
      ['exec', 'jekyll', 'build', '--watch', '--trace', '--drafts'],
      {
        stdio: 'inherit',
      }
    )
    .on('close', done);
}

function serve(done) {
  browserSync.init(
    {
      files: ['./_site/**', '!./_site/**/*.css'],
      server: {
        baseDir: './_site',
      },
      port: 4000,
    },
    done
  );

  gulp.watch('_scss/**/*.scss', styles);
  gulp.watch('./js/**/*.js', js);
}

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
    .pipe(gulp.dest('./assets/css'));
}

function js() {
  return gulp
    .src(['./js/clamp.min.js', './js/main.js'])
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(
      babel({
        presets: [['@babel/preset-env', { targets: 'defaults' }]],
      })
    )
    .pipe(terser())
    .pipe(gulp.dest('./assets/js'));
}

exports.develop = gulp.series(styles, js, serve, jekyllBuild);
