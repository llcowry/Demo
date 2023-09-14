const { task, src, dest, watch, series, parallel } = require('gulp'),
  $ = require('gulp-load-plugins')(),
  sass = require('gulp-sass')(require('sass')),
  px2rem = require('gulp-px2rem-plugin'),
  uglify = require('gulp-uglify-es').default,
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload,
  // runSequence = require('run-sequence'),
  argv = require('minimist')(process.argv.slice(2));

var gvar = {
  src: './src/',
  dev: './src/dev/',
  dist: '../dist/wap',
  styles: 'css/',
  scripts: 'js/',
  images: 'img/',
  port: 8002,
};

// browserSync svr
task('server', () => {
  browserSync.init({
    notify: false,
    server: { baseDir: gvar.src },
    port: gvar.port,
    open: 'local',
    // injectChanges: true,
    reloadDebounce: 1000,
  });
});

// scss
task('scss', function() {
  return src('./src/dev/scss/**/*.{sass,scss}')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe($.sourcemaps.write())
    .pipe(px2rem({ width_design: 375, valid_num: 6, pieces: 10, ignore_px: [], ignore_selector: ['html', 'body'] }))
    .pipe($.autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe($.rename({ suffix: '.min' }))
    .pipe(dest(gvar.src + gvar.styles))
    .pipe(reload({ stream: true }));
});

// js-vendor
task('js-vendor', function() {
  return src('./src/dev/js/vendor/*.js')
    .pipe($.plumber())
    .pipe($.order(['jquery.min.js']))
    .pipe($.concat('vendors.min.js'))
    .pipe(uglify().on('error', console.error))
    .pipe(dest(gvar.src + gvar.scripts))
    .pipe(reload({ stream: true }));
});

// babel
task('babel', function() {
  return src('./src/dev/js/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.concat('common.js'))
    .pipe($.babel())
    .pipe($.if(argv.env === 'production', uglify().on('error', console.error)))
    .pipe($.sourcemaps.write())
    .pipe(dest(gvar.src + gvar.scripts))
    .pipe(reload({ stream: true }));
});

// dist
task('dist', function() {
  var jsFilter = $.filter(['**/*.js', '!*js/vendors.js'], { restore: true }),
    cssFilter = $.filter('**/*.css', { restore: true }),
    imgFilter = $.filter('**/*.{gif,jpg,jpeg,png,svg}', { restore: true }),
    htmlFilter = $.filter('**/*.htm*', { restore: true });
  return (
    src(['./src/**/*', '!./src/*.json', '!./src/css/global/**', '!./src/**/*.map', '!' + gvar.dev + '**'])
      .pipe(jsFilter)
      .pipe(uglify())
      .pipe(jsFilter.restore)
      .pipe(cssFilter)
      .pipe($.csso())
      .pipe(cssFilter.restore)
      // .pipe(imgFilter)
      // .pipe(
      //   $.cache(
      //     $.imagemin([
      //       $.imagemin.gifsicle({ interlaced: true }),
      //       $.imagemin.mozjpeg({ quality: 75, progressive: true }),
      //       $.imagemin.optipng({ optimizationLevel: 5 }),
      //       $.imagemin.svgo({
      //         plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
      //       }),
      //     ])
      //   )
      // )
      // .pipe(imgFilter.restore)
      // .pipe(htmlFilter)
      // .pipe(
      //   $.htmlmin({
      //     collapseWhitespace: true,
      //     removeComments: false,
      //     removeScriptTypeAttributes: true,
      //     removeStyleLinkTypeAttributes: true,
      //     minifyJS: true,
      //     minifyCSS: true,
      //   })
      // )
      // .pipe($.replace(/<!-- build remove -->[\s\S]*<!-- endbuild -->/, ''))
      // .pipe(htmlFilter.restore)
      // .pipe(
      //   $.revAll.revision({
      //     dontRenameFile: ['.html', 'layer.css', '.json', '.mp3', '.png', '.jpg', '.gif', '.bmp', '.woff', '.ttf', '.eot', '.svg', '.otf'],
      //     dontUpdateReference: ['.html', '.json', '.mp3', '.png', '.jpg', '.gif', '.bmp', '.woff', '.ttf', '.eot', '.svg', '.otf'],
      //   })
      // )
      // .pipe(dest(gvar.dist))
      // .pipe($.revAll.versionFile())
      .pipe(dest(gvar.dist))
  );
});

// clean
task('clean', function() {
  return src([gvar.dist + '**', '!' + gvar.dist + '/.svn', '!' + gvar.dist + '/.git', '!' + gvar.dist + '/readme.txt'], {
    read: false,
  }).pipe($.rimraf({ force: true }));
});

// clear all cache
task('clscache', function(done) {
  return $.cache.clearAll(done);
});

// watch
task('watch', function() {
  watch('./src/dev/scss/**/*.{sass,scss}', parallel('scss'));
  watch('./src/dev/js/vendor/*.js', parallel('js-vendor'));
  watch('./src/dev/js/*.js', parallel('babel'));
  watch('./src/**/*.*').on('change', reload);
});

// start
task('default', parallel('server', 'watch'));

// build
task('build', series('clean', parallel('dist')));
