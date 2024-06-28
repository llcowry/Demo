//lxlBox
(function($) {
  $.fn.lxlBox = function() {
    return $.lxlui.run.call(this, "lxlBox", arguments);
  };
  $.fn.lxlBoxMgr = function() {
    return $.lxlui.run.call(this, "lxlBoxMgr", arguments);
  };
  $.lxlDefaults.Box = {
    width: '100%', // 宽度：百分比与具体数值
    height: '100%', // 高度：百分比与具体数值
    headerHeight: null, // 头部区域高度（具体值/null）
    toolbarHeight: null // 底部区域高度（具体值/null）
  };
  $.lxlMethos.Box = {};
  $.lxlui.controls.Box = function(element, options) {
    $.lxlui.controls.Box.base.constructor.call(this, element, options);
  };
  $.lxlui.controls.Box.lxlExtend($.lxlui.core.UIComponent, {
    __getType: function() {
      return 'Box';
    },
    __idPrev: function() {
      return 'Box';
    },
    _extendMethods: function() {
      return $.lxlMethos.Box;
    },
    _render: function() {
      var g = this,
        p = this.options;
      g.box = $(this.element);
      g.box.header = $("div.header", g.box);
      g.box.tabbox = $("div.tabbox", g.box);
      g.box.footer = $("div.footer", g.box);
      g.box.tabtoolbar = $("div.tab_toolbar", g.box);
      g.box.tabheader = $("div.tab_header", g.box);
      g.box.tabcontent = $("div.tab_content", g.box);
      g.box.tabfooter = $("div.tab_footer", g.box);
      g.box.nodata = $("> div.nodata", g.box);
      if ($.browser.msie && $.browser.version < 7 && !$.support.style) $("body").attr("scroll", "no");
      g.setTabContent();
      g._onResize();
      $(window).resize(function() {
        g._onResize();
      });
    },
    setTabContent: function() {
      var g = this;
      if (g.box.tabheader.length > 0 && g.box.tabcontent.length > 0) {
        if (($("> table tr td", g.box.tabheader).eq(0).attr("width") + '').indexOf('%') > 0) {
          $("> table tr td", g.box.tabheader).each(function(i) {
            var _w = $(this).attr("width");
            $("> table tr", g.box.tabcontent).eq(0).find("td").eq(i).attr("width", _w);
          });
        } else {
          var _w = 0;
          $("> table tr td", g.box.tabheader).each(function(i) {
            var _w2 = $(this).outerWidth();
            $(this).removeAttr("width").width(_w2);
            $("> table tr", g.box.tabcontent).eq(0).find("td").eq(i).width(_w2);
            _w += _w2;
          });
          $("> table", g.box.tabheader).wrapAll('<div style="position: relative; left: 0; top: 0; width: ' + _w + 'px"></div>');
          $("> table", g.box.tabcontent).css({
            width: _w + "px"
          });
          g.box.tabheader.css({
            overflow: "hidden"
          });
          g.box.tabcontent.css({
            overflow: "auto"
          }).scroll(function() {
            $("> div", g.box.tabheader).css({
              left: -($(this).scrollLeft())
            });
          });
        }
        $("> table tr:nth-child(even)", g.box.tabcontent).addClass("tr_c1");
        $("> table tr", g.box.tabcontent).hoverClass("tr_c2");
      }
    },
    _onResize: function() {
      var g = this,
        p = this.options;
      var parentW = null,
        parentH = null,
        w = null,
        h = null,
        b = false;
      if (typeof(p.width) == "string" && p.width.indexOf('%') > 0) {
        if (g.box.is("body")) {
          parentW = $(window).width();
          b = true;
        } else {
          parentW = g.box.parent().is("body") ? $(window).width() : g.box.parent().width();
        }
        w = parentW * parseFloat(p.width) * 0.01;
      } else {
        w = parseInt(p.width);
      }
      if (!b) g.box.width(w);
      if (typeof(p.height) == "string" && p.height.indexOf('%') > 0) {
        if (g.box.is("body")) {
          parentH = $(window).height();
          b = true;
        } else {
          parentH = g.box.parent().is("body") ? $(window).height() : g.box.parent().height();
        }
        h = parentH * parseFloat(p.height) * 0.01;
      } else {
        h = parseInt(p.height);
      }
      if (!b) g.box.height(h);
      g.middleH = h;
      g.middleT = 0;
      if (g.box.header.length > 0) {
        g.box.header.width(w);
        if (p.headerHeight) g.box.header.height(p.headerHeight);
        g.middleH -= g.box.header.outerHeight();
        g.middleT += g.box.header.outerHeight();
      }
      if (g.box.footer.length > 0) {
        g.box.footer.width(w);
        g.middleH -= g.box.footer.outerHeight();
      }
      if (g.box.tabbox.length > 0) {
        g.box.tabbox.css({
          width: w,
          height: g.middleH,
          top: g.middleT
        });
      }
      if (g.box.tabtoolbar.length > 0) {
        //g.box.tabtoolbar.width(w);
        if (g.box.header.length > 0) {
          //g.box.header.css({ backgroundImage: "none", padding: "0px" });
          g.box.tabtoolbar.css({
            top: g.box.header.outerHeight()
          });
        }
        g.middleH -= g.box.tabtoolbar.outerHeight();
        g.middleT += g.box.tabtoolbar.outerHeight();
      }
      if (g.box.tabheader.length > 0) {
        //g.box.tabheader.css({ width: w, top: g.middleT });
        g.box.tabheader.css({
          top: g.middleT
        });
        g.middleH -= g.box.tabheader.outerHeight();
        g.middleT += g.box.tabheader.outerHeight();
      }
      if (g.box.tabfooter.length > 0) {
        //g.box.tabfooter.width(w);
        g.middleH -= g.box.tabfooter.outerHeight();
      }
      if (g.box.tabcontent.length > 0) {
        //g.box.tabcontent.width(w);
        g.box.tabcontent.css({
          height: g.middleH,
          top: g.middleT
        });
      }
      if (g.box.nodata.length > 0) {
        g.box.nodata.css({
          top: g.middleT
        });
      }
    }
  });
})(jQuery);
