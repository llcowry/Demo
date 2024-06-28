//lxlDialog
(function($) {
  $.lxlDialog = function() {
    return $.lxlui.run.call(null, "lxlDialog", arguments, {
      isStatic: true
    });
  };
  $.lxlDefaults.Dialog = {
    type: 'info', // 类型
    title: '\u7cfb\u7edf\u63d0\u793a', // 标题
    content: '', // 内容
    url: null, // 内容url
    left: null, // 百分比或者具体值
    top: null, // 百分比或者具体值
    right: null, // 百分比或者具体值
    bottom: null, // 百分比或者具体值
    width: null, // 宽：百分比或者具体值
    height: null, // 高：百分比或者具体值
    buttons: null, // 按钮对象
    target: null, // 触发目标，比如内容为文本输入时
    load: false, // 加载方法
    iframeStyle: null, // 内容为框架时的样式
    allowIcon: true, // 是否显示图标
    allowClose: true, // 是否显示关闭按钮
    allowMask: true, // 是否显示遮罩
    closeWhenEnter: true, // 确认后是否关闭
    isDrag: true, // 是否可以拖动
    isResize: true, // 是否可以改变大小
    isHide: false, // 是否隐藏，点击关闭按钮时是隐藏还是关闭
    onLoaded: null // 加载完成时执行的方法
  };
  $.lxlMethos.Dialog = $.lxlMethos.Dialog || {};
  $.lxlui.controls.Dialog = function(options) {
    $.lxlui.controls.Dialog.base.constructor.call(this, null, options);
  };
  $.lxlui.controls.Dialog.lxlExtend($.lxlui.core.UIComponent, {
    __getType: function() {
      return 'Dialog';
    },
    __idPrev: function() {
      return 'Dialog';
    },
    _extendMethods: function() {
      return $.lxlMethos.Dialog;
    },
    _render: function() {
      var g = this,
        p = this.options;
      g.set(p, true);
      var dialog = $('<div class="dialog"><div class="dialog-head"><span class="dialog-title"></span></div><a class="dialog-close" title="\u5173\u95ed"></a><div class="dialog-body"><div class="dialog-con clearfix">' + (p.allowIcon ? '<div class="dialog-cl"><div class="dialog-' + p.type + '"></div></div>' : '') + '<div class="dialog-cr"><div class="info"></div></div></div></div><div class="dialog-foot"><div class="dialog-btns"></div></div></div>');
      $('body').append(dialog);
      g.dialog = dialog;
      g.element = dialog[0];
      g.dialog.mask = $('<div class="dialog-mask"></div>');
      if (p.allowMask) $('body').append(g.dialog.mask);
      g.dialog.header = $(".dialog-head:first", g.dialog);
      g.dialog.title = $(".dialog-title:first", g.dialog);
      g.dialog.close = $(".dialog-close:first", g.dialog);
      g.dialog.body = $(".dialog-body:first", g.dialog);
      g.dialog.content = $(".dialog-con:first", g.dialog);
      g.dialog.content.info = $(".info", g.dialog.content);
      g.dialog.footer = $(".dialog-foot:first", g.dialog);
      g.dialog.buttons = $(".dialog-btns:first", g.dialog);
      g.set(p, false);
      if (p.type == 'popup') {
        g.dialog.css('min-height', '100px');
      } else {
        g.dialog.css('min-height', '160px');
      }
      if (p.type == 'popup' || p.type == 'preview') {
        g.dialog.body.css('overflow-y', 'auto');
        g.dialog.content.addClass(p.type).removeClass('clearfix');
      }
      if (p.target) {
        g.dialog.content.info.html(p.target);
      } else if (p.type == "upload" && p.url) {
        g.dialog.content.info.html('<iframe frameborder="0" scrolling="no"></iframe>');
        var framename = p.name ? p.name : "lxlwindow" + new Date().getTime();
        g.iframe = $("iframe:first", g.dialog.body);
        g.iframe.attr({
          name: framename,
          id: framename,
          style: p.iframeStyle
        });
        setTimeout(function() {
          g.iframe.attr("src", p.url);
          g._setLoading();
        }, 1);
      } else if (p.type && p.url) {
        if (p.load) {
          p.url += p.url.indexOf('?') == -1 ? "?" : "&";
          p.url += "t=" + new Date().getTime();
          g.dialog.body.html('').load(p.url, function() {
            g._saveSizeAndPos();
          });
        } else {
          g.dialog.body.html('<iframe frameborder="0" scrolling="no"></iframe>');
          var framename = p.name ? p.name : "lxlwindow" + new Date().getTime();
          if (p.height) {
            g.dialog.height(p.height);
            g.dialog.body.height(p.height - 72);
          }
          g.iframe = $(">iframe:first", g.dialog.body);
          var iframeH = p.height - 36;
          if (p.buttons) {
            iframeH -= 36;
          }
          g.iframe.attr({
            name: framename,
            id: framename,
            style: (p.iframeStyle ? p.iframeStyle : '') + 'width: 100%; height: ' + iframeH + 'px;'
          });
          setTimeout(function() {
            g.iframe.attr("src", p.url);
            g._setLoading();
          }, 1);
        }
      }
      if (p.buttons) {
        $(p.buttons).each(function(i, item) {
          var btn = $('<input type="button" class="button" value="" />').attr({
            'id': item.id,
            'name': item.type
          }).val(item.text);
          g.dialog.buttons.prepend(btn);
          item.onclick && btn.click(function() {
            item.onclick(g, $(this), item, i);
          });
          btn.hoverClass("button-hover").mousedown(function() {
            $(this).addClass("button-active");
          }).mouseup(function() {
            $(this).removeClass("button-active");
          });
          if (item.display === undefined) btn.show();
          else btn.hide();
          if (item.type == 'yes' || item.type == 'ok') g.dialog.buttons.ok = btn;
        });
      } else {
        if (p.type == 'popup' || p.type == 'iframe') {
          g.dialog.footer.remove();
          g.dialog.body.height(g.dialog.height() - g.dialog.header.height());
        } else {
          g.dialog.buttons.remove();
        }
      }
      if (p.allowClose === false) {
        g.dialog.close.remove();
      } else {
        g.dialog.close.attr('href', 'javascript:;').click(function() {
          if (p.isHide) g._hide();
          else g.close();
        });
      }
      if (p.type == "popup") {
        var right = 0,
          bottom = 0,
          dialogs = lxl.find(g.__getType());
        for (var i = 0; i < dialogs.length; i++) {
          bottom = i * g.dialog.height() + (i + 1) * 7; // 7为弹窗间的间隙值
          dialogs[i]._setRight(right);
          dialogs[i]._setBottom(bottom);
        }
      }
      if (p.isDrag) g._applyDrag();
      if (p.isResize) g._applyResize();
      g._onResize();
      g._saveSizeAndPos();
      g._show();
      if (p.target) {
        $('#txtInput').focus().select().keydown(function(e) {
          e = e || event || window.parentWindow.event;
          var key = e.charCode || e.keyCode || e.which;
          if (key == 13) g.dialog.buttons.ok.click();
        }).keyup(function() {
          if (g.dialog.title.text() == "排序") {
            if (!(new RegExp(/^\d+$/).test($(this).val()))) $(this).val(s);
          }
        });
      } else if (p.type != 'popup' && g.dialog.close) {
        g.dialog.close.focus();
      }
      g.trigger('loaded');
      $(document).bind('keydown.dialog', function(e) {
        e = e || event || window.parentWindow.event;
        var key = e.charCode || e.keyCode || e.which;
        switch (key) {
          case 13:
            var isClose;
            if (p.closeWhenEnter !== undefined) {
              isClose = p.closeWhenEnter;
            } else if (p.type == "warning" || p.type == "error" || p.type == "success" || p.type == "question") {
              isClose = true;
            }
            if (isClose) {
              if (p.isHide) g._hide();
              else g.close();
            }
            break;
          case 27:
            if (p.isHide) g._hide();
            else g.close();
            break;
        }
      });
      $(window).resize(function() {
        g._onResize.call(g);
      });
    },
    _setLoading: function() {
      var g = this,
        p = this.options;
      if (g.iframe[0].readyState != "complete") {
        if (g.dialog.body.find("div.dialog-loading:first").length === 0) g.dialog.body.prepend("<div class='dialog-loading' style='display:block;width:100%;height:" + (p.height - 72) + "px;'></div>");
        g.iframe.bind('load.dialog', function() {
          $("div.dialog-loading:first", g.dialog.body).hide();
        });
      }
    },
    _setLeft: function(value) {
      if (!this.dialog) return;
      if (value != null) {
        this.dialog.css({
          left: value
        });
      }
    },
    _setTop: function(value) {
      if (!this.dialog) return;
      if (value != null) {
        this.dialog.css({
          top: value
        });
      }
    },
    _setRight: function(value) {
      if (!this.dialog) return;
      if (value != null) {
        this.dialog.css({
          right: value
        });
      }
    },
    _setBottom: function(value) {
      if (!this.dialog) return;
      if (value != null) {
        this.dialog.css({
          bottom: value
        });
      }
    },
    _setWidth: function(value) {
      if (!this.dialog) return;
      if (value != null) {
        this.dialog.width(value).css({
          'min-width': value
        });
      }
    },
    _setHeight: function(value) {
      if (!this.dialog) return;
      if (value != null) this.dialog.body.height(value - (this.options.type == 'popup' ? 36 : 72));
    },
    _setTitle: function(value) {
      if (value) this.dialog.title.html(value);
    },
    _setContent: function(value) {
      if (value) this.dialog.content.info.html(value);
    },
    _setUrl: function(url) {
      var g = this,
        p = this.options;
      p.url = url;
      if (p.load) {
        g.dialog.content.html("").load(p.url, function() {
          g._saveSizeAndPos();
        });
      } else if (g.iframe) {
        g.iframe.attr("src", p.url);
      }
    },
    _saveSizeAndPos: function() {
      var g = this,
        p = this.options,
        top = 0,
        left = 0;
      g._width = g.dialog.width();
      g._height = g.dialog.height();
      if (!isNaN(parseInt(g.dialog.css('top')))) top = parseInt(g.dialog.css('top'));
      if (!isNaN(parseInt(g.dialog.css('left')))) left = parseInt(g.dialog.css('left'));
      g._top = top;
      g._left = left;
    },
    _applyDrag: function() {
      var g = this,
        p = this.options;
      if ($.fn.lxlDrag) {
        g.draggable = g.dialog.lxlDrag({
          handler: '.dialog-head',
          onStopDrag: function() {
            if (p.type == "popup") {
              g.dialog.css('right', 'inherit');
              g.dialog.css('bottom', 'inherit');
            }
            g._saveSizeAndPos();
          }
        });
      }
    },
    _applyResize: function() {
      var g = this,
        p = this.options;
      if ($.fn.lxlResizable) {
        g.resizable = g.dialog.lxlResizable({
          onStopResize: function(current) {
            var top = 0,
              left = 0;
            if (!isNaN(parseInt(g.dialog.css('top')))) top = parseInt(g.dialog.css('top'));
            if (!isNaN(parseInt(g.dialog.css('left')))) left = parseInt(g.dialog.css('left'));
            if (current.diffLeft) g.dialog.css({
              left: left + current.diffLeft
            });
            if (current.diffTop) g.dialog.css({
              top: top + current.diffTop
            });
            if (current.newWidth) g.dialog.css({
              width: current.newWidth
            });
            if (current.newHeight) {
              if (current.newHeight > $(window).height()) current.newHeight = $(window).height();
              g.dialog.height(current.newHeight);
              g.dialog.body.height(current.newHeight - 72);
            }
            g._onResize();
            g._saveSizeAndPos();
            return false;
          }
        });
      }
    },
    _onResize: function() {
      var g = this,
        p = this.options;
      var left = p.left || 0,
        top = p.top || 0,
        right = p.right,
        bottom = p.bottom,
        width = p.width || g.dialog.width(),
        height = p.height || g.dialog.height();
      if (right == null && bottom == null && p.type != "popup") {
        if (left < 0) left = 0;
        else left = 0.5 * ($(window).width() - width);
        if (top < 0) top = 0;
        else top = 0.5 * ($(window).height() - height) + $(window).scrollTop();
        g.dialog.css({
          left: left,
          top: top
        });
      }
      g.dialog.mask.css({
        width: $(window).width(),
        height: $(window).height()
      });
    },
    _show: function() {
      var g = this,
        p = this.options;
      g.dialog.mask.show();
      g.dialog.show();
    },
    _hide: function() {
      var g = this;
      g.dialog.mask.hide();
      g.dialog.hide();
    },
    bottom: function() {
      var g = this;
      return g.dialog.css('bottom');
    },
    close: function() {
      var g = this,
        p = this.options;
      // 从管理器中移除对象
      lxl.remove(g.id);
      g.dialog.mask.remove();
      g.dialog.remove();
      $(document).unbind('keydown.dialog');
    }
  });
  $.lxlDialog.open = function(p) {
    return $.lxlDialog(p);
  };
  $.lxlDialog.close = function() {
    var dialogs = $.lxlui.find($.lxlui.controls.Dialog.prototype.__getType());
    for (var i in dialogs) {
      dialogs[i].close();
    }
  };
  $.lxlDialog.show = function(p) {
    var dialogs = $.lxlui.find($.lxlui.controls.Dialog.prototype.__getType());
    if (dialogs.length) {
      for (var i in dialogs) {
        dialogs[i]._show();
        return;
      }
    }
    return $.lxlDialog(p);
  };
  $.lxlDialog.hide = function() {
    var dialogs = $.lxlui.find($.lxlui.controls.Dialog.prototype.__getType());
    for (var i in dialogs) {
      dialogs[i]._hide();
    }
  };
  $.lxlDialog.success = function(content, title, onBtnClick) {
    return $.lxlDialog.alert(content, title, 'success', onBtnClick);
  };
  $.lxlDialog.error = function(content, title, onBtnClick) {
    return $.lxlDialog.alert(content, title, 'error', onBtnClick);
  };
  $.lxlDialog.warning = function(content, title, onBtnClick) {
    return $.lxlDialog.alert(content, title, 'warning', onBtnClick);
  };
  $.lxlDialog.question = function(content, title) {
    return $.lxlDialog.alert(content, title, 'question');
  };
  $.lxlDialog.prohibit = function(content, title) {
    return $.lxlDialog.alert(content, title, 'prohibit');
  };
  $.lxlDialog.alert = function(content, title, type, callback) {
    content = content || "";
    if (typeof(title) == "function") {
      callback = title;
      type = null;
    } else if (typeof(type) == "function") {
      callback = type;
    }
    var btnclick = function(dialog, button, item, index) {
      dialog.close();
      if (callback) callback(dialog, button, item, index);
    };
    var p = {
      content: content,
      buttons: [{
        text: ' 确认 ',
        onclick: btnclick,
        type: 'ok'
      }]
    };
    if (typeof(title) == "string" && title !== '') p.title = title;
    if (typeof(type) == "string" && type !== '') p.type = type;
    return $.lxlDialog(p);
  };
  $.lxlDialog.confirm = function(content, title, callback, cancelcall) {
    if (typeof(title) == "function") callback = title;
    var btnclick = function(dialog, button, item) {
      dialog.close();
      if (callback) callback(item.type == 'yes');
    };
    var btncancelclick = function(dialog, button, item) {
      dialog.close();
      if (cancelcall) cancelcall(item.type == 'no');
    };
    var p = {
      type: 'question',
      content: content,
      buttons: [{
        text: ' 是 ',
        onclick: btnclick,
        type: 'yes'
      }, {
        text: ' 否 ',
        onclick: btncancelclick,
        type: 'no'
      }]
    };
    if (typeof(title) == "string" && title !== '') p.title = title;
    return $.lxlDialog(p);
  };
  $.lxlDialog.prompt = function(title, label, value, multi, callback) {
    var target = label + '<input type="text" id="txtInput" value="' + value + '" class="input" />';
    if (typeof(multi) == "function") callback = multi;
    if (typeof(multi) == "boolean" && multi) target = '<textarea id="txtInput" class="textarea" style="width: 320px; height: 55px" placeholder="' + label + '">' + value + '</textarea>';
    if (typeof(value) == "string" || typeof(value) == "number") $('#txtInput').val(value);
    var btnclick = function(dialog, button, item) {
      if (callback) callback(item.type == 'ok', $('#txtInput').val());
      dialog.close(); //有值需要获取，得先回调后关闭
    };
    return $.lxlDialog({
      title: title,
      target: target,
      buttons: [{
        text: ' 确认 ',
        onclick: btnclick,
        type: 'ok'
      }, {
        text: ' 取消 ',
        onclick: btnclick,
        type: 'cancel'
      }]
    });
  };
  $.lxlDialog.popup = function(content, title, callback) {
    var p = {
      type: 'popup',
      width: 300,
      allowIcon: false,
      allowMask: false,
      isResize: false,
      content: content || "",
      onLoaded: function() {
        if (callback) callback();
      }
    };
    if (typeof(title) == "string" && title !== '') p.title = title;
    return $.lxlDialog(p);
  };
  $.lxlDialog.preview = function(content, title, height, callback) {
    var btnCloseClick = function(dialog, button, item) {
      dialog.close();
    };
    var p = {
      type: 'preview',
      allowIcon: false,
      isResize: false,
      content: content || "",
      buttons: [{
        text: ' 关闭 ',
        onclick: btnCloseClick,
        type: 'close'
      }],
      onLoaded: function() {
        if (callback) callback();
      }
    };
    if (typeof(title) == "string" && title !== '') p.title = title;
    if (typeof(height) == "number" && height !== 0) p.height = height;
    return $.lxlDialog(p);
  };
})(jQuery);