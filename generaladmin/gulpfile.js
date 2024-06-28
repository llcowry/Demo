var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  stylish = require('jshint-stylish'),
  runSequence = require('run-sequence');

var gvar = {
  "src": "src/",
  "dist": "dist/",
  "scss": "src/dev/scss/",
  "js": "src/dev/js/",
  "audio": "audio/",
  "styles": "style/",
  "scripts": "scripts/",
  "images": "images/",
  "port": 8000
};

// sass
gulp.task('sass', function(cb) {
  return new Promise(function(resolve, reject) {
    return setTimeout(function() {
      return gulp.src(gvar.scss + '*.scss')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({
          outputStyle: 'nested' // nested, expanded, compact, compressed
        }).on('error', function(e) {
          return reject(e) && this.end();
        }))
        .pipe(plugins.autoprefixer({
          browsers: [
            '> 0%'
          ]
        }))
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest(gvar.src + gvar.styles))
        .on('end', resolve)
        .pipe(plugins.connect.reload());
    }, 200);
  }).catch(function(e) {
    return console.warn(e.messageFormatted);
  });
});

// jshint
gulp.task('js:hint', function() {
  return gulp.src([gvar.js + '**/*.js', '!' + gvar.js + 'lxlui/**/*.js', '!' + gvar.js + 'plugins/**/*.js'])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});
gulp.task('js:lxlui', function() {
  return gulp.src(gvar.js + 'lxlui/**/*.js')
    .pipe(plugins.concat('lxlui.js'))
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(gvar.src + gvar.scripts))
    .pipe(plugins.connect.reload());
});
gulp.task('js:plugins', function() {
  return gulp.src(gvar.js + 'plugins/**/*.js')
    .pipe(plugins.mergedir({
      ext: '.js'
    }))
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(gvar.src + gvar.scripts + 'plugins'))
    .pipe(plugins.connect.reload());
});
gulp.task('js', ['js:hint', 'js:lxlui', 'js:plugins'], function() {
  return gulp.src([gvar.js + '*.js'])
    .pipe(plugins.order([
      gvar.js + 'base.js',
      gvar.js + 'common.js'
    ], {
      base: './'
    }))
    .pipe(plugins.concat('common.js'))
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    // .pipe(plugins.uglify())
    .pipe(gulp.dest(gvar.src + gvar.scripts))
    .pipe(plugins.connect.reload());
});

// build css
gulp.task('build:css', function() {
  return gulp.src(gvar.src + gvar.styles + '**/*.css')
    .pipe(plugins.cleanCss())
    .pipe(gulp.dest(gvar.dist + gvar.styles));
});

// build audio
gulp.task('build:audio', function() {
  return gulp.src(gvar.src + gvar.audio + '**/*.mp3')
    .pipe(gulp.dest(gvar.dist + gvar.audio));
});

// build js
gulp.task('build:js', function() {
  return gulp.src(gvar.src + gvar.scripts + '**/*')
    .pipe(gulp.dest(gvar.dist + gvar.scripts));
});

// build img
gulp.task('build:img', function() {
  return gulp.src([gvar.src + gvar.images + '**/*', '!' + gvar.src + gvar.images + '**/*.psd'])
    .pipe(plugins.cache(plugins.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(gvar.dist + gvar.images));
});

// build html
gulp.task('build:html', function() {
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
  return gulp.src([gvar.dist + '/*.*', '!' + gvar.dist + '/.svn', '!' + gvar.dist + '/readme.txt'], {
      read: false
    })
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
  // open('http://localhost:' + gvar.port);
});

// reload svr
gulp.task('reload', function() {
  return gulp.src(gvar.src + '**/*.*')
    .pipe(plugins.connect.reload());
});

// watch
gulp.task('watch', function() {
  gulp.watch(gvar.scss + '**/*.scss', ['sass']);
  gulp.watch(gvar.js + '**/*.js', ['js']);
  gulp.watch([gvar.src + '*.htm*', gvar.src + gvar.images + '**/*', '!' + gvar.src + gvar.images + '**/*.psd'], ['reload']);
});

// start
gulp.task('default', ['connect', 'watch']);

// build
gulp.task('build', function(done) {
  runSequence(['clean'], ['build:audio'], ['build:css'], ['build:js'], ['build:img'], ['build:html'], done);
});
