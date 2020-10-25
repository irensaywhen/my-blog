// Modules
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const child = require('child_process');

function jekyllBuild(done) {
  return child
    .spawn('bundle.bat', ['exec', 'jekyll', 'build', '--watch', '--trace'], {
      stdio: 'inherit',
    })
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
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream());
}

exports.develop = gulp.series(styles, serve, jekyllBuild);
