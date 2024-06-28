'use strict';

let fs = require('fs');
let render = require('koa-ejs');
let proxy = require('koa-proxy');

module.exports = (router, app, staticDir) => {
  render(app, {
    root: __dirname,
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: true
  });
  router.get('/', function*() {
    let pages = fs.readdirSync(staticDir);
    pages = pages.filter((page) => {
      return /\.html$/.test(page);
    });
    yield this.render('index', {
      pages: pages || []
    });
  });
  // mock api
  router.get('/api/list', function*() {
    let list = require('../data/list');
    let query = this.query || {};
    let offset = query.offset || 0;
    let limit = query.limit || 10;
    let diff = limit - list.length;
    if (diff <= 0) {
      this.body = {
        code: 0,
        data: list.slice(0, limit)
      };
    } else {
      let arr = list.slice(0, list.length);
      let i = 0;
      while (diff--) arr.push(arr[i++]);
      this.body = {
        code: 0,
        data: arr
      };
    }
  });
  // proxy api
  router.get('/api/proxy', proxy({
    url: '[api url]'
  }));
}