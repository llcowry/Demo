'use strict';

exports.getPageName = () => {
  let u = location.pathname;
  let a = u.split(/\//);
  let m = a.pop().match(/(?:^|\/)($|[^\.]+)/);
  return m[1] ? m[1] : 'index';
};

exports.getQuery = (name) => {
  let u = location.search.slice(1);
  let re = new RegExp(name + '=([^&\\s+]+)');
  let m = u.match(re);
  let v = m ? m[1] : '';
  return (v === '' || isNaN(v)) ? v : v - 0;
};

exports.getHash = (name) => {
  let u = location.hash.slice(1);
  let re = new RegExp(name + '=([^&\\s+]+)');
  let m = u.match(re);
  let v = m ? m[1] : '';
  return (v === '' || isNaN(v)) ? v : v - 0;
};

exports.parseUrl = (url) => {
  let a = document.createElement('a');
  a.href = (url || 'x.html');
  return {
    host: a.host,
    protocol: a.protocol
  };
};

exports.serialize = (obj) => {
  let s = [];
  $.each(obj, function(k, v) {
    s.push(k + '=' + encodeURIComponent(v));
  });
  return s.join('&');
};