'use strict';

console.info('require page a.');

require('commonCss');
require('../scss/components/loading.scss');
require('../scss/a.scss');
require('zepto');

var _ = require('lodash');
var url = require('./utils/url');
var component = url.getQuery('component');
var xl = require('./utils/xl');

if ('dialog' === component) {
  require.ensure([], function(require) {
    var dialog = require('./components/dialog');
    // todo
    $('#dialog').removeClass('none');
  });
}

if ('toast' === component) {
  require.ensure([], function(require) {
    var toast = require('./components/toast');
    // todo
    $('#toast').removeClass('none');
  });
}

require.ensure([], function() {
  var ajax = require('./helpers/ajax');
  var t = _.now();
  ajax.request({
    url: '/api/list',
    data: {
      offset: 0,
      limit: 5
    }
  }).done(function(data) {
    var template = require('../tmpl/list.tpl');
    var html = template({
      list: data || []
    });
    console.info('ajax took %d ms.', _.now() - t);
    $('#list').html(html);
  });
});

var logoImg = require('webpackLogo');
var $logo = $('<img />').attr('src', logoImg);
$('#logo').html($logo);