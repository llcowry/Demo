// 原型扩展
$.extend(Date.prototype, {
  format: function(s) {
    if (s.length == 1 && !/^[0-9]+.?[0-9]*$/.test(s)) {
      return this.getFullYear() + s + (this.getMonth() + 1) + s + this.getDate();
    }
    var week = ['日', '一', '二', '三', '四', '五', '六'];
    s = s.replace(/yyyy|YYYY/, this.getFullYear());
    s = s.replace(/yy|YY/, this.getYear() % 100 > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
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
  },
});

var util = {
  api: 'https://www.52sok.com',
  appSecret: '9c5996471853f01831bf9acfabb0d318',
  // 获取url参数
  urlArg: function(s) {
    var params = new URLSearchParams(window.location.search);
    return params.get(s);
  },
  // 复制数据
  copy: function(s) {
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
  refresh: function() {
    location.reload();
  },
  // 返回上一页
  back: function() {
    history.back();
  },
  // 页面跳转
  goto: function(url) {
    location.href = url;
  },
  // 打开新页面
  open: function(url) {
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    a.setAttribute('id', 'open-temp-link');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(document.getElementById('open-temp-link'));
  },
  // 是否为空
  isN: function(s, b) {
    if (typeof s == 'number') s = s.toString();
    if (b && (s == '' || typeof s == 'undefined')) return true;
    else if (s == '' || s == null || typeof s == 'undefined') return true;
    else return false;
  },
  // HTML解码
  htmlDecode: function(text) {
    let temp = document.createElement('div');
    temp.innerHTML = text;
    const output = temp.innerText || temp.textContent;
    temp = null;
    return output;
  },
  // 格式化时间
  formatTime: function(time, option) {
    if (('' + time).length === 10) {
      time = parseInt(time) * 1000;
    } else {
      time = +time;
    }
    const d = new Date(time);
    const now = Date.now();
    const diff = (now - d) / 1000;
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
  addZero: function(d) {
    return d < 10 ? '0' + d : d;
  },
  // 防抖
  debounce: function(fn, delay = 200) {
    let timer = null;
    return function() {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(function() {
        timer = null;
        fn.apply(this, arguments);
      }, delay);
    };
  },
  // 节流
  throttle: function(fn, delay = 200) {
    let last,
      timer = null;
    return function() {
      let th = this;
      let args = arguments;
      let now = +new Date();
      if (last && now - last < delay) {
        clearTimeout(timer);
        timer = setTimeout(function() {
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
  req: function(options) {
    var success = options.success,
      error = options.error,
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
    return $.ajax(
      $.extend(
        {
          type: 'get',
          dataType: 'json',
          success: function(res) {
            layer.closeAll('loading');
            if (res.code == 1) {
              typeof options.done === 'function' && options.done(res);
            } else {
              layer.msg(res.msg || '返回状态码异常', { icon: 5 });
              typeof err === 'function' && err();
            }
            typeof success === 'function' && success(res);
          },
          error: function(e, code) {
            typeof error === 'function' && error(code);
          },
        },
        options
      )
    );
  },
  // 单行文本向上滚动
  scrollText: function(o) {
    var speed = arguments.length > 1 ? arguments[1] : 3;
    var demo = $(o);
    var _timer = setInterval(function() {
      setMove();
    }, speed * 1000);
    demo.bind('mouseover', function() {
      clearInterval(_timer);
    });
    demo.bind('mouseout', function() {
      _timer = setInterval(function() {
        setMove();
      }, speed * 1000);
    });
    function setMove() {
      demo.find('ul:first').animate(
        {
          marginTop: '-' + demo.height() + 'px',
        },
        500,
        function() {
          $(this)
            .css({ marginTop: '0px' })
            .find('li:first')
            .appendTo(this);
        }
      );
    }
  },
  // Tab切换
  toggleTab: function() {
    var o = arguments.length > 0 ? arguments[0] : 'body';
    var item = arguments.length > 1 ? arguments[1] : '.tab-item';
    var content = arguments.length > 2 ? arguments[2] : '.tab-content';
    var ev = arguments.length > 3 ? arguments[3] : 'mouseover';
    var css = arguments.length > 4 ? arguments[4] : 'active';
    var tabItem = $(o + ' ' + item + ' ul li');
    var tabCon = $(o + ' ' + content + ' > div');
    tabCon
      .hide()
      .eq(0)
      .show();
    tabItem.bind(ev, function() {
      tabItem.removeClass(css);
      $(this).addClass(css);
      tabCon
        .stop()
        .hide()
        .eq($(this).index())
        .show();
    });
  },
  // Select跳转
  selectJump: function(o) {
    var url = $(o).val();
    if (url == '') return;
    var link = $('<a target="_blank"></a>')
      .attr('href', url)
      .html('&nbsp;')
      .hide();
    $(o)
      .parent()
      .append(link);
    link[0].click();
    link.remove();
  },
  // backtotop
  loadBackToTop: function() {
    var s = '<aside class="backtoTop"><div></div></aside>';
    $(s).appendTo($('body'));
    var backtoTop = $('.backtoTop');
    $(window).scroll(function() {
      if ($(window).scrollTop() > 200) {
        backtoTop.fadeIn('fast');
      } else {
        backtoTop.fadeOut('fast');
      }
    });
    backtoTop.click(function() {
      $('body,html').animate({ scrollTop: 0 }, 500);
      return false;
    });
  },
  // 预约试听
  reservationCourse: function(index) {
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
        time: 4000,
      });
      return false;
    }
    if (util.isN(mobile)) {
      mobileObj.focus();
      layer.tips('请输入您的手机号码！', mobileObj, {
        tips: 1,
        time: 4000,
      });
      return false;
    }
    if (!new RegExp(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/).test(mobile)) {
      mobileObj.focus();
      layer.tips('请输入正确的手机号码！', mobileObj, {
        tips: 1,
        time: 4000,
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
        mobile: mobile,
      },
      done: function(res) {
        layer.msg(res.msg, { icon: 1 });
        if (index) {
          layer.close(index);
        } else {
          setTimeout(() => {
            util.refresh();
          }, 3000);
        }
      },
    });
  },
  // 招生合作
  subscribeJoinus: function() {
    var nicknameObj = $('input[name=nickname]'),
      nickname = nicknameObj.val().trim(),
      mobileObj = $('input[name=mobile]'),
      mobile = mobileObj.val().trim(),
      content = $('input[name=content]')
        .val()
        .trim();
    if (util.isN(nickname)) {
      nicknameObj.focus();
      layer.tips('请输入您的姓名！', nicknameObj, {
        tips: 1,
        time: 4000,
      });
      return false;
    }
    if (util.isN(mobile)) {
      mobileObj.focus();
      layer.tips('请输入您的手机号码！', mobileObj, {
        tips: 1,
        time: 4000,
      });
      return false;
    }
    if (!new RegExp(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/).test(mobile)) {
      mobileObj.focus();
      layer.tips('请输入正确的手机号码！', mobileObj, {
        tips: 1,
        time: 4000,
      });
      return false;
    }
    util.req({
      type: 'post',
      url: '/home/join/add',
      data: {
        nickname: nickname,
        mobile: mobile,
        content: content,
      },
      done: function(res) {
        layer.msg(res.msg, { icon: 1 });
        setTimeout(() => {
          util.refresh();
        }, 3000);
      },
    });
  },
  // 搜索处理
  toSearch: function() {
    var keywordObj = $('input[name=keyword]'),
      keyword = keywordObj.val().trim();
    if (util.isN(keyword)) {
      keywordObj.focus();
      layer.tips('请输入您要找的内容！', keywordObj, {
        tips: 1,
        time: 4000,
      });
      return false;
    }
    util.goto('/home/course/search.html?keyword=' + keyword);
  },
  // notify
  notify: function(s, t) {
    t = t || 2;
    t = t * 1000;
    var tipClass = 'n' + new Date().getTime();
    $('body').append('<div class="notify ' + tipClass + '"><div class="notify-cnt"><p>' + s + '</p></div></div>');
    window.setTimeout(
      function(tipClass) {
        $('.notify.' + tipClass + ' .notify-cnt').addClass('out');
        window.setTimeout(
          function(tipClass) {
            $('.notify.' + tipClass).remove();
          },
          500,
          tipClass
        );
      },
      t,
      tipClass
    );
  },
  // special dialog
  sdialog: function(s) {
    $('body').append('<div class="sdialog"><div class="sdlg-box"><div class="sdlg-cnt">' + s + '</div></div></div>');
  },
  // confirm
  confirm: function(opts) {
    var title = opts.title || '系统提示';
    var content = opts.content || '';
    var s = '';
    $('#confirm').remove();
    s +=
      '<div class="confirm" id="confirm"><div class="ani-show"><div class="cfm-box"><div class="cfm-title">' +
      title +
      '</div><div class="cfm-cnt">' +
      content +
      '</div><div class="cfm-btm col-12">';
    if (opts.buttons == 1) {
      s += '<a class="col-12 btn-one" id="btnOk">确定</li>';
    } else {
      s += '<a class="col-6" id="btnCancel">取消</li>';
      s += '<a class="col-6 btn-right" id="btnOk">确定</li>';
    }
    s += '</div></div></div></div>';
    $('body').append(s);
    var o = $('#confirm');
    $('#btnCancel').click(function() {
      if (opts.cancelcb) opts.cancelcb();
      o.remove();
    });
    $('#btnOk').click(function() {
      if (opts.callback) opts.callback();
      o.remove();
    });
  },
  // dialog
  dialog: function(opts) {
    var title = opts.title || '系统提示';
    var content = opts.content || '';
    $('#dialog').remove();
    $('body').append(
      '<div class="dialog" id="dialog"><div class="ani-show"><div class="dlg-box"><div class="dlg-title">' +
        title +
        '<a id="btnClose"><i class="icon-remove"></i></a></div><div class="dlg-cnt">' +
        content +
        '</div></div></div></div>'
    );
    var o = $('#dialog');
    $('#btnClose')
      .off('click')
      .click(function() {
        if (opts.cancelcb) opts.cancelcb();
        o.remove();
      });
    if (opts.loaded) {
      opts.loaded();
    }
  },
  closeDialog: function(cb) {
    var o = $('#dialog');
    if (o.length > 0) {
      if (cb) cb();
      o.remove();
    }
  },
  // loading
  loading: function(o, s) {
    $('#loading').remove();
    if (o) {
      var loading = $('#loading');
      if (loading.length > 0) {
        loading.find('.loading-cnt').html(s);
      } else {
        if (typeof o != 'object') o = $('body');
        o.append(
          '<div id="loading">\
            <div class="loading-mask mask-transparent"></div>\
            <div class="loading">\
              <i class="loader"></i>\
              <p class="loading-cnt">' +
            (s ? s : '数据加载中') +
            '</p>\
              </div>\
            </div>'
        );
      }
    } else {
      $('body').append(
        '<div id="loading">\
          <div class="loading-mask mask-write"></div>\
          <div class="loading-box">\
            <div class="loader"></div>\
          </div>\
        </div>'
      );
      var h = $(window).height();
      h -= $('header').height();
      h -= $('footer').height();
      $('#loading').height(h);
    }
  },
  hideLoading: function() {
    var o = $('#loading');
    if (o.length > 0) {
      o.find('loading-mask').addClass('ani-hide');
      window.setTimeout(function() {
        o.remove();
      }, 300);
    }
  },
  // toast
  toast: function(opts) {
    var o = opts.target || $('body'),
      t = opts.type,
      s = opts.content,
      c = opts.close;
    var toast = $('#toast');
    if (toast.length > 0 && toast.attr('data-type') == t) {
      toast.find('.toast-cnt').html(s);
    } else {
      $('#toast').remove();
      o.append(
        '<div id="toast" data-type="' +
          t +
          '"><div class="toast-mask mask-transparent"></div><div class="toast"><i class="toast-icon f-icon-' +
          t +
          '"></i><p class="toast-cnt">' +
          s +
          '</p></div></div>'
      );
    }
    if (c) {
      util.hideToast(c);
    }
  },
  hideToast: function(t) {
    var t = t || 300,
      toast = $('#toast');
    if (toast.length > 0) {
      toast.find('toast-mask').addClass('ani-hide');
      window.setTimeout(function() {
        toast.remove();
      }, t);
    }
  },
};

// 默认加载
$(function() {
  // 处理链接
  $('a[href="#"]').each(function() {
    $(this).attr('href', 'javascript:;');
  });
  // 处理返回链接
  $('.js-back').click(function() {
    util.back();
  });
  // 处理跳转链接
  $('.js-goto').click(function() {
    util.goto($(this).data('url'));
  });
  // 加载浮动栏
  if (!$('.nobacktop').length) {
    util.loadBackToTop();
  }
  // 在线咨询
  var btnConsult = $('.btn-consult');
  if (btnConsult.length) {
    btnConsult.click(function() {
      // util.goto('http://wpa.qq.com/msgrd?v=3&uin=' + qq + '&site=qq&menu=yes');
      util.goto('mqqwpa://im/chat?chat_type=wpa&uin=' + qq + '&version=1&src_type=web&web_src=oicqzone.com');
    });
  }
  // 预约试听
  var btnReservation = $('.btn-reservation');
  if (btnReservation.length) {
    btnReservation.click(function() {
      util.debounce(util.reservationCourse(null), 500);
    });
  }
  // 立即报名
  var btnApply = $('.btn-apply');
  if (btnApply.length) {
    btnApply.click(function() {
      var schoolId = $(this).attr('data-schoolId');
      var courseId = $(this).attr('data-courseId');
      var s =
        '<div class="apply-form">\
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
        success: function(layero, index) {
          layero.find('.btn-apply').click(function() {
            util.debounce(util.reservationCourse(index), 500);
          });
        },
      });
    });
  }
  // 招生合作
  var btnSubscribe = $('.btn-subscribe');
  if (btnSubscribe.length) {
    btnSubscribe.click(function() {
      util.debounce(util.subscribeJoinus(), 500);
    });
  }
  // 搜索处理
  var btnSearch = $('.btn-search');
  if (btnSearch.length) {
    btnSearch.click(function() {
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
      callback: function(api) {
        var url = window.location.href;
        var num = url.indexOf('?');
        var params = '';
        if (num != -1) {
          params = url.substr(num + 1);
          params = '&' + params.replace(/page=(\d+)(\&*)/gm, '');
        }
        url = '?page=' + api.getCurrent() + (params == '&' ? '' : params);
        util.goto(url);
      },
    });
  }
  // 地区选择
  var btnLocation = $('.btn-location');
  btnLocation.click(function() {
    var locationBox = $('.location');
    locationBox.show();
    locationBox.click(function() {
      window.setTimeout(function() {
        locationBox.hide();
      }, 300);
    });
  });
  // 导航菜单
  var btnMenu = $('.btn-menu');
  btnMenu.click(function() {
    var menuBox = $('.menu');
    menuBox.show();
    menuBox.click(function() {
      window.setTimeout(function() {
        menuBox.hide();
      }, 300);
    });
    $('.menu-box-close').click(function() {
      window.setTimeout(function() {
        menuBox.hide();
      }, 300);
    });
  });
});
