//lxlTab
(function($) {
  $.fn.lxlTab = function() {
    return $.lxlui.run.call(this, "lxlTab", arguments);
  };
  $.fn.lxlTabMgr = function() {
    return $.lxlui.run.call(this, "lxlTabMgr", arguments);
  };
  $.lxlDefaults.Tab = {
    height: '100%',
    heightDiff: 0,
    changeHeightOnResize: true,
    contextmenu: true,
    dblClickToClose: true,
    dragToMove: false
  };
  $.lxlMethos.Tab = {};
  $.lxlui.controls.Tab = function(element, options) {
    $.lxlui.controls.Tab.base.constructor.call(this, element, options);
  };
  $.lxlui.controls.Tab.lxlExtend($.lxlui.core.UIComponent, {
    __getType: function() {
      return 'Tab';
    },
    __idPrev: function() {
      return 'Tab';
    },
    _extendMethods: function() {
      return $.lxlMethos.Tab;
    },
    _render: function() {
      var g = this,
        p = this.options;
      if (p.height) g.makeFullHeight = true;
      g.tab = $(this.element);
      if (p.contextmenu && $.lxlMenu) {
        g.tab.menu = $.lxlMenu({
          items: [{
            text: "关闭",
            id: 'close',
            click: function() {
              g._contextMenuItemClick.apply(g, arguments);
            }
          }, {
            text: "关闭其他",
            id: 'closeother',
            click: function() {
              g._contextMenuItemClick.apply(g, arguments);
            }
          }, {
            text: "全部关闭",
            id: 'closeall',
            click: function() {
              g._contextMenuItemClick.apply(g, arguments);
            }
          }, {
            text: "新窗口打开",
            id: 'newwin',
            click: function() {
              g._contextMenuItemClick.apply(g, arguments);
            }
          }, {
            text: "刷新",
            id: 'reload',
            click: function() {
              g._contextMenuItemClick.apply(g, arguments);
            }
          }]
        });
      }
      g.tab.addClass("tab");
      g.tab.content = $('<div class="tab-content"></div>');
      $("> div", g.tab).appendTo(g.tab.content);
      g.tab.content.appendTo(g.tab);
      g.tab.morebox = $('<div class="tab-morebox"><ul></ul></div>');
      g.tab.morebox.prependTo(g.tab);
      g.tab.morebox.ul = $("> ul", g.tab.morebox);
      g.tab.links = $('<div class="tab-links"><ul style="left: 0px; top: 0px;"></ul><div class="tab-links-left"></div><div class="tab-links-right"></div><div class="tab-links-more"></div></div>');
      g.tab.links.prependTo(g.tab);
      g.tab.links.ul = $("> ul", g.tab.links);
      g.tab.links.left = $(".tab-links-left", g.tab.links);
      g.tab.links.right = $(".tab-links-right", g.tab.links);
      g.tab.links.more = $(".tab-links-more", g.tab.links);
      g.tab.links.left.hoverClass("tab-links-left-over").click(function() {
        if ($(this).hasClass("tab-links-left-invalid")) return;
        g.moveToPrevTabItem();
      });
      g.tab.links.right.hoverClass("tab-links-right-over").click(function() {
        if ($(this).hasClass("tab-links-right-invalid")) return;
        g.moveToNextTabItem();
      });
      g.tab.links.more.hoverClass("tab-links-more-over").click(function() {
        g.tab.morebox.show();
        return false;
      });
      $(document).click(function() {
        g.tab.morebox.hide();
      });
      var lselecteds = $("> div[selected=true]", g.tab.content);
      var haslselected = lselecteds.length > 0;
      g.selectedTabId = lselecteds.attr("tabid");
      $("> div", g.tab.content).each(function(i, box) {
        var li = $('<li><a></a><div class="tab-links-item-left"></div><div class="tab-links-item-right"></div></li>');
        var li2 = $('<li><a href="javascript:;"></a></li>');
        var contentitem = $(this);
        if (contentitem.attr("title")) {
          $("> a", li).html(contentitem.attr("title"));
          $("> a", li2).html(contentitem.attr("title"));
          contentitem.removeAttr("title");
        }
        if (contentitem.attr("icon")) {
          $("> a", li).addClass(contentitem.attr("icon") + "ico");
          contentitem.removeAttr("icon");
        }
        var tabid = contentitem.attr("tabid");
        if (tabid === undefined) {
          tabid = g.getNewTabid();
          contentitem.attr("tabid", tabid);
        }
        li.attr("tabid", tabid);
        li2.attr("tabid", tabid);
        if (contentitem.attr("selected")) {
          g.selectedTabId = tabid;
          li2.addClass("selected");
        }
        if (!haslselected && i === 0) g.selectedTabId = tabid;
        var showClose = contentitem.attr("showClose");
        if (showClose) li.append("<div class='tab-links-item-close'></div>");
        g.tab.links.ul.append(li);
        g.tab.morebox.ul.append(li2);
        if (!contentitem.hasClass("tab-content-item")) contentitem.addClass("tab-content-item");
        if (contentitem.find("iframe").length > 0) {
          var iframe = $("iframe:first", contentitem);
          if (iframe[0].readyState != "complete") {
            if (contentitem.find("div.tab-loading:first").length === 0) contentitem.prepend("<div class='tab-loading' style='display:block;'></div>");
            var iframeloading = $("div.tab-loading:first", contentitem);
            iframe.bind('load.tab', function() {
              iframeloading.hide();
            });
          }
        }
      });
      g.currentIndex = g.getIndexByTabId(g.selectedTabId);
      g.setTabItem();
      g.selectTabItem(g.selectedTabId);
      g.tab.resize(function() {
        setTimeout(function() {
          g.selectTabItem(g.selectedTabId);
        }, 100);
      });
      //去掉了窗口双击关闭子页面
      // g.tab.bind('dblclick.tab', function(e) {
      //   if (!p.dblClickToClose) return;
      //   g.dblclicking = true;
      //   var obj = (e.target || e.srcElement);
      //   var tagName = obj.tagName.toLowerCase();
      //   if (tagName == "a") {
      //     var tabid = $(obj).parent().attr("tabid");
      //     var allowClose = $(obj).parent().find("div.tab-links-item-close").length ? true : false;
      //     if (allowClose) g.removeTabItem(tabid);
      //   }
      //   g.dblclicking = false;
      // });
      if (p.height) {
        if (typeof(p.height) == 'string' && p.height.indexOf('%') > 0) {
          g._onResize();
          if (p.changeHeightOnResize) $(window).resize(function() {
            g._onResize.call(g);
          });
        } else {
          g.setHeight(p.height);
        }
      }
      if (g.makeFullHeight) g.setContentHeight();
      g.set(p);
    },
    addTabItem: function(options) {
      var g = this,
        p = this.options;
      var tabid = options.tabid;
      if (tabid === undefined) tabid = g.getNewTabid();
      var url = options.url;
      var content = options.content;
      var text = options.text;
      var showClose = options.showClose;
      var height = options.height;
      if (g.getTabItem(tabid).length > 0) {
        g.selectTabItem(tabid);
        g.reload(tabid, url);
        return;
      }
      var tabitem = $("<li><a></a><div class='tab-links-item-left'></div><div class='tab-links-item-right'></div><div class='tab-links-item-close'></div></li>");
      var tabmoreitem = $('<li tabid=' + tabid + '><a href="javascript:;"></a></li>');
      $('> a', tabmoreitem).html(text);
      g.tab.morebox.ul.append(tabmoreitem);
      var contentitem = $("<div class='tab-content-item'><div class='tab-loading' style='display:block;'></div><iframe frameborder='0'></iframe></div>");
      var iframeloading = $("div.tab-loading:first", contentitem);
      var iframe = $("iframe:first", contentitem);
      if (g.makeFullHeight) {
        var newheight = g.tab.height() - g.tab.links.outerHeight();
        contentitem.height(newheight);
      }
      tabitem.attr("tabid", tabid);
      contentitem.attr("tabid", tabid);
      if (url) {
        iframe.attr("name", tabid).attr("id", tabid).attr("src", url).bind('load.tab', function() {
          iframeloading.hide();
          if (options.callback) options.callback();
        });
      } else {
        iframe.remove();
        iframeloading.remove();
      }
      if (content) {
        contentitem.html(content);
      } else if (options.target) {
        contentitem.append(options.target);
      }
      if (showClose === undefined) showClose = true;
      if (showClose === false) $(".tab-links-item-close", tabitem).remove();
      if (text === undefined) text = tabid;
      if (height) contentitem.height(height);
      $("a", tabitem).text(text);
      g.tab.links.ul.append(tabitem);
      g.tab.content.append(contentitem);
      g.setTabItem();
      g.selectTabItem(tabid);
      if (p.dragToMove && $.fn.lxlDrag) {
        g.drags = g.drags || [];
        tabitem.each(function() {
          g.drags.push(g._applyDrag(this));
        });
      }
    },
    removeTabItem: function(tabid) {
      var g = this,
        p = this.options;
      var curtabid = 0;
      if (g.getTabItem(tabid).hasClass("tab-selected") && g.getTabItem(tabid).prev().index() >= 0) curtabid = g.getTabItem(tabid).prev().attr("tabid");
      g.getTabItem(tabid).remove();
      g.getTabMoreItem(tabid).remove();
      g.getTabPanel(tabid).remove();
      g.selectTabItem(curtabid);
    },
    selectTabItem: function(tabid) {
      var g = this;
      g.getTabItem(tabid).addClass("tab-selected").siblings().removeClass("tab-selected");
      g.getTabMoreItem(tabid).addClass("selected").siblings().removeClass("selected");
      g.getTabPanel(tabid).show().siblings().hide();
      g.selectedTabId = tabid;
      g.moveToCurTabItem(tabid);
    },
    setTabItem: function() {
      var g = this;
      g.getTabItems().each(function() {
        var tabitem = $(this);
        tabitem.hoverClass("tab-hover").unbind("click").click(function() {
          g.selectTabItem($(this).attr("tabid"));
        }).unSelect();
        if (g.tab.menu) {
          tabitem.bind("contextmenu", function(e) {
            g.actionTabid = tabitem.attr("tabid");
            g.tab.menu.show({
              top: e.pageY,
              left: e.pageX
            });
            if ($(".tab-links-item-close", this).length === 0) g.tab.menu.setDisabled('close');
            else g.tab.menu.setEnabled('close');
            return false;
          });
        }
        $(".tab-links-item-close", tabitem).hoverClass("tab-links-item-close-over").unbind("click").click(function() {
          g.removeTabItem(tabitem.attr("tabid"));
        });
      });
      g.getTabMoreItems().each(function() {
        $(this).unbind("click").click(function() {
          g.selectTabItem($(this).attr("tabid"));
        }).unSelect();
      });
    },
    setTabButton: function() {
      var g = this;
      var _w = g.getTabsWidth(g.getTabItems());
      if (g.getScrollBarWidth() >= _w) {
        g.tab.links.ul.css({
          left: '0px',
          margin: '0px'
        });
        g.tab.links.left.hide();
        g.tab.links.right.hide();
      } else {
        g.tab.links.ul.css({
          margin: '0 17px'
        });
        g.tab.links.left.show().removeClass("tab-links-left-invalid");
        g.tab.links.right.show().removeClass("tab-links-right-invalid");
        if (g.getLeft() >= 0) {
          g.tab.links.left.addClass("tab-links-left-invalid");
        } else if (g.getLeft() <= g.getScrollBarWidth() - _w) {
          g.tab.links.right.addClass("tab-links-right-invalid");
        }
      }
    },
    setTabItemText: function(tabid, s) {
      $("> li[tabid=" + tabid + "] a", this.tab.links.ul).text(s);
    },
    moveToPrevTabItem: function() {
      var g = this;
      var _start = g.getVisibleStart();
      if (_start > 0) g.scrollTab(-g.getTabsIntervalWidth(0, _start - 1));
    },
    moveToNextTabItem: function() {
      var g = this;
      var _end = g.getVisibleEnd();
      if (_end < g.getTabItems().size()) g.scrollTab(-g.getTabsIntervalWidth(0, _end + 1) + g.getScrollBarWidth());
    },
    moveToCurTabItem: function(tabid) {
      var g = this;
      g.currentIndex = g.getIndexByTabId(tabid);
      var _w = g.getTabsWidth(g.getTabItems());
      if (_w <= g.getScrollBarWidth()) {
        g.scrollTab(0);
      } else if (g.getLeft() < g.getScrollBarWidth() - _w) {
        g.scrollTab(g.getScrollBarWidth() - _w);
      } else if (g.currentIndex < g.getVisibleStart()) {
        g.scrollTab(-g.getTabsIntervalWidth(0, g.currentIndex));
      } else if (g.currentIndex >= g.getVisibleEnd()) {
        g.scrollTab(g.getScrollBarWidth() - g.getTabItems().eq(g.currentIndex).outerWidth(true) - g.getTabsIntervalWidth(0, g.currentIndex));
      }
    },
    scrollTab: function(_left) {
      var g = this;
      g.tab.links.ul.animate({
        left: _left + 'px'
      }, 200, function() {
        g.setTabButton();
      });
    },
    getTabsWidth: function(_tabs) {
      var _w = 0;
      _tabs.each(function() {
        _w += $(this).outerWidth(true);
      });
      return _w;
    },
    getTabsIntervalWidth: function(_start, _end) {
      var g = this;
      return g.getTabsWidth(g.getTabItems().slice(_start, _end));
    },
    getTab: function(tabid) {
      var g = this;
      var index = g.getIndexByTabId(tabid);
      if (index >= 0) return g.getTabItems().eq(index);
    },
    getLeft: function() {
      return this.tab.links.ul.position().left;
    },
    getScrollBarWidth: function() {
      return this.tab.links.width() - 53;
    },
    getVisibleStart: function() {
      var g = this;
      var _left = g.getLeft(),
        _w = 0;
      var _tabs = g.getTabItems();
      for (var i = 0; i < _tabs.size(); i++) {
        if (_w + _left >= 0) return i;
        _w += _tabs.eq(i).outerWidth(true);
      }
      return 0;
    },
    getVisibleEnd: function() {
      var g = this;
      var _left = g.getLeft(),
        _w = 0;
      var _tabs = g.getTabItems();
      for (var i = 0; i < _tabs.size(); i++) {
        _w += _tabs.eq(i).outerWidth(true);
        if (_w + _left > g.getScrollBarWidth()) return i;
      }
      return _tabs.size();
    },
    getIndexByTabId: function(tabid) {
      if (!tabid) return 0;
      var _oIndex = 0;
      this.getTabItems().each(function(i) {
        if ($(this).attr("tabid") == tabid) {
          _oIndex = i;
          return;
        }
      });
      return _oIndex;
    },
    getTabItem: function(tabid) {
      return $("> li[tabid=" + tabid + "]", this.tab.links.ul);
    },
    getTabItems: function() {
      return $("> li", this.tab.links.ul);
    },
    getTabMoreItem: function(tabid) {
      return $("> li[tabid=" + tabid + "]", this.tab.morebox.ul);
    },
    getTabMoreItems: function() {
      return $("> li", this.tab.morebox.ul);
    },
    getTabPanel: function(tabid) {
      return $("> .tab-content-item[tabid=" + tabid + "]", this.tab.content);
    },
    getTabPanels: function() {
      return $("> .tab-content-item", this.tab.content);
    },
    getTabItemCount: function() {
      return $("> li", this.tab.links.ul).length;
    },
    getNewTabid: function() {
      var g = this;
      g.newtabidcount = g.newtabidcount || 0;
      return 'tabitem' + (++g.newtabidcount);
    },
    getSelectedIframe: function() {
      return $("iframe[id=" + this.selectedTabId + "]");
    },
    getSelectedTabItemID: function() {
      return $("> li.tab-selected", this.tab.links.ul).attr("tabid");
    },
    removeSelectedTabItem: function() {
      this.removeTabItem(this.getSelectedTabItemID());
    },
    addHeight: function(heightDiff) {
      this.setHeight(this.tab.height() + heightDiff);
    },
    setHeight: function(height) {
      this.tab.height(height);
      this.setContentHeight();
    },
    setContentHeight: function() {
      var g = this;
      var newheight = g.tab.height() - g.tab.links.outerHeight();
      g.tab.content.height(newheight);
      g.getTabPanels().height(newheight);
    },
    removeOther: function(tabid) {
      var g = this;
      var index = g.getIndexByTabId(tabid) || g.currentIndex;
      if (index > 0) {
        g.getTabItems().not(":eq(" + index + ")").filter(":gt(0)").remove();
        g.getTabMoreItems().not(":eq(" + index + ")").filter(":gt(0)").remove();
        g.getTabPanels().not(":eq(" + index + ")").filter(":gt(0)").remove();
        g.selectedTabId = g.getTabItems().eq(1).attr("tabid");
        g.selectTabItem(g.selectedTabId);
      } else {
        g.removeAll();
      }
    },
    removeAll: function() {
      var g = this;
      g.getTabItems().filter(":gt(0)").remove();
      g.getTabMoreItems().filter(":gt(0)").remove();
      g.getTabPanels().filter(":gt(0)").remove();
      g.selectedTabId = g.getTabItems().eq(0).attr("tabid");
      g.selectTabItem(g.selectedTabId);
    },
    reload: function(tabid, url) {
      var g = this,
        p = this.options;
      var contentitem = g.getTabPanel(tabid);
      var iframeloading = $("div.tab-loading:first", contentitem);
      var iframe = $("iframe:first", contentitem);
      var src = iframe.attr("src"),
        b = false;
      if (url && url != src) {
        src = url;
        b = true;
      } else if (!url) {
        b = true;
      }
      if (b) {
        iframeloading.show();
        iframe.unbind('load.tab').attr("src", src).bind('load.tab', function() {
          iframeloading.hide();
        });
      }
    },
    _contextMenuItemClick: function(item) {
      var g = this,
        p = this.options;
      if (!item.id || !g.actionTabid) return;
      switch (item.id) {
        case "close":
          g.removeTabItem(g.actionTabid);
          g.actionTabid = null;
          break;
        case "closeother":
          g.removeOther(g.actionTabid);
          break;
        case "closeall":
          g.removeAll();
          g.actionTabid = null;
          break;
        case "reload":
          g.selectTabItem(g.actionTabid);
          g.reload(g.actionTabid);
          break;
        case "newwin":
          window.open(g.getSelectedIframe().attr('src'));
          break;
      }
    },
    _applyDrag: function(tabItemDom) {
      var g = this,
        p = this.options;
      g.droptip = g.droptip || $("<div class='drag-droptip' style='display:none'><div class='drop-move-up'></div><div class='drop-move-down'></div></div>").appendTo('body');
      var drag = $(tabItemDom).lxlDrag({
        revert: true,
        animate: false,
        proxy: function() {
          var name = $(this).find("a").html();
          g.dragproxy = $("<div class='drag-proxy' style='display:none'><div class='drop-icon drop-no'></div></div>").appendTo('body');
          g.dragproxy.append(name);
          return g.dragproxy;
        },
        onRendered: function() {
          this.set('cursor', 'pointer');
        },
        onStartDrag: function(current, e) {
          if (!$(tabItemDom).hasClass("tab-selected")) return false;
          if (e.button == 2) return false;
          var obj = e.srcElement || e.target;
          if ($(obj).hasClass("tab-links-item-close")) return false;
        },
        onDrag: function(current, e) {
          if (g.dropIn == null) g.dropIn = -1;
          var tabItems = g.tab.links.ul.find('>li');
          var targetIndex = tabItems.index(current.target);
          tabItems.each(function(i, item) {
            if (targetIndex == i) return;
            var isAfter = i > targetIndex;
            if (g.dropIn != -1 && g.dropIn != i) return;
            var offset = $(this).offset();
            var range = {
              top: offset.top,
              bottom: offset.top + $(this).height(),
              left: offset.left - 10,
              right: offset.left + 10
            };
            if (isAfter) {
              range.left += $(this).width();
              range.right += $(this).width();
            }
            var pageX = e.pageX || e.screenX;
            var pageY = e.pageY || e.screenY;
            if (pageX > range.left && pageX < range.right && pageY > range.top && pageY < range.bottom) {
              g.droptip.css({
                left: range.left + 5,
                top: range.top - 9
              }).show();
              g.dropIn = i;
              g.dragproxy.find(".drop-icon").removeClass("drop-no").addClass("drop-yes");
            } else {
              g.dropIn = -1;
              g.droptip.hide();
              g.dragproxy.find(".drop-icon").removeClass("drop-yes").addClass("drop-no");
            }
          });
        },
        onStopDrag: function(current, e) {
          if (g.dropIn > -1) {
            var from = $(current.target).attr("tabid");
            var to = g.tab.links.ul.find('>li:eq(' + g.dropIn + ')').attr("tabid");
            setTimeout(function() {
              from = g.getTabItem(from);
              to = g.getTabItem(to);
              var index1 = g.getTabItems().index(from);
              var index2 = g.getTabItems().index(to);
              if (index1 < index2) {
                to.after(from);
              } else {
                to.before(from);
              }
            }, 0);
            g.dropIn = -1;
            g.dragproxy.remove();
          }
          g.droptip.hide();
          this.set('cursor', 'default');
        }
      });
      return drag;
    },
    _setDragToMove: function(value) {
      if (!$.fn.lxlDrag) return;
      var g = this;
      if (value) {
        if (g.drags) return;
        g.drags = g.drags || [];
        g.getTabItems().each(function() {
          g.drags.push(g._applyDrag(this));
        });
      }
    },
    _onResize: function() {
      var g = this,
        p = this.options;
      if (!p.height || typeof(p.height) != 'string' || p.height.indexOf('%') == -1) return false;
      if (g.tab.parent()[0].tagName.toLowerCase() == "body") {
        var windowHeight = $(window).height();
        windowHeight -= parseInt(g.tab.parent().css('paddingTop'));
        windowHeight -= parseInt(g.tab.parent().css('paddingBottom'));
        g.height = p.heightDiff + windowHeight * parseFloat(g.height) * 0.01;
      } else {
        g.height = p.heightDiff + (g.tab.parent().height() * parseFloat(p.height) * 0.01);
      }
      g.setHeight(g.height);
    }
  });
})(jQuery);