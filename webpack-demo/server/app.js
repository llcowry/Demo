'use strict';

// load native modules
let http = require('http');
let path = require('path');
let util = require('util');

// load 3rd modules
let koa = require('koa');
let liveload = require('koa-liveload');
let router = require('koa-router')();
let serve = require('koa-static');
let colors = require('colors');
let open = require('open');

// load local modules
let pkg = require('../package.json');
let env = process.argv[2] || process.env.NODE_ENV;
let debug = 'production' !== env;
let viewDir = debug ? 'src' : 'dist';
let staticDir = path.resolve(__dirname, '../' + (debug ? 'src' : 'dist'));

// load routes
let routes = require('./routes');

// init framework
let app = koa();

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

// basic settings
app.keys = [pkg.name, pkg.description];
app.proxy = true;

// liveload
app.use(liveload(staticDir, {
  port: pkg.localServer.port2,
  includes: ['js', 'css', 'scss', 'html'],
  excludes: ['lib']
}));

// global events listen
app.on('error', (err, ctx) => {
  err.url = err.url || ctx.request.url;
  console.error(err, ctx);
});

// handle favicon.ico
app.use(function*(next) {
  if (this.url.match(/favicon\.ico$/)) this.body = '';
  yield next;
});

// logger
app.use(function*(next) {
  console.log(this.method.info, this.url);
  yield next;
});

// use routes
routes(router, app, staticDir);
app.use(router.routes());

if (debug) {
  let webpackDevMiddleware = require('koa-webpack-dev-middleware');
  let webpack = require('webpack');
  let webpackConf = require('../config/webpack-dev');
  app.use(webpackDevMiddleware(webpack(webpackConf), webpackConf.devServer));
}

// handle static files
app.use(serve(staticDir, {
  maxage: 0
}));

app = http.createServer(app.callback());

app.listen(pkg.localServer.port, 'localhost', () => {
  let url = util.format('http://%s:%d', 'localhost', pkg.localServer.port);
  console.log('Listening at %s', url);
  open(url);
});