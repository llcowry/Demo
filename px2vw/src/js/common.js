'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwuanMiXSwibmFtZXMiOlsiJCIsImV4dGVuZCIsIkRhdGUiLCJwcm90b3R5cGUiLCJmb3JtYXQiLCJzIiwibGVuZ3RoIiwidGVzdCIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwid2VlayIsInJlcGxhY2UiLCJnZXRZZWFyIiwidG9TdHJpbmciLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJnZXRTZWNvbmRzIiwiZ2V0TWlsbGlzZWNvbmRzIiwiTWF0aCIsImZsb29yIiwiZ2V0RGF5IiwidXRpbCIsImFwaSIsImFwcFNlY3JldCIsInVybEFyZyIsInBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsIndpbmRvdyIsImxvY2F0aW9uIiwic2VhcmNoIiwiZ2V0IiwiY29weSIsIm8iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ2YWx1ZSIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInNlbGVjdCIsImV4ZWNDb21tYW5kIiwicmVtb3ZlQ2hpbGQiLCJyZWZyZXNoIiwicmVsb2FkIiwiYmFjayIsImhpc3RvcnkiLCJnb3RvIiwidXJsIiwiaHJlZiIsIm9wZW4iLCJhIiwic2V0QXR0cmlidXRlIiwiY2xpY2siLCJnZXRFbGVtZW50QnlJZCIsImlzTiIsImIiLCJodG1sRGVjb2RlIiwidGV4dCIsInRlbXAiLCJpbm5lckhUTUwiLCJvdXRwdXQiLCJpbm5lclRleHQiLCJ0ZXh0Q29udGVudCIsImZvcm1hdFRpbWUiLCJ0aW1lIiwib3B0aW9uIiwicGFyc2VJbnQiLCJkIiwibm93IiwiZGlmZiIsImNlaWwiLCJwYXJzZVRpbWUiLCJhZGRaZXJvIiwiZGVib3VuY2UiLCJmbiIsImRlbGF5IiwidGltZXIiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiYXBwbHkiLCJhcmd1bWVudHMiLCJ0aHJvdHRsZSIsImxhc3QiLCJ0aCIsImFyZ3MiLCJyZXEiLCJvcHRpb25zIiwic3VjY2VzcyIsImVycm9yIiwiZXJyIiwiaGVhZGVycyIsInRpbWVzdGFtcCIsImdldFRpbWUiLCJtZDUiLCJ0aW1lb3V0IiwiY29udGVudFR5cGUiLCJkYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsImluZGV4T2YiLCJob3N0IiwicHJvdG9jb2wiLCJhamF4IiwidHlwZSIsImRhdGFUeXBlIiwicmVzIiwibGF5ZXIiLCJjbG9zZUFsbCIsImNvZGUiLCJkb25lIiwibXNnIiwiaWNvbiIsImUiLCJzY3JvbGxUZXh0Iiwic3BlZWQiLCJkZW1vIiwiX3RpbWVyIiwic2V0SW50ZXJ2YWwiLCJzZXRNb3ZlIiwiYmluZCIsImNsZWFySW50ZXJ2YWwiLCJmaW5kIiwiYW5pbWF0ZSIsIm1hcmdpblRvcCIsImhlaWdodCIsImNzcyIsImFwcGVuZFRvIiwidG9nZ2xlVGFiIiwiaXRlbSIsImNvbnRlbnQiLCJldiIsInRhYkl0ZW0iLCJ0YWJDb24iLCJoaWRlIiwiZXEiLCJzaG93IiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsInN0b3AiLCJpbmRleCIsInNlbGVjdEp1bXAiLCJ2YWwiLCJsaW5rIiwiYXR0ciIsImh0bWwiLCJwYXJlbnQiLCJhcHBlbmQiLCJyZW1vdmUiLCJsb2FkQmFja1RvVG9wIiwiYmFja3RvVG9wIiwic2Nyb2xsIiwic2Nyb2xsVG9wIiwiZmFkZUluIiwiZmFkZU91dCIsInJlc2VydmF0aW9uQ291cnNlIiwibmlja25hbWVPYmoiLCJuaWNrbmFtZSIsInRyaW0iLCJtb2JpbGVPYmoiLCJtb2JpbGUiLCJzY2hvb2xJZCIsImNvdXJzZUlkIiwiZm9jdXMiLCJ0aXBzIiwiUmVnRXhwIiwiY2xvc2UiLCJzdWJzY3JpYmVKb2ludXMiLCJ0b1NlYXJjaCIsImtleXdvcmRPYmoiLCJrZXl3b3JkIiwibm90aWZ5IiwidCIsInRpcENsYXNzIiwic2RpYWxvZyIsImNvbmZpcm0iLCJvcHRzIiwidGl0bGUiLCJidXR0b25zIiwiY2FuY2VsY2IiLCJjYWxsYmFjayIsImRpYWxvZyIsIm9mZiIsImxvYWRlZCIsImNsb3NlRGlhbG9nIiwiY2IiLCJsb2FkaW5nIiwiaCIsImhpZGVMb2FkaW5nIiwidG9hc3QiLCJ0YXJnZXQiLCJjIiwiaGlkZVRvYXN0IiwiZWFjaCIsImJ0bkNvbnN1bHQiLCJxcSIsImJ0blJlc2VydmF0aW9uIiwiYnRuQXBwbHkiLCJ0ZWwiLCJza2luIiwiY2xvc2VCdG4iLCJhbmltIiwic2hhZGVDbG9zZSIsImFyZWEiLCJsYXllcm8iLCJidG5TdWJzY3JpYmUiLCJidG5TZWFyY2giLCJwYWdlYmFyIiwicGFnaW5hdGlvbiIsImN1cnJlbnQiLCJwYWdlQ291bnQiLCJzaG93RGF0YSIsIm1vZGUiLCJjb3VudCIsImNvcGluZyIsInByZXZDb250ZW50IiwibmV4dENvbnRlbnQiLCJudW0iLCJzdWJzdHIiLCJnZXRDdXJyZW50IiwiYnRuTG9jYXRpb24iLCJsb2NhdGlvbkJveCIsImJ0bk1lbnUiLCJtZW51Qm94Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQUEsRUFBQUMsTUFBQSxDQUFBQyxLQUFBQyxTQUFBLEVBQUE7QUFDQUMsVUFBQSxnQkFBQUMsQ0FBQSxFQUFBO0FBQ0EsUUFBQUEsRUFBQUMsTUFBQSxJQUFBLENBQUEsSUFBQSxDQUFBLG1CQUFBQyxJQUFBLENBQUFGLENBQUEsQ0FBQSxFQUFBO0FBQ0EsYUFBQSxLQUFBRyxXQUFBLEtBQUFILENBQUEsSUFBQSxLQUFBSSxRQUFBLEtBQUEsQ0FBQSxJQUFBSixDQUFBLEdBQUEsS0FBQUssT0FBQSxFQUFBO0FBQ0E7QUFDQSxRQUFBQyxPQUFBLENBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxDQUFBO0FBQ0FOLFFBQUFBLEVBQUFPLE9BQUEsQ0FBQSxXQUFBLEVBQUEsS0FBQUosV0FBQSxFQUFBLENBQUE7QUFDQUgsUUFBQUEsRUFBQU8sT0FBQSxDQUFBLE9BQUEsRUFBQSxLQUFBQyxPQUFBLEtBQUEsR0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLEtBQUFBLE9BQUEsS0FBQSxHQUFBLEVBQUFDLFFBQUEsRUFBQSxHQUFBLE1BQUEsS0FBQUQsT0FBQSxLQUFBLEdBQUEsQ0FBQTtBQUNBUixRQUFBQSxFQUFBTyxPQUFBLENBQUEsSUFBQSxFQUFBLEtBQUFILFFBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsS0FBQUEsUUFBQSxLQUFBLENBQUEsRUFBQUssUUFBQSxFQUFBLEdBQUEsTUFBQSxDQUFBLEtBQUFMLFFBQUEsS0FBQSxDQUFBLEVBQUFLLFFBQUEsRUFBQSxDQUFBO0FBQ0FULFFBQUFBLEVBQUFPLE9BQUEsQ0FBQSxJQUFBLEVBQUEsS0FBQUgsUUFBQSxLQUFBLENBQUEsQ0FBQTtBQUNBSixRQUFBQSxFQUFBTyxPQUFBLENBQUEsT0FBQSxFQUFBLEtBQUFGLE9BQUEsS0FBQSxDQUFBLEdBQUEsS0FBQUEsT0FBQSxHQUFBSSxRQUFBLEVBQUEsR0FBQSxNQUFBLEtBQUFKLE9BQUEsRUFBQSxDQUFBO0FBQ0FMLFFBQUFBLEVBQUFPLE9BQUEsQ0FBQSxNQUFBLEVBQUEsS0FBQUYsT0FBQSxFQUFBLENBQUE7QUFDQUwsUUFBQUEsRUFBQU8sT0FBQSxDQUFBLE9BQUEsRUFBQSxLQUFBRyxRQUFBLEtBQUEsQ0FBQSxHQUFBLEtBQUFBLFFBQUEsR0FBQUQsUUFBQSxFQUFBLEdBQUEsTUFBQSxLQUFBQyxRQUFBLEVBQUEsQ0FBQTtBQUNBVixRQUFBQSxFQUFBTyxPQUFBLENBQUEsTUFBQSxFQUFBLEtBQUFHLFFBQUEsRUFBQSxDQUFBO0FBQ0FWLFFBQUFBLEVBQUFPLE9BQUEsQ0FBQSxJQUFBLEVBQUEsS0FBQUksVUFBQSxLQUFBLENBQUEsR0FBQSxLQUFBQSxVQUFBLEdBQUFGLFFBQUEsRUFBQSxHQUFBLE1BQUEsS0FBQUUsVUFBQSxFQUFBLENBQUE7QUFDQVgsUUFBQUEsRUFBQU8sT0FBQSxDQUFBLElBQUEsRUFBQSxLQUFBSSxVQUFBLEVBQUEsQ0FBQTtBQUNBWCxRQUFBQSxFQUFBTyxPQUFBLENBQUEsT0FBQSxFQUFBLEtBQUFLLFVBQUEsS0FBQSxDQUFBLEdBQUEsS0FBQUEsVUFBQSxHQUFBSCxRQUFBLEVBQUEsR0FB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LEtBSkE7QUFLQXJJLE1BQUEsaUJBQUEsRUFBQW9ELEtBQUEsQ0FBQSxZQUFBO0FBQ0F4QixhQUFBa0QsVUFBQSxDQUFBLFlBQUE7QUFDQWdKLGdCQUFBekYsSUFBQTtBQUNBLE9BRkEsRUFFQSxHQUZBO0FBR0EsS0FKQTtBQUtBLEdBYkE7QUFjQSxDQS9JQSIsImZpbGUiOiJjb21tb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyDljp/lnovmianlsZVcbiQuZXh0ZW5kKERhdGUucHJvdG90eXBlLCB7XG4gIGZvcm1hdDogZnVuY3Rpb24ocykge1xuICAgIGlmIChzLmxlbmd0aCA9PSAxICYmICEvXlswLTldKy4/WzAtOV0qJC8udGVzdChzKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0RnVsbFllYXIoKSArIHMgKyAodGhpcy5nZXRNb250aCgpICsgMSkgKyBzICsgdGhpcy5nZXREYXRlKCk7XG4gICAgfVxuICAgIHZhciB3ZWVrID0gWyfml6UnLCAn5LiAJywgJ+S6jCcsICfkuIknLCAn5ZubJywgJ+S6lCcsICflha0nXTtcbiAgICBzID0gcy5yZXBsYWNlKC95eXl5fFlZWVkvLCB0aGlzLmdldEZ1bGxZZWFyKCkpO1xuICAgIHMgPSBzLnJlcGxhY2UoL3l5fFlZLywgdGhpcy5nZXRZZWFyKCkgJSAxMDAgPiA5ID8gKHRoaXMuZ2V0WWVhcigpICUgMTAwKS50b1N0cmluZygpIDogJzAnICsgKHRoaXMuZ2V0WWVhcigpICUgMTAwKSk7XG4gICAgcyA9IHMucmVwbGFjZSgvTU0vLCB0aGlzLmdldE1vbnRoKCkgKyAxID4gOSA/ICh0aGlzLmdldE1vbnRoKCkgKyAxKS50b1N0cmluZygpIDogJzAnICsgKHRoaXMuZ2V0TW9udGgoKSArIDEpLnRvU3RyaW5nKCkpO1xuICAgIHMgPSBzLnJlcGxhY2UoL00vZywgdGhpcy5nZXRNb250aCgpICsgMSk7XG4gICAgcyA9IHMucmVwbGFjZSgvZGR8REQvLCB0aGlzLmdldERhdGUoKSA+IDkgPyB0aGlzLmdldERhdGUoKS50b1N0cmluZygpIDogJzAnICsgdGhpcy5nZXREYXRlKCkpO1xuICAgIHMgPSBzLnJlcGxhY2UoL2R8RC9nLCB0aGlzLmdldERhdGUoKSk7XG4gICAgcyA9IHMucmVwbGFjZSgvaGh8SEgvLCB0aGlzLmdldEhvdXJzKCkgPiA5ID8gdGhpcy5nZXRIb3VycygpLnRvU3RyaW5nKCkgOiAnMCcgKyB0aGlzLmdldEhvdXJzKCkpO1xuICAgIHMgPSBzLnJlcGxhY2UoL2h8SC9nLCB0aGlzLmdldEhvdXJzKCkpO1xuICAgIHMgPSBzLnJlcGxhY2UoL21tLywgdGhpcy5nZXRNaW51dGVzKCkgPiA5ID8gdGhpcy5nZXRNaW51dGVzKCkudG9TdHJpbmcoKSA6ICcwJyArIHRoaXMuZ2V0TWludXRlcygpKTtcbiAgICBzID0gcy5yZXBsYWNlKC9tL2csIHRoaXMuZ2V0TWludXRlcygpKTtcbiAgICBzID0gcy5yZXBsYWNlKC9zc3xTUy8sIHRoaXMuZ2V0U2Vjb25kcygpID4gOSA/IHRoaXMuZ2V0U2Vjb25kcygpLnRvU3RyaW5nKCkgOiAnMCcgKyB0aGlzLmdldFNlY29uZHMoKSk7XG4gICAgcyA9IHMucmVwbGFjZSgvc3xTL2csIHRoaXMuZ2V0U2Vjb25kcygpKTtcbiAgICBzID0gcy5yZXBsYWNlKC9tc3xNUy8sIHRoaXMuZ2V0TWlsbGlzZWNvbmRzKCkpO1xuICAgIHMgPSBzLnJlcGxhY2UoL3F8US8sIE1hdGguZmxvb3IoKHRoaXMuZ2V0TW9udGgoKSArIDMpIC8gMykpO1xuICAgIHMgPSBzLnJlcGxhY2UoL3d8Vy9nLCB3ZWVrW3RoaXMuZ2V0RGF5KCldKTtcbiAgICByZXR1cm4gcztcbiAgfSxcbn0pO1xuXG52YXIgdXRpbCA9IHtcbiAgYXBpOiAnaHR0cHM6Ly93d3cuNTJzb2suY29tJyxcbiAgYXBwU2VjcmV0OiAnOWM1OTk2NDcxODUzZjAxODMxYmY5YWNmYWJiMGQzMTgnLFxuICAvLyDojrflj5Z1cmzlj4LmlbBcbiAgdXJsQXJnOiBmdW5jdGlvbihzKSB7XG4gICAgdmFyIHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgcmV0dXJuIHBhcmFtcy5nZXQocyk7XG4gIH0sXG4gIC8vIOWkjeWItuaVsOaNrlxuICBjb3B5OiBmdW5jdGlvbihzKSB7XG4gICAgdmFyIG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgIG8udmFsdWUgPSBzO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobyk7XG4gICAgby5zZWxlY3QoKTtcbiAgICBpZiAoZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKSkge1xuICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcbiAgICB9XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChvKTtcbiAgfSxcbiAgLy8g6aG16Z2i5Yi35pawXG4gIHJlZnJlc2g6IGZ1bmN0aW9uKCkge1xuICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICB9LFxuICAvLyDov5Tlm57kuIrkuIDpobVcbiAgYmFjazogZnVuY3Rpb24oKSB7XG4gICAgaGlzdG9yeS5iYWNrKCk7XG4gIH0sXG4gIC8vIOmhtemdoui3s+i9rFxuICBnb3RvOiBmdW5jdGlvbih1cmwpIHtcbiAgICBsb2NhdGlvbi5ocmVmID0gdXJsO1xuICB9LFxuICAvLyDmiZPlvIDmlrDpobXpnaJcbiAgb3BlbjogZnVuY3Rpb24odXJsKSB7XG4gICAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBhLnNldEF0dHJpYnV0ZSgnaHJlZicsIHVybCk7XG4gICAgYS5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsICdfYmxhbmsnKTtcbiAgICBhLnNldEF0dHJpYnV0ZSgnaWQnLCAnb3Blbi10ZW1wLWxpbmsnKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpO1xuICAgIGEuY2xpY2soKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcGVuLXRlbXAtbGluaycpKTtcbiAgfSxcbiAgLy8g5piv5ZCm5Li656m6XG4gIGlzTjogZnVuY3Rpb24ocywgYikge1xuICAgIGlmICh0eXBlb2YgcyA9PSAnbnVtYmVyJykgcyA9IHMudG9TdHJpbmcoKTtcbiAgICBpZiAoYiAmJiAocyA9PSAnJyB8fCB0eXBlb2YgcyA9PSAndW5kZWZpbmVkJykpIHJldHVybiB0cnVlO1xuICAgIGVsc2UgaWYgKHMgPT0gJycgfHwgcyA9PSBudWxsIHx8IHR5cGVvZiBzID09ICd1bmRlZmluZWQnKSByZXR1cm4gdHJ1ZTtcbiAgICBlbHNlIHJldHVybiBmYWxzZTtcbiAgfSxcbiAgLy8gSFRNTOino+eggVxuICBodG1sRGVjb2RlOiBmdW5jdGlvbih0ZXh0KSB7XG4gICAgbGV0IHRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0ZW1wLmlubmVySFRNTCA9IHRleHQ7XG4gICAgY29uc3Qgb3V0cHV0ID0gdGVtcC5pbm5lclRleHQgfHwgdGVtcC50ZXh0Q29udGVudDtcbiAgICB0ZW1wID0gbnVsbDtcbiAgICByZXR1cm4gb3V0cHV0O1xuICB9LFxuICAvLyDmoLzlvI/ljJbml7bpl7RcbiAgZm9ybWF0VGltZTogZnVuY3Rpb24odGltZSwgb3B0aW9uKSB7XG4gICAgaWYgKCgnJyArIHRpbWUpLmxlbmd0aCA9PT0gMTApIHtcbiAgICAgIHRpbWUgPSBwYXJzZUludCh0aW1lKSAqIDEwMDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpbWUgPSArdGltZTtcbiAgICB9XG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKHRpbWUpO1xuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgY29uc3QgZGlmZiA9IChub3cgLSBkKSAvIDEwMDA7XG4gICAgaWYgKGRpZmYgPCAzMCkge1xuICAgICAgcmV0dXJuICfliJrliJonO1xuICAgIH0gZWxzZSBpZiAoZGlmZiA8IDM2MDApIHtcbiAgICAgIHJldHVybiBNYXRoLmNlaWwoZGlmZiAvIDYwKSArICfliIbpkp/liY0nO1xuICAgIH0gZWxzZSBpZiAoZGlmZiA8IDM2MDAgKiAyNCkge1xuICAgICAgcmV0dXJuIE1hdGguY2VpbChkaWZmIC8gMzYwMCkgKyAn5bCP5pe25YmNJztcbiAgICB9IGVsc2UgaWYgKGRpZmYgPCAzNjAwICogMjQgKiAyKSB7XG4gICAgICByZXR1cm4gJzHlpKnliY0nO1xuICAgIH1cbiAgICBpZiAob3B0aW9uKSB7XG4gICAgICByZXR1cm4gcGFyc2VUaW1lKHRpbWUsIG9wdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBkLmdldE1vbnRoKCkgKyAxICsgJ+aciCcgKyBkLmdldERhdGUoKSArICfml6UnICsgZC5nZXRIb3VycygpICsgJ+aXticgKyBkLmdldE1pbnV0ZXMoKSArICfliIYnO1xuICAgIH1cbiAgfSxcbiAgLy8g6KGlMFxuICBhZGRaZXJvOiBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuIGQgPCAxMCA/ICcwJyArIGQgOiBkO1xuICB9LFxuICAvLyDpmLLmipZcbiAgZGVib3VuY2U6IGZ1bmN0aW9uKGZuLCBkZWxheSA9IDIwMCkge1xuICAgIGxldCB0aW1lciA9IG51bGw7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRpbWVyKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB9XG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH0sIGRlbGF5KTtcbiAgICB9O1xuICB9LFxuICAvLyDoioLmtYFcbiAgdGhyb3R0bGU6IGZ1bmN0aW9uKGZuLCBkZWxheSA9IDIwMCkge1xuICAgIGxldCBsYXN0LFxuICAgICAgdGltZXIgPSBudWxsO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGxldCB0aCA9IHRoaXM7XG4gICAgICBsZXQgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIGxldCBub3cgPSArbmV3IERhdGUoKTtcbiAgICAgIGlmIChsYXN0ICYmIG5vdyAtIGxhc3QgPCBkZWxheSkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgbGFzdCA9IG5vdztcbiAgICAgICAgICBmbi5hcHBseSh0aCwgYXJncyk7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxhc3QgPSBub3c7XG4gICAgICAgIGZuLmFwcGx5KHRoLCBhcmdzKTtcbiAgICAgIH1cbiAgICB9O1xuICB9LFxuICAvLyDor7fmsYLmlbDmja5cbiAgcmVxOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgdmFyIHN1Y2Nlc3MgPSBvcHRpb25zLnN1Y2Nlc3MsXG4gICAgICBlcnJvciA9IG9wdGlvbnMuZXJyb3IsXG4gICAgICBlcnIgPSBvcHRpb25zLmVycjtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMgfHwge307XG4gICAgdmFyIHRpbWVzdGFtcCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIG9wdGlvbnMuaGVhZGVyc1snc291cmNlJ10gPSAnd2ViJztcbiAgICBvcHRpb25zLmhlYWRlcnNbJ3RpbWVzdGFtcCddID0gdGltZXN0YW1wO1xuICAgIG9wdGlvbnMuaGVhZGVyc1snc2lnbiddID0gbWQ1KHV0aWwuYXBwU2VjcmV0ICsgdGltZXN0YW1wKTtcbiAgICBkZWxldGUgb3B0aW9ucy5zdWNjZXNzO1xuICAgIGRlbGV0ZSBvcHRpb25zLmVycm9yO1xuICAgIG9wdGlvbnMudGltZW91dCA9IDYwMDAwO1xuICAgIG9wdGlvbnMuY29udGVudFR5cGUgPSAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCc7XG4gICAgb3B0aW9ucy5kYXRhID0gSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5kYXRhKTtcbiAgICBpZiAodXRpbC5hcGkuaW5kZXhPZih3aW5kb3cubG9jYXRpb24uaG9zdCkgPT0gLTEpIHtcbiAgICAgIHV0aWwuYXBpID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIHdpbmRvdy5sb2NhdGlvbi5ob3N0O1xuICAgIH1cbiAgICBvcHRpb25zLnVybCA9IHV0aWwuYXBpICsgb3B0aW9ucy51cmw7XG4gICAgcmV0dXJuICQuYWpheChcbiAgICAgICQuZXh0ZW5kKFxuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ2dldCcsXG4gICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGxheWVyLmNsb3NlQWxsKCdsb2FkaW5nJyk7XG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT0gMSkge1xuICAgICAgICAgICAgICB0eXBlb2Ygb3B0aW9ucy5kb25lID09PSAnZnVuY3Rpb24nICYmIG9wdGlvbnMuZG9uZShyZXMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbGF5ZXIubXNnKHJlcy5tc2cgfHwgJ+i/lOWbnueKtuaAgeeggeW8guW4uCcsIHsgaWNvbjogNSB9KTtcbiAgICAgICAgICAgICAgdHlwZW9mIGVyciA9PT0gJ2Z1bmN0aW9uJyAmJiBlcnIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHR5cGVvZiBzdWNjZXNzID09PSAnZnVuY3Rpb24nICYmIHN1Y2Nlc3MocmVzKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihlLCBjb2RlKSB7XG4gICAgICAgICAgICB0eXBlb2YgZXJyb3IgPT09ICdmdW5jdGlvbicgJiYgZXJyb3IoY29kZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW9uc1xuICAgICAgKVxuICAgICk7XG4gIH0sXG4gIC8vIOWNleihjOaWh+acrOWQkeS4iua7muWKqFxuICBzY3JvbGxUZXh0OiBmdW5jdGlvbihvKSB7XG4gICAgdmFyIHNwZWVkID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiAzO1xuICAgIHZhciBkZW1vID0gJChvKTtcbiAgICB2YXIgX3RpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICBzZXRNb3ZlKCk7XG4gICAgfSwgc3BlZWQgKiAxMDAwKTtcbiAgICBkZW1vLmJpbmQoJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgY2xlYXJJbnRlcnZhbChfdGltZXIpO1xuICAgIH0pO1xuICAgIGRlbW8uYmluZCgnbW91c2VvdXQnLCBmdW5jdGlvbigpIHtcbiAgICAgIF90aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICBzZXRNb3ZlKCk7XG4gICAgICB9LCBzcGVlZCAqIDEwMDApO1xuICAgIH0pO1xuICAgIGZ1bmN0aW9uIHNldE1vdmUoKSB7XG4gICAgICBkZW1vLmZpbmQoJ3VsOmZpcnN0JykuYW5pbWF0ZShcbiAgICAgICAge1xuICAgICAgICAgIG1hcmdpblRvcDogJy0nICsgZGVtby5oZWlnaHQoKSArICdweCcsXG4gICAgICAgIH0sXG4gICAgICAgIDUwMCxcbiAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNzcyh7IG1hcmdpblRvcDogJzBweCcgfSlcbiAgICAgICAgICAgIC5maW5kKCdsaTpmaXJzdCcpXG4gICAgICAgICAgICAuYXBwZW5kVG8odGhpcyk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuICB9LFxuICAvLyBUYWLliIfmjaJcbiAgdG9nZ2xlVGFiOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogJ2JvZHknO1xuICAgIHZhciBpdGVtID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiAnLnRhYi1pdGVtJztcbiAgICB2YXIgY29udGVudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAyID8gYXJndW1lbnRzWzJdIDogJy50YWItY29udGVudCc7XG4gICAgdmFyIGV2ID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgPyBhcmd1bWVudHNbM10gOiAnbW91c2VvdmVyJztcbiAgICB2YXIgY3NzID0gYXJndW1lbnRzLmxlbmd0aCA+IDQgPyBhcmd1bWVudHNbNF0gOiAnYWN0aXZlJztcbiAgICB2YXIgdGFiSXRlbSA9ICQobyArICcgJyArIGl0ZW0gKyAnIHVsIGxpJyk7XG4gICAgdmFyIHRhYkNvbiA9ICQobyArICcgJyArIGNvbnRlbnQgKyAnID4gZGl2Jyk7XG4gICAgdGFiQ29uXG4gICAgICAuaGlkZSgpXG4gICAgICAuZXEoMClcbiAgICAgIC5zaG93KCk7XG4gICAgdGFiSXRlbS5iaW5kKGV2LCBmdW5jdGlvbigpIHtcbiAgICAgIHRhYkl0ZW0ucmVtb3ZlQ2xhc3MoY3NzKTtcbiAgICAgICQodGhpcykuYWRkQ2xhc3MoY3NzKTtcbiAgICAgIHRhYkNvblxuICAgICAgICAuc3RvcCgpXG4gICAgICAgIC5oaWRlKClcbiAgICAgICAgLmVxKCQodGhpcykuaW5kZXgoKSlcbiAgICAgICAgLnNob3coKTtcbiAgICB9KTtcbiAgfSxcbiAgLy8gU2VsZWN06Lez6L2sXG4gIHNlbGVjdEp1bXA6IGZ1bmN0aW9uKG8pIHtcbiAgICB2YXIgdXJsID0gJChvKS52YWwoKTtcbiAgICBpZiAodXJsID09ICcnKSByZXR1cm47XG4gICAgdmFyIGxpbmsgPSAkKCc8YSB0YXJnZXQ9XCJfYmxhbmtcIj48L2E+JylcbiAgICAgIC5hdHRyKCdocmVmJywgdXJsKVxuICAgICAgLmh0bWwoJyZuYnNwOycpXG4gICAgICAuaGlkZSgpO1xuICAgICQobylcbiAgICAgIC5wYXJlbnQoKVxuICAgICAgLmFwcGVuZChsaW5rKTtcbiAgICBsaW5rWzBdLmNsaWNrKCk7XG4gICAgbGluay5yZW1vdmUoKTtcbiAgfSxcbiAgLy8gYmFja3RvdG9wXG4gIGxvYWRCYWNrVG9Ub3A6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzID0gJzxhc2lkZSBjbGFzcz1cImJhY2t0b1RvcFwiPjxkaXY+PC9kaXY+PC9hc2lkZT4nO1xuICAgICQocykuYXBwZW5kVG8oJCgnYm9keScpKTtcbiAgICB2YXIgYmFja3RvVG9wID0gJCgnLmJhY2t0b1RvcCcpO1xuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gMjAwKSB7XG4gICAgICAgIGJhY2t0b1RvcC5mYWRlSW4oJ2Zhc3QnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJhY2t0b1RvcC5mYWRlT3V0KCdmYXN0Jyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgYmFja3RvVG9wLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogMCB9LCA1MDApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICB9LFxuICAvLyDpooTnuqbor5XlkKxcbiAgcmVzZXJ2YXRpb25Db3Vyc2U6IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgdmFyIG5pY2tuYW1lT2JqID0gJCgnaW5wdXRbbmFtZT1uaWNrbmFtZV0nKSxcbiAgICAgIG5pY2tuYW1lID0gbmlja25hbWVPYmoudmFsKCkudHJpbSgpLFxuICAgICAgbW9iaWxlT2JqID0gJCgnaW5wdXRbbmFtZT1tb2JpbGVdJyksXG4gICAgICBtb2JpbGUgPSBtb2JpbGVPYmoudmFsKCkudHJpbSgpLFxuICAgICAgc2Nob29sSWQgPSAkKCdpbnB1dFtuYW1lPXNjaG9vbElkXScpLnZhbCgpLFxuICAgICAgY291cnNlSWQgPSAkKCdpbnB1dFtuYW1lPWNvdXJzZUlkXScpLnZhbCgpO1xuICAgIGlmICh1dGlsLmlzTihuaWNrbmFtZSkpIHtcbiAgICAgIG5pY2tuYW1lT2JqLmZvY3VzKCk7XG4gICAgICBsYXllci50aXBzKCfor7fovpPlhaXmgqjnmoTlp5PlkI3vvIEnLCBuaWNrbmFtZU9iaiwge1xuICAgICAgICB0aXBzOiAxLFxuICAgICAgICB0aW1lOiA0MDAwLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICh1dGlsLmlzTihtb2JpbGUpKSB7XG4gICAgICBtb2JpbGVPYmouZm9jdXMoKTtcbiAgICAgIGxheWVyLnRpcHMoJ+ivt+i+k+WFpeaCqOeahOaJi+acuuWPt+egge+8gScsIG1vYmlsZU9iaiwge1xuICAgICAgICB0aXBzOiAxLFxuICAgICAgICB0aW1lOiA0MDAwLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghbmV3IFJlZ0V4cCgvXigxM1swLTldfDE0WzAxNDU2ODc5XXwxNVswLTM1LTldfDE2WzI1NjddfDE3WzAtOF18MThbMC05XXwxOVswLTM1LTldKVxcZHs4fSQvKS50ZXN0KG1vYmlsZSkpIHtcbiAgICAgIG1vYmlsZU9iai5mb2N1cygpO1xuICAgICAgbGF5ZXIudGlwcygn6K+36L6T5YWl5q2j56Gu55qE5omL5py65Y+356CB77yBJywgbW9iaWxlT2JqLCB7XG4gICAgICAgIHRpcHM6IDEsXG4gICAgICAgIHRpbWU6IDQwMDAsXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdXRpbC5yZXEoe1xuICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgdXJsOiAnL2hvbWUvb3JkZXIvYWRkJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgc2Nob29sSWQ6IHNjaG9vbElkLFxuICAgICAgICBjb3Vyc2VJZDogY291cnNlSWQsXG4gICAgICAgIG5pY2tuYW1lOiBuaWNrbmFtZSxcbiAgICAgICAgbW9iaWxlOiBtb2JpbGUsXG4gICAgICB9LFxuICAgICAgZG9uZTogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIGxheWVyLm1zZyhyZXMubXNnLCB7IGljb246IDEgfSk7XG4gICAgICAgIGlmIChpbmRleCkge1xuICAgICAgICAgIGxheWVyLmNsb3NlKGluZGV4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHV0aWwucmVmcmVzaCgpO1xuICAgICAgICAgIH0sIDMwMDApO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pO1xuICB9LFxuICAvLyDmi5vnlJ/lkIjkvZxcbiAgc3Vic2NyaWJlSm9pbnVzOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbmlja25hbWVPYmogPSAkKCdpbnB1dFtuYW1lPW5pY2tuYW1lXScpLFxuICAgICAgbmlja25hbWUgPSBuaWNrbmFtZU9iai52YWwoKS50cmltKCksXG4gICAgICBtb2JpbGVPYmogPSAkKCdpbnB1dFtuYW1lPW1vYmlsZV0nKSxcbiAgICAgIG1vYmlsZSA9IG1vYmlsZU9iai52YWwoKS50cmltKCksXG4gICAgICBjb250ZW50ID0gJCgnaW5wdXRbbmFtZT1jb250ZW50XScpXG4gICAgICAgIC52YWwoKVxuICAgICAgICAudHJpbSgpO1xuICAgIGlmICh1dGlsLmlzTihuaWNrbmFtZSkpIHtcbiAgICAgIG5pY2tuYW1lT2JqLmZvY3VzKCk7XG4gICAgICBsYXllci50aXBzKCfor7fovpPlhaXmgqjnmoTlp5PlkI3vvIEnLCBuaWNrbmFtZU9iaiwge1xuICAgICAgICB0aXBzOiAxLFxuICAgICAgICB0aW1lOiA0MDAwLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICh1dGlsLmlzTihtb2JpbGUpKSB7XG4gICAgICBtb2JpbGVPYmouZm9jdXMoKTtcbiAgICAgIGxheWVyLnRpcHMoJ+ivt+i+k+WFpeaCqOeahOaJi+acuuWPt+egge+8gScsIG1vYmlsZU9iaiwge1xuICAgICAgICB0aXBzOiAxLFxuICAgICAgICB0aW1lOiA0MDAwLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghbmV3IFJlZ0V4cCgvXigxM1swLTldfDE0WzAxNDU2ODc5XXwxNVswLTM1LTldfDE2WzI1NjddfDE3WzAtOF18MThbMC05XXwxOVswLTM1LTldKVxcZHs4fSQvKS50ZXN0KG1vYmlsZSkpIHtcbiAgICAgIG1vYmlsZU9iai5mb2N1cygpO1xuICAgICAgbGF5ZXIudGlwcygn6K+36L6T5YWl5q2j56Gu55qE5omL5py65Y+356CB77yBJywgbW9iaWxlT2JqLCB7XG4gICAgICAgIHRpcHM6IDEsXG4gICAgICAgIHRpbWU6IDQwMDAsXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdXRpbC5yZXEoe1xuICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgdXJsOiAnL2hvbWUvam9pbi9hZGQnLFxuICAgICAgZGF0YToge1xuICAgICAgICBuaWNrbmFtZTogbmlja25hbWUsXG4gICAgICAgIG1vYmlsZTogbW9iaWxlLFxuICAgICAgICBjb250ZW50OiBjb250ZW50LFxuICAgICAgfSxcbiAgICAgIGRvbmU6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICBsYXllci5tc2cocmVzLm1zZywgeyBpY29uOiAxIH0pO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB1dGlsLnJlZnJlc2goKTtcbiAgICAgICAgfSwgMzAwMCk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9LFxuICAvLyDmkJzntKLlpITnkIZcbiAgdG9TZWFyY2g6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBrZXl3b3JkT2JqID0gJCgnaW5wdXRbbmFtZT1rZXl3b3JkXScpLFxuICAgICAga2V5d29yZCA9IGtleXdvcmRPYmoudmFsKCkudHJpbSgpO1xuICAgIGlmICh1dGlsLmlzTihrZXl3b3JkKSkge1xuICAgICAga2V5d29yZE9iai5mb2N1cygpO1xuICAgICAgbGF5ZXIudGlwcygn6K+36L6T5YWl5oKo6KaB5om+55qE5YaF5a6577yBJywga2V5d29yZE9iaiwge1xuICAgICAgICB0aXBzOiAxLFxuICAgICAgICB0aW1lOiA0MDAwLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHV0aWwuZ290bygnL2hvbWUvY291cnNlL3NlYXJjaC5odG1sP2tleXdvcmQ9JyArIGtleXdvcmQpO1xuICB9LFxuICAvLyBub3RpZnlcbiAgbm90aWZ5OiBmdW5jdGlvbihzLCB0KSB7XG4gICAgdCA9IHQgfHwgMjtcbiAgICB0ID0gdCAqIDEwMDA7XG4gICAgdmFyIHRpcENsYXNzID0gJ24nICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgJCgnYm9keScpLmFwcGVuZCgnPGRpdiBjbGFzcz1cIm5vdGlmeSAnICsgdGlwQ2xhc3MgKyAnXCI+PGRpdiBjbGFzcz1cIm5vdGlmeS1jbnRcIj48cD4nICsgcyArICc8L3A+PC9kaXY+PC9kaXY+Jyk7XG4gICAgd2luZG93LnNldFRpbWVvdXQoXG4gICAgICBmdW5jdGlvbih0aXBDbGFzcykge1xuICAgICAgICAkKCcubm90aWZ5LicgKyB0aXBDbGFzcyArICcgLm5vdGlmeS1jbnQnKS5hZGRDbGFzcygnb3V0Jyk7XG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KFxuICAgICAgICAgIGZ1bmN0aW9uKHRpcENsYXNzKSB7XG4gICAgICAgICAgICAkKCcubm90aWZ5LicgKyB0aXBDbGFzcykucmVtb3ZlKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICA1MDAsXG4gICAgICAgICAgdGlwQ2xhc3NcbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgICB0LFxuICAgICAgdGlwQ2xhc3NcbiAgICApO1xuICB9LFxuICAvLyBzcGVjaWFsIGRpYWxvZ1xuICBzZGlhbG9nOiBmdW5jdGlvbihzKSB7XG4gICAgJCgnYm9keScpLmFwcGVuZCgnPGRpdiBjbGFzcz1cInNkaWFsb2dcIj48ZGl2IGNsYXNzPVwic2RsZy1ib3hcIj48ZGl2IGNsYXNzPVwic2RsZy1jbnRcIj4nICsgcyArICc8L2Rpdj48L2Rpdj48L2Rpdj4nKTtcbiAgfSxcbiAgLy8gY29uZmlybVxuICBjb25maXJtOiBmdW5jdGlvbihvcHRzKSB7XG4gICAgdmFyIHRpdGxlID0gb3B0cy50aXRsZSB8fCAn57O757uf5o+Q56S6JztcbiAgICB2YXIgY29udGVudCA9IG9wdHMuY29udGVudCB8fCAnJztcbiAgICB2YXIgcyA9ICcnO1xuICAgICQoJyNjb25maXJtJykucmVtb3ZlKCk7XG4gICAgcyArPVxuICAgICAgJzxkaXYgY2xhc3M9XCJjb25maXJtXCIgaWQ9XCJjb25maXJtXCI+PGRpdiBjbGFzcz1cImFuaS1zaG93XCI+PGRpdiBjbGFzcz1cImNmbS1ib3hcIj48ZGl2IGNsYXNzPVwiY2ZtLXRpdGxlXCI+JyArXG4gICAgICB0aXRsZSArXG4gICAgICAnPC9kaXY+PGRpdiBjbGFzcz1cImNmbS1jbnRcIj4nICtcbiAgICAgIGNvbnRlbnQgK1xuICAgICAgJzwvZGl2PjxkaXYgY2xhc3M9XCJjZm0tYnRtIGNvbC0xMlwiPic7XG4gICAgaWYgKG9wdHMuYnV0dG9ucyA9PSAxKSB7XG4gICAgICBzICs9ICc8YSBjbGFzcz1cImNvbC0xMiBidG4tb25lXCIgaWQ9XCJidG5Pa1wiPuehruWumjwvbGk+JztcbiAgICB9IGVsc2Uge1xuICAgICAgcyArPSAnPGEgY2xhc3M9XCJjb2wtNlwiIGlkPVwiYnRuQ2FuY2VsXCI+5Y+W5raIPC9saT4nO1xuICAgICAgcyArPSAnPGEgY2xhc3M9XCJjb2wtNiBidG4tcmlnaHRcIiBpZD1cImJ0bk9rXCI+56Gu5a6aPC9saT4nO1xuICAgIH1cbiAgICBzICs9ICc8L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj4nO1xuICAgICQoJ2JvZHknKS5hcHBlbmQocyk7XG4gICAgdmFyIG8gPSAkKCcjY29uZmlybScpO1xuICAgICQoJyNidG5DYW5jZWwnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgIGlmIChvcHRzLmNhbmNlbGNiKSBvcHRzLmNhbmNlbGNiKCk7XG4gICAgICBvLnJlbW92ZSgpO1xuICAgIH0pO1xuICAgICQoJyNidG5PaycpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKG9wdHMuY2FsbGJhY2spIG9wdHMuY2FsbGJhY2soKTtcbiAgICAgIG8ucmVtb3ZlKCk7XG4gICAgfSk7XG4gIH0sXG4gIC8vIGRpYWxvZ1xuICBkaWFsb2c6IGZ1bmN0aW9uKG9wdHMpIHtcbiAgICB2YXIgdGl0bGUgPSBvcHRzLnRpdGxlIHx8ICfns7vnu5/mj5DnpLonO1xuICAgIHZhciBjb250ZW50ID0gb3B0cy5jb250ZW50IHx8ICcnO1xuICAgICQoJyNkaWFsb2cnKS5yZW1vdmUoKTtcbiAgICAkKCdib2R5JykuYXBwZW5kKFxuICAgICAgJzxkaXYgY2xhc3M9XCJkaWFsb2dcIiBpZD1cImRpYWxvZ1wiPjxkaXYgY2xhc3M9XCJhbmktc2hvd1wiPjxkaXYgY2xhc3M9XCJkbGctYm94XCI+PGRpdiBjbGFzcz1cImRsZy10aXRsZVwiPicgK1xuICAgICAgICB0aXRsZSArXG4gICAgICAgICc8YSBpZD1cImJ0bkNsb3NlXCI+PGkgY2xhc3M9XCJpY29uLXJlbW92ZVwiPjwvaT48L2E+PC9kaXY+PGRpdiBjbGFzcz1cImRsZy1jbnRcIj4nICtcbiAgICAgICAgY29udGVudCArXG4gICAgICAgICc8L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj4nXG4gICAgKTtcbiAgICB2YXIgbyA9ICQoJyNkaWFsb2cnKTtcbiAgICAkKCcjYnRuQ2xvc2UnKVxuICAgICAgLm9mZignY2xpY2snKVxuICAgICAgLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAob3B0cy5jYW5jZWxjYikgb3B0cy5jYW5jZWxjYigpO1xuICAgICAgICBvLnJlbW92ZSgpO1xuICAgICAgfSk7XG4gICAgaWYgKG9wdHMubG9hZGVkKSB7XG4gICAgICBvcHRzLmxvYWRlZCgpO1xuICAgIH1cbiAgfSxcbiAgY2xvc2VEaWFsb2c6IGZ1bmN0aW9uKGNiKSB7XG4gICAgdmFyIG8gPSAkKCcjZGlhbG9nJyk7XG4gICAgaWYgKG8ubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKGNiKSBjYigpO1xuICAgICAgby5yZW1vdmUoKTtcbiAgICB9XG4gIH0sXG4gIC8vIGxvYWRpbmdcbiAgbG9hZGluZzogZnVuY3Rpb24obywgcykge1xuICAgICQoJyNsb2FkaW5nJykucmVtb3ZlKCk7XG4gICAgaWYgKG8pIHtcbiAgICAgIHZhciBsb2FkaW5nID0gJCgnI2xvYWRpbmcnKTtcbiAgICAgIGlmIChsb2FkaW5nLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbG9hZGluZy5maW5kKCcubG9hZGluZy1jbnQnKS5odG1sKHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvICE9ICdvYmplY3QnKSBvID0gJCgnYm9keScpO1xuICAgICAgICBvLmFwcGVuZChcbiAgICAgICAgICAnPGRpdiBpZD1cImxvYWRpbmdcIj5cXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxvYWRpbmctbWFzayBtYXNrLXRyYW5zcGFyZW50XCI+PC9kaXY+XFxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsb2FkaW5nXCI+XFxcbiAgICAgICAgICAgICAgPGkgY2xhc3M9XCJsb2FkZXJcIj48L2k+XFxcbiAgICAgICAgICAgICAgPHAgY2xhc3M9XCJsb2FkaW5nLWNudFwiPicgK1xuICAgICAgICAgICAgKHMgPyBzIDogJ+aVsOaNruWKoOi9veS4rScpICtcbiAgICAgICAgICAgICc8L3A+XFxcbiAgICAgICAgICAgICAgPC9kaXY+XFxcbiAgICAgICAgICAgIDwvZGl2PidcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgJCgnYm9keScpLmFwcGVuZChcbiAgICAgICAgJzxkaXYgaWQ9XCJsb2FkaW5nXCI+XFxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibG9hZGluZy1tYXNrIG1hc2std3JpdGVcIj48L2Rpdj5cXFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJsb2FkaW5nLWJveFwiPlxcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibG9hZGVyXCI+PC9kaXY+XFxcbiAgICAgICAgICA8L2Rpdj5cXFxuICAgICAgICA8L2Rpdj4nXG4gICAgICApO1xuICAgICAgdmFyIGggPSAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgICBoIC09ICQoJ2hlYWRlcicpLmhlaWdodCgpO1xuICAgICAgaCAtPSAkKCdmb290ZXInKS5oZWlnaHQoKTtcbiAgICAgICQoJyNsb2FkaW5nJykuaGVpZ2h0KGgpO1xuICAgIH1cbiAgfSxcbiAgaGlkZUxvYWRpbmc6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvID0gJCgnI2xvYWRpbmcnKTtcbiAgICBpZiAoby5sZW5ndGggPiAwKSB7XG4gICAgICBvLmZpbmQoJ2xvYWRpbmctbWFzaycpLmFkZENsYXNzKCdhbmktaGlkZScpO1xuICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIG8ucmVtb3ZlKCk7XG4gICAgICB9LCAzMDApO1xuICAgIH1cbiAgfSxcbiAgLy8gdG9hc3RcbiAgdG9hc3Q6IGZ1bmN0aW9uKG9wdHMpIHtcbiAgICB2YXIgbyA9IG9wdHMudGFyZ2V0IHx8ICQoJ2JvZHknKSxcbiAgICAgIHQgPSBvcHRzLnR5cGUsXG4gICAgICBzID0gb3B0cy5jb250ZW50LFxuICAgICAgYyA9IG9wdHMuY2xvc2U7XG4gICAgdmFyIHRvYXN0ID0gJCgnI3RvYXN0Jyk7XG4gICAgaWYgKHRvYXN0Lmxlbmd0aCA+IDAgJiYgdG9hc3QuYXR0cignZGF0YS10eXBlJykgPT0gdCkge1xuICAgICAgdG9hc3QuZmluZCgnLnRvYXN0LWNudCcpLmh0bWwocyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoJyN0b2FzdCcpLnJlbW92ZSgpO1xuICAgICAgby5hcHBlbmQoXG4gICAgICAgICc8ZGl2IGlkPVwidG9hc3RcIiBkYXRhLXR5cGU9XCInICtcbiAgICAgICAgICB0ICtcbiAgICAgICAgICAnXCI+PGRpdiBjbGFzcz1cInRvYXN0LW1hc2sgbWFzay10cmFuc3BhcmVudFwiPjwvZGl2PjxkaXYgY2xhc3M9XCJ0b2FzdFwiPjxpIGNsYXNzPVwidG9hc3QtaWNvbiBmLWljb24tJyArXG4gICAgICAgICAgdCArXG4gICAgICAgICAgJ1wiPjwvaT48cCBjbGFzcz1cInRvYXN0LWNudFwiPicgK1xuICAgICAgICAgIHMgK1xuICAgICAgICAgICc8L3A+PC9kaXY+PC9kaXY+J1xuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGMpIHtcbiAgICAgIHV0aWwuaGlkZVRvYXN0KGMpO1xuICAgIH1cbiAgfSxcbiAgaGlkZVRvYXN0OiBmdW5jdGlvbih0KSB7XG4gICAgdmFyIHQgPSB0IHx8IDMwMCxcbiAgICAgIHRvYXN0ID0gJCgnI3RvYXN0Jyk7XG4gICAgaWYgKHRvYXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHRvYXN0LmZpbmQoJ3RvYXN0LW1hc2snKS5hZGRDbGFzcygnYW5pLWhpZGUnKTtcbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICB0b2FzdC5yZW1vdmUoKTtcbiAgICAgIH0sIHQpO1xuICAgIH1cbiAgfSxcbn07XG5cbi8vIOm7mOiupOWKoOi9vVxuJChmdW5jdGlvbigpIHtcbiAgLy8g5aSE55CG6ZO+5o6lXG4gICQoJ2FbaHJlZj1cIiNcIl0nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICQodGhpcykuYXR0cignaHJlZicsICdqYXZhc2NyaXB0OjsnKTtcbiAgfSk7XG4gIC8vIOWkhOeQhui/lOWbnumTvuaOpVxuICAkKCcuanMtYmFjaycpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIHV0aWwuYmFjaygpO1xuICB9KTtcbiAgLy8g5aSE55CG6Lez6L2s6ZO+5o6lXG4gICQoJy5qcy1nb3RvJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgdXRpbC5nb3RvKCQodGhpcykuZGF0YSgndXJsJykpO1xuICB9KTtcbiAgLy8g5Yqg6L295rWu5Yqo5qCPXG4gIGlmICghJCgnLm5vYmFja3RvcCcpLmxlbmd0aCkge1xuICAgIHV0aWwubG9hZEJhY2tUb1RvcCgpO1xuICB9XG4gIC8vIOWcqOe6v+WSqOivolxuICB2YXIgYnRuQ29uc3VsdCA9ICQoJy5idG4tY29uc3VsdCcpO1xuICBpZiAoYnRuQ29uc3VsdC5sZW5ndGgpIHtcbiAgICBidG5Db25zdWx0LmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgLy8gdXRpbC5nb3RvKCdodHRwOi8vd3BhLnFxLmNvbS9tc2dyZD92PTMmdWluPScgKyBxcSArICcmc2l0ZT1xcSZtZW51PXllcycpO1xuICAgICAgdXRpbC5nb3RvKCdtcXF3cGE6Ly9pbS9jaGF0P2NoYXRfdHlwZT13cGEmdWluPScgKyBxcSArICcmdmVyc2lvbj0xJnNyY190eXBlPXdlYiZ3ZWJfc3JjPW9pY3F6b25lLmNvbScpO1xuICAgIH0pO1xuICB9XG4gIC8vIOmihOe6puivleWQrFxuICB2YXIgYnRuUmVzZXJ2YXRpb24gPSAkKCcuYnRuLXJlc2VydmF0aW9uJyk7XG4gIGlmIChidG5SZXNlcnZhdGlvbi5sZW5ndGgpIHtcbiAgICBidG5SZXNlcnZhdGlvbi5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgIHV0aWwuZGVib3VuY2UodXRpbC5yZXNlcnZhdGlvbkNvdXJzZShudWxsKSwgNTAwKTtcbiAgICB9KTtcbiAgfVxuICAvLyDnq4vljbPmiqXlkI1cbiAgdmFyIGJ0bkFwcGx5ID0gJCgnLmJ0bi1hcHBseScpO1xuICBpZiAoYnRuQXBwbHkubGVuZ3RoKSB7XG4gICAgYnRuQXBwbHkuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2Nob29sSWQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtc2Nob29sSWQnKTtcbiAgICAgIHZhciBjb3Vyc2VJZCA9ICQodGhpcykuYXR0cignZGF0YS1jb3Vyc2VJZCcpO1xuICAgICAgdmFyIHMgPVxuICAgICAgICAnPGRpdiBjbGFzcz1cImFwcGx5LWZvcm1cIj5cXFxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cInNjaG9vbElkXCIgdmFsdWU9XCJ7e3NjaG9vbElkfX1cIj5cXFxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cImNvdXJzZUlkXCIgdmFsdWU9XCJ7e2NvdXJzZUlkfX1cIj5cXFxuICAgICAgICAgIDxwIGNsYXNzPVwicDFcIj7or7floavlhpnmgqjnmoTkuKrkurrkv6Hmga/vvIznqI3lkI7lsIbmnInlubPlj7DlrqLmnI3ogZTns7vmgqg8L3A+XFxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0LXdyYXBcIj5cXFxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm5pY2tuYW1lXCIgcGxhY2Vob2xkZXI9XCLor7fovpPlhaXmgqjnmoTlp5PlkI1cIiAvPlxcXG4gICAgICAgICAgPC9kaXY+XFxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0LXdyYXBcIj5cXFxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm1vYmlsZVwiIHBsYWNlaG9sZGVyPVwi6K+36L6T5YWl5oKo55qE5omL5py65Y+356CBXCIgLz5cXFxuICAgICAgICAgIDwvZGl2PlxcXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi13cmFwXCI+XFxcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4tYXBwbHlcIj7noa7orqQ8L2J1dHRvbj5cXFxuICAgICAgICAgIDwvZGl2PlxcXG4gICAgICAgICAgPHAgY2xhc3M9XCJwMlwiPnt7dGVsfX08L3A+XFxcbiAgICAgICAgICA8cCBjbGFzcz1cInAzXCI+5qyi6L+O5ouo5omT5bmz5Y+w54Ot57q/5Li75Yqo6IGU57O75oiR5LusPC9wPlxcXG4gICAgICAgIDwvZGl2Pic7XG4gICAgICBzY2hvb2xJZCA9IHNjaG9vbElkID8gc2Nob29sSWQgOiAwO1xuICAgICAgY291cnNlSWQgPSBjb3Vyc2VJZCA/IGNvdXJzZUlkIDogMDtcbiAgICAgIHMgPSBzLnJlcGxhY2UoJ3t7c2Nob29sSWR9fScsIHNjaG9vbElkKTtcbiAgICAgIHMgPSBzLnJlcGxhY2UoJ3t7Y291cnNlSWR9fScsIGNvdXJzZUlkKTtcbiAgICAgIHMgPSBzLnJlcGxhY2UoJ3t7dGVsfX0nLCB0ZWwpO1xuICAgICAgbGF5ZXIub3Blbih7XG4gICAgICAgIHR5cGU6IDEsXG4gICAgICAgIHRpdGxlOiAn6aKE57qm6K+V5ZCsJyxcbiAgICAgICAgc2tpbjogJ2xheXVpLWxheWVyLXJpbScsXG4gICAgICAgIGNsb3NlQnRuOiAwLFxuICAgICAgICBhbmltOiAyLFxuICAgICAgICBzaGFkZUNsb3NlOiB0cnVlLFxuICAgICAgICBhcmVhOiBbJzQwMHB4JywgJzQwMHB4J10sXG4gICAgICAgIGNvbnRlbnQ6IHMsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGxheWVybywgaW5kZXgpIHtcbiAgICAgICAgICBsYXllcm8uZmluZCgnLmJ0bi1hcHBseScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdXRpbC5kZWJvdW5jZSh1dGlsLnJlc2VydmF0aW9uQ291cnNlKGluZGV4KSwgNTAwKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIC8vIOaLm+eUn+WQiOS9nFxuICB2YXIgYnRuU3Vic2NyaWJlID0gJCgnLmJ0bi1zdWJzY3JpYmUnKTtcbiAgaWYgKGJ0blN1YnNjcmliZS5sZW5ndGgpIHtcbiAgICBidG5TdWJzY3JpYmUuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICB1dGlsLmRlYm91bmNlKHV0aWwuc3Vic2NyaWJlSm9pbnVzKCksIDUwMCk7XG4gICAgfSk7XG4gIH1cbiAgLy8g5pCc57Si5aSE55CGXG4gIHZhciBidG5TZWFyY2ggPSAkKCcuYnRuLXNlYXJjaCcpO1xuICBpZiAoYnRuU2VhcmNoLmxlbmd0aCkge1xuICAgIGJ0blNlYXJjaC5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgIHV0aWwuZGVib3VuY2UodXRpbC50b1NlYXJjaCgpLCA1MDApO1xuICAgIH0pO1xuICB9XG4gIC8vIOWIhumhteWkhOeQhlxuICB2YXIgcGFnZWJhciA9ICQoJy5wYWdlYmFyJyk7XG4gIGlmIChwYWdlYmFyLmxlbmd0aCkge1xuICAgIHBhZ2ViYXIucGFnaW5hdGlvbih7XG4gICAgICBjdXJyZW50OiB1dGlsLnVybEFyZygncGFnZScpIHx8IDEsIC8vIOW9k+WJjemhtVxuICAgICAgcGFnZUNvdW50OiBwYWdlYmFyLmF0dHIoJ2RhdGEtcGFnZUNvdW50JykgfHwgMCwgLy8g5oC76aG15pWwXG4gICAgICBzaG93RGF0YTogcGFnZWJhci5hdHRyKCdkYXRhLXBhZ2VTaXplJykgfHwgMTAsIC8vIOavj+mhteaYvuekuuiusOW9lVxuICAgICAgbW9kZTogJ3VuZml4ZWQnLFxuICAgICAgY291bnQ6IDIsIC8vIOWJjeWQjuaYvuekuumhteeggVxuICAgICAgY29waW5nOiB0cnVlLFxuICAgICAgcHJldkNvbnRlbnQ6ICc8JyxcbiAgICAgIG5leHRDb250ZW50OiAnPicsXG4gICAgICBjYWxsYmFjazogZnVuY3Rpb24oYXBpKSB7XG4gICAgICAgIHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICAgICAgdmFyIG51bSA9IHVybC5pbmRleE9mKCc/Jyk7XG4gICAgICAgIHZhciBwYXJhbXMgPSAnJztcbiAgICAgICAgaWYgKG51bSAhPSAtMSkge1xuICAgICAgICAgIHBhcmFtcyA9IHVybC5zdWJzdHIobnVtICsgMSk7XG4gICAgICAgICAgcGFyYW1zID0gJyYnICsgcGFyYW1zLnJlcGxhY2UoL3BhZ2U9KFxcZCspKFxcJiopL2dtLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgdXJsID0gJz9wYWdlPScgKyBhcGkuZ2V0Q3VycmVudCgpICsgKHBhcmFtcyA9PSAnJicgPyAnJyA6IHBhcmFtcyk7XG4gICAgICAgIHV0aWwuZ290byh1cmwpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuICAvLyDlnLDljLrpgInmi6lcbiAgdmFyIGJ0bkxvY2F0aW9uID0gJCgnLmJ0bi1sb2NhdGlvbicpO1xuICBidG5Mb2NhdGlvbi5jbGljayhmdW5jdGlvbigpIHtcbiAgICB2YXIgbG9jYXRpb25Cb3ggPSAkKCcubG9jYXRpb24nKTtcbiAgICBsb2NhdGlvbkJveC5zaG93KCk7XG4gICAgbG9jYXRpb25Cb3guY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgbG9jYXRpb25Cb3guaGlkZSgpO1xuICAgICAgfSwgMzAwKTtcbiAgICB9KTtcbiAgfSk7XG4gIC8vIOWvvOiIquiPnOWNlVxuICB2YXIgYnRuTWVudSA9ICQoJy5idG4tbWVudScpO1xuICBidG5NZW51LmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIHZhciBtZW51Qm94ID0gJCgnLm1lbnUnKTtcbiAgICBtZW51Qm94LnNob3coKTtcbiAgICBtZW51Qm94LmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIG1lbnVCb3guaGlkZSgpO1xuICAgICAgfSwgMzAwKTtcbiAgICB9KTtcbiAgICAkKCcubWVudS1ib3gtY2xvc2UnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBtZW51Qm94LmhpZGUoKTtcbiAgICAgIH0sIDMwMCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXX0=
