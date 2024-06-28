//lxlui core
(function($) {
  Function.prototype.lxlExtend = function(parent, overrides) {
    if (typeof parent != 'function') return this;
    this.base = parent.prototype;
    this.base.constructor = parent;
    var Func = function() {};
    Func.prototype = parent.prototype;
    this.prototype = new Func();
    this.prototype.constructor = this;
    if (overrides) $.extend(this.prototype, overrides);
  };
  Function.prototype.lxlDefer = function(o, defer, args) {
    var fn = this;
    return setTimeout(function() {
      fn.apply(o, args || []);
    }, defer);
  };
  window.lxl = $.lxlui = {
    version: 'v1.1.0',
    managerCount: 0,
    managers: {},
    managerIdPrev: 'lxlui',
    autoNewId: true,
    error: {
      managerIsExist: '管理器id已经存在'
    },
    pluginPrev: 'lxl',
    getId: function(prev) {
      prev = prev || this.managerIdPrev;
      var id = prev + (1000 + this.managerCount);
      this.managerCount++;
      return id;
    },
    add: function(manager) {
      if (arguments.length == 2) {
        var m = arguments[1];
        m.id = m.id || m.options.id || arguments[0].id;
        this.addManager(m);
        return;
      }
      if (!manager.id) manager.id = this.getId(manager.__idPrev());
      //if (this.managers[manager.id]) manager.id = this.getId(manager.__idPrev());
      //if (this.managers[manager.id]) {
      //    throw new Error(this.error.managerIsExist);
      //}
      this.managers[manager.id] = manager;
    },
    remove: function(arg) {
      if (typeof arg == "string" || typeof arg == "number") {
        delete lxl.managers[arg];
      } else if (typeof arg == "object") {
        if (arg instanceof lxl.core.Component) {
          delete lxl.managers[arg.id];
        } else {
          if (!$(arg).attr(this.idAttrName)) return false;
          delete lxl.managers[$(arg).attr(this.idAttrName)];
        }
      }
    },
    get: function(arg, idAttrName) {
      idAttrName = idAttrName || "lxluiid";
      if (typeof arg == "string" || typeof arg == "number") {
        return lxl.managers[arg];
      } else if (typeof arg == "object") {
        var domObj = arg.length ? arg[0] : arg;
        var id = domObj[idAttrName] || $(domObj).attr(idAttrName);
        if (!id) return null;
        return lxl.managers[id];
      }
      return null;
    },
    find: function(type) {
      var arr = [];
      for (var id in this.managers) {
        var manager = this.managers[id];
        if (type instanceof Function) {
          if (manager instanceof type) arr.push(manager);
        } else if (type instanceof Array) {
          if ($.inArray(manager.__getType(), type) != -1) arr.push(manager);
        } else {
          if (manager.__getType() == type) arr.push(manager);
        }
      }
      return arr;
    },
    run: function(plugin, args, ext) {
      if (!plugin) return;
      ext = $.extend({
        defaultsNamespace: 'lxlDefaults',
        methodsNamespace: 'lxlMethods',
        controlNamespace: 'controls',
        idAttrName: 'lxluiid',
        isStatic: false,
        hasElement: true,
        propertyToElemnt: null
      }, ext || {});
      //plugin = plugin.replace(/^lxlGet/, '');
      plugin = plugin.replace(/^lxl/, '');
      if (this == null || this == window || ext.isStatic) {
        if (!lxl.plugins[plugin]) {
          lxl.plugins[plugin] = {
            fn: $[lxl.pluginPrev + plugin],
            isStatic: true
          };
        }
        return new $.lxlui[ext.controlNamespace][plugin]($.extend({},
          $[ext.defaultsNamespace][plugin] || {},
          $[ext.defaultsNamespace][plugin + 'String'] || {},
          args.length > 0 ? args[0] : {}));
      }
      if (!lxl.plugins[plugin]) {
        lxl.plugins[plugin] = {
          fn: $.fn[lxl.pluginPrev + plugin],
          isStatic: false
        };
      }
      if (/Mgr$/.test(plugin)) return lxl.get(this, ext.idAttrName);
      this.each(function() {
        if (this[ext.idAttrName] || $(this).attr(ext.idAttrName)) {
          var manager = lxl.get(this[ext.idAttrName] || $(this).attr(ext.idAttrName));
          if (manager && args.length > 0) manager.set(args[0]);
          return;
        }
        if (args.length >= 1 && typeof args[0] == 'string') return;
        var options = args.length > 0 ? args[0] : null;
        var p = $.extend({}, $[ext.defaultsNamespace][plugin], $[ext.defaultsNamespace][plugin + 'String'], options);
        if (ext.propertyToElemnt) p[ext.propertyToElemnt] = this;
        if (ext.hasElement) {
          new $.lxlui[ext.controlNamespace][plugin](this, p);
        } else {
          new $.lxlui[ext.controlNamespace][plugin](p);
        }
      });
      if (this.length === 0) return null;
      if (args.length === 0) return lxl.get(this, ext.idAttrName);
      if (typeof args[0] == 'object') return lxl.get(this, ext.idAttrName);
      if (typeof args[0] == 'string') {
        var manager = lxl.get(this, ext.idAttrName);
        if (manager == null) return;
        if (args[0] == "option") {
          if (args.length == 2) return manager.get(args[1]);
          else if (args.length >= 3) return manager.set(args[1], args[2]);
        } else {
          var method = args[0];
          if (!manager[method]) return;
          var parms = Array.apply(null, args);
          parms.shift();
          return manager[method].apply(manager, parms);
        }
      }
      return null;
    },
    defaults: {},
    methods: {},
    core: {},
    controls: {},
    plugins: {},
    each: function(obj, fn) {
      var key, that = this;
      if (typeof fn !== 'function') return that;
      obj = obj || [];
      if (obj.constructor === Object) {
        for (key in obj) {
          if (fn.call(obj[key], key, obj[key])) break;
        }
      } else {
        for (key = 0; key < obj.length; key++) {
          if (fn.call(obj[key], key, obj[key])) break;
        }
      }
      return that;
    }
  };
  $.lxlDefaults = {};
  $.lxlMethos = {};
  lxl.defaults = $.lxlDefaults;
  lxl.methods = $.lxlMethos;
  $.fn.lxl = function(plugin) {
    if (plugin) {
      return lxl.run.call(this, plugin, arguments);
    } else {
      return lxl.get(this);
    }
  };
  lxl.core.Component = function(options) {
    this.events = this.events || {};
    this.options = options || {};
    this.children = {};
  };
  $.extend(lxl.core.Component.prototype, {
    __getType: function() {
      return 'lxl.core.Component';
    },
    __idPrev: function() {
      return 'lxlui';
    },
    set: function(arg, value) {
      if (!arg) return;
      if (typeof arg == 'object') {
        var tmp;
        if (this.options != arg) {
          $.extend(this.options, arg);
          tmp = arg;
        } else {
          tmp = $.extend({}, arg);
        }
        if (value === undefined || value === true) {
          for (var p in tmp) {
            if (p.indexOf('on') === 0) this.set(p, tmp[p]);
          }
        }
        if (value === undefined || value === false) {
          for (var p in tmp) {
            if (p.indexOf('on') !== 0) this.set(p, tmp[p]);
          }
        }
        return;
      }
      var name = arg;
      if (name.indexOf('on') === 0) {
        if (typeof value == 'function') this.bind(name.substr(2), value);
        return;
      }
      if (!this.options) this.options = {};
      if (this.trigger('propertychange', [arg, value]) === false) return;
      this.options[name] = value;
      var pn = '_set' + name.substr(0, 1).toUpperCase() + name.substr(1);
      if (this[pn]) this[pn].call(this, value);
      this.trigger('propertychanged', [arg, value]);
    },
    get: function(name) {
      var pn = '_get' + name.substr(0, 1).toUpperCase() + name.substr(1);
      if (this[pn]) return this[pn].call(this, name);
      return this.options[name];
    },
    hasBind: function(arg) {
      var name = arg.toLowerCase();
      var event = this.events[name];
      if (event && event.length) return true;
      return false;
    },
    trigger: function(arg, data) {
      if (!arg) return;
      var name = arg.toLowerCase();
      var event = this.events[name];
      if (!event) return;
      data = data || [];
      if ((data instanceof Array) === false) data = [data];
      for (var i = 0; i < event.length; i++) {
        var ev = event[i];
        if (ev.handler.apply(ev.context, data) === false) return false;
      }
    },
    bind: function(arg, handler, context) {
      if (typeof arg == 'object') {
        for (var p in arg) {
          this.bind(p, arg[p]);
        }
        return;
      }
      if (typeof handler != 'function') return false;
      var name = arg.toLowerCase();
      var event = this.events[name] || [];
      context = context || this;
      event.push({
        handler: handler,
        context: context
      });
      this.events[name] = event;
    },
    unbind: function(arg, handler) {
      if (!arg) {
        this.events = {};
        return;
      }
      var name = arg.toLowerCase();
      var event = this.events[name];
      if (!event || !event.length) return;
      if (!handler) {
        delete this.events[name];
      } else {
        for (var i = 0, l = event.length; i < l; i++) {
          if (event[i].handler == handler) {
            event.splice(i, 1);
            break;
          }
        }
      }
    },
    destroy: function() {
      lxl.remove(this);
    }
  });
  lxl.core.UIComponent = function(element, options) {
    lxl.core.UIComponent.base.constructor.call(this, options);
    var extendMethods = this._extendMethods();
    if (extendMethods) $.extend(this, extendMethods);
    this.element = element;
    this._init();
    this._preRender();
    this.trigger('render');
    this._render();
    this.trigger('rendered');
    this._rendered();
  };
  lxl.core.UIComponent.lxlExtend(lxl.core.Component, {
    __getType: function() {
      return 'lxl.core.UIComponent';
    },
    _extendMethods: function() {},
    _init: function() {
      this.type = this.__getType();
      if (!this.element) {
        this.id = this.options.id || lxl.getId(this.__idPrev());
      } else {
        this.id = this.options.id || this.element.id || lxl.getId(this.__idPrev());
      }
      lxl.add(this);
      if (!this.element) return;
      var attributes = this.attr();
      if (attributes && attributes instanceof Array) {
        for (var i = 0; i < attributes.length; i++) {
          var name = attributes[i];
          this.options[name] = $(this.element).attr(name);
        }
      }
      var p = this.options;
      if ($(this.element).attr("lxlui")) {
        try {
          var attroptions = $(this.element).attr("lxlui");
          if (attroptions.indexOf('{') !== 0) attroptions = "{" + attroptions + "}";
          eval("attroptions = " + attroptions + ";");
          if (attroptions) $.extend(p, attroptions);
        } catch (e) {}
      }
    },
    _preRender: function() {},
    _render: function() {},
    _rendered: function() {
      if (this.element) $(this.element).attr("lxluiid", this.id);
    },
    attr: function() {
      return [];
    },
    destroy: function() {
      if (this.element) $(this.element).remove();
      this.options = null;
      lxl.remove(this);
    }
  });
  lxl.controls.Input = function(element, options) {
    lxl.controls.Input.base.constructor.call(this, element, options);
  };
  lxl.controls.Input.lxlExtend(lxl.core.UIComponent, {
    __getType: function() {
      return 'lxl.controls.Input';
    },
    attr: function() {
      return ['nullText'];
    },
    setValue: function(value) {
      return this.set('value', value);
    },
    getValue: function() {
      return this.get('value');
    },
    _setReadonly: function(readonly) {
      var wrapper = this.wrapper || this.text;
      if (!wrapper || !wrapper.hasClass("input")) return;
      var inputText = this.inputText;
      if (readonly) {
        if (inputText) inputText.prop("readonly", true);
        wrapper.addClass("input-readonly");
      } else {
        if (inputText) inputText.prop("readonly", false);
        wrapper.removeClass("input-readonly");
      }
    },
    setEnabled: function() {
      return this.set('disabled', false);
    },
    setDisabled: function() {
      return this.set('disabled', true);
    },
    updateStyle: function() {},
    resize: function(width, height) {
      this.set({
        width: width,
        height: height
      });
    }
  });
  lxl.draggable = {
    dragging: false
  };
  lxl.resizable = {
    reszing: false
  };
  $.fn.extend({
    hoverClass: function(className, speed) {
      var _className = className || "hover";
      return this.each(function() {
        var $this = $(this),
          mouseOutTimer;
        $this.hover(function() {
          if (mouseOutTimer) clearTimeout(mouseOutTimer);
          $this.addClass(_className);
        }, function() {
          mouseOutTimer = setTimeout(function() {
            $this.removeClass(_className);
          }, speed || 10);
        });
      });
    },
    focusClass: function(className) {
      var _className = className || "inputFocus";
      return this.each(function() {
        $(this).focus(function() {
          $(this).addClass(_className);
        }).blur(function() {
          $(this).removeClass(_className);
        });
      });
    },
    isBind: function(type) {
      var _events = $(this).data("events");
      return _events && type && _events[type];
    },
    unSelect: function() {
      $(this).css({
        '-webkit-user-select': 'none',
        '-moz-user-select': 'none',
        'user-select': 'none'
      }).on("selectstart", function() {
        return false;
      });
    },
    selectText: function() {
      return this.each(function() {
        var selection = null,
          range = null,
          txtObj = $(this).get(0);
        if ($.browser.msie) {
          range = document.body.createTextRange();
          range.moveToElementText(txtObj);
          range.select();
        } else if ($.browser.mozilla || $.browser.opera) {
          selection = window.getSelection();
          range = document.createRange();
          range.selectNodeContents(txtObj);
          selection.removeAllRanges();
          selection.addRange(range);
        } else if ($.browser.safari) {
          selection = window.getSelection();
          selection.setBaseAndExtent(txtObj, 0, txtObj, 1);
        }
      });
    },
    fixedForIE6: function(options) {
      if (!($.browser.msie && (7 > $.browser.version))) return;
      var html = $('html');
      if (html.css('backgroundAttachment') !== 'fixed') {
        html.css({
          'backgroundAttachment': 'fixed',
          'text-overflow': 'ellipsis'
        });
      }
      var p = $.extend({
        left: 0,
        top: 0
      }, options || {});
      return this.each(function() {
        $(this).css('position', 'absolute');
        this.style.setExpression('left', 'eval((document.documentElement).scrollLeft+' + p.left + ') + "px"');
        this.style.setExpression('top', 'eval((document.documentElement).scrollTop+' + p.top + ') + "px"');
      });
    }
  });
  if (!$.browser) {
    var userAgent = navigator.userAgent.toLowerCase();
    $.browser = {
      version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, "0"])[1],
      chrome: /webkit/.test(userAgent),
      safari: /webkit/.test(userAgent),
      webkit: /webkit/.test(userAgent),
      opera: /opera/.test(userAgent),
      msie: (/msie/.test(userAgent) && !/opera/.test(userAgent)) || !!window.ActiveXObject || "ActiveXObject" in window,
      firefox: /firefox/.test(userAgent),
      mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
    };
  }
})(jQuery);

