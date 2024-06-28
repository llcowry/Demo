// 全局变量
var rootPath = '/',
  disRccc = 0,
  prefixStr = document.domain.toLowerCase().replace('www.', '').replace('.', '') + '_',
  currentUrl = window.location.href,
  gotoUrl = encodeURIComponent(window.location.pathname + window.location.search),
  isIE = $.browser.msie,
  isIE8 = isIE && (9 > $.browser.version);

// 初始化全局常用处理对象
window.util = {
  // 跳转
  go: function(url) {
    window.location.href = url;
  },
  // 返回上一步
  back: function() {
    window.history.back();
  },
  // 确认对话框
  confirm: function(s) {
    var url = arguments[1] || currentUrl;
    if (confirm(s)) window.location.href = url;
  },
  // 刷新
  refresh: function() {
    window.location.reload();
  },
  // 判断对象是否为空
  isN: function(v) {
    switch (typeof v) {
      case 'undefined':
        return true;
      case 'string':
        if (v.trim().length === 0) return true;
        break;
      case 'boolean':
        if (!v) return true;
        break;
      case 'number':
        if (0 === v) return true;
        break;
      case 'object':
        if (null === v) return true;
        if (undefined !== v.length && v.length === 0) return true;
        for (var k in v) {
          k = null;
          return false;
        }
        return true;
    }
    return false;
  },
  // 遍历并生成对象
  tryThese: function() {
    for (var i = 0, len = arguments.length; i < len; i++) {
      try {
        return new ActiveXObject(arguments[i]);
      } catch (ignore) {}
    }
    return null;
  },
  // 获取url参数
  urlArg: function(s) {
    var url = arguments[1] || window.location.search;
    var reg = new RegExp('(^||&)' + s + '=([^&]*)(&|$)');
    var r = url.substring(1).match(reg);
    if (r != null) return unescape(decodeURI(r[2]));
    return '';
  },
  // 获取路径当前级
  getLastPath: function() {
    var p = '',
      pathName = window.location.pathname;
    if (pathName.indexOf('/') !== -1) {
      var s = pathName.split('/');
      if (s.length > 1) p = s[s.length - 1];
    }
    return p;
  },
  // 系统提示，s：消息文本，f：消息类型，t：展示时间
  showtip: function(s, f, t) {
    if (util.isN(t)) t = 3;
    top.util.msgtip.show(s, f, t);
  },
  msgtip: {
    _timer: null,
    show: function(msg, type, timeout, url) {
      if (!util.isN(url)) {
        var _cfn = $('.tab').lxlTabMgr().getSelectedIframe();
        window.setTimeout(function() {
          _cfn[0].src = decodeURIComponent(url);
        }, 1000);
      }
      var tip = '<div class="msgtip" id="msgtip">{s}</div>',
        s = '<span class="{type}">{msg}</span>',
        typeClass = {
          0: 'errmsg', // 错误
          1: 'msg', // 成功
          2: 'loading', // 加载中
          3: 'info' // 提醒
        };
      s = s.replace('{type}', typeClass[type]);
      s = s.replace('{msg}', msg);
      tip = tip.replace('{s}', s);
      var o = $('#msgtip');
      if (o.length > 0) {
        o.html(s);
      } else {
        $('body').append(tip);
        o = $('#msgtip');
      }
      o.css('left', (($(window).width() - o.width()) / 2) + 'px').animate({
        top: '5px'
      }, 'fast').show();
      timeout = (typeof(timeout) == 'undefined') ? 1000 : timeout * 1000;
      if (timeout) {
        window.clearInterval(util.msgtip._timer);
        util.msgtip._timer = window.setInterval(function() {
          util.msgtip.hide();
        }, timeout);
      } else {
        util.msgtip.hide();
      }
    },
    hide: function() {
      $('#msgtip').animate({
        top: '-22px'
      }, 'fast').fadeOut('fast');
      window.clearInterval(util.msgtip._timer);
    }
  },
  // alert对话框
  $alert: function() {
    if (arguments.length > 0) {
      var callback = (typeof(arguments[1]) == 'function') ? arguments[1] : function(b) {
        if (b) util.go(arguments[1]);
      };
      $.lxlDialog.alert(arguments[0], callback);
    }
  },
  // confirm对话框
  $confirm: function() {
    if (arguments.length > 0) {
      var callback = (typeof(arguments[1]) == 'function') ? arguments[1] : function(b) {
        if (b) util.go(arguments[1]);
      };
      var cancelcall = (typeof(arguments[2]) == 'function') ? arguments[2] : null;
      $.lxlDialog.confirm(arguments[0], callback, cancelcall);
    }
  },
  // tab切换特效
  toggleTab: function() {
    var o = arguments[0] || 'body';
    var head = arguments[1] || '.head-box';
    var con = arguments[2] || '.cnt-box .con';
    var ev = arguments[3] || 'click';
    var css = arguments[4] || 'hover';
    var tabItem = $(o + ' ' + head + ' ul li');
    $(o + ' ' + con).hide().eq(0).show();
    tabItem.bind(ev, function() {
      tabItem.removeClass(css);
      $(this).addClass(css).bind('selectstart', function() {
        return false;
      });
      $(o + ' ' + con).hide().eq($(this).index()).show();
    });
  },
  // 获取checkbox选择的值
  getCBoxVal: function() {
    var arr = '';
    $("input:checkbox[name='id']").each(function() {
      if (this.checked) arr += $(this).val() + ',';
    });
    if (arr.lastIndexOf(',') != -1) arr = arr.rdel(1);
    return arr;
  },
  // 加载列表右键菜单
  loadMenu: function(_items) {
    $("form[name='datalistfrm'] .table tr:gt(0)").bind('contextmenu', function(e) {
      // var _disabled = $(this).find(':checkbox').attr('disabled');
      // var _id = parseInt($(this).find(':checkbox').val());
      var _menu = $.lxlMenu({
        top: 100,
        left: 100,
        width: 120,
        items: _items
      });
      _menu.show({
        top: e.pageY,
        left: e.pageX
      });
      return false;
    });
  },
  // 添加tab
  addTab: function(o, tabid, title, url) {
    var tab = $('.tab');
    if (o.length > 0) {
      tabid = o.attr('tabid') || 'm' + new Date().getTime();
      title = o.attr('title') || o.text();
      url = o.attr('href');
    }
    tab = tab.lxlTabMgr();
    tab.addTabItem({
      tabid: tabid,
      text: title,
      url: url
    });
    tab = null;
  },
  // 移除tab
  removeTab: function(tabid) {
    var tab = $('.tab');
    tab = tab.lxlTabMgr();
    if (tabid) tab.removeTabItem(tabid);
    else tab.removeSelectedTabItem();
    tab = null;
  },
  // 获取当前tab的链接地址
  getTabUrl: function() {
    var tab = $('.tab'),
      s = '';
    tab = tab.lxlTabMgr();
    s = tab.getSelectedIframe().attr('src');
    tab = null;
    return s;
  },
  // 设置带tabid的链接转为tab触发链接
  setTabLink: function() {
    $('body').on('click', 'a[tabid]', function() {
      top.util.addTab($(this));
      return false;
    });
  },
  // 处理返回的提示
  getRV: function(m) {
    switch (parseInt(m.status)) {
      case -1: // 警告提示，并直接跳转到指定地址
        util.showtip(m.msg, 0, 2);
        window.setTimeout(function() {
          top.location.href = m.url;
        }, 1000);
        return;
      case 0: // 错误提示
        var validForm = $('.validform');
        if (validForm.length > 0) validForm.attr('status', 'n'); // 有表单时，增加一个值为n的状态属性
        util.showtip(m.msg, 0, 2);
        break;
      case 1: // 成功提示
        util.showtip(m.msg, 1, 2);
        break;
      case 2: // 显示1秒加载中的提示
        util.showtip(m.msg, 2, 1);
        break;
    }
    // 带上此属性表示：自动刷新表格并关闭对话框
    if (m.isDialog && m.isDialog == 1) {
      parent.$('.btn-reload').trigger('click');
      parent.$.lxlDialog.close();
    }
    // 带上此属性表示：刷新网格
    if (m.reloadGrid && m.reloadGrid == 1) {
      $('#gridTable').trigger('reloadGrid');
    }
    // 带上此属性表示：1秒后跳转到指定地址
    if (!util.isN(m.url)) {
      window.setTimeout(function() {
        util.go(m.url);
      }, 1000);
    }
  },
  // 获取当前选择行的索引值
  getGridRowIndex: function(jgrid) {
    return $(jgrid).jqGrid('getGridParam', 'selrow');
  },
  // 获取当前选择行的ID
  getGridRowId: function(jgrid) {
    return $(jgrid).jqGrid('getRowData', util.getGridRowIndex(jgrid))['id'];
  },
  // 根据索引获取数据
  getGridValue: function(jgrid, i, code) {
    return $(jgrid).jqGrid('getRowData', i)[code];
  },
  // 获取所有选择行的数据
  getGridRowValue: function(jgrid, code) {
    var keyVal = '';
    var selectedRowIds = $(jgrid).jqGrid('getGridParam', 'selarrrow');
    if (selectedRowIds !== '') {
      var len = selectedRowIds.length;
      for (var i = 0; i < len; i++) {
        var rowData = $(jgrid).jqGrid('getRowData', selectedRowIds[i]);
        keyVal += rowData[code] + ',';
      }
      keyVal = keyVal.substr(0, keyVal.length - 1);
    } else {
      keyVal = util.getGridValue(jgrid, util.getGridRowIndex(jgrid), code);
    }
    return keyVal;
  },
  // 表单验证
  // 给所有带pattern属性的控件进行验证，pattern的值为正则表达式
  // 验证控件名称默认为title，缺失时为placeholder或者name
  chkForm: function() {
    var err = 0;
    var ft = (arguments.length > 0) ? arguments[0] + ' ' : '';
    $(ft + 'input:hidden[pattern], ' + ft + ':text[pattern], ' + ft + ':password[pattern], ' + ft + 'textarea[pattern], ' + ft + 'select[pattern]').each(function() {
      var obj = $(this);
      var pattern = obj.attr('pattern');
      if (!util.isN(pattern)) {
        var oname = obj.prop('title') || obj.prop('placeholder') || obj.prop('name');
        if (obj.is('select')) {
          var s = obj.val();
          if (s == '0' || util.isN(s)) {
            obj.focus();
            util.showtip('请选择' + oname + '！', 0);
            err += 1;
            return false;
          }
        } else {
          if (obj.val().trim().search(new RegExp(pattern, 'ig')) < 0) {
            obj.focus().select();
            util.showtip(oname + '的格式不符合要求！', 0);
            err += 1;
            return false;
          }
        }
      }
    });
    if (err > 0) return false;
    return true;
  },
  // 初始化处理
  loadInit: function() {
    // 全局对象处理
    $('a[href="#"]').each(function() {
      $(this).attr('href', 'javascript:;');
    });
    if (isIE8) $('a').attr('hidefocus', 'true');
    // 设置带tabid的链接转为tab触发链接
    util.setTabLink();
    $('img[alt="#"]').each(function() {
      $(this).attr('alt', '');
    });
    $('img#vcodeimg').click(function() {
      var o = this,
        rnd = util.urlArg('rnd', o.src);
      if (rnd === '') {
        o.src += '?rnd=' + Math.random();
      } else {
        o.src = o.src.replace(rnd, Math.random());
      }
    }).attr('title', '\u70b9\u51fb\u6362\u4e00\u4e2a');
    // 表单对象特效
    $('.button').hoverClass('button-hover').mousedown(function() {
      $(this).addClass('button-active');
    }).mouseup(function() {
      $(this).removeClass('button-active');
    });
    if (!isIE) {
      $('.input, .search, select').hoverClass('input-hover');
    } else {
      $('.input, .search').hoverClass('input-hover');
    }
    $('textarea').hover(function() {
      if ($(this).attr('class') != 'ke-edit-textarea') $(this).addClass('textarea-hover');
    }, function() {
      if ($(this).attr('class') != 'ke-edit-textarea') $(this).removeClass('textarea-hover');
    });
    // 设置搜索框事件
    var kw = $('.searchfrm').find('input, select'),
      btnSearch = $('.btn-search');
    if (kw.length > 0 && btnSearch.length > 0) {
      kw.keypress(function(e) {
        if (e.keyCode == 13) btnSearch.trigger('click');
      });
    }
    // 分页对象事件
    $('.js-pagebar').each(function() {
      var pagebar = $(this);
      var dv = pagebar.data('val');
      pagebar.keydown(function(e) {
        e = e || event || window.parentWindow.event;
        var f = e.charCode || e.keyCode || e.which;
        if (f == 13) {
          var s = pagebar.data('url'),
            n = parseInt(pagebar.val());
          if (isNaN(n)) n = dv;
          s = s.replace(/\{p\}/g, n);
          setTimeout(function() {
            util.go(s);
          }, 1);
        }
      }).keyup(function() {
        if (!(new RegExp(/^\d+$/).test(pagebar.val()))) pagebar.val(dv);
      });
    });
    // 加载box插件
    $('.js-box').lxlBox({
      headerHeight: $('.js-box').data('header-height') || null
    });
    // 加载box插件
    $('.js-tabs').lxlTabs({
      currentIndex: $('.js-tabs').data('index') || 0,
      height: $('.js-tabs').data('height') || '100%',
      nompb: true
    });
    // 全选框事件
    $('.js-selectall').click(function() {
      var o = $("input:checkbox[name='id']");
      if (this.checked) o.prop('checked', true);
      else o.prop('checked', false);
    });
    // 批量操作事件
    $('.js-bulkaction').change(function() {
      var o = this;
      var url = o.options[o.selectedIndex].value;
      if (url === '') {
        o.options[0].selected = true;
        return false;
      }
      var id = util.getCBoxVal();
      if (id === '') {
        util.showtip('未选中任何记录！', 0);
        o.options[0].selected = true;
        return false;
      }
      if (o.name.toLowerCase().indexOf('bulkmove') != -1) {
        url = $(this).data('url') + escape(id) + '?classid=' + url;
      } else {
        url += escape(id);
      }
      util.$confirm('你确定执行此项操作吗？', function() {
        $.getJSON(url, function(m) {
          util.getRV(m);
        });
      }, function() {
        o.options[0].selected = true;
      });
      return false;
    });
    // 收缩表格列表
    $('.js-shrinklist').click(function() {
      var o = $(this),
        id = o.data('id');
      if (o.hasClass('ico-collapsable')) {
        o.removeClass('ico-collapsable').addClass('ico-expandable');
      } else {
        o.removeClass('ico-expandable').addClass('ico-collapsable');
      }
      $('.childlist-' + id).toggleClass('hide');
    });
    // 退出按钮事件
    $('.btn-logout').click(function() {
      var url = $(this).attr('href');
      util.$confirm('您确定要退出吗？', function() {
        $.post(url, function(m) {
          util.getRV(m);
        }, 'json');
      });
      return false;
    });
    // 刷新按钮事件
    $('.btn-refresh').click(function() {
      util.refresh();
    });
    // 离开按钮事件
    $('.btn-leave').click(function() {
      top.util.removeTab();
      return false;
    });
    // 返回按钮事件
    $('.btn-back').click(function() {
      var url = $(this).attr('href');
      if (url && url != 'javascript:;') {
        util.go(url);
      } else {
        util.back();
      }
    });
    // 添加按钮事件
    $('.btn-add').click(function() {
      var url = $(this).attr('href');
      $.get(url, function(m) {
        if (m.toString().indexOf('!DOCTYPE') != -1) {
          util.go(url);
        } else {
          util.getRV(m);
        }
      });
      return false;
    });
    // 清空, 发布按钮事件
    $('.btn-clear, .btn-build').off('click').click(function() {
      var url = $(this).attr('href'),
        msg = $(this).attr('data-msg') || '您确定要执行此项操作吗？';
      util.$confirm(msg, function() {
        $.getJSON(url, function(m) {
          util.getRV(m);
        });
      });
      return false;
    });
    // 导出数据事件
    $('.btn-export').click(function() {
      var url = $(this).attr('href'),
        data = {};
      $.post(url, function(m) {
        util.showtip(m.msg, m.status, 2);
        if (!util.isN(m.url)) {
          setTimeout(function() {
            $('.searchfrm').find('select, input:not(.button)').each(function() {
              data[$(this).attr('name')] = $(this).val();
            });
            util.go(m.url + '?queryJson=' + JSON.stringify(data));
          }, 100);
        }
      }, 'json');
      return false;
    });
    var gridTable = $('#gridTable');
    if (gridTable.length > 0) {
      // 刷新网格事件
      $('.btn-reload').click(function() {
        gridTable.trigger('reloadGrid');
      });
      // 搜索按钮事件
      $('.btn-search').click(function() {
        if (util.chkForm('.searchfrm')) {
          var data = {};
          $('.searchfrm').find('select, input:not(.button)').each(function() {
            data[$(this).attr('name')] = $(this).val();
          });
          gridTable.jqGrid('setGridParam', {
            postData: {
              queryJson: JSON.stringify(data)
            },
            page: 1
          }).trigger('reloadGrid');
        }
      });
      // 搜索今日数据
      $('.btn-search-today').click(function() {
        var o = $(this),
          date1 = $('#' + o.attr('data-d1')),
          date2 = $('#' + o.attr('data-d2'));
        if (date1.length > 0) {
          date1.val(new Date().format('yyyy-MM-dd 00:00:00'));
        }
        if (date2.length > 0) {
          date2.val(new Date().format('yyyy-MM-dd hh:mm:ss'));
        }
        $('.btn-search').trigger('click');
      });
      // 搜索昨日数据
      $('.btn-search-yesterday').click(function() {
        var o = $(this),
          d = new Date(),
          date1 = $('#' + o.attr('data-d1')),
          date2 = $('#' + o.attr('data-d2'));
        if (date1.length > 0) {
          // if ((d.getDate() - 1) === 0) {
          //   var date = new Date(d.getFullYear(), d.getMonth(), 0);
          //   date1.val(new Date(d.getFullYear() + '-' + d.getMonth() + '-' + date.getDate()).format('yyyy-MM-dd 00:00:00'));
          // } else {
          //   date1.val(new Date(d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate() - 1)).format('yyyy-MM-dd 00:00:00'));
          // }
          date1.val(new Date(new Date(d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate()).getTime() / 1000 - 24 * 3600).format('yyyy-MM-dd hh:mm:ss'));
        }
        if (date2.length > 0) {
          // date2.val(new Date(d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()).format('yyyy-MM-dd 00:00:00'));
          date2.val(new Date(new Date(d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate()).getTime() / 1000 - 1).format('yyyy-MM-dd hh:mm:ss'));
        }
        $('.btn-search').trigger('click');
      });
      // 搜索指定对象
      $('body').on('click', '.btn-search-this', function() {
        var o = $(this),
          keyVal = o.data('val'),
          searchObj = $('#' + o.attr('data-obj'));
        if (searchObj.length > 0) {
          searchObj.val(keyVal);
        }
        $('.btn-search').trigger('click');
      });
      // 顶部编辑按钮事件
      $('body').on('click', '.btn-edit', function() {
        var id = util.getGridRowId('#gridTable');
        if (util.isN(id)) {
          util.showtip('未选中任何记录！', 0);
        } else if (id.split(',').length > 1) {
          util.showtip('抱歉，一次只能选择一条记录！', 0);
        } else {
          var url = $(this).attr('href') + id;
          $.get(url, function(m) {
            if (m.toString().indexOf('!DOCTYPE') != -1) {
              util.go(url);
            } else {
              util.getRV(m);
            }
          });
        }
        return false;
      });
      // 编辑按钮事件
      $('body').on('click', '.btn-edit2', function() {
        var url = $(this).attr('href');
        $.get(url, function(m) {
          if (m.toString().indexOf('!DOCTYPE') != -1) {
            util.go(url);
          } else {
            util.getRV(m);
          }
        });
        return false;
      });
      // 删除按钮事件
      $('body').on('click', '.btn-delete', function() {
        var id = $(this).data('id') || util.getGridRowValue('#gridTable', 'id');
        if (util.isN(id)) {
          util.showtip('未选中任何记录！', 0);
        } else {
          var url = $(this).attr('href');
          var msg = $(this).data('msg') || '您确定要删除这条记录吗？';
          util.$confirm(msg, function() {
            if (('' + id).indexOf(',') != -1) {
              $.post(url, {
                id: id
              }, function(m) {
                util.getRV(m);
              }, 'json');
            } else {
              $.getJSON(url + id, function(m) {
                util.getRV(m);
              });
            }
          });
        }
        return false;
      });
      // 批量操作按钮事件
      $('body').on('click', '.btn-batch', function() {
        var url = $(this).attr('href');
        $.getJSON(url, function(m) {
          util.getRV(m);
        });
        return false;
      });
      // 确认按钮事件
      $('body').on('click', '.btn-confirm', function() {
        var url = $(this).attr('href'),
          msg = $(this).data('msg') || '您确定要执行此项操作吗？';
        util.$confirm(msg, function() {
          $.getJSON(url, function(m) {
            util.getRV(m);
          });
        }, '提示');
        return false;
      });
      // 排序按钮事件
      $('body').on('click', '.btn-sort', function() {
        var title = $(this).data('title') || '排序';
        var msg = $(this).data('msg') || '请输入排序编号：';
        var curVal = $(this).text();
        var url = $(this).attr('href');
        $.lxlDialog.prompt(title, msg, curVal, function(b, n) {
          if (b && n !== '') {
            url += '?sortid=' + n;
            $.getJSON(url, function(m) {
              util.getRV(m);
            });
          }
        });
        return false;
      });
      // 提示输入按钮事件
      $('body').on('click', '.btn-prompt', function() {
        var title = $(this).data('title') || '提示',
          msg = $(this).data('msg') || '请输入：',
          curVal = $(this).text(),
          url = $(this).attr('href');
        $.lxlDialog.prompt(title, msg, curVal, function(b, n) {
          if (b && n !== '') {
            url += '?num=' + n;
            $.getJSON(url, function(m) {
              util.getRV(m);
            });
          }
        });
        return false;
      });
      // 弹窗展示
      $('.btn-iframe').off('click');
      $('body').on('click', '.btn-iframe, .btn-add-iframe, .btn-edit-iframe', function() {
        var o = $(this),
          url = o.attr('href'),
          hasSubmitBtn = o.data('hassb'),
          hasBottom = o.data('hasbtm'),
          isClose = o.data('close'),
          isChild = o.data('child'),
          isEdit = o.data('edit'),
          btns = [{
            text: ' 提交 ',
            type: 'submit',
            onclick: function(g, o) {
              var frm = g.iframe[0].contentWindow.$('.validform'),
                status = frm.attr('status');
              if (status == 'y') {
                o.prop('disabled', true).addClass('button-active');
              } else {
                frm.trigger('submit');
              }
              if (isClose) {
                g.close();
              }
            }
          }, {
            text: ' 关闭 ',
            onclick: function(g) {
              g.close();
            }
          }],
          opts = null;
        if (isEdit == '1') {
          var id = util.getGridRowId('#gridTable');
          if (util.isN(id)) {
            util.showtip('未选中任何记录！', 0);
            return false;
          } else if (id.split(',').length > 1) {
            util.showtip('抱歉，一次只能选择一条记录！', 0);
            return false;
          } else {
            url += id;
          }
        }
        if (typeof hasSubmitBtn == 'undefined') hasSubmitBtn = 1;
        if (hasSubmitBtn == '0') btns.splice(0, 1);
        opts = {
          type: 'iframe',
          url: url,
          title: o.data('title') || o.text(),
          width: o.data('width') || 600,
          height: o.data('height') || 300,
          iframeStyle: 'overflow: hidden;',
          buttons: btns
        };
        if (typeof hasBottom == 'undefined') hasBottom = 1;
        if (hasBottom == '0') {
          delete opts.buttons;
        }
        $.get(url, function(m) {
          if (isChild == '1') {
            top.$.lxlDialog(opts);
          } else if (m.toString().indexOf('!DOCTYPE') != -1) {
            $.lxlDialog(opts);
          } else {
            util.getRV(m);
          }
        });
        return false;
      });
    }
    // 表单验证
    var validForm = $('.validform');
    if (validForm.length > 0) {
      var submitBtn = validForm.find(':submit');
      validForm.Validform({
        tiptype: 3,
        ignoreHidden: true, //隐藏域不验证
        callback: function(f) {
          $(f).ajaxSubmit({
            url: validForm.attr('action'),
            type: 'post',
            dataType: 'json',
            timeout: 60000,
            async: false,
            beforeSubmit: function() {
              submitBtn.prop('disabled', true).addClass('button-active');
            },
            success: function(m) {
              window.setTimeout(function() {
                submitBtn.prop('disabled', false).removeClass('button-active');
              }, 1000);
              validForm.attr('status', 'y');
              util.getRV(m);
            },
            error: function(xhr, status, err) {
              console.log(status + ': ' + err);
            }
          });
          return false;
        }
      });
    }
  }
};

// 是否禁用右键,菜单,复制等功能
disRccc && (document.onmousedown = function(a) {
  if (window.Event) {
    if (2 == a.which || 3 == a.which) return !1;
  } else if (2 == window.event.button || 3 == window.event.button) {
    return window.event.cancelBubble = !0, window.event.returnValue = !1, !1;
  }
}, document.onkeydown = function(a) {
  if (window.Event) {
    if (67 == a.which && a.ctrlKey) return !1;
  } else if (67 == window.event.keyCode && window.event.ctrlKey) {
    return window.event.cancelBubble = !0, window.event.returnValue = !1, !1;
  }
}, document.oncontextmenu = function() {
  return window.event.cancelBubble = !0, window.event.returnValue = !1, !1;
}, document.oncopy = function() {
  return !1;
});

// 屏蔽错误
// window.onerror = function () { return true; };

// 默认加载
$(function() {
  util.loadInit();
  // IE load textarea resizer
  if (isIE) {
    $.getScript(rootPath + 'scripts/plugins/jquery.textarearesizer.js', function() {
      $('textarea.allowresize:not(.processed)').TextAreaResizer();
    });
  }
});
