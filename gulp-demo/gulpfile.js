var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  stylish = require('jshint-stylish');

var gvar = {
  src: "src/",
  styles: "src/styles/",
  scripts: "src/scripts/",
  scss: "src/scss/",
  images: "src/images/",
  dist: "dist",
  port: 8000
};

// sass
gulp.task('sass', function() {
  return gulp.src(gvar.scss + 'main.scss')
    // .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass({
      outputStyle: 'nested'
    }).on('error', plugins.sass.logError))
    // .pipe(plugins.sourcemaps.write())
    .pipe(plugins.autoprefixer({
      browsers: [
        'last 2 versions',
        'ios 6',
        'android 4'
      ]
    }))
    .pipe(gulp.dest(gvar.styles))
    .pipe(plugins.connect.reload());
});

// jshint
gulp.task('jshint', function() {
  return gulp.src([gvar.scripts + '**/*.js', '!' + gvar.scripts + '**/*.min.js'])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    .pipe(plugins.connect.reload());
});

// build css
gulp.task('build-css', function() {
  return gulp.src(gvar.styles + '**/*.css')
    .pipe(plugins.cleanCss())
    .pipe(gulp.dest(gvar.dist + '/styles'));
});

// build js
gulp.task('build-js', function() {
  return gulp.src(gvar.scripts + '**/*')
    // .pipe(plugins.concat('common.js'))
    // .pipe(gulp.dest(gvar.dist + '/scripts'))
    // .pipe(plugins.rename({
    //     suffix: '.min'
    // }))
    // .pipe(plugins.uglify())
    .pipe(gulp.dest(gvar.dist + '/scripts'));
});

// build img
gulp.task('build-img', function() {
  return gulp.src([gvar.images + '**/*', '!' + gvar.src + '**/*.psd'])
    .pipe(plugins.cache(plugins.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(gvar.dist + '/images'));
});

// build html
gulp.task('build-html', function() {
  return gulp.src(gvar.src + '*.htm*')
    .pipe(plugins.htmlmin({
      collapseWhitespace: false,
      removeComments: false,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    }))
    .pipe(gulp.dest(gvar.dist));
});

// clean
gulp.task('clean', function() {
  return gulp.src(gvar.dist, { read: true })
    .pipe(plugins.rimraf());
});

// connect svr
gulp.task('connect', function() {
  var open = require('open');
  plugins.connect.server({
    root: gvar.src,
    port: gvar.port,
    livereload: true
  });
  open('http://localhost:' + gvar.port);
});

// reload svr
gulp.task('reload', function() {
  return gulp.src(gvar.src + '**/*.*')
    .pipe(plugins.connect.reload());
});

// watch
gulp.task('watch', function() {
  gulp.watch(gvar.src + '**/*.scss', ['sass']);
  gulp.watch([gvar.src + '**/*.js', '!' + gvar.src + '**/*.min.js'], ['jshint']);
  gulp.watch([gvar.src + '*.htm*', gvar.images + '**/*', '!' + gvar.images + '**/*.psd'], ['reload']);
});

// start
gulp.task('default', ['connect', 'watch']);

// build
gulp.task('build', ['clean'], function() {
  gulp.start('build-css', 'build-js', 'build-img', 'build-html');
});
