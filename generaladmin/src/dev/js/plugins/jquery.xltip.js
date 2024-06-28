// xltip
(function($) {
  $.fn.xltip = function(options) {
    var opts = $.extend({}, $.fn.xltip.defaults, options),
      g = this;
    g._timer = null;
    return g.each(function() {
      function showTip(obj) {
        var tip = '<div id="xltip">{s}</div>';
        var typeClass = {
          0: " ico_err",
          1: " ico_suc",
          2: " ico_info",
          3: ""
        };
        var textClass = {
          0: " err_txt",
          1: " suc_txt",
          2: "",
          3: ""
        };
        var s = '<i class="tip_triangle_up"></i>' +
          '<div class="tip_con">' +
          '  <span class="tip_con_left{typeClass}"></span>' +
          '  <span class="tip_con_inner"><span class="tip_con_text{textClass}">{loadIcon}{msgHtml}</span></span>' +
          '  <span class="tip_con_right"></span>' +
          '</div>';
        s = s.replace("{typeClass}", typeClass[opts.type]);
        s = s.replace("{textClass}", textClass[opts.type]);
        s = s.replace("{loadIcon}", opts.type == 3 ? '<img src="' + rootPath + 'images/loading.gif" align="absmiddle" alt="" /> ' : "");
        s = s.replace("{msgHtml}", opts.msg);
        tip = tip.replace("{s}", s);
        g.msgtip = $('#xltip');
        if (g.msgtip.length > 0) {
          g.msgtip.html(s);
        } else {
          $("body").append(tip);
          g.msgtip = $('#xltip');
        }
        var _t = obj.offset().top,
          _left = obj.offset().left - 10;
        var _h = obj.outerHeight(),
          _h2 = g.msgtip.outerHeight();
        var _top = _t + _h;
        if (_t < _h2) $('.tip_triangle_up', g.msgtip).removeClass("tip_triangle_up").addClass("tip_triangle_down");
        else _top = _t - _h2;
        g.msgtip.css({
          top: _top,
          left: _left
        });
        if ($.browser.msie) {
          g.msgtip.show();
        } else {
          g.msgtip.fadeIn("fast");
        }
        if (opts.timeout) {
          clearInterval(g._timer);
          g._timer = window.setInterval(function() {
            hideTip();
          }, opts.timeout * 1000);
        } else {
          hideTip();
        }
      }

      function hideTip() {
        window.clearInterval(g._timer);
        if ($.browser.msie) {
          g.msgtip.remove();
        } else {
          g.msgtip.fadeOut("fast", function() {
            $(this).remove();
          });
        }
      }
      if (opts.tipEvent) {
        $(this).on(opts.tipEvent, function() {
          showTip($(this));
        });
      } else {
        showTip($(this));
      }
    });
  };
  $.fn.xltip.defaults = {
    msg: null,
    tipEvent: null,
    timeout: 1,
    type: 0 // 0：错误，1：正确，2：提示，3：加载中
  };
})(jQuery);