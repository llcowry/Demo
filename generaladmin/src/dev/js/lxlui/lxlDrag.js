//lxlDrag
(function($) {
  $.fn.lxlDrag = function() {
    return $.lxlui.run.call(this, "lxlDrag", arguments, {
      idAttrName: 'lxluidragid',
      hasElement: false,
      propertyToElemnt: 'target'
    });
  };
  $.fn.lxlDragMgr = function() {
    return $.lxlui.run.call(this, "lxlDragMgr", arguments, {
      idAttrName: 'lxluidragid',
      hasElement: false,
      propertyToElemnt: 'target'
    });
  };
  $.lxlDefaults.Drag = {
    handler: null,
    receive: null, //接收对象
    proxy: true, //代理 拖动时的主体，可以是'clone'或者是函数，返回对象
    proxyX: null,
    proxyY: null,
    revert: null, //恢复原状
    animate: false, //动画效果
    disabled: false,
    onStartDrag: false,
    onDrag: false,
    onStopDrag: false,
    onRevert: null,
    onEndRevert: null,
    onDragEnter: null,
    onDragOver: null,
    onDragLeave: null,
    onDrop: null
  };
  $.lxlui.controls.Drag = function(options) {
    $.lxlui.controls.Drag.base.constructor.call(this, null, options);
  };
  $.lxlui.controls.Drag.lxlExtend($.lxlui.core.UIComponent, {
    __getType: function() {
      return 'Drag';
    },
    __idPrev: function() {
      return 'Drag';
    },
    _render: function() {
      var g = this,
        p = this.options;
      this.set(p);
      g.cursor = "move";
      g.handler.css('cursor', g.cursor);
      g.handler.unSelect();
      g.handler.bind('mousedown.drag', function(e) {
        if (p.disabled) return;
        if (e.button == 2) return;
        g._start.call(g, e);
        this.setCapture && this.setCapture(false); //ie 设置鼠标捕获
        e.preventDefault(); //阻止默认行为，chrome的拖拽选择文字行为
      }).bind('mousemove.drag', function() {
        if (p.disabled) return;
        g.handler.css('cursor', g.cursor);
      }).bind('mouseup.drag', function() {
        this.releaseCapture && this.releaseCapture(); //ie 释放鼠标捕获
      });
    },
    _rendered: function() {
      this.options.target.lxluidragid = this.id;
    },
    _start: function(e) {
      var g = this,
        p = this.options;
      if (g.reverting) return;
      if (p.disabled) return;
      g.current = {
        target: g.target,
        left: g.target.offset().left,
        top: g.target.offset().top,
        startX: e.clientX,
        startY: e.clientY
      };
      if (g.trigger('startDrag', [g.current, e]) === false) return false;
      g.cursor = "move";
      g._createProxy(p.proxy, e);
      if (p.proxy && !g.proxy) return false;
      (g.proxy || g.handler).css('cursor', g.cursor);
      $(document).bind('selectstart.drag', function() {
        return false;
      });
      $(document).bind('mousemove.drag', function() {
        g._drag.apply(g, arguments);
      });
      $.lxlui.draggable.dragging = true;
      $(document).bind('mouseup.drag', function() {
        $.lxlui.draggable.dragging = false;
        g._stop.apply(g, arguments);
      });
    },
    _drag: function(e) {
      var g = this,
        p = this.options;
      if (!g.current) return;
      var pageX = e.pageX || e.clientX;
      var pageY = e.pageY || e.clientY;
      g.current.diffX = pageX - g.current.startX;
      g.current.diffY = pageY - g.current.startY;
      (g.proxy || g.handler).css('cursor', g.cursor);
      if (g.receive) {
        g.receive.each(function(i, obj) {
          var receive = $(obj);
          var xy = receive.offset();
          if (pageX > xy.left && pageX < xy.left + receive.width() && pageY > xy.top && pageY < xy.top + receive.height()) {
            if (!g.receiveEntered[i]) {
              g.receiveEntered[i] = true;
              g.trigger('dragEnter', [obj, g.proxy || g.target, e]);
            } else {
              g.trigger('dragOver', [obj, g.proxy || g.target, e]);
            }
          } else if (g.receiveEntered[i]) {
            g.receiveEntered[i] = false;
            g.trigger('dragLeave', [obj, g.proxy || g.target, e]);
          }
        });
      }
      if (g.hasBind('drag')) {
        if (g.trigger('drag', [g.current, e]) !== false) {
          g._applyDrag();
        } else {
          if (g.proxy) {
            g._removeProxy();
          } else {
            g._stop();
          }
        }
      } else {
        g._applyDrag();
      }
    },
    _stop: function(e) {
      var g = this,
        p = this.options;
      $(document).unbind('mousemove.drag').unbind('mouseup.drag').unbind('selectstart.drag');
      if (g.receive) {
        g.receive.each(function(i, obj) {
          if (g.receiveEntered[i]) {
            g.trigger('drop', [obj, g.proxy || g.target, e]);
          }
        });
      }
      if (g.proxy) {
        if (p.revert) {
          if (g.hasBind('revert')) {
            if (g.trigger('revert', [g.current, e]) !== false) g._revert(e);
            else g._removeProxy();
          } else {
            g._revert(e);
          }
        } else {
          g._applyDrag(g.target);
          g._removeProxy();
        }
      }
      g.cursor = 'move';
      g.trigger('stopDrag', [g.current, e]);
      g.current = null;
      g.handler.css('cursor', g.cursor);
    },
    _revert: function(e) {
      var g = this;
      g.reverting = true;
      g.proxy.animate({
        left: g.current.left,
        top: g.current.top
      }, function() {
        g.reverting = false;
        g._removeProxy();
        g.trigger('endRevert', [g.current, e]);
        g.current = null;
      });
    },
    _applyDrag: function(applyResultBody) {
      var g = this,
        p = this.options;
      applyResultBody = applyResultBody || g.proxy || g.target;
      var cur = {},
        changed = false;
      var noproxy = applyResultBody == g.target;
      if (g.current.diffX) {
        var _minX = g.target.outerWidth();
        if (noproxy || p.proxyX == null) {
          cur.left = g.current.left + g.current.diffX;
          _minX = applyResultBody.outerWidth();
        } else {
          cur.left = g.current.startX + p.proxyX + g.current.diffX;
        }
        if (cur.left < 0) cur.left = 0;
        _minX = $(window).width() - _minX;
        if (cur.left > _minX) cur.left = _minX;
        changed = true;
      }
      if (g.current.diffY) {
        var _minY = g.target.outerHeight();
        if (noproxy || p.proxyY == null) {
          cur.top = g.current.top + g.current.diffY;
          _minY = applyResultBody.outerHeight();
        } else {
          cur.top = g.current.startY + p.proxyY + g.current.diffY;
        }
        if (cur.top < 0) cur.top = 0;
        _minY = $(window).height() - _minY;
        if (cur.top > _minY) cur.top = _minY;
        changed = true;
      }
      if (applyResultBody == g.target && g.proxy && p.animate) {
        g.reverting = true;
        applyResultBody.animate(cur, function() {
          g.reverting = false;
        });
      } else {
        applyResultBody.css(cur);
      }
    },
    _setReceive: function(receive) {
      var g = this;
      g.receiveEntered = {};
      if (!receive) return;
      if (typeof receive == 'string') g.receive = $(receive);
      else g.receive = receive;
    },
    _setHandler: function(handler) {
      var g = this,
        p = this.options;
      if (!handler) g.handler = $(p.target);
      else g.handler = (typeof handler == 'string' ? $(handler, p.target) : handler);
    },
    _setTarget: function(target) {
      this.target = $(target);
    },
    _setCursor: function(cursor) {
      var g = this;
      g.cursor = cursor;
      (g.proxy || g.handler).css('cursor', cursor);
    },
    _createProxy: function(proxy, e) {
      if (!proxy) return;
      var g = this,
        p = this.options;
      if (typeof proxy == 'function') {
        g.proxy = proxy.call(this.options.target, g, e);
      } else if (proxy == 'clone') {
        g.proxy = g.target.clone().css('position', 'absolute');
        g.proxy.appendTo('body');
      } else {
        g.proxy = $("<div class='draggable'></div>");
        g.proxy.width(g.target.width() - 2).height(g.target.height() - 2);
        g.proxy.attr("dragid", g.id).appendTo('body');
      }
      g.proxy.css({
        left: p.proxyX == null ? g.current.left : g.current.startX + p.proxyX,
        top: p.proxyY == null ? g.current.top : g.current.startY + p.proxyY
      }).show();
    },
    _removeProxy: function() {
      var g = this;
      if (g.proxy) {
        g.proxy.remove();
        g.proxy = null;
      }
    }
  });
})(jQuery);