//resize
(function($, window, undefined) {
  '$:nomunge';
  var elems = $([]),
    jq_resize = $.resize = $.extend($.resize, {}),
    timeout_id, str_setTimeout = 'setTimeout',
    str_resize = 'resize',
    str_data = str_resize + '-special-event',
    str_delay = 'delay',
    str_throttle = 'throttleWindow';
  jq_resize[str_delay] = 250;
  jq_resize[str_throttle] = true;
  $.event.special[str_resize] = {
    setup: function() {
      if (!jq_resize[str_throttle] && this[str_setTimeout]) {
        return false;
      }
      var elem = $(this);
      elems = elems.add(elem);
      $.data(this, str_data, {
        w: elem.width(),
        h: elem.height()
      });
      if (elems.length === 1) {
        loopy();
      }
    },
    teardown: function() {
      if (!jq_resize[str_throttle] && this[str_setTimeout]) {
        return false;
      }
      var elem = $(this);
      elems = elems.not(elem);
      elem.removeData(str_data);
      if (!elems.length) {
        clearTimeout(timeout_id);
      }
    },
    add: function(handleObj) {
      if (!jq_resize[str_throttle] && this[str_setTimeout]) {
        return false;
      }
      var old_handler;
      var new_handler = function(e, w, h) {
        var elem = $(this),
          data = $.data(this, str_data);
        data.w = w !== undefined ? w : elem.width();
        data.h = h !== undefined ? h : elem.height();
        old_handler.apply(this, arguments);
      };
      if ($.isFunction(handleObj)) {
        old_handler = handleObj;
        return new_handler;
      } else {
        old_handler = handleObj.handler;
        handleObj.handler = new_handler;
      }
    }
  };

  function loopy() {
    timeout_id = window[str_setTimeout](function() {
      elems.each(function() {
        var elem = $(this),
          width = elem.width(),
          height = elem.height(),
          data = $.data(this, str_data);
        if (width !== data.w || height !== data.h) {
          elem.trigger(str_resize, [data.w = width, data.h = height]);
        }
      });
      loopy();
    }, jq_resize[str_delay]);
  }
})(jQuery, this);