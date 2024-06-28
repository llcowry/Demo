'use strict';

exports.go = (url) => {
  window.location.href = url;
};

exports.back = () => {
  window.location.back();
};

exports.refresh = () => {
  window.location.reload();
};

exports.confirm = (s) => {
  let url = (arguments.length > 1) ? arguments[1] : window.location.href;
  if (confirm(s)) window.location.href = url;
};