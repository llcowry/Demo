//lxlTabs
(function($) {
  $.fn.lxlTabs = function() {
    return $.lxlui.run.call(this, "lxlTabs", arguments);
  };
  $.fn.lxlTabsMgr = function() {
    return $.lxlui.run.call(this, "lxlTabsMgr", arguments);
  };
  $.lxlDefaults.Tabs = {
    width: '100%', // 宽度（百分比与具体数值）
    height: 'auto', // 高度（百分比与具体数值，auto: 自动高度，full: 整页填充）
    eventType: 'click', // 触发事件（click/hover）
    currentIndex: 0, // 默认展示tab的索引值
    ajaxClass: 'ajaxload', // 是否动态加载
    skin: 'default', // 皮肤，根据样式来的
    showFooter: true, // 是否展示底部区域
    nompb: false // 是否取消边框及其margin与padding值
  };
  $.lxlMethos.Tabs = {};
  $.lxlui.controls.Tabs = function(element, options) {
    $.lxlui.controls.Tabs.base.constructor.call(this, element, options);
  };
  $.lxlui.controls.Tabs.lxlExtend($.lxlui.core.UIComponent, {
    __getType: function() {
      return 'Tabs';
    },
    __idPrev: function() {
      return 'Tabs';
    },
    _extendMethods: function() {
      return $.lxlMethos.Tabs;
    },
    _render: function() {
      var g = this,
        p = this.options;
      g.tabs = $(g.element);
      if (p.skin) g.tabs.addClass(p.skin);
      if (p.nompb) g.tabs.css({
        margin: 0,
        padding: 0,
        border: 0
      });
      g.tabs.header = $("> .tabsHeader", g.tabs);
      g.tabs.items = $("> .tabsHeaderContent > ul li", g.tabs.header);
      g.tabs.content = $("> .tabsContent", g.tabs);
      g.tabs.panels = $("> *", g.tabs.content);
      g.tabs.footer = $("> .tabsFooter", g.tabs);
      g.tabs.items.unbind().find("a").unbind();
      g.tabs.items.each(function(_index) {
        if (p.currentIndex == _index) $(this).addClass("selected");
        else $(this).removeClass("selected");
        if (p.eventType == "hover") $(this).hover(function() {
          g.switchTab(_index);
        });
        else $(this).hoverClass("hover").click(function() {
          g.switchTab(_index);
        });
        $("a", this).each(function() {
          if ($(this).hasClass(p.ajaxClass)) {
            $(this).click(function(ev) {
              var _group = g.tabs.panels.eq(_index);
              if (this.href && !_group.attr("loaded")) _group.html('<div class="tabsloading"></div>').load(this.href, function() {
                _group.attr("loaded", true);
              });
              ev.preventDefault();
            });
          }
        });
      });
      if (!p.showFooter) g.tabs.footer.remove();
      if (p.skin == 'default' && g.tabs.footer.length > 0) g.tabs.content.css({
        borderRadius: 0
      });
      g.switchTab(p.currentIndex);
      g._onResize();
      $(window).resize(function() {
        g._onResize();
      });
    },
    switchTab: function(_index) {
      var g = this,
        p = this.options;
      p.currentIndex = _index;
      g.tabs.items.removeClass("selected").eq(_index).addClass("selected");
      g.tabs.panels.hide().eq(p.currentIndex).show();
    },
    _onResize: function() {
      var g = this,
        p = this.options;
      var h = null,
        b = false;
      if (typeof(p.height) == "string" && p.height.indexOf('auto') != -1) {
        b = true;
      } else if (typeof(p.height) == "string" && p.height.indexOf('full') != -1) {
        h = $(window).height();
        if (!p.nompb) {
          h -= parseInt(g.tabs.css("marginTop"));
          h -= parseInt(g.tabs.css("marginBottom"));
          h -= parseInt(g.tabs.css("borderTop"));
          h -= parseInt(g.tabs.css("borderBottom"));
        }
      } else if (typeof(p.height) == "string" && p.height.indexOf('%') > 0) {
        h = g.tabs.parent().height() * parseFloat(p.height) * 0.01;
        if (!p.nompb) {
          h -= parseInt(g.tabs.css("marginTop"));
          h -= parseInt(g.tabs.css("marginBottom"));
          h -= parseInt(g.tabs.css("borderTop"));
          h -= parseInt(g.tabs.css("borderBottom"));
        }
      } else {
        h = parseInt(p.height);
      }
      if (!b) {
        g.tabs.height(h);
        h -= g.tabs.header.outerHeight();
        if (g.tabs.footer.length > 0) h -= g.tabs.footer.outerHeight();
        g.tabs.content.outerHeight(h);
      }
    }
  });
})(jQuery);
