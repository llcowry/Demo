'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// rem
(function (doc, win) {
  var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function recalc() {
    docEl.style.fontSize = docEl.clientWidth / 10 + 'px';
  };
  recalc();
  win.addEventListener(resizeEvt, recalc, false);
})(document, window);

// 原型扩展
$.extend(Date.prototype, {
  format: function format(s) {
    if (s.length == 1 && !/^[0-9]+.?[0-9]*$/.test(s)) {
      return this.getFullYear() + s + (this.getMonth() + 1) + s + this.getDate();
    }
    var week = ['日', '一', '二', '三', '四', '五', '六'];
    s = s.replace(/yyyy|YYYY/, this.getFullYear());
    s = s.replace(/yy|YY/, this.getYear() % 100 > 9 ? (this.getYear() % 100).toString() : '0' + this.getYear() % 100);
    s = s.replace(/MM/, this.getMonth() + 1 > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1).toString());
    s = s.replace(/M/g, this.getMonth() + 1);
    s = s.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    s = s.replace(/d|D/g, this.getDate());
    s = s.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    s = s.replace(/h|H/g, this.getHours());
    s = s.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    s = s.replace(/m/g, this.getMinutes());
    s = s.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    s = s.replace(/s|S/g, this.getSeconds());
    s = s.replace(/ms|MS/, this.getMilliseconds());
    s = s.replace(/q|Q/, Math.floor((this.getMonth() + 3) / 3));
    s = s.replace(/w|W/g, week[this.getDay()]);
    return s;
  }
});

var util = {
  api: 'https://www.52sok.com',
  appSecret: '9c5996471853f01831bf9acfabb0d318',
  // 获取url参数
  urlArg: function urlArg(s) {
    var params = new URLSearchParams(window.location.search);
    return params.get(s);
  },
  // 复制数据
  copy: function copy(s) {
    var o = document.createElement('textarea');
    o.value = s;
    document.body.appendChild(o);
    o.select();
    if (document.execCommand('copy')) {
      document.execCommand('copy');
    }
    document.body.removeChild(o);
  },
  // 页面刷新
  refresh: function refresh() {
    location.reload();
  },
  // 返回上一页
  back: function back() {
    history.back();
  },
  // 页面跳转
  goto: function goto(url) {
    location.href = url;
  },
  // 打开新页面
  open: function open(url) {
    var a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    a.setAttribute('id', 'open-temp-link');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(document.getElementById('open-temp-link'));
  },
  // 是否为空
  isN: function isN(s, b) {
    if (typeof s == 'number') s = s.toString();
    if (b && (s == '' || typeof s == 'undefined')) return true;else if (s == '' || s == null || typeof s == 'undefined') return true;else return false;
  },
  // HTML解码
  htmlDecode: function htmlDecode(text) {
    var temp = document.createElement('div');
    temp.innerHTML = text;
    var output = temp.innerText || temp.textContent;
    temp = null;
    return output;
  },
  // 格式化时间
  formatTime: function formatTime(time, option) {
    if (('' + time).length === 10) {
      time = parseInt(time) * 1000;
    } else {
      time = +time;
    }
    var d = new Date(time);
    var now = Date.now();
    var diff = (now - d) / 1000;
    if (diff < 30) {
      return '刚刚';
    } else if (diff < 3600) {
      return Math.ceil(diff / 60) + '分钟前';
    } else if (diff < 3600 * 24) {
      return Math.ceil(diff / 3600) + '小时前';
    } else if (diff < 3600 * 24 * 2) {
      return '1天前';
    }
    if (option) {
      return parseTime(time, option);
    } else {
      return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分';
    }
  },
  // 补0
  addZero: function addZero(d) {
    return d < 10 ? '0' + d : d;
  },
  // 防抖
  debounce: function debounce(fn) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;

    var timer = null;
    return function () {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(function () {
        timer = null;
        fn.apply(this, arguments);
      }, delay);
    };
  },
  // 节流
  throttle: function throttle(fn) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;

    var last = void 0,
        timer = null;
    return function () {
      var th = this;
      var args = arguments;
      var now = +new Date();
      if (last && now - last < delay) {
        clearTimeout(timer);
        timer = setTimeout(function () {
          last = now;
          fn.apply(th, args);
        }, delay);
      } else {
        last = now;
        fn.apply(th, args);
      }
    };
  },
  // 请求数据
  req: function req(options) {
    var _success = options.success,
        _error = options.error,
        err = options.err;
    options.headers = options.headers || {};
    var timestamp = new Date().getTime();
    options.headers['source'] = 'web';
    options.headers['timestamp'] = timestamp;
    options.headers['sign'] = md5(util.appSecret + timestamp);
    delete options.success;
    delete options.error;
    options.timeout = 60000;
    options.contentType = 'application/json; charset=utf-8';
    options.data = JSON.stringify(options.data);
    if (util.api.indexOf(window.location.host) == -1) {
      util.api = window.location.protocol + '//' + window.location.host;
    }
    options.url = util.api + options.url;
    return $.ajax($.extend({
      type: 'get',
      dataType: 'json',
      success: function success(res) {
        layer.closeAll('loading');
        if (res.code == 1) {
          typeof options.done === 'function' && options.done(res);
        } else {
          layer.msg(res.msg || '返回状态码异常', { icon: 5 });
          typeof err === 'function' && err();
        }
        typeof _success === 'function' && _success(res);
      },
      error: function error(e, code) {
        typeof _error === 'function' && _error(code);
      }
    }, options));
  },
  // 单行文本向上滚动
  scrollText: function scrollText(o) {
    var speed = arguments.length > 1 ? arguments[1] : 3;
    var demo = $(o);
    var _timer = setInterval(function () {
      setMove();
    }, speed * 1000);
    demo.bind('mouseover', function () {
      clearInterval(_timer);
    });
    demo.bind('mouseout', function () {
      _timer = setInterval(function () {
        setMove();
      }, speed * 1000);
    });
    function setMove() {
      demo.find('ul:first').animate({
        marginTop: '-' + demo.height() + 'px'
      }, 500, function () {
        $(this).css({ marginTop: '0px' }).find('li:first').appendTo(this);
      });
    }
  },
  // Tab切换
  toggleTab: function toggleTab() {
    var o = arguments.length > 0 ? arguments[0] : 'body';
    var item = arguments.length > 1 ? arguments[1] : '.tab-item';
    var content = arguments.length > 2 ? arguments[2] : '.tab-content';
    var ev = arguments.length > 3 ? arguments[3] : 'mouseover';
    var css = arguments.length > 4 ? arguments[4] : 'active';
    var tabItem = $(o + ' ' + item + ' ul li');
    var tabCon = $(o + ' ' + content + ' > div');
    tabCon.hide().eq(0).show();
    tabItem.bind(ev, function () {
      tabItem.removeClass(css);
      $(this).addClass(css);
      tabCon.stop().hide().eq($(this).index()).show();
    });
  },
  // Select跳转
  selectJump: function selectJump(o) {
    var url = $(o).val();
    if (url == '') return;
    var link = $('<a target="_blank"></a>').attr('href', url).html('&nbsp;').hide();
    $(o).parent().append(link);
    link[0].click();
    link.remove();
  },
  // backtotop
  loadBackToTop: function loadBackToTop() {
    var s = '<aside class="backtoTop"><div></div></aside>';
    $(s).appendTo($('body'));
    var backtoTop = $('.backtoTop');
    $(window).scroll(function () {
      if ($(window).scrollTop() > 200) {
        backtoTop.fadeIn('fast');
      } else {
        backtoTop.fadeOut('fast');
      }
    });
    backtoTop.click(function () {
      $('body,html').animate({ scrollTop: 0 }, 500);
      return false;
    });
  },
  // 预约试听
  reservationCourse: function reservationCourse(index) {
    var nicknameObj = $('input[name=nickname]'),
        nickname = nicknameObj.val().trim(),
        mobileObj = $('input[name=mobile]'),
        mobile = mobileObj.val().trim(),
        schoolId = $('input[name=schoolId]').val(),
        courseId = $('input[name=courseId]').val();
    if (util.isN(nickname)) {
      nicknameObj.focus();
      layer.tips('请输入您的姓名！', nicknameObj, {
        tips: 1,
        time: 4000
      });
      return false;
    }
    if (util.isN(mobile)) {
      mobileObj.focus();
      layer.tips('请输入您的手机号码！', mobileObj, {
        tips: 1,
        time: 4000
      });
      return false;
    }
    if (!new RegExp(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/).test(mobile)) {
      mobileObj.focus();
      layer.tips('请输入正确的手机号码！', mobileObj, {
        tips: 1,
        time: 4000
      });
      return false;
    }
    util.req({
      type: 'post',
      url: '/home/order/add',
      data: {
        schoolId: schoolId,
        courseId: courseId,
        nickname: nickname,
        mobile: mobile
      },
      done: function done(res) {
        layer.msg(res.msg, { icon: 1 });
        if (index) {
          layer.close(index);
        } else {
          setTimeout(function () {
            util.refresh();
          }, 3000);
        }
      }
    });
  },
  // 招生合作
  subscribeJoinus: function subscribeJoinus() {
    var nicknameObj = $('input[name=nickname]'),
        nickname = nicknameObj.val().trim(),
        mobileObj = $('input[name=mobile]'),
        mobile = mobileObj.val().trim(),
        content = $('input[name=content]').val().trim();
    if (util.isN(nickname)) {
      nicknameObj.focus();
      layer.tips('请输入您的姓名！', nicknameObj, {
        tips: 1,
        time: 4000
      });
      return false;
    }
    if (util.isN(mobile)) {
      mobileObj.focus();
      layer.tips('请输入您的手机号码！', mobileObj, {
        tips: 1,
        time: 4000
      });
      return false;
    }
    if (!new RegExp(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/).test(mobile)) {
      mobileObj.focus();
      layer.tips('请输入正确的手机号码！', mobileObj, {
        tips: 1,
        time: 4000
      });
      return false;
    }
    util.req({
      type: 'post',
      url: '/home/join/add',
      data: {
        nickname: nickname,
        mobile: mobile,
        content: content
      },
      done: function done(res) {
        layer.msg(res.msg, { icon: 1 });
        setTimeout(function () {
          util.refresh();
        }, 3000);
      }
    });
  },
  // 搜索处理
  toSearch: function toSearch() {
    var keywordObj = $('input[name=keyword]'),
        keyword = keywordObj.val().trim();
    if (util.isN(keyword)) {
      keywordObj.focus();
      layer.tips('请输入您要找的内容！', keywordObj, {
        tips: 1,
        time: 4000
      });
      return false;
    }
    util.goto('/home/course/search.html?keyword=' + keyword);
  },
  // notify
  notify: function notify(s, t) {
    t = t || 2;
    t = t * 1000;
    var tipClass = 'n' + new Date().getTime();
    $('body').append('<div class="notify ' + tipClass + '"><div class="notify-cnt"><p>' + s + '</p></div></div>');
    window.setTimeout(function (tipClass) {
      $('.notify.' + tipClass + ' .notify-cnt').addClass('out');
      window.setTimeout(function (tipClass) {
        $('.notify.' + tipClass).remove();
      }, 500, tipClass);
    }, t, tipClass);
  },
  // special dialog
  sdialog: function sdialog(s) {
    $('body').append('<div class="sdialog"><div class="sdlg-box"><div class="sdlg-cnt">' + s + '</div></div></div>');
  },
  // confirm
  confirm: function confirm(opts) {
    var title = opts.title || '系统提示';
    var content = opts.content || '';
    var s = '';
    $('#confirm').remove();
    s += '<div class="confirm" id="confirm"><div class="ani-show"><div class="cfm-box"><div class="cfm-title">' + title + '</div><div class="cfm-cnt">' + content + '</div><div class="cfm-btm col-12">';
    if (opts.buttons == 1) {
      s += '<a class="col-12 btn-one" id="btnOk">确定</li>';
    } else {
      s += '<a class="col-6" id="btnCancel">取消</li>';
      s += '<a class="col-6 btn-right" id="btnOk">确定</li>';
    }
    s += '</div></div></div></div>';
    $('body').append(s);
    var o = $('#confirm');
    $('#btnCancel').click(function () {
      if (opts.cancelcb) opts.cancelcb();
      o.remove();
    });
    $('#btnOk').click(function () {
      if (opts.callback) opts.callback();
      o.remove();
    });
  },
  // dialog
  dialog: function dialog(opts) {
    var title = opts.title || '系统提示';
    var content = opts.content || '';
    $('#dialog').remove();
    $('body').append('<div class="dialog" id="dialog"><div class="ani-show"><div class="dlg-box"><div class="dlg-title">' + title + '<a id="btnClose"><i class="icon-remove"></i></a></div><div class="dlg-cnt">' + content + '</div></div></div></div>');
    var o = $('#dialog');
    $('#btnClose').off('click').click(function () {
      if (opts.cancelcb) opts.cancelcb();
      o.remove();
    });
    if (opts.loaded) {
      opts.loaded();
    }
  },
  closeDialog: function closeDialog(cb) {
    var o = $('#dialog');
    if (o.length > 0) {
      if (cb) cb();
      o.remove();
    }
  },
  // loading
  loading: function loading(o, s) {
    $('#loading').remove();
    if (o) {
      var loading = $('#loading');
      if (loading.length > 0) {
        loading.find('.loading-cnt').html(s);
      } else {
        if ((typeof o === 'undefined' ? 'undefined' : _typeof(o)) != 'object') o = $('body');
        o.append('<div id="loading">\
            <div class="loading-mask mask-transparent"></div>\
            <div class="loading">\
              <i class="loader"></i>\
              <p class="loading-cnt">' + (s ? s : '数据加载中') + '</p>\
              </div>\
            </div>');
      }
    } else {
      $('body').append('<div id="loading">\
          <div class="loading-mask mask-write"></div>\
          <div class="loading-box">\
            <div class="loader"></div>\
          </div>\
        </div>');
      var h = $(window).height();
      h -= $('header').height();
      h -= $('footer').height();
      $('#loading').height(h);
    }
  },
  hideLoading: function hideLoading() {
    var o = $('#loading');
    if (o.length > 0) {
      o.find('loading-mask').addClass('ani-hide');
      window.setTimeout(function () {
        o.remove();
      }, 300);
    }
  },
  // toast
  toast: function toast(opts) {
    var o = opts.target || $('body'),
        t = opts.type,
        s = opts.content,
        c = opts.close;
    var toast = $('#toast');
    if (toast.length > 0 && toast.attr('data-type') == t) {
      toast.find('.toast-cnt').html(s);
    } else {
      $('#toast').remove();
      o.append('<div id="toast" data-type="' + t + '"><div class="toast-mask mask-transparent"></div><div class="toast"><i class="toast-icon f-icon-' + t + '"></i><p class="toast-cnt">' + s + '</p></div></div>');
    }
    if (c) {
      util.hideToast(c);
    }
  },
  hideToast: function hideToast(t) {
    var t = t || 300,
        toast = $('#toast');
    if (toast.length > 0) {
      toast.find('toast-mask').addClass('ani-hide');
      window.setTimeout(function () {
        toast.remove();
      }, t);
    }
  }
};

