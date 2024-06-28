'use strict';

import report from './report';

let $ajax = (options, retries) => {
  let $defer = $.Deferred();
  let isRetry = options._retry;
  if (!options.url) throw Error('request url required.');
  retries = retries !== undefined ? retries : 2;
  if (!options.type) options.type = 'GET';
  if (!options.timeout) options.timeout = 5000;
  delete options.success;
  delete options.error;
  delete options.complete;
  if (!options.data) options.data = {};
  options.data._t = Date.now();
  let onFail = (err, retries) => {
    let u = options.url.replace(/\//g, '_');
    if (err.code !== undefined) report(u + '_fail_' + err.code);
    if (retries) {
      if (!options._retry) options._retry = 1;
      report(u + '_retry');
      $ajax(options, --retries).done($defer.resolve).fail($defer.reject);
    } else {
      $defer.reject(err);
      report(u + '_err');
    }
  };
  $.ajax(options)
    .done(function(r) {
      if (!r || r.code !== 0) onFail(r, r.code === -9999 ? 0 : retries);
      else $defer.resolve(r.data || {});
      if (isRetry) report(options.url.replace(/\//g, '_') + '_succ_retry');
    })
    .fail(function(xhr, errType, error) {
      let code = xhr.status;
      // errType: "timeout", "error", "abort", "parsererror"
      if (!(code >= 500 && code <= 502) || !/timeout|error/.test(errType)) retries = 0;
      onFail(error || { message: 'network error, please retry.' }, retries);
    });
  return $defer.promise();
};

exports.req = exports.request = $ajax;