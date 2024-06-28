//base
(function($) {
  if (!$.cookie) {
    $.cookie = function(name, value, options) {
      if (typeof value != 'undefined') {
        options = options || {};
        if (value === null) {
          value = '';
          options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
          var date;
          if (typeof options.expires == 'number') {
            date = new Date();
            date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
          } else {
            date = options.expires;
          }
          expires = '; expires=' + date.toUTCString(); //max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
      } else {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
            }
          }
        }
        return cookieValue;
      }
    };
  }
  $.extend(Number.prototype, {
    NaN0: function() {
      return isNaN(this) ? 0 : this;
    },
    toMoney: function(type) {
      var s = this;
      if (/[^0-9\.]/.test(s)) return "0";
      if (s == null || s === "") return "0";
      s = s.toString().replace(/^(\d*)$/, "$1.");
      s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
      s = s.replace(".", ",");
      var re = /(\d)(\d{3},)/;
      while (re.test(s)) s = s.replace(re, "$1,$2");
      s = s.replace(/,(\d\d)$/, ".$1");
      if (type === 0) {
        var a = s.split(".");
        if (a[1] == "00") s = a[0];
      }
      return s;
    },
    dateDiff: function(s) {
      var dtStart = this,
        dtEnd = new Date();
      if (arguments.length > 1) dtEnd = arguments[1];
      if (typeof dtEnd == 'string') {
        dtEnd = new Date(Date.parse(dtEnd));
        if (isNaN(dtEnd)) {
          var arys = dtEnd.split((dtEnd.indexOf('/') != -1) ? '/' : '-');
          dtEnd = new Date(arys[0], --arys[1], arys[2]);
        }
      }
      switch (s) {
        case 's':
          return parseInt((dtEnd - dtStart) / 1000);
        case 'm':
          return parseInt((dtEnd - dtStart) / 60000);
        case 'h':
          return parseInt((dtEnd - dtStart) / 3600000);
        case 'd':
          return parseInt((dtEnd - dtStart) / 86400000);
        case 'w':
          return parseInt((dtEnd - dtStart) / (86400000 * 7));
        case 'M':
          return (dtEnd.getMonth() + 1) + ((dtEnd.getFullYear() - dtStart.getFullYear()) * 12) - (dtStart.getMonth() + 1);
        case 'y':
          return dtEnd.getFullYear() - dtStart.getFullYear();
      }
    }
  });
  $.extend(Date.prototype, {
    format: function(s) {
      if (s.length == 1 && !/^[0-9]+.?[0-9]*$/.test(s)) {
        return this.getFullYear() + s + (this.getMonth() + 1) + s + this.getDate();
      }
      var week = ['日', '一', '二', '三', '四', '五', '六'];
      s = s.replace(/yyyy|YYYY/, this.getFullYear());
      s = s.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
      s = s.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1).toString());
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
    addDate: function(s, n) {
      var dtTmp = this;
      switch (s) {
        case 'y':
          return new Date((dtTmp.getFullYear() + n), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'M':
          return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + n, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'q':
          return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + n * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'w':
          return new Date(Date.parse(dtTmp) + ((86400000 * 7) * n));
        case 'd':
          return new Date(Date.parse(dtTmp) + (86400000 * n));
        case 'h':
          return new Date(Date.parse(dtTmp) + (3600000 * n));
        case 'n':
          return new Date(Date.parse(dtTmp) + (60000 * n));
        case 's':
          return new Date(Date.parse(dtTmp) + (1000 * n));
      }
    }
  });
  $.extend(String.prototype, {
    isPositiveInteger: function() { //正整数
      return (new RegExp(/^[1-9]\d*$/).test(this));
    },
    isInteger: function() { //整数
      return (new RegExp(/^\d+$/).test(this));
    },
    isNumber: function() { //数字
      return (new RegExp(/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/).test(this));
    },
    isAmount: function() { //金额
      if (this === 0) return false;
      return (new RegExp(/^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,})?$/).test(this));
    },
    isPwd: function() { //密码:6~32位,字母,数字,下划线,点
      return (new RegExp(/^([_.]|[a-zA-Z0-9]){6,32}$/).test(this));
    },
    isMail: function() {
      return (new RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).test(this.trim()));
    },
    isMail2: function() {
      return (new RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(this.trim()));
    },
    isTel: function() {
      return (new RegExp(/^(\(\d{3,4}\)|\d{3,4}(-|\s|))?\d{7,8}$/).test(this));
    },
    isMobile: function() {
      return (new RegExp(/^(86)*0*1[3458]{1}\d{9}$/).test(this));
    },
    isPhone: function() {
      return (new RegExp(/(^([0-9]{3,4}[-])?\d{3,8}(-\d{1,6})?$)|(^\([0-9]{3,4}\)\d{3,8}(\(\d{1,6}\))?$)|(^\d{3,8}$)/).test(this));
    },
    isPhone2: function() {
      return (new RegExp(/(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)/).test(this));
    },
    isPostCode: function() {
      return (new RegExp(/(^[1-9]\d{5}(?!d)$)/).test(this));
    },
    isUrl: function() {
      return (new RegExp(/^[a-zA-z]+:\/\/([a-zA-Z0-9\-\.]+)([-\w .\/?%&=:]*)$/).test(this));
    },
    isExternalUrl: function() { //是否为外部Url
      return this.isUrl() && this.indexOf("://" + document.domain) == -1;
    },
    isSpaces: function() { //是否为空白
      for (var i = 0; i < this.length; i += 1) {
        var ch = this.charAt(i);
        if (ch != ' ' && ch != "\n" && ch != "\t" && ch != "\r") {
          return false;
        }
      }
      return true;
    },
    len: function() {
      return this.replace(/[^\x00-\xff]/g, "xx").length;
    },
    trim: function() {
      return this.replace(/(^\s*)|(\s*$)|\r|\n/g, "");
    },
    ldel: function(a) {
      return this.substring(a, this.length);
    },
    rdel: function(a) {
      return this.substring(0, this.length - a);
    },
    left: function(a) {
      return this.substring(0, a);
    },
    right: function(a) {
      return this.substring(this.length - a, this.length);
    },
    startsWith: function(pattern) {
      return this.indexOf(pattern) === 0;
    },
    endsWith: function(pattern) {
      var d = this.length - pattern.length;
      return d >= 0 && this.lastIndexOf(pattern) === d;
    },
    trans: function() {
      return this.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
    },
    encodeTXT: function() {
      return (this).replaceAll('&', '&amp;').replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll(" ", "&nbsp;");
    },
    replaceSuffix: function(index) {
      return this.replace(/\[[0-9]+\]/, '[' + index + ']').replace('#index#', index);
    },
    replaceAll: function(os, ns) {
      return this.replace(new RegExp(os, "gm"), ns);
    },
    replaceTm: function($data) {
      if (!$data) return this;
      return this.replace(new RegExp("({[A-Za-z_]+[A-Za-z0-9_]*})", "g"), function($1) {
        return $data[$1.replace(/[{}]+/g, "")];
      });
    },
    replaceTmById: function(_box) {
      var $parent = _box || $(document);
      return this.replace(new RegExp("({[A-Za-z_]+[A-Za-z0-9_]*})", "g"), function($1) {
        var $input = $parent.find("#" + $1.replace(/[{}]+/g, ""));
        return $input.val() ? $input.val() : $1;
      });
    },
    isFinishedTm: function() {
      return !(new RegExp("{[A-Za-z_]+[A-Za-z0-9_]*}").test(this));
    },
    skipChar: function(ch) {
      if (!this || this.length === 0) {
        return '';
      }
      if (this.charAt(0) === ch) {
        return this.substring(1).skipChar(ch);
      }
      return this;
    },
    parseJSON: function() {
      if (typeof parseJSON === 'function' && JSON.parseJSON) return JSON.parseJSON(this);
      try {
        return (/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.test(this)) && eval('(' + this + ')');
      } catch (e) {
        return false;
      }
    }
  });
  $.fn.live = $.fn.on ? $.fn.on : $.fn.live;
})(jQuery);