// 默认加载
$(function () {
  // 处理链接
  $('a[href="#"]').each(function () {
    $(this).attr('href', 'javascript:;');
  });
  // 处理返回链接
  $('.js-back').click(function () {
    util.back();
  });
  // 处理跳转链接
  $('.js-goto').click(function () {
    util.goto($(this).data('url'));
  });
  // 加载浮动栏
  if (!$('.nobacktop').length) {
    util.loadBackToTop();
  }
  // 在线咨询
  var btnConsult = $('.btn-consult');
  if (btnConsult.length) {
    btnConsult.click(function () {
      // util.goto('http://wpa.qq.com/msgrd?v=3&uin=' + qq + '&site=qq&menu=yes');
      util.goto('mqqwpa://im/chat?chat_type=wpa&uin=' + qq + '&version=1&src_type=web&web_src=oicqzone.com');
    });
  }
  // 预约试听
  var btnReservation = $('.btn-reservation');
  if (btnReservation.length) {
    btnReservation.click(function () {
      util.debounce(util.reservationCourse(null), 500);
    });
  }
  // 立即报名
  var btnApply = $('.btn-apply');
  if (btnApply.length) {
    btnApply.click(function () {
      var schoolId = $(this).attr('data-schoolId');
      var courseId = $(this).attr('data-courseId');
      var s = '<div class="apply-form">\
          <input type="hidden" name="schoolId" value="{{schoolId}}">\
          <input type="hidden" name="courseId" value="{{courseId}}">\
          <p class="p1">请填写您的个人信息，稍后将有平台客服联系您</p>\
          <div class="ipt-wrap">\
            <input type="text" name="nickname" placeholder="请输入您的姓名" />\
          </div>\
          <div class="ipt-wrap">\
            <input type="text" name="mobile" placeholder="请输入您的手机号码" />\
          </div>\
          <div class="btn-wrap">\
            <button class="btn-apply">确认</button>\
          </div>\
          <p class="p2">{{tel}}</p>\
          <p class="p3">欢迎拨打平台热线主动联系我们</p>\
        </div>';
      schoolId = schoolId ? schoolId : 0;
      courseId = courseId ? courseId : 0;
      s = s.replace('{{schoolId}}', schoolId);
      s = s.replace('{{courseId}}', courseId);
      s = s.replace('{{tel}}', tel);
      layer.open({
        type: 1,
        title: '预约试听',
        skin: 'layui-layer-rim',
        closeBtn: 0,
        anim: 2,
        shadeClose: true,
        area: ['400px', '400px'],
        content: s,
        success: function success(layero, index) {
          layero.find('.btn-apply').click(function () {
            util.debounce(util.reservationCourse(index), 500);
          });
        }
      });
    });
  }
  // 招生合作
  var btnSubscribe = $('.btn-subscribe');
  if (btnSubscribe.length) {
    btnSubscribe.click(function () {
      util.debounce(util.subscribeJoinus(), 500);
    });
  }
  // 搜索处理
  var btnSearch = $('.btn-search');
  if (btnSearch.length) {
    btnSearch.click(function () {
      util.debounce(util.toSearch(), 500);
    });
  }
  // 分页处理
  var pagebar = $('.pagebar');
  if (pagebar.length) {
    pagebar.pagination({
      current: util.urlArg('page') || 1, // 当前页
      pageCount: pagebar.attr('data-pageCount') || 0, // 总页数
      showData: pagebar.attr('data-pageSize') || 10, // 每页显示记录
      mode: 'unfixed',
      count: 2, // 前后显示页码
      coping: true,
      prevContent: '<',
      nextContent: '>',
      callback: function callback(api) {
        var url = window.location.href;
        var num = url.indexOf('?');
        var params = '';
        if (num != -1) {
          params = url.substr(num + 1);
          params = '&' + params.replace(/page=(\d+)(\&*)/gm, '');
        }
        url = '?page=' + api.getCurrent() + (params == '&' ? '' : params);
        util.goto(url);
      }
    });
  }
  // 地区选择
  var btnLocation = $('.btn-location');
  btnLocation.click(function () {
    var locationBox = $('.location');
    locationBox.show();
    locationBox.click(function () {
      window.setTimeout(function () {
        locationBox.hide();
      }, 300);
    });
  });
  // 导航菜单
  var btnMenu = $('.btn-menu');
  btnMenu.click(function () {
    var menuBox = $('.menu');
    menuBox.show();
    menuBox.click(function () {
      window.setTimeout(function () {
        menuBox.hide();
      }, 300);
    });
    $('.menu-box-close').click(function () {
      window.setTimeout(function () {
        menuBox.hide();
      }, 300);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwuanMiXSwibmFtZXMiOlsiZG9jIiwid2luIiwiZG9jRWwiLCJkb2N1bWVudEVsZW1lbnQiLCJyZXNpemVFdnQiLCJ3aW5kb3ciLCJyZWNhbGMiLCJzdHlsZSIsImZvbnRTaXplIiwiY2xpZW50V2lkdGgiLCJhZGRFdmVudExpc3RlbmVyIiwiZG9jdW1lbnQiLCIkIiwiZXh0ZW5kIiwiRGF0ZSIsInByb3RvdHlwZSIsImZvcm1hdCIsInMiLCJsZW5ndGgiLCJ0ZXN0IiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsImdldERhdGUiLCJ3ZWVrIiwicmVwbGFjZSIsImdldFllYXIiLCJ0b1N0cmluZyIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImdldFNlY29uZHMiLCJnZXRNaWxsaXNlY29uZHMiLCJNYXRoIiwiZmxvb3IiLCJnZXREYXkiLCJ1dGlsIiwiYXBpIiwiYXBwU2VjcmV0IiwidXJsQXJnIiwicGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwibG9jYXRpb24iLCJzZWFyY2giLCJnZXQiLCJjb3B5IiwibyIsImNyZWF0ZUVsZW1lbnQiLCJ2YWx1ZSIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInNlbGVjdCIsImV4ZWNDb21tYW5kIiwicmVtb3ZlQ2hpbGQiLCJyZWZyZXNoIiwicmVsb2FkIiwiYmFjayIsImhpc3RvcnkiLCJnb3RvIiwidXJsIiwiaHJlZiIsIm9wZW4iLCJhIiwic2V0QXR0cmlidXRlIiwiY2xpY2siLCJnZXRFbGVtZW50QnlJZCIsImlzTiIsImIiLCJodG1sRGVjb2RlIiwidGV4dCIsInRlbXAiLCJpbm5lckhUTUwiLCJvdXRwdXQiLCJpbm5lclRleHQiLCJ0ZXh0Q29udGVudCIsImZvcm1hdFRpbWUiLCJ0aW1lIiwib3B0aW9uIiwicGFyc2VJbnQiLCJkIiwibm93IiwiZGlmZiIsImNlaWwiLCJwYXJzZVRpbWUiLCJhZGRaZXJvIiwiZGVib3VuY2UiLCJmbiIsImRlbGF5IiwidGltZXIiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiYXBwbHkiLCJhcmd1bWVudHMiLCJ0aHJvdHRsZSIsImxhc3QiLCJ0aCIsImFyZ3MiLCJyZXEiLCJvcHRpb25zIiwic3VjY2VzcyIsImVycm9yIiwiZXJyIiwiaGVhZGVycyIsInRpbWVzdGFtcCIsImdldFRpbWUiLCJtZDUiLCJ0aW1lb3V0IiwiY29udGVudFR5cGUiLCJkYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsImluZGV4T2YiLCJob3N0IiwicHJvdG9jb2wiLCJhamF4IiwidHlwZSIsImRhdGFUeXBlIiwicmVzIiwibGF5ZXIiLCJjbG9zZUFsbCIsImNvZGUiLCJkb25lIiwibXNnIiwiaWNvbiIsImUiLCJzY3JvbGxUZXh0Iiwic3BlZWQiLCJkZW1vIiwiX3RpbWVyIiwic2V0SW50ZXJ2YWwiLCJzZXRNb3ZlIiwiYmluZCIsImNsZWFySW50ZXJ2YWwiLCJmaW5kIiwiYW5pbWF0ZSIsIm1hcmdpblRvcCIsImhlaWdodCIsImNzcyIsImFwcGVuZFRvIiwidG9nZ2xlVGFiIiwiaXRlbSIsImNvbnRlbnQiLCJldiIsInRhYkl0ZW0iLCJ0YWJDb24iLCJoaWRlIiwiZXEiLCJzaG93IiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsInN0b3AiLCJpbmRleCIsInNlbGVjdEp1bXAiLCJ2YWwiLCJsaW5rIiwiYXR0ciIsImh0bWwiLCJwYXJlbnQiLCJhcHBlbmQiLCJyZW1vdmUiLCJsb2FkQmFja1RvVG9wIiwiYmFja3RvVG9wIiwic2Nyb2xsIiwic2Nyb2xsVG9wIiwiZmFkZUluIiwiZmFkZU91dCIsInJlc2VydmF0aW9uQ291cnNlIiwibmlja25hbWVPYmoiLCJuaWNrbmFtZSIsInRyaW0iLCJtb2JpbGVPYmoiLCJtb2JpbGUiLCJzY2hvb2xJZCIsImNvdXJzZUlkIiwiZm9jdXMiLCJ0aXBzIiwiUmVnRXhwIiwiY2xvc2UiLCJzdWJzY3JpYmVKb2ludXMiLCJ0b1NlYXJjaCIsImtleXdvcmRPYmoiLCJrZXl3b3JkIiwibm90aWZ5IiwidCIsInRpcENsYXNzIiwic2RpYWxvZyIsImNvbmZpcm0iLCJvcHRzIiwidGl0bGUiLCJidXR0b25zIiwiY2FuY2VsY2IiLCJjYWxsYmFjayIsImRpYWxvZyIsIm9mZiIsImxvYWRlZCIsImNsb3NlRGlhbG9nIiwiY2IiLCJsb2FkaW5nIiwiaCIsImhpZGVMb2FkaW5nIiwidG9hc3QiLCJ0YXJnZXQiLCJjIiwiaGlkZVRvYXN0IiwiZWFjaCIsImJ0bkNvbnN1bHQiLCJxcSIsImJ0blJlc2VydmF0aW9uIiwiYnRuQXBwbHkiLCJ0ZWwiLCJza2luIiwiY2xvc2VCdG4iLCJhbmltIiwic2hhZGVDbG9zZSIsImFyZWEiLCJsYXllcm8iLCJidG5TdWJzY3JpYmUiLCJidG5TZWFyY2giLCJwYWdlYmFyIiwicGFnaW5hdGlvbiIsImN1cnJlbnQiLCJwYWdlQ291bnQiLCJzaG93RGF0YSIsIm1vZGUiLCJjb3VudCIsImNvcGluZyIsInByZXZDb250ZW50IiwibmV4dENvbnRlbnQiLCJudW0iLCJzdWJzdHIiLCJnZXRDdXJyZW50IiwiYnRuTG9jYXRpb24iLCJsb2NhdGlvbkJveCIsImJ0bk1lbnUiLCJtZW51Qm94Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQSxDQUFBLFVBQUFBLEdBQUEsRUFBQUMsR0FBQSxFQUFBO0FBQ0EsTUFBQUMsUUFBQUYsSUFBQUcsZUFBQTtBQUFBLE1BQ0FDLFlBQUEsdUJBQUFDLE1BQUEsR0FBQSxtQkFBQSxHQUFBLFFBREE7QUFBQSxNQUVBQyxTQUFBLFNBQUFBLE1BQUEsR0FBQTtBQUNBSixVQUFBSyxLQUFBLENBQUFDLFFBQUEsR0FBQU4sTUFBQU8sV0FBQSxHQUFBLEVBQUEsR0FBQSxJQUFBO0FBQ0EsR0FKQTtBQUtBSDtBQUNBTCxNQUFBUyxnQkFBQSxDQUFBTixTQUFBLEVBQUFFLE1BQUEsRUFBQSxLQUFBO0FBQ0EsQ0FSQSxFQVFBSyxRQVJBLEVBUUFOLE1BUkE7O0FBVUE7QUFDQU8sRUFBQUMsTUFBQSxDQUFBQyxLQUFBQyxTQUFBLEVBQUE7QUFDQUMsVUFBQSxnQkFBQUMsQ0FBQSxFQUFBO0FBQ0EsUUFBQUEsRUFBQUMsTUFBQSxJQUFBLENBQUEsSUFBQSxDQUFBLG1CQUFBQyxJQUFBLENBQUFGLENBQUEsQ0FBQSxFQUFBO0FBQ0EsYUFBQSxLQUFBRyxXQUFBLEtBQUFILENBQUEsSUFBQSxLQUFBSSxRQUFBLEtBQUEsQ0FBQSxJQUFBSixDQUFBLEdBQUEsS0FBQUssT0FBQSxFQUFBO0FBQ0E7QUFDQSxRQUFBQyxPQUFBLENBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxDQUFBO0FBQ0FOLFFBQUFBLEVBQUFPLE9BQUEsQ0FBQSxXQUFBLEVBQUEsS0FBQUosV0FBQSxFQUFBLENBQUE7QUFDQUgsUUFBQUEsRUFBQU8sT0FBQSxDQUFBLE9BQUEsRUFBQSxLQUFBQyxPQUFBLEtBQUEsR0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLEtBQUFBLE9BQUEsS0FBQSxHQUFBLEVBQUFDLFFBQUEsRUFBQSxHQUFBLE1BQUEsS0FBQUQsT0FBQSxLQUFBLEdBQUEsQ0FBQTtBQUNBUixRQUFBQSxFQUFBTyxPQUFBLENBQUEsSUFBQSxFQUFBLEtBQUFILFFBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsS0FBQUEsUUFBQSxLQUFBLENBQUEsRUFBQUssUUFBQSxFQUFBLEdBQUEsTUFBQSxDQUFBLEtBQUFMLFFBQUEsS0FBQSxDQUFBLEVBQUFLLFFBQUEsRUFBQSxDQUFBO0FBQ0FULFFBQUFBLEVBQUFPLE9BQUEsQ0FBQSxJQUFBLEVBQUEsS0FBQUgsUUFBQSxLQUFBLENBQUEsQ0FBQTtBQUNBSixRQUFBQSxFQUFBTyxPQUFBLENBQUEsT0FBQSxFQUFBLEtBQUFGLE9BQUEsS0FBQSxDQUFBLEdBQUEsS0FBQUEsT0FBQSxHQUFBSSxRQUFBLEVBQUEsR0FBQSxNQUFBLEtBQUFKLE9BQUEsRUFBQSxDQUFBO0FBQ0FMLFFBQUFBLEVBQUFPLE9BQUEsQ0FBQSxNQUFBLEVBQUEsS0FBQUYsT0FBQSxFQUFBLENBQUE7QUFDQUwsUUFBQUEsRUFBQU8sT0FBQSxDQUFBLE9B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TixFQUFBLGVBQUEsQ0FBQTtBQUNBeU4sY0FBQXZLLEtBQUEsQ0FBQSxZQUFBO0FBQ0EsUUFBQXdLLGNBQUExTixFQUFBLFdBQUEsQ0FBQTtBQUNBME4sZ0JBQUFyRixJQUFBO0FBQ0FxRixnQkFBQXhLLEtBQUEsQ0FBQSxZQUFBO0FBQ0F6RCxhQUFBbUYsVUFBQSxDQUFBLFlBQUE7QUFDQThJLG9CQUFBdkYsSUFBQTtBQUNBLE9BRkEsRUFFQSxHQUZBO0FBR0EsS0FKQTtBQUtBLEdBUkE7QUFTQTtBQUNBLE1BQUF3RixVQUFBM04sRUFBQSxXQUFBLENBQUE7QUFDQTJOLFVBQUF6SyxLQUFBLENBQUEsWUFBQTtBQUNBLFFBQUEwSyxVQUFBNU4sRUFBQSxPQUFBLENBQUE7QUFDQTROLFlBQUF2RixJQUFBO0FBQ0F1RixZQUFBMUssS0FBQSxDQUFBLFlBQUE7QUFDQXpELGFBQUFtRixVQUFBLENBQUEsWUFBQTtBQUNBZ0osZ0JBQUF6RixJQUFBO0FBQ0EsT0FGQSxFQUVBLEdBRkE7QUFHQSxLQUpBO0FBS0FuSSxNQUFBLGlCQUFBLEVBQUFrRCxLQUFBLENBQUEsWUFBQTtBQUNBekQsYUFBQW1GLFVBQUEsQ0FBQSxZQUFBO0FBQ0FnSixnQkFBQXpGLElBQUE7QUFDQSxPQUZBLEVBRUEsR0FGQTtBQUdBLEtBSkE7QUFLQSxHQWJBO0FBY0EsQ0EvSUEiLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcmVtXG4oZnVuY3Rpb24oZG9jLCB3aW4pIHtcbiAgdmFyIGRvY0VsID0gZG9jLmRvY3VtZW50RWxlbWVudCxcbiAgICByZXNpemVFdnQgPSAnb3JpZW50YXRpb25jaGFuZ2UnIGluIHdpbmRvdyA/ICdvcmllbnRhdGlvbmNoYW5nZScgOiAncmVzaXplJyxcbiAgICByZWNhbGMgPSBmdW5jdGlvbigpIHtcbiAgICAgIGRvY0VsLnN0eWxlLmZvbnRTaXplID0gZG9jRWwuY2xpZW50V2lkdGggLyAxMCArICdweCc7XG4gICAgfTtcbiAgcmVjYWxjKCk7XG4gIHdpbi5hZGRFdmVudExpc3RlbmVyKHJlc2l6ZUV2dCwgcmVjYWxjLCBmYWxzZSk7XG59KShkb2N1bWVudCwgd2luZG93KTtcblxuLy8g5Y6f5Z6L5omp5bGVXG4kLmV4dGVuZChEYXRlLnByb3RvdHlwZSwge1xuICBmb3JtYXQ6IGZ1bmN0aW9uKHMpIHtcbiAgICBpZiAocy5sZW5ndGggPT0gMSAmJiAhL15bMC05XSsuP1swLTldKiQvLnRlc3QocykpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEZ1bGxZZWFyKCkgKyBzICsgKHRoaXMuZ2V0TW9udGgoKSArIDEpICsgcyArIHRoaXMuZ2V0RGF0ZSgpO1xuICAgIH1cbiAgICB2YXIgd2VlayA9IFsn5pelJywgJ+S4gCcsICfkuownLCAn5LiJJywgJ+WbmycsICfkupQnLCAn5YWtJ107XG4gICAgcyA9IHMucmVwbGFjZSgveXl5eXxZWVlZLywgdGhpcy5nZXRGdWxsWWVhcigpKTtcbiAgICBzID0gcy5yZXBsYWNlKC95eXxZWS8sIHRoaXMuZ2V0WWVhcigpICUgMTAwID4gOSA/ICh0aGlzLmdldFllYXIoKSAlIDEwMCkudG9TdHJpbmcoKSA6ICcwJyArICh0aGlzLmdldFllYXIoKSAlIDEwMCkpO1xuICAgIHMgPSBzLnJlcGxhY2UoL01NLywgdGhpcy5nZXRNb250aCgpICsgMSA+IDkgPyAodGhpcy5nZXRNb250aCgpICsgMSkudG9TdHJpbmcoKSA6ICcwJyArICh0aGlzLmdldE1vbnRoKCkgKyAxKS50b1N0cmluZygpKTtcbiAgICBzID0gcy5yZXBsYWNlKC9NL2csIHRoaXMuZ2V0TW9udGgoKSArIDEpO1xuICAgIHMgPSBzLnJlcGxhY2UoL2RkfERELywgdGhpcy5nZXREYXRlKCkgPiA5ID8gdGhpcy5nZXREYXRlKCkudG9TdHJpbmcoKSA6ICcwJyArIHRoaXMuZ2V0RGF0ZSgpKTtcbiAgICBzID0gcy5yZXBsYWNlKC9kfEQvZywgdGhpcy5nZXREYXRlKCkpO1xuICAgIHMgPSBzLnJlcGxhY2UoL2hofEhILywgdGhpcy5nZXRIb3VycygpID4gOSA/IHRoaXMuZ2V0SG91cnMoKS50b1N0cmluZygpIDogJzAnICsgdGhpcy5nZXRIb3VycygpKTtcbiAgICBzID0gcy5yZXBsYWNlKC9ofEgvZywgdGhpcy5nZXRIb3VycygpKTtcbiAgICBzID0gcy5yZXBsYWNlKC9tbS8sIHRoaXMuZ2V0TWludXRlcygpID4gOSA/IHRoaXMuZ2V0TWludXRlcygpLnRvU3RyaW5nKCkgOiAnMCcgKyB0aGlzLmdldE1pbnV0ZXMoKSk7XG4gICAgcyA9IHMucmVwbGFjZSgvbS9nLCB0aGlzLmdldE1pbnV0ZXMoKSk7XG4gICAgcyA9IHMucmVwbGFjZSgvc3N8U1MvLCB0aGlzLmdldFNlY29uZHMoKSA+IDkgPyB0aGlzLmdldFNlY29uZHMoKS50b1N0cmluZygpIDogJzAnICsgdGhpcy5nZXRTZWNvbmRzKCkpO1xuICAgIHMgPSBzLnJlcGxhY2UoL3N8Uy9nLCB0aGlzLmdldFNlY29uZHMoKSk7XG4gICAgcyA9IHMucmVwbGFjZSgvbXN8TVMvLCB0aGlzLmdldE1pbGxpc2Vjb25kcygpKTtcbiAgICBzID0gcy5yZXBsYWNlKC9xfFEvLCBNYXRoLmZsb29yKCh0aGlzLmdldE1vbnRoKCkgKyAzKSAvIDMpKTtcbiAgICBzID0gcy5yZXBsYWNlKC93fFcvZywgd2Vla1t0aGlzLmdldERheSgpXSk7XG4gICAgcmV0dXJuIHM7XG4gIH0sXG59KTtcblxudmFyIHV0aWwgPSB7XG4gIGFwaTogJ2h0dHBzOi8vd3d3LjUyc29rLmNvbScsXG4gIGFwcFNlY3JldDogJzljNTk5NjQ3MTg1M2YwMTgzMWJmOWFjZmFiYjBkMzE4JyxcbiAgLy8g6I635Y+WdXJs5Y+C5pWwXG4gIHVybEFyZzogZnVuY3Rpb24ocykge1xuICAgIHZhciBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICAgIHJldHVybiBwYXJhbXMuZ2V0KHMpO1xuICB9LFxuICAvLyDlpI3liLbmlbDmja5cbiAgY29weTogZnVuY3Rpb24ocykge1xuICAgIHZhciBvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICBvLnZhbHVlID0gcztcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG8pO1xuICAgIG8uc2VsZWN0KCk7XG4gICAgaWYgKGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5JykpIHtcbiAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jyk7XG4gICAgfVxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobyk7XG4gIH0sXG4gIC8vIOmhtemdouWIt+aWsFxuICByZWZyZXNoOiBmdW5jdGlvbigpIHtcbiAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgfSxcbiAgLy8g6L+U5Zue5LiK5LiA6aG1XG4gIGJhY2s6IGZ1bmN0aW9uKCkge1xuICAgIGhpc3RvcnkuYmFjaygpO1xuICB9LFxuICAvLyDpobXpnaLot7PovaxcbiAgZ290bzogZnVuY3Rpb24odXJsKSB7XG4gICAgbG9jYXRpb24uaHJlZiA9IHVybDtcbiAgfSxcbiAgLy8g5omT5byA5paw6aG16Z2iXG4gIG9wZW46IGZ1bmN0aW9uKHVybCkge1xuICAgIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB1cmwpO1xuICAgIGEuc2V0QXR0cmlidXRlKCd0YXJnZXQnLCAnX2JsYW5rJyk7XG4gICAgYS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ29wZW4tdGVtcC1saW5rJyk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKTtcbiAgICBhLmNsaWNrKCk7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3Blbi10ZW1wLWxpbmsnKSk7XG4gIH0sXG4gIC8vIOaYr+WQpuS4uuepulxuICBpc046IGZ1bmN0aW9uKHMsIGIpIHtcbiAgICBpZiAodHlwZW9mIHMgPT0gJ251bWJlcicpIHMgPSBzLnRvU3RyaW5nKCk7XG4gICAgaWYgKGIgJiYgKHMgPT0gJycgfHwgdHlwZW9mIHMgPT0gJ3VuZGVmaW5lZCcpKSByZXR1cm4gdHJ1ZTtcbiAgICBlbHNlIGlmIChzID09ICcnIHx8IHMgPT0gbnVsbCB8fCB0eXBlb2YgcyA9PSAndW5kZWZpbmVkJykgcmV0dXJuIHRydWU7XG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gIH0sXG4gIC8vIEhUTUzop6PnoIFcbiAgaHRtbERlY29kZTogZnVuY3Rpb24odGV4dCkge1xuICAgIGxldCB0ZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGVtcC5pbm5lckhUTUwgPSB0ZXh0O1xuICAgIGNvbnN0IG91dHB1dCA9IHRlbXAuaW5uZXJUZXh0IHx8IHRlbXAudGV4dENvbnRlbnQ7XG4gICAgdGVtcCA9IG51bGw7XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfSxcbiAgLy8g5qC85byP5YyW5pe26Ze0XG4gIGZvcm1hdFRpbWU6IGZ1bmN0aW9uKHRpbWUsIG9wdGlvbikge1xuICAgIGlmICgoJycgKyB0aW1lKS5sZW5ndGggPT09IDEwKSB7XG4gICAgICB0aW1lID0gcGFyc2VJbnQodGltZSkgKiAxMDAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aW1lID0gK3RpbWU7XG4gICAgfVxuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSh0aW1lKTtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IGRpZmYgPSAobm93IC0gZCkgLyAxMDAwO1xuICAgIGlmIChkaWZmIDwgMzApIHtcbiAgICAgIHJldHVybiAn5Yia5YiaJztcbiAgICB9IGVsc2UgaWYgKGRpZmYgPCAzNjAwKSB7XG4gICAgICByZXR1cm4gTWF0aC5jZWlsKGRpZmYgLyA2MCkgKyAn5YiG6ZKf5YmNJztcbiAgICB9IGVsc2UgaWYgKGRpZmYgPCAzNjAwICogMjQpIHtcbiAgICAgIHJldHVybiBNYXRoLmNlaWwoZGlmZiAvIDM2MDApICsgJ+Wwj+aXtuWJjSc7XG4gICAgfSBlbHNlIGlmIChkaWZmIDwgMzYwMCAqIDI0ICogMikge1xuICAgICAgcmV0dXJuICcx5aSp5YmNJztcbiAgICB9XG4gICAgaWYgKG9wdGlvbikge1xuICAgICAgcmV0dXJuIHBhcnNlVGltZSh0aW1lLCBvcHRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZC5nZXRNb250aCgpICsgMSArICfmnIgnICsgZC5nZXREYXRlKCkgKyAn5pelJyArIGQuZ2V0SG91cnMoKSArICfml7YnICsgZC5nZXRNaW51dGVzKCkgKyAn5YiGJztcbiAgICB9XG4gIH0sXG4gIC8vIOihpTBcbiAgYWRkWmVybzogZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiBkIDwgMTAgPyAnMCcgKyBkIDogZDtcbiAgfSxcbiAgLy8g6Ziy5oqWXG4gIGRlYm91bmNlOiBmdW5jdGlvbihmbiwgZGVsYXkgPSAyMDApIHtcbiAgICBsZXQgdGltZXIgPSBudWxsO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aW1lcikge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgfVxuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9LCBkZWxheSk7XG4gICAgfTtcbiAgfSxcbiAgLy8g6IqC5rWBXG4gIHRocm90dGxlOiBmdW5jdGlvbihmbiwgZGVsYXkgPSAyMDApIHtcbiAgICBsZXQgbGFzdCxcbiAgICAgIHRpbWVyID0gbnVsbDtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBsZXQgdGggPSB0aGlzO1xuICAgICAgbGV0IGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICBsZXQgbm93ID0gK25ldyBEYXRlKCk7XG4gICAgICBpZiAobGFzdCAmJiBub3cgLSBsYXN0IDwgZGVsYXkpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGxhc3QgPSBub3c7XG4gICAgICAgICAgZm4uYXBwbHkodGgsIGFyZ3MpO1xuICAgICAgICB9LCBkZWxheSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsYXN0ID0gbm93O1xuICAgICAgICBmbi5hcHBseSh0aCwgYXJncyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSxcbiAgLy8g6K+35rGC5pWw5o2uXG4gIHJlcTogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHZhciBzdWNjZXNzID0gb3B0aW9ucy5zdWNjZXNzLFxuICAgICAgZXJyb3IgPSBvcHRpb25zLmVycm9yLFxuICAgICAgZXJyID0gb3B0aW9ucy5lcnI7XG4gICAgb3B0aW9ucy5oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzIHx8IHt9O1xuICAgIHZhciB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBvcHRpb25zLmhlYWRlcnNbJ3NvdXJjZSddID0gJ3dlYic7XG4gICAgb3B0aW9ucy5oZWFkZXJzWyd0aW1lc3RhbXAnXSA9IHRpbWVzdGFtcDtcbiAgICBvcHRpb25zLmhlYWRlcnNbJ3NpZ24nXSA9IG1kNSh1dGlsLmFwcFNlY3JldCArIHRpbWVzdGFtcCk7XG4gICAgZGVsZXRlIG9wdGlvbnMuc3VjY2VzcztcbiAgICBkZWxldGUgb3B0aW9ucy5lcnJvcjtcbiAgICBvcHRpb25zLnRpbWVvdXQgPSA2MDAwMDtcbiAgICBvcHRpb25zLmNvbnRlbnRUeXBlID0gJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnO1xuICAgIG9wdGlvbnMuZGF0YSA9IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMuZGF0YSk7XG4gICAgaWYgKHV0aWwuYXBpLmluZGV4T2Yod2luZG93LmxvY2F0aW9uLmhvc3QpID09IC0xKSB7XG4gICAgICB1dGlsLmFwaSA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdDtcbiAgICB9XG4gICAgb3B0aW9ucy51cmwgPSB1dGlsLmFwaSArIG9wdGlvbnMudXJsO1xuICAgIHJldHVybiAkLmFqYXgoXG4gICAgICAkLmV4dGVuZChcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdnZXQnLFxuICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBsYXllci5jbG9zZUFsbCgnbG9hZGluZycpO1xuICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09IDEpIHtcbiAgICAgICAgICAgICAgdHlwZW9mIG9wdGlvbnMuZG9uZSA9PT0gJ2Z1bmN0aW9uJyAmJiBvcHRpb25zLmRvbmUocmVzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGxheWVyLm1zZyhyZXMubXNnIHx8ICfov5Tlm57nirbmgIHnoIHlvILluLgnLCB7IGljb246IDUgfSk7XG4gICAgICAgICAgICAgIHR5cGVvZiBlcnIgPT09ICdmdW5jdGlvbicgJiYgZXJyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0eXBlb2Ygc3VjY2VzcyA9PT0gJ2Z1bmN0aW9uJyAmJiBzdWNjZXNzKHJlcyk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZSwgY29kZSkge1xuICAgICAgICAgICAgdHlwZW9mIGVycm9yID09PSAnZnVuY3Rpb24nICYmIGVycm9yKGNvZGUpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIG9wdGlvbnNcbiAgICAgIClcbiAgICApO1xuICB9LFxuICAvLyDljZXooYzmlofmnKzlkJHkuIrmu5rliqhcbiAgc2Nyb2xsVGV4dDogZnVuY3Rpb24obykge1xuICAgIHZhciBzcGVlZCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogMztcbiAgICB2YXIgZGVtbyA9ICQobyk7XG4gICAgdmFyIF90aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgc2V0TW92ZSgpO1xuICAgIH0sIHNwZWVkICogMTAwMCk7XG4gICAgZGVtby5iaW5kKCdtb3VzZW92ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoX3RpbWVyKTtcbiAgICB9KTtcbiAgICBkZW1vLmJpbmQoJ21vdXNlb3V0JywgZnVuY3Rpb24oKSB7XG4gICAgICBfdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgc2V0TW92ZSgpO1xuICAgICAgfSwgc3BlZWQgKiAxMDAwKTtcbiAgICB9KTtcbiAgICBmdW5jdGlvbiBzZXRNb3ZlKCkge1xuICAgICAgZGVtby5maW5kKCd1bDpmaXJzdCcpLmFuaW1hdGUoXG4gICAgICAgIHtcbiAgICAgICAgICBtYXJnaW5Ub3A6ICctJyArIGRlbW8uaGVpZ2h0KCkgKyAncHgnLFxuICAgICAgICB9LFxuICAgICAgICA1MDAsXG4gICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jc3MoeyBtYXJnaW5Ub3A6ICcwcHgnIH0pXG4gICAgICAgICAgICAuZmluZCgnbGk6Zmlyc3QnKVxuICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cbiAgfSxcbiAgLy8gVGFi5YiH5o2iXG4gIHRvZ2dsZVRhYjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIG8gPSBhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6ICdib2R5JztcbiAgICB2YXIgaXRlbSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogJy50YWItaXRlbSc7XG4gICAgdmFyIGNvbnRlbnQgPSBhcmd1bWVudHMubGVuZ3RoID4gMiA/IGFyZ3VtZW50c1syXSA6ICcudGFiLWNvbnRlbnQnO1xuICAgIHZhciBldiA9IGFyZ3VtZW50cy5sZW5ndGggPiAzID8gYXJndW1lbnRzWzNdIDogJ21vdXNlb3Zlcic7XG4gICAgdmFyIGNzcyA9IGFyZ3VtZW50cy5sZW5ndGggPiA0ID8gYXJndW1lbnRzWzRdIDogJ2FjdGl2ZSc7XG4gICAgdmFyIHRhYkl0ZW0gPSAkKG8gKyAnICcgKyBpdGVtICsgJyB1bCBsaScpO1xuICAgIHZhciB0YWJDb24gPSAkKG8gKyAnICcgKyBjb250ZW50ICsgJyA+IGRpdicpO1xuICAgIHRhYkNvblxuICAgICAgLmhpZGUoKVxuICAgICAgLmVxKDApXG4gICAgICAuc2hvdygpO1xuICAgIHRhYkl0ZW0uYmluZChldiwgZnVuY3Rpb24oKSB7XG4gICAgICB0YWJJdGVtLnJlbW92ZUNsYXNzKGNzcyk7XG4gICAgICAkKHRoaXMpLmFkZENsYXNzKGNzcyk7XG4gICAgICB0YWJDb25cbiAgICAgICAgLnN0b3AoKVxuICAgICAgICAuaGlkZSgpXG4gICAgICAgIC5lcSgkKHRoaXMpLmluZGV4KCkpXG4gICAgICAgIC5zaG93KCk7XG4gICAgfSk7XG4gIH0sXG4gIC8vIFNlbGVjdOi3s+i9rFxuICBzZWxlY3RKdW1wOiBmdW5jdGlvbihvKSB7XG4gICAgdmFyIHVybCA9ICQobykudmFsKCk7XG4gICAgaWYgKHVybCA9PSAnJykgcmV0dXJuO1xuICAgIHZhciBsaW5rID0gJCgnPGEgdGFyZ2V0PVwiX2JsYW5rXCI+PC9hPicpXG4gICAgICAuYXR0cignaHJlZicsIHVybClcbiAgICAgIC5odG1sKCcmbmJzcDsnKVxuICAgICAgLmhpZGUoKTtcbiAgICAkKG8pXG4gICAgICAucGFyZW50KClcbiAgICAgIC5hcHBlbmQobGluayk7XG4gICAgbGlua1swXS5jbGljaygpO1xuICAgIGxpbmsucmVtb3ZlKCk7XG4gIH0sXG4gIC8vIGJhY2t0b3RvcFxuICBsb2FkQmFja1RvVG9wOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgcyA9ICc8YXNpZGUgY2xhc3M9XCJiYWNrdG9Ub3BcIj48ZGl2PjwvZGl2PjwvYXNpZGU+JztcbiAgICAkKHMpLmFwcGVuZFRvKCQoJ2JvZHknKSk7XG4gICAgdmFyIGJhY2t0b1RvcCA9ICQoJy5iYWNrdG9Ub3AnKTtcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IDIwMCkge1xuICAgICAgICBiYWNrdG9Ub3AuZmFkZUluKCdmYXN0Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBiYWNrdG9Ub3AuZmFkZU91dCgnZmFzdCcpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGJhY2t0b1RvcC5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IDAgfSwgNTAwKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgfSxcbiAgLy8g6aKE57qm6K+V5ZCsXG4gIHJlc2VydmF0aW9uQ291cnNlOiBmdW5jdGlvbihpbmRleCkge1xuICAgIHZhciBuaWNrbmFtZU9iaiA9ICQoJ2lucHV0W25hbWU9bmlja25hbWVdJyksXG4gICAgICBuaWNrbmFtZSA9IG5pY2tuYW1lT2JqLnZhbCgpLnRyaW0oKSxcbiAgICAgIG1vYmlsZU9iaiA9ICQoJ2lucHV0W25hbWU9bW9iaWxlXScpLFxuICAgICAgbW9iaWxlID0gbW9iaWxlT2JqLnZhbCgpLnRyaW0oKSxcbiAgICAgIHNjaG9vbElkID0gJCgnaW5wdXRbbmFtZT1zY2hvb2xJZF0nKS52YWwoKSxcbiAgICAgIGNvdXJzZUlkID0gJCgnaW5wdXRbbmFtZT1jb3Vyc2VJZF0nKS52YWwoKTtcbiAgICBpZiAodXRpbC5pc04obmlja25hbWUpKSB7XG4gICAgICBuaWNrbmFtZU9iai5mb2N1cygpO1xuICAgICAgbGF5ZXIudGlwcygn6K+36L6T5YWl5oKo55qE5aeT5ZCN77yBJywgbmlja25hbWVPYmosIHtcbiAgICAgICAgdGlwczogMSxcbiAgICAgICAgdGltZTogNDAwMCxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodXRpbC5pc04obW9iaWxlKSkge1xuICAgICAgbW9iaWxlT2JqLmZvY3VzKCk7XG4gICAgICBsYXllci50aXBzKCfor7fovpPlhaXmgqjnmoTmiYvmnLrlj7fnoIHvvIEnLCBtb2JpbGVPYmosIHtcbiAgICAgICAgdGlwczogMSxcbiAgICAgICAgdGltZTogNDAwMCxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIW5ldyBSZWdFeHAoL14oMTNbMC05XXwxNFswMTQ1Njg3OV18MTVbMC0zNS05XXwxNlsyNTY3XXwxN1swLThdfDE4WzAtOV18MTlbMC0zNS05XSlcXGR7OH0kLykudGVzdChtb2JpbGUpKSB7XG4gICAgICBtb2JpbGVPYmouZm9jdXMoKTtcbiAgICAgIGxheWVyLnRpcHMoJ+ivt+i+k+WFpeato+ehrueahOaJi+acuuWPt+egge+8gScsIG1vYmlsZU9iaiwge1xuICAgICAgICB0aXBzOiAxLFxuICAgICAgICB0aW1lOiA0MDAwLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHV0aWwucmVxKHtcbiAgICAgIHR5cGU6ICdwb3N0JyxcbiAgICAgIHVybDogJy9ob21lL29yZGVyL2FkZCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIHNjaG9vbElkOiBzY2hvb2xJZCxcbiAgICAgICAgY291cnNlSWQ6IGNvdXJzZUlkLFxuICAgICAgICBuaWNrbmFtZTogbmlja25hbWUsXG4gICAgICAgIG1vYmlsZTogbW9iaWxlLFxuICAgICAgfSxcbiAgICAgIGRvbmU6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICBsYXllci5tc2cocmVzLm1zZywgeyBpY29uOiAxIH0pO1xuICAgICAgICBpZiAoaW5kZXgpIHtcbiAgICAgICAgICBsYXllci5jbG9zZShpbmRleCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB1dGlsLnJlZnJlc2goKTtcbiAgICAgICAgICB9LCAzMDAwKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KTtcbiAgfSxcbiAgLy8g5oub55Sf5ZCI5L2cXG4gIHN1YnNjcmliZUpvaW51czogZnVuY3Rpb24oKSB7XG4gICAgdmFyIG5pY2tuYW1lT2JqID0gJCgnaW5wdXRbbmFtZT1uaWNrbmFtZV0nKSxcbiAgICAgIG5pY2tuYW1lID0gbmlja25hbWVPYmoudmFsKCkudHJpbSgpLFxuICAgICAgbW9iaWxlT2JqID0gJCgnaW5wdXRbbmFtZT1tb2JpbGVdJyksXG4gICAgICBtb2JpbGUgPSBtb2JpbGVPYmoudmFsKCkudHJpbSgpLFxuICAgICAgY29udGVudCA9ICQoJ2lucHV0W25hbWU9Y29udGVudF0nKVxuICAgICAgICAudmFsKClcbiAgICAgICAgLnRyaW0oKTtcbiAgICBpZiAodXRpbC5pc04obmlja25hbWUpKSB7XG4gICAgICBuaWNrbmFtZU9iai5mb2N1cygpO1xuICAgICAgbGF5ZXIudGlwcygn6K+36L6T5YWl5oKo55qE5aeT5ZCN77yBJywgbmlja25hbWVPYmosIHtcbiAgICAgICAgdGlwczogMSxcbiAgICAgICAgdGltZTogNDAwMCxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodXRpbC5pc04obW9iaWxlKSkge1xuICAgICAgbW9iaWxlT2JqLmZvY3VzKCk7XG4gICAgICBsYXllci50aXBzKCfor7fovpPlhaXmgqjnmoTmiYvmnLrlj7fnoIHvvIEnLCBtb2JpbGVPYmosIHtcbiAgICAgICAgdGlwczogMSxcbiAgICAgICAgdGltZTogNDAwMCxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIW5ldyBSZWdFeHAoL14oMTNbMC05XXwxNFswMTQ1Njg3OV18MTVbMC0zNS05XXwxNlsyNTY3XXwxN1swLThdfDE4WzAtOV18MTlbMC0zNS05XSlcXGR7OH0kLykudGVzdChtb2JpbGUpKSB7XG4gICAgICBtb2JpbGVPYmouZm9jdXMoKTtcbiAgICAgIGxheWVyLnRpcHMoJ+ivt+i+k+WFpeato+ehrueahOaJi+acuuWPt+egge+8gScsIG1vYmlsZU9iaiwge1xuICAgICAgICB0aXBzOiAxLFxuICAgICAgICB0aW1lOiA0MDAwLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHV0aWwucmVxKHtcbiAgICAgIHR5cGU6ICdwb3N0JyxcbiAgICAgIHVybDogJy9ob21lL2pvaW4vYWRkJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgbmlja25hbWU6IG5pY2tuYW1lLFxuICAgICAgICBtb2JpbGU6IG1vYmlsZSxcbiAgICAgICAgY29udGVudDogY29udGVudCxcbiAgICAgIH0sXG4gICAgICBkb25lOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgbGF5ZXIubXNnKHJlcy5tc2csIHsgaWNvbjogMSB9KTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdXRpbC5yZWZyZXNoKCk7XG4gICAgICAgIH0sIDMwMDApO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfSxcbiAgLy8g5pCc57Si5aSE55CGXG4gIHRvU2VhcmNoOiBmdW5jdGlvbigpIHtcbiAgICB2YXIga2V5d29yZE9iaiA9ICQoJ2lucHV0W25hbWU9a2V5d29yZF0nKSxcbiAgICAgIGtleXdvcmQgPSBrZXl3b3JkT2JqLnZhbCgpLnRyaW0oKTtcbiAgICBpZiAodXRpbC5pc04oa2V5d29yZCkpIHtcbiAgICAgIGtleXdvcmRPYmouZm9jdXMoKTtcbiAgICAgIGxheWVyLnRpcHMoJ+ivt+i+k+WFpeaCqOimgeaJvueahOWGheWuue+8gScsIGtleXdvcmRPYmosIHtcbiAgICAgICAgdGlwczogMSxcbiAgICAgICAgdGltZTogNDAwMCxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB1dGlsLmdvdG8oJy9ob21lL2NvdXJzZS9zZWFyY2guaHRtbD9rZXl3b3JkPScgKyBrZXl3b3JkKTtcbiAgfSxcbiAgLy8gbm90aWZ5XG4gIG5vdGlmeTogZnVuY3Rpb24ocywgdCkge1xuICAgIHQgPSB0IHx8IDI7XG4gICAgdCA9IHQgKiAxMDAwO1xuICAgIHZhciB0aXBDbGFzcyA9ICduJyArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICQoJ2JvZHknKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJub3RpZnkgJyArIHRpcENsYXNzICsgJ1wiPjxkaXYgY2xhc3M9XCJub3RpZnktY250XCI+PHA+JyArIHMgKyAnPC9wPjwvZGl2PjwvZGl2PicpO1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KFxuICAgICAgZnVuY3Rpb24odGlwQ2xhc3MpIHtcbiAgICAgICAgJCgnLm5vdGlmeS4nICsgdGlwQ2xhc3MgKyAnIC5ub3RpZnktY250JykuYWRkQ2xhc3MoJ291dCcpO1xuICAgICAgICB3aW5kb3cuc2V0VGltZW91dChcbiAgICAgICAgICBmdW5jdGlvbih0aXBDbGFzcykge1xuICAgICAgICAgICAgJCgnLm5vdGlmeS4nICsgdGlwQ2xhc3MpLnJlbW92ZSgpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgNTAwLFxuICAgICAgICAgIHRpcENsYXNzXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAgdCxcbiAgICAgIHRpcENsYXNzXG4gICAgKTtcbiAgfSxcbiAgLy8gc3BlY2lhbCBkaWFsb2dcbiAgc2RpYWxvZzogZnVuY3Rpb24ocykge1xuICAgICQoJ2JvZHknKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJzZGlhbG9nXCI+PGRpdiBjbGFzcz1cInNkbGctYm94XCI+PGRpdiBjbGFzcz1cInNkbGctY250XCI+JyArIHMgKyAnPC9kaXY+PC9kaXY+PC9kaXY+Jyk7XG4gIH0sXG4gIC8vIGNvbmZpcm1cbiAgY29uZmlybTogZnVuY3Rpb24ob3B0cykge1xuICAgIHZhciB0aXRsZSA9IG9wdHMudGl0bGUgfHwgJ+ezu+e7n+aPkOekuic7XG4gICAgdmFyIGNvbnRlbnQgPSBvcHRzLmNvbnRlbnQgfHwgJyc7XG4gICAgdmFyIHMgPSAnJztcbiAgICAkKCcjY29uZmlybScpLnJlbW92ZSgpO1xuICAgIHMgKz1cbiAgICAgICc8ZGl2IGNsYXNzPVwiY29uZmlybVwiIGlkPVwiY29uZmlybVwiPjxkaXYgY2xhc3M9XCJhbmktc2hvd1wiPjxkaXYgY2xhc3M9XCJjZm0tYm94XCI+PGRpdiBjbGFzcz1cImNmbS10aXRsZVwiPicgK1xuICAgICAgdGl0bGUgK1xuICAgICAgJzwvZGl2PjxkaXYgY2xhc3M9XCJjZm0tY250XCI+JyArXG4gICAgICBjb250ZW50ICtcbiAgICAgICc8L2Rpdj48ZGl2IGNsYXNzPVwiY2ZtLWJ0bSBjb2wtMTJcIj4nO1xuICAgIGlmIChvcHRzLmJ1dHRvbnMgPT0gMSkge1xuICAgICAgcyArPSAnPGEgY2xhc3M9XCJjb2wtMTIgYnRuLW9uZVwiIGlkPVwiYnRuT2tcIj7noa7lrpo8L2xpPic7XG4gICAgfSBlbHNlIHtcbiAgICAgIHMgKz0gJzxhIGNsYXNzPVwiY29sLTZcIiBpZD1cImJ0bkNhbmNlbFwiPuWPlua2iDwvbGk+JztcbiAgICAgIHMgKz0gJzxhIGNsYXNzPVwiY29sLTYgYnRuLXJpZ2h0XCIgaWQ9XCJidG5Pa1wiPuehruWumjwvbGk+JztcbiAgICB9XG4gICAgcyArPSAnPC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+JztcbiAgICAkKCdib2R5JykuYXBwZW5kKHMpO1xuICAgIHZhciBvID0gJCgnI2NvbmZpcm0nKTtcbiAgICAkKCcjYnRuQ2FuY2VsJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICBpZiAob3B0cy5jYW5jZWxjYikgb3B0cy5jYW5jZWxjYigpO1xuICAgICAgby5yZW1vdmUoKTtcbiAgICB9KTtcbiAgICAkKCcjYnRuT2snKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgIGlmIChvcHRzLmNhbGxiYWNrKSBvcHRzLmNhbGxiYWNrKCk7XG4gICAgICBvLnJlbW92ZSgpO1xuICAgIH0pO1xuICB9LFxuICAvLyBkaWFsb2dcbiAgZGlhbG9nOiBmdW5jdGlvbihvcHRzKSB7XG4gICAgdmFyIHRpdGxlID0gb3B0cy50aXRsZSB8fCAn57O757uf5o+Q56S6JztcbiAgICB2YXIgY29udGVudCA9IG9wdHMuY29udGVudCB8fCAnJztcbiAgICAkKCcjZGlhbG9nJykucmVtb3ZlKCk7XG4gICAgJCgnYm9keScpLmFwcGVuZChcbiAgICAgICc8ZGl2IGNsYXNzPVwiZGlhbG9nXCIgaWQ9XCJkaWFsb2dcIj48ZGl2IGNsYXNzPVwiYW5pLXNob3dcIj48ZGl2IGNsYXNzPVwiZGxnLWJveFwiPjxkaXYgY2xhc3M9XCJkbGctdGl0bGVcIj4nICtcbiAgICAgICAgdGl0bGUgK1xuICAgICAgICAnPGEgaWQ9XCJidG5DbG9zZVwiPjxpIGNsYXNzPVwiaWNvbi1yZW1vdmVcIj48L2k+PC9hPjwvZGl2PjxkaXYgY2xhc3M9XCJkbGctY250XCI+JyArXG4gICAgICAgIGNvbnRlbnQgK1xuICAgICAgICAnPC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+J1xuICAgICk7XG4gICAgdmFyIG8gPSAkKCcjZGlhbG9nJyk7XG4gICAgJCgnI2J0bkNsb3NlJylcbiAgICAgIC5vZmYoJ2NsaWNrJylcbiAgICAgIC5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKG9wdHMuY2FuY2VsY2IpIG9wdHMuY2FuY2VsY2IoKTtcbiAgICAgICAgby5yZW1vdmUoKTtcbiAgICAgIH0pO1xuICAgIGlmIChvcHRzLmxvYWRlZCkge1xuICAgICAgb3B0cy5sb2FkZWQoKTtcbiAgICB9XG4gIH0sXG4gIGNsb3NlRGlhbG9nOiBmdW5jdGlvbihjYikge1xuICAgIHZhciBvID0gJCgnI2RpYWxvZycpO1xuICAgIGlmIChvLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmIChjYikgY2IoKTtcbiAgICAgIG8ucmVtb3ZlKCk7XG4gICAgfVxuICB9LFxuICAvLyBsb2FkaW5nXG4gIGxvYWRpbmc6IGZ1bmN0aW9uKG8sIHMpIHtcbiAgICAkKCcjbG9hZGluZycpLnJlbW92ZSgpO1xuICAgIGlmIChvKSB7XG4gICAgICB2YXIgbG9hZGluZyA9ICQoJyNsb2FkaW5nJyk7XG4gICAgICBpZiAobG9hZGluZy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxvYWRpbmcuZmluZCgnLmxvYWRpbmctY250JykuaHRtbChzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0eXBlb2YgbyAhPSAnb2JqZWN0JykgbyA9ICQoJ2JvZHknKTtcbiAgICAgICAgby5hcHBlbmQoXG4gICAgICAgICAgJzxkaXYgaWQ9XCJsb2FkaW5nXCI+XFxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsb2FkaW5nLW1hc2sgbWFzay10cmFuc3BhcmVudFwiPjwvZGl2PlxcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibG9hZGluZ1wiPlxcXG4gICAgICAgICAgICAgIDxpIGNsYXNzPVwibG9hZGVyXCI+PC9pPlxcXG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwibG9hZGluZy1jbnRcIj4nICtcbiAgICAgICAgICAgIChzID8gcyA6ICfmlbDmja7liqDovb3kuK0nKSArXG4gICAgICAgICAgICAnPC9wPlxcXG4gICAgICAgICAgICAgIDwvZGl2PlxcXG4gICAgICAgICAgICA8L2Rpdj4nXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICQoJ2JvZHknKS5hcHBlbmQoXG4gICAgICAgICc8ZGl2IGlkPVwibG9hZGluZ1wiPlxcXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxvYWRpbmctbWFzayBtYXNrLXdyaXRlXCI+PC9kaXY+XFxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibG9hZGluZy1ib3hcIj5cXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxvYWRlclwiPjwvZGl2PlxcXG4gICAgICAgICAgPC9kaXY+XFxcbiAgICAgICAgPC9kaXY+J1xuICAgICAgKTtcbiAgICAgIHZhciBoID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuICAgICAgaCAtPSAkKCdoZWFkZXInKS5oZWlnaHQoKTtcbiAgICAgIGggLT0gJCgnZm9vdGVyJykuaGVpZ2h0KCk7XG4gICAgICAkKCcjbG9hZGluZycpLmhlaWdodChoKTtcbiAgICB9XG4gIH0sXG4gIGhpZGVMb2FkaW5nOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbyA9ICQoJyNsb2FkaW5nJyk7XG4gICAgaWYgKG8ubGVuZ3RoID4gMCkge1xuICAgICAgby5maW5kKCdsb2FkaW5nLW1hc2snKS5hZGRDbGFzcygnYW5pLWhpZGUnKTtcbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBvLnJlbW92ZSgpO1xuICAgICAgfSwgMzAwKTtcbiAgICB9XG4gIH0sXG4gIC8vIHRvYXN0XG4gIHRvYXN0OiBmdW5jdGlvbihvcHRzKSB7XG4gICAgdmFyIG8gPSBvcHRzLnRhcmdldCB8fCAkKCdib2R5JyksXG4gICAgICB0ID0gb3B0cy50eXBlLFxuICAgICAgcyA9IG9wdHMuY29udGVudCxcbiAgICAgIGMgPSBvcHRzLmNsb3NlO1xuICAgIHZhciB0b2FzdCA9ICQoJyN0b2FzdCcpO1xuICAgIGlmICh0b2FzdC5sZW5ndGggPiAwICYmIHRvYXN0LmF0dHIoJ2RhdGEtdHlwZScpID09IHQpIHtcbiAgICAgIHRvYXN0LmZpbmQoJy50b2FzdC1jbnQnKS5odG1sKHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKCcjdG9hc3QnKS5yZW1vdmUoKTtcbiAgICAgIG8uYXBwZW5kKFxuICAgICAgICAnPGRpdiBpZD1cInRvYXN0XCIgZGF0YS10eXBlPVwiJyArXG4gICAgICAgICAgdCArXG4gICAgICAgICAgJ1wiPjxkaXYgY2xhc3M9XCJ0b2FzdC1tYXNrIG1hc2stdHJhbnNwYXJlbnRcIj48L2Rpdj48ZGl2IGNsYXNzPVwidG9hc3RcIj48aSBjbGFzcz1cInRvYXN0LWljb24gZi1pY29uLScgK1xuICAgICAgICAgIHQgK1xuICAgICAgICAgICdcIj48L2k+PHAgY2xhc3M9XCJ0b2FzdC1jbnRcIj4nICtcbiAgICAgICAgICBzICtcbiAgICAgICAgICAnPC9wPjwvZGl2PjwvZGl2PidcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChjKSB7XG4gICAgICB1dGlsLmhpZGVUb2FzdChjKTtcbiAgICB9XG4gIH0sXG4gIGhpZGVUb2FzdDogZnVuY3Rpb24odCkge1xuICAgIHZhciB0ID0gdCB8fCAzMDAsXG4gICAgICB0b2FzdCA9ICQoJyN0b2FzdCcpO1xuICAgIGlmICh0b2FzdC5sZW5ndGggPiAwKSB7XG4gICAgICB0b2FzdC5maW5kKCd0b2FzdC1tYXNrJykuYWRkQ2xhc3MoJ2FuaS1oaWRlJyk7XG4gICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgdG9hc3QucmVtb3ZlKCk7XG4gICAgICB9LCB0KTtcbiAgICB9XG4gIH0sXG59O1xuXG4vLyDpu5jorqTliqDovb1cbiQoZnVuY3Rpb24oKSB7XG4gIC8vIOWkhOeQhumTvuaOpVxuICAkKCdhW2hyZWY9XCIjXCJdJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAkKHRoaXMpLmF0dHIoJ2hyZWYnLCAnamF2YXNjcmlwdDo7Jyk7XG4gIH0pO1xuICAvLyDlpITnkIbov5Tlm57pk77mjqVcbiAgJCgnLmpzLWJhY2snKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICB1dGlsLmJhY2soKTtcbiAgfSk7XG4gIC8vIOWkhOeQhui3s+i9rOmTvuaOpVxuICAkKCcuanMtZ290bycpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIHV0aWwuZ290bygkKHRoaXMpLmRhdGEoJ3VybCcpKTtcbiAgfSk7XG4gIC8vIOWKoOi9vea1ruWKqOagj1xuICBpZiAoISQoJy5ub2JhY2t0b3AnKS5sZW5ndGgpIHtcbiAgICB1dGlsLmxvYWRCYWNrVG9Ub3AoKTtcbiAgfVxuICAvLyDlnKjnur/lkqjor6JcbiAgdmFyIGJ0bkNvbnN1bHQgPSAkKCcuYnRuLWNvbnN1bHQnKTtcbiAgaWYgKGJ0bkNvbnN1bHQubGVuZ3RoKSB7XG4gICAgYnRuQ29uc3VsdC5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgIC8vIHV0aWwuZ290bygnaHR0cDovL3dwYS5xcS5jb20vbXNncmQ/dj0zJnVpbj0nICsgcXEgKyAnJnNpdGU9cXEmbWVudT15ZXMnKTtcbiAgICAgIHV0aWwuZ290bygnbXFxd3BhOi8vaW0vY2hhdD9jaGF0X3R5cGU9d3BhJnVpbj0nICsgcXEgKyAnJnZlcnNpb249MSZzcmNfdHlwZT13ZWImd2ViX3NyYz1vaWNxem9uZS5jb20nKTtcbiAgICB9KTtcbiAgfVxuICAvLyDpooTnuqbor5XlkKxcbiAgdmFyIGJ0blJlc2VydmF0aW9uID0gJCgnLmJ0bi1yZXNlcnZhdGlvbicpO1xuICBpZiAoYnRuUmVzZXJ2YXRpb24ubGVuZ3RoKSB7XG4gICAgYnRuUmVzZXJ2YXRpb24uY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICB1dGlsLmRlYm91bmNlKHV0aWwucmVzZXJ2YXRpb25Db3Vyc2UobnVsbCksIDUwMCk7XG4gICAgfSk7XG4gIH1cbiAgLy8g56uL5Y2z5oql5ZCNXG4gIHZhciBidG5BcHBseSA9ICQoJy5idG4tYXBwbHknKTtcbiAgaWYgKGJ0bkFwcGx5Lmxlbmd0aCkge1xuICAgIGJ0bkFwcGx5LmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNjaG9vbElkID0gJCh0aGlzKS5hdHRyKCdkYXRhLXNjaG9vbElkJyk7XG4gICAgICB2YXIgY291cnNlSWQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtY291cnNlSWQnKTtcbiAgICAgIHZhciBzID1cbiAgICAgICAgJzxkaXYgY2xhc3M9XCJhcHBseS1mb3JtXCI+XFxcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJzY2hvb2xJZFwiIHZhbHVlPVwie3tzY2hvb2xJZH19XCI+XFxcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJjb3Vyc2VJZFwiIHZhbHVlPVwie3tjb3Vyc2VJZH19XCI+XFxcbiAgICAgICAgICA8cCBjbGFzcz1cInAxXCI+6K+35aGr5YaZ5oKo55qE5Liq5Lq65L+h5oGv77yM56iN5ZCO5bCG5pyJ5bmz5Y+w5a6i5pyN6IGU57O75oKoPC9wPlxcXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImlwdC13cmFwXCI+XFxcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJuaWNrbmFtZVwiIHBsYWNlaG9sZGVyPVwi6K+36L6T5YWl5oKo55qE5aeT5ZCNXCIgLz5cXFxuICAgICAgICAgIDwvZGl2PlxcXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImlwdC13cmFwXCI+XFxcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJtb2JpbGVcIiBwbGFjZWhvbGRlcj1cIuivt+i+k+WFpeaCqOeahOaJi+acuuWPt+eggVwiIC8+XFxcbiAgICAgICAgICA8L2Rpdj5cXFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4td3JhcFwiPlxcXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuLWFwcGx5XCI+56Gu6K6kPC9idXR0b24+XFxcbiAgICAgICAgICA8L2Rpdj5cXFxuICAgICAgICAgIDxwIGNsYXNzPVwicDJcIj57e3RlbH19PC9wPlxcXG4gICAgICAgICAgPHAgY2xhc3M9XCJwM1wiPuasoui/juaLqOaJk+W5s+WPsOeDree6v+S4u+WKqOiBlOezu+aIkeS7rDwvcD5cXFxuICAgICAgICA8L2Rpdj4nO1xuICAgICAgc2Nob29sSWQgPSBzY2hvb2xJZCA/IHNjaG9vbElkIDogMDtcbiAgICAgIGNvdXJzZUlkID0gY291cnNlSWQgPyBjb3Vyc2VJZCA6IDA7XG4gICAgICBzID0gcy5yZXBsYWNlKCd7e3NjaG9vbElkfX0nLCBzY2hvb2xJZCk7XG4gICAgICBzID0gcy5yZXBsYWNlKCd7e2NvdXJzZUlkfX0nLCBjb3Vyc2VJZCk7XG4gICAgICBzID0gcy5yZXBsYWNlKCd7e3RlbH19JywgdGVsKTtcbiAgICAgIGxheWVyLm9wZW4oe1xuICAgICAgICB0eXBlOiAxLFxuICAgICAgICB0aXRsZTogJ+mihOe6puivleWQrCcsXG4gICAgICAgIHNraW46ICdsYXl1aS1sYXllci1yaW0nLFxuICAgICAgICBjbG9zZUJ0bjogMCxcbiAgICAgICAgYW5pbTogMixcbiAgICAgICAgc2hhZGVDbG9zZTogdHJ1ZSxcbiAgICAgICAgYXJlYTogWyc0MDBweCcsICc0MDBweCddLFxuICAgICAgICBjb250ZW50OiBzLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihsYXllcm8sIGluZGV4KSB7XG4gICAgICAgICAgbGF5ZXJvLmZpbmQoJy5idG4tYXBwbHknKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHV0aWwuZGVib3VuY2UodXRpbC5yZXNlcnZhdGlvbkNvdXJzZShpbmRleCksIDUwMCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICAvLyDmi5vnlJ/lkIjkvZxcbiAgdmFyIGJ0blN1YnNjcmliZSA9ICQoJy5idG4tc3Vic2NyaWJlJyk7XG4gIGlmIChidG5TdWJzY3JpYmUubGVuZ3RoKSB7XG4gICAgYnRuU3Vic2NyaWJlLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgdXRpbC5kZWJvdW5jZSh1dGlsLnN1YnNjcmliZUpvaW51cygpLCA1MDApO1xuICAgIH0pO1xuICB9XG4gIC8vIOaQnOe0ouWkhOeQhlxuICB2YXIgYnRuU2VhcmNoID0gJCgnLmJ0bi1zZWFyY2gnKTtcbiAgaWYgKGJ0blNlYXJjaC5sZW5ndGgpIHtcbiAgICBidG5TZWFyY2guY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICB1dGlsLmRlYm91bmNlKHV0aWwudG9TZWFyY2goKSwgNTAwKTtcbiAgICB9KTtcbiAgfVxuICAvLyDliIbpobXlpITnkIZcbiAgdmFyIHBhZ2ViYXIgPSAkKCcucGFnZWJhcicpO1xuICBpZiAocGFnZWJhci5sZW5ndGgpIHtcbiAgICBwYWdlYmFyLnBhZ2luYXRpb24oe1xuICAgICAgY3VycmVudDogdXRpbC51cmxBcmcoJ3BhZ2UnKSB8fCAxLCAvLyDlvZPliY3pobVcbiAgICAgIHBhZ2VDb3VudDogcGFnZWJhci5hdHRyKCdkYXRhLXBhZ2VDb3VudCcpIHx8IDAsIC8vIOaAu+mhteaVsFxuICAgICAgc2hvd0RhdGE6IHBhZ2ViYXIuYXR0cignZGF0YS1wYWdlU2l6ZScpIHx8IDEwLCAvLyDmr4/pobXmmL7npLrorrDlvZVcbiAgICAgIG1vZGU6ICd1bmZpeGVkJyxcbiAgICAgIGNvdW50OiAyLCAvLyDliY3lkI7mmL7npLrpobXnoIFcbiAgICAgIGNvcGluZzogdHJ1ZSxcbiAgICAgIHByZXZDb250ZW50OiAnPCcsXG4gICAgICBuZXh0Q29udGVudDogJz4nLFxuICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKGFwaSkge1xuICAgICAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgICAgIHZhciBudW0gPSB1cmwuaW5kZXhPZignPycpO1xuICAgICAgICB2YXIgcGFyYW1zID0gJyc7XG4gICAgICAgIGlmIChudW0gIT0gLTEpIHtcbiAgICAgICAgICBwYXJhbXMgPSB1cmwuc3Vic3RyKG51bSArIDEpO1xuICAgICAgICAgIHBhcmFtcyA9ICcmJyArIHBhcmFtcy5yZXBsYWNlKC9wYWdlPShcXGQrKShcXCYqKS9nbSwgJycpO1xuICAgICAgICB9XG4gICAgICAgIHVybCA9ICc/cGFnZT0nICsgYXBpLmdldEN1cnJlbnQoKSArIChwYXJhbXMgPT0gJyYnID8gJycgOiBwYXJhbXMpO1xuICAgICAgICB1dGlsLmdvdG8odXJsKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbiAgLy8g5Zyw5Yy66YCJ5oupXG4gIHZhciBidG5Mb2NhdGlvbiA9ICQoJy5idG4tbG9jYXRpb24nKTtcbiAgYnRuTG9jYXRpb24uY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxvY2F0aW9uQm94ID0gJCgnLmxvY2F0aW9uJyk7XG4gICAgbG9jYXRpb25Cb3guc2hvdygpO1xuICAgIGxvY2F0aW9uQm94LmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGxvY2F0aW9uQm94LmhpZGUoKTtcbiAgICAgIH0sIDMwMCk7XG4gICAgfSk7XG4gIH0pO1xuICAvLyDlr7zoiKroj5zljZVcbiAgdmFyIGJ0bk1lbnUgPSAkKCcuYnRuLW1lbnUnKTtcbiAgYnRuTWVudS5jbGljayhmdW5jdGlvbigpIHtcbiAgICB2YXIgbWVudUJveCA9ICQoJy5tZW51Jyk7XG4gICAgbWVudUJveC5zaG93KCk7XG4gICAgbWVudUJveC5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBtZW51Qm94LmhpZGUoKTtcbiAgICAgIH0sIDMwMCk7XG4gICAgfSk7XG4gICAgJCgnLm1lbnUtYm94LWNsb3NlJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgbWVudUJveC5oaWRlKCk7XG4gICAgICB9LCAzMDApO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl19
