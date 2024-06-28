//lxlLayout
(function($) {
  $.fn.lxlLayout = function() {
    return $.lxlui.run.call(this, "lxlLayout", arguments);
  };
  $.fn.lxlLayoutMgr = function() {
    return $.lxlui.run.call(this, "lxlLayoutMgr", arguments);
  };
  $.lxlDefaults.Layout = {
    topHeight: 50,
    bottomHeight: 25,
    leftWidth: null,
    minLeftWidth: 180,
    rightWidth: null,
    minRightWidth: 160,
    centerWidth: 360,
    height: '100%',
    heightDiff: 0,
    space: 3, // 面板间的间距
    dropVal: 3, // 拖动对象的宽高值
    inIframe: false,
    inWindow: true,
    onHeightChanged: null,
    onEndResize: null,
    isLeftCollapse: false,
    isRightCollapse: false,
    allowLeftCollapse: true,
    allowRightCollapse: true,
    allowLeftResize: true,
    allowRightResize: false,
    allowTopResize: false,
    allowBottomResize: false
  };
  $.lxlMethos.Layout = {};
  $.lxlui.controls.Layout = function(element, options) {
    $.lxlui.controls.Layout.base.constructor.call(this, element, options);
  };
  $.lxlui.controls.Layout.lxlExtend($.lxlui.core.UIComponent, {
    __getType: function() {
      return 'Layout';
    },
    __idPrev: function() {
      return 'Layout';
    },
    _extendMethods: function() {
      return $.lxlMethos.Layout;
    },
    _render: function() {
      var g = this,
        p = this.options;
      g.layout = $(this.element);
      g.layout.addClass("layout");
      g.width = g.layout.width();
      if ($("> div.top", g.layout).length > 0) {
        g.top = $("> div.top", g.layout).wrap('<div class="layout-top" style="top:0px;"></div>').parent();
        g.top.content = $("> div.top", g.top);
        if (!g.top.content.hasClass("layout-content")) g.top.content.addClass("layout-content");
        g.topHeight = p.topHeight;
        if (g.topHeight) g.top.outerHeight(g.topHeight);
      }
      if ($("> div.bottom", g.layout).length > 0) {
        g.bottom = $("> div.bottom", g.layout).wrap('<div class="layout-bottom"></div>').parent();
        g.bottom.content = $("> div.bottom", g.bottom);
        if (!g.bottom.content.hasClass("layout-content")) g.bottom.content.addClass("layout-content");
        g.bottomHeight = p.bottomHeight;
        if (g.bottomHeight) g.bottom.outerHeight(g.bottomHeight);
        var bottomtitle = g.bottom.content.attr("title");
        if (bottomtitle) {
          g.bottom.header = $('<div class="layout-header"></div>');
          g.bottom.prepend(g.bottom.header);
          g.bottom.header.html(bottomtitle);
          g.bottom.content.attr("title", "");
        }
      }
      if ($("> div.left", g.layout).length > 0) {
        g.left = $("> div.left", g.layout).wrap('<div class="layout-left" style="left:0px;"></div>').parent();
        g.left.header = $('<div class="layout-header"><div class="layout-header-toggle"></div><div class="layout-header-inner"></div></div>');
        g.left.prepend(g.left.header);
        g.left.header.toggle = $(".layout-header-toggle", g.left.header);
        g.left.content = $("> div.left", g.left);
        if (!g.left.content.hasClass("layout-content")) g.left.content.addClass("layout-content");
        if (!p.allowLeftCollapse) $(".layout-header-toggle", g.left.header).remove();
        var lefttitle = g.left.content.attr("title");
        if (lefttitle) {
          g.left.content.attr("title", "");
          $(".layout-header-inner", g.left.header).html(lefttitle);
        }
        if (p.inIframe) {
          g.left.addClass("layout-left-iniframe");
        }
        g.leftWidth = p.minLeftWidth;
        if (g.leftWidth) g.left.outerWidth(g.leftWidth);
      }
      if ($("> div.right", g.layout).length > 0) {
        g.right = $("> div.right", g.layout).wrap('<div class="layout-right"></div>').parent();
        g.right.header = $('<div class="layout-header"><div class="layout-header-toggle"></div><div class="layout-header-inner"></div></div>');
        g.right.prepend(g.right.header);
        g.right.header.toggle = $(".layout-header-toggle", g.right.header);
        if (!p.allowRightCollapse) $(".layout-header-toggle", g.right.header).remove();
        g.right.content = $("> div.right", g.right);
        if (!g.right.content.hasClass("layout-content")) g.right.content.addClass("layout-content");
        var righttitle = g.right.content.attr("title");
        if (righttitle) {
          g.right.content.attr("title", "");
          $(".layout-header-inner", g.right.header).html(righttitle);
        }
        if (p.inIframe) {
          g.right.addClass("layout-right-iniframe");
        }
        g.rightWidth = p.minRightWidth;
        if (g.rightWidth) g.right.outerWidth(g.rightWidth);
      }
      if ($("> div.center", g.layout).length > 0) {
        g.center = $("> div.center", g.layout).wrap('<div class="layout-center" ></div>').parent();
        g.center.content = $("> div.center", g.center);
        g.center.content.addClass("layout-content");
        var centertitle = g.center.content.attr("title");
        if (centertitle) {
          g.center.content.attr("title", "");
          g.center.header = $('<div class="layout-header"></div>');
          g.center.prepend(g.center.header);
          g.center.header.html(centertitle);
        }
        if (p.inIframe) {
          g.center.addClass("layout-center-iniframe");
        }
        g.centerWidth = p.centerWidth;
        if (g.centerWidth) g.center.outerWidth(g.centerWidth);
      }
      $("> .layout-left .layout-header,> .layout-right .layout-header", g.layout).hoverClass("layout-header-over");
      $(".layout-header-toggle", g.layout).hoverClass("layout-header-toggle-over");
      g.layout.lock = $("<div class='layout-lock'></div>");
      g.layout.append(g.layout.lock);
      g._addDropHandle();
      g.isLeftCollapse = p.isLeftCollapse;
      g.isRightCollapse = p.isRightCollapse;
      g.leftCollapse = $('<div class="layout-collapse-left" style="display: none; "><div class="layout-collapse-left-toggle"></div></div>');
      g.rightCollapse = $('<div class="layout-collapse-right" style="display: none; "><div class="layout-collapse-right-toggle"></div></div>');
      g.layout.append(g.leftCollapse).append(g.rightCollapse);
      if (p.inIframe) {
        g.leftCollapse.addClass("layout-left-iniframe");
        g.rightCollapse.addClass("layout-right-iniframe");
      }
      g.leftCollapse.toggle = $("> .layout-collapse-left-toggle", g.leftCollapse);
      g.rightCollapse.toggle = $("> .layout-collapse-right-toggle", g.rightCollapse);
      g._setCollapse();
      g.middleTop = 0;
      if (g.top) {
        g.middleTop += g.top.outerHeight();
        g.middleTop += p.space;
      }
      if (g.left) {
        g.left.css({
          left: p.space,
          top: g.middleTop
        });
        g.leftCollapse.css({
          left: p.space,
          top: g.middleTop
        });
      }
      if (g.right) {
        g.right.css({
          right: p.space,
          top: g.middleTop
        });
        g.rightCollapse.css({
          right: p.space,
          top: g.middleTop
        });
      }
      if (g.center) {
        if (p.inIframe) {
          if (g.left && !g.right) {
            g.center.css("border-right", 0);
          } else if (!g.left && g.right) {
            g.center.css("border-left", 0);
          }
          if (!p.allowLeftResize && !p.space) g.center.css("border-left", 0);
          if (!p.allowRightResize && !p.space) g.center.css("border-right", 0);
        }
        g.center.css({
          top: g.middleTop
        });
      }
      g._onResize();
      $(window).resize(function() {
        g._onResize();
      });
      g.set(p);
    },
    setLeftCollapse: function(isCollapse) {
      var g = this,
        p = this.options;
      if (!g.left) return false;
      g.isLeftCollapse = isCollapse;
      if (g.isLeftCollapse) {
        g.leftCollapse.show();
        g.leftDropHandle && g.leftDropHandle.hide();
        g.left.hide();
      } else {
        g.leftCollapse.hide();
        g.leftDropHandle && g.leftDropHandle.show();
        g.left.show();
      }
      g._onResize();
    },
    setRightCollapse: function(isCollapse) {
      var g = this,
        p = this.options;
      if (!g.right) return false;
      g.isRightCollapse = isCollapse;
      g._onResize();
      if (g.isRightCollapse) {
        g.rightCollapse.show();
        g.rightDropHandle && g.rightDropHandle.hide();
        g.right.hide();
      } else {
        g.rightCollapse.hide();
        g.rightDropHandle && g.rightDropHandle.show();
        g.right.show();
      }
      g._onResize();
    },
    _setCollapse: function() {
      var g = this,
        p = this.options;
      g.leftCollapse.hoverClass("layout-collapse-left-over");
      g.leftCollapse.toggle.hoverClass("layout-collapse-left-toggle-over");
      g.rightCollapse.hoverClass("layout-collapse-right-over");
      g.rightCollapse.toggle.hoverClass("layout-collapse-right-toggle-over");
      g.leftCollapse.toggle.click(function() {
        g.setLeftCollapse(false);
      });
      g.rightCollapse.toggle.click(function() {
        g.setRightCollapse(false);
      });
      if (g.left && g.isLeftCollapse) {
        g.leftCollapse.show();
        g.leftDropHandle && g.leftDropHandle.hide();
        g.left.hide();
      }
      if (g.right && g.isRightCollapse) {
        g.rightCollapse.show();
        g.rightDropHandle && g.rightDropHandle.hide();
        g.right.hide();
      }
      $(".layout-header-toggle", g.left).click(function() {
        g.setLeftCollapse(true);
      });
      $(".layout-header-toggle", g.right).click(function() {
        g.setRightCollapse(true);
      });
    },
    _addDropHandle: function() {
      var g = this,
        p = this.options;
      if (g.left && p.allowLeftResize) {
        g.leftDropHandle = $("<div class='layout-drophandle-left'></div>");
        g.layout.append(g.leftDropHandle);
        g.leftDropHandle && g.leftDropHandle.show();
        g.leftDropHandle.mousedown(function(e) {
          g._start('leftresize', e);
        });
      }
      if (g.right && p.allowRightResize) {
        g.rightDropHandle = $("<div class='layout-drophandle-right'></div>");
        g.layout.append(g.rightDropHandle);
        g.rightDropHandle && g.rightDropHandle.show();
        g.rightDropHandle.mousedown(function(e) {
          g._start('rightresize', e);
        });
      }
      if (g.top && p.allowTopResize) {
        g.topDropHandle = $("<div class='layout-drophandle-top'></div>");
        g.layout.append(g.topDropHandle);
        g.topDropHandle.show();
        g.topDropHandle.mousedown(function(e) {
          g._start('topresize', e);
        });
      }
      if (g.bottom && p.allowBottomResize) {
        g.bottomDropHandle = $("<div class='layout-drophandle-bottom'></div>");
        g.layout.append(g.bottomDropHandle);
        g.bottomDropHandle.show();
        g.bottomDropHandle.mousedown(function(e) {
          g._start('bottomresize', e);
        });
      }
      g.draggingxline = $("<div class='layout-dragging-xline'></div>");
      g.draggingyline = $("<div class='layout-dragging-yline'></div>");
      g.layout.append(g.draggingxline).append(g.draggingyline);
    },
    _setDropHandlePosition: function() {
      var g = this,
        p = this.options;
      if (g.leftDropHandle) {
        g.leftDropHandle.css({
          left: parseInt(g.left.outerWidth()) + p.space,
          top: g.middleTop,
          width: p.dropVal,
          height: g.middleHeight
        });
      }
      if (g.rightDropHandle) {
        g.rightDropHandle.css({
          right: parseInt(g.right.outerWidth()) + p.space,
          top: g.middleTop,
          width: p.dropVal,
          height: g.middleHeight
        });
      }
      if (g.topDropHandle) {
        g.topDropHandle.css({
          top: g.top.outerHeight() + parseInt(g.top.css('top')),
          width: g.top.outerWidth(),
          height: p.dropVal
        });
      }
      if (g.bottomDropHandle) {
        g.bottomDropHandle.css({
          top: parseInt(g.bottom.css('top')) - p.space,
          width: g.bottom.outerWidth(),
          height: p.dropVal
        });
      }
    },
    _onResize: function() {
      var g = this,
        p = this.options;
      var oldheight = g.layout.height();
      var h = 0;
      var windowHeight = $(window).height();
      var parentHeight = null;
      if (typeof(p.height) == "string" && p.height.indexOf('%') > 0) {
        var layoutparent = g.layout.parent();
        if (p.inWindow || layoutparent[0].tagName.toLowerCase() == "body") {
          parentHeight = windowHeight;
          parentHeight -= parseInt($('body').css('paddingTop'));
          parentHeight -= parseInt($('body').css('paddingBottom'));
        } else {
          parentHeight = layoutparent.outerHeight();
        }
        h = parentHeight * parseFloat(p.height) * 0.01;
        if (p.inWindow || layoutparent[0].tagName.toLowerCase() == "body") h -= (g.layout.offset().top - parseInt($('body').css('paddingTop')));
      } else {
        h = parseInt(p.height);
      }
      h += p.heightDiff;
      g.layout.height(h);
      g.layoutHeight = g.layout.height();
      g.middleWidth = g.layout.width();
      g.middleHeight = g.layout.height();
      if (g.top) {
        g.middleHeight -= g.top.outerHeight();
        g.middleHeight -= p.space;
      }
      if (g.bottom) {
        g.middleHeight -= g.bottom.outerHeight();
        g.middleHeight -= p.space;
      }
      if (g.hasBind('heightChanged') && g.layoutHeight != oldheight) {
        g.trigger('heightChanged', [{
          layoutHeight: g.layoutHeight,
          diff: g.layoutHeight - oldheight,
          middleHeight: g.middleHeight
        }]);
      }
      if (g.center) {
        g.centerWidth = g.middleWidth;
        if (g.left) {
          if (p.allowLeftResize && p.inIframe) {
            g.centerWidth -= p.dropVal;
          } else {
            g.centerWidth -= p.space;
            g.centerWidth -= p.dropVal;
          }
          if (g.isLeftCollapse) {
            g.centerWidth -= g.leftCollapse.outerWidth();
          } else {
            g.centerWidth -= g.left.outerWidth();
          }
        } else {
          g.centerWidth -= p.space;
        }
        if (g.right) {
          if (p.allowRightResize && p.inIframe) {
            g.centerWidth -= p.dropVal;
          } else {
            g.centerWidth -= p.space;
            g.centerWidth -= p.dropVal;
          }
          if (g.isRightCollapse) {
            g.centerWidth -= g.rightCollapse.outerWidth();
          } else {
            g.centerWidth -= g.right.outerWidth();
          }
        } else {
          g.centerWidth -= p.space;
        }
        g.centerLeft = 0;
        if (g.left) {
          if (p.allowLeftResize && p.inIframe) {
            g.centerLeft += p.dropVal;
          } else {
            g.centerLeft += p.space;
            g.centerLeft += p.dropVal;
          }
          if (g.isLeftCollapse) {
            g.centerLeft += g.leftCollapse.outerWidth();
          } else {
            g.centerLeft += g.left.outerWidth();
          }
        }
        g.center.css({
          left: g.centerLeft
        });
        g.center.outerWidth(g.centerWidth).outerHeight(g.middleHeight);
        var contentHeight = g.middleHeight;
        if (g.center.header) contentHeight -= g.center.header.outerHeight();
        g.center.content.outerHeight(contentHeight);
      }
      if (g.left) {
        g.leftCollapse.outerHeight(g.middleHeight);
        g.left.outerHeight(g.middleHeight);
        g.left.content.outerHeight(g.middleHeight - g.left.header.outerHeight());
      }
      if (g.right) {
        g.rightCollapse.outerHeight(g.middleHeight);
        g.right.outerHeight(g.middleHeight);
        g.right.content.outerHeight(g.middleHeight - g.right.header.outerHeight());
      }
      if (g.bottom) {
        g.bottomTop = g.layoutHeight - g.bottom.outerHeight();
        g.bottom.css({
          top: g.bottomTop
        });
      }
      g._setDropHandlePosition();
    },
    preventEvent: function(e) {
      if (e.stopPropagation) e.stopPropagation();
      if (e.preventDefault) e.preventDefault();
      return false;
    },
    _start: function(dragtype, e) {
      var g = this,
        p = this.options;
      g.dragtype = dragtype;
      g.maxLeftWidth = g.layout.width() - p.space * 2;
      g.maxRightWidth = g.layout.width() - p.space * 2;
      if (dragtype == 'leftresize') {
        if (!!p.leftWidth) {
          g.maxLeftWidth = p.leftWidth;
        } else {
          if (g.right) {
            g.maxLeftWidth -= g.right.outerWidth();
            g.maxLeftWidth -= p.dropVal;
          }
          if (g.center) {
            g.maxLeftWidth -= 200;
          }
        }
        g.xresize = {
          startX: e.pageX
        };
        if (e.pageX >= g.leftDropHandle.offset().left) {
          g.xresize = {
            startX: g.leftDropHandle.offset().left
          };
        }
        if (p.minLeftWidth && e.pageX < g.left.offset().left + p.minLeftWidth) {
          g.draggingyline.css({
            left: p.minLeftWidth + g.left.offset().left,
            top: g.middleTop,
            height: g.middleHeight
          }).show();
        } else if (g.maxLeftWidth && e.pageX > g.left.offset().left + g.maxLeftWidth) {
          g.draggingyline.css({
            left: g.maxLeftWidth + g.left.offset().left,
            top: g.middleTop,
            height: g.middleHeight
          }).show();
        } else {
          g.draggingyline.css({
            left: e.pageX - g.left.offset().left + p.dropVal,
            top: g.middleTop,
            height: g.middleHeight
          }).show();
        }
      } else if (dragtype == 'rightresize') {
        if (!!p.rightWidth) {
          g.maxRightWidth = p.rightWidth;
        } else {
          if (g.left) {
            g.maxRightWidth -= g.left.outerWidth();
            g.maxRightWidth -= p.dropVal;
          }
          if (g.center) {
            g.maxRightWidth -= 200;
          }
        }
        g.xresize = {
          startX: e.pageX
        };
        if (e.pageX >= g.rightDropHandle.offset().left && e.pageX <= g.rightDropHandle.offset().left + p.dropVal) {
          g.xresize = {
            startX: g.rightDropHandle.offset().left
          };
        }
        if (p.minRightWidth && e.pageX < g.layout.offset().left + g.layout.outerWidth() - p.minRightWidth - p.dropVal && e.pageX > g.layout.offset().left + g.layout.outerWidth() - p.minRightWidth - p.dropVal - p.dropVal) {
          g.draggingyline.css({
            left: g.layout.offset().left + g.layout.outerWidth() - p.minRightWidth - p.dropVal - p.dropVal,
            top: g.middleTop,
            height: g.middleHeight
          }).show();
        } else if (g.maxRightWidth && e.pageX < g.layout.offset().left + g.layout.outerWidth() - g.maxRightWidth - p.dropVal && e.pageX > g.layout.offset().left + g.layout.outerWidth() - g.maxRightWidth - p.dropVal - p.dropVal) {
          g.draggingyline.css({
            left: g.layout.offset().left + g.layout.outerWidth() - g.maxRightWidth - p.dropVal - p.dropVal,
            top: g.middleTop,
            height: g.middleHeight
          }).show();
        } else {
          g.draggingyline.css({
            left: e.pageX - g.layout.offset().left,
            top: g.middleTop,
            height: g.middleHeight
          }).show();
        }
      } else if (dragtype == 'topresize' || dragtype == 'bottomresize') {
        g.yresize = {
          startY: e.pageY
        };
        g.draggingxline.css({
          top: e.pageY - g.layout.offset().top,
          width: g.layout.width()
        }).show();
        $('body').css('cursor', 'row-resize');
      } else {
        return;
      }
      g.layout.lock.width(g.layout.width());
      g.layout.lock.height(g.layout.height());
      g.layout.lock.show();
      $(document).bind('selectstart', function() {
        return false;
      });
      $(document).bind('mouseup', function() {
        g._stop.apply(g, arguments);
      });
      $(document).bind('mousemove', function() {
        g._drag.apply(g, arguments);
      });
    },
    _drag: function(e) {
      var g = this,
        p = this.options;
      if (g.xresize) {
        if (g.dragtype == "leftresize") {
          var left = e.pageX - g.left.offset().left;
          g.xresize.diff = g.draggingyline.offset().left - g.xresize.startX;
          if (p.minLeftWidth && left >= p.minLeftWidth + g.left.offset().left && g.maxLeftWidth && left <= g.maxLeftWidth + g.left.offset().left) {
            g.draggingyline.css({
              left: left
            });
          } else if (p.minLeftWidth && left < p.minLeftWidth + g.left.offset().left) {
            g.draggingyline.css({
              left: p.minLeftWidth + g.left.offset().left
            });
          } else if (g.maxLeftWidth && left > g.maxLeftWidth + g.left.offset().left) {
            g.draggingyline.css({
              left: g.maxLeftWidth + g.left.offset().left
            });
          }
        } else if (g.dragtype == "rightresize") {
          var left = e.pageX - g.layout.offset().left;
          g.xresize.diff = g.draggingyline.offset().left - g.xresize.startX;
          if (g.maxRightWidth && left >= g.layout.offset().left + g.layout.outerWidth() - g.maxRightWidth - p.dropVal && p.minLeftWidth && left <= g.layout.offset().left + g.layout.outerWidth() - p.minRightWidth - p.dropVal - p.dropVal) {
            g.draggingyline.css({
              left: left
            });
          } else if (p.minRightWidth && left > g.layout.offset().left + g.layout.outerWidth() - p.minRightWidth - p.dropVal - p.dropVal) {
            g.draggingyline.css({
              left: g.layout.offset().left + g.layout.outerWidth() - p.minRightWidth - p.dropVal - p.dropVal
            });
          } else if (g.maxRightWidth && left < g.layout.offset().left + g.layout.outerWidth() - g.maxRightWidth - p.dropVal - p.dropVal) {
            g.draggingyline.css({
              left: g.layout.offset().left + g.layout.outerWidth() - g.maxRightWidth - p.dropVal - p.dropVal
            });
          }
        }
        $('body').css('cursor', 'col-resize');
      } else if (g.yresize) {
        g.yresize.diff = e.pageY - g.yresize.startY;
        g.draggingxline.css({
          top: e.pageY - g.layout.offset().top
        });
        $('body').css('cursor', 'row-resize');
      }
      return g.preventEvent(e);
    },
    _stop: function(e) {
      var g = this,
        p = this.options;
      var diff;
      if (g.xresize && g.xresize.diff !== undefined) {
        diff = g.xresize.diff;
        if (g.dragtype == 'leftresize') {
          g.leftWidth += g.xresize.diff;
          g.left.outerWidth(g.leftWidth);
          if (g.center) g.center.outerWidth(g.center.outerWidth() - g.xresize.diff).css({
            left: parseInt(g.center.css('left')) + g.xresize.diff
          });
          else if (g.right) g.right.outerWidth(g.left.outerWidth() - g.xresize.diff).css({
            left: parseInt(g.right.css('left')) + g.xresize.diff
          });
        } else if (g.dragtype == 'rightresize') {
          g.rightWidth -= g.xresize.diff;
          g.right.outerWidth(g.rightWidth).css({
            left: parseInt(g.right.css('left')) + g.xresize.diff
          });
          if (g.center) g.center.outerWidth(g.center.outerWidth() + g.xresize.diff);
          else if (g.left) g.left.outerWidth(g.left.outerWidth() + g.xresize.diff);
        }
      } else if (g.yresize && g.yresize.diff !== undefined) {
        diff = g.yresize.diff;
        if (g.dragtype == 'topresize') {
          g.top.outerHeight(g.top.outerHeight() + g.yresize.diff);
          g.middleTop += g.yresize.diff;
          g.middleHeight -= g.yresize.diff;
          if (g.left) {
            g.left.css({
              top: g.middleTop
            }).outerHeight(g.middleHeight);
            g.leftCollapse.css({
              top: g.middleTop
            }).outerHeight(g.middleHeight);
          }
          if (g.center) g.center.css({
            top: g.middleTop
          }).outerHeight(g.middleHeight);
          if (g.right) {
            g.right.css({
              top: g.middleTop
            }).outerHeight(g.middleHeight);
            g.rightCollapse.css({
              top: g.middleTop
            }).outerHeight(g.middleHeight);
          }
        } else if (g.dragtype == 'bottomresize') {
          g.bottom.outerHeight(g.bottom.outerHeight() - g.yresize.diff);
          g.middleHeight += g.yresize.diff;
          g.bottomTop += g.yresize.diff;
          g.bottom.css({
            top: g.bottomTop
          });
          if (g.left) {
            g.left.outerHeight(g.middleHeight);
            g.leftCollapse.outerHeight(g.middleHeight);
          }
          if (g.center) g.center.outerHeight(g.middleHeight);
          if (g.right) {
            g.right.outerHeight(g.middleHeight);
            g.rightCollapse.outerHeight(g.middleHeight);
          }
        }
      }
      g.trigger('endResize', [{
        direction: g.dragtype ? g.dragtype.replace(/resize/, '') : '',
        diff: diff
      }, e]);
      g._setDropHandlePosition();
      g.draggingxline.hide();
      g.draggingyline.hide();
      g.xresize = g.yresize = g.dragtype = false;
      g.layout.lock.hide();
      if ($.browser.msie || $.browser.safari) $('body').unbind('selectstart');
      $(document).unbind('mousemove', g._drag);
      $(document).unbind('mouseup', g._stop);
      $('body').css('cursor', '');
    }
  });
})(jQuery);
