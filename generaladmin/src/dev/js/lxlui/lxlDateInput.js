//lxlDateInput
(function($) {
  $.fn.lxlDateInput = function() {
    return $.lxlui.run.call(this, "lxlDateInput", arguments);
  };
  $.fn.lxlDateInputMgr = function() {
    return $.lxlui.run.call(this, "lxlDateInputMgr", arguments);
  };
  $.lxlDefaults.DateInput = {
    format: "yyyy-MM-dd hh:mm:ss", // 日期格式化
    showTime: false, // 是否显示时间
    initValue: null, // 初始化值
    absolute: true, // 是否绝对定位
    cancelable: true, //启用清空
    readonly: false, //只读
    disabled: false, //不可用
    onChangeDate: false // 当日期改变时执行的方法
  };
  $.lxlDefaults.DateInputString = {
    dayMessage: ["日", "一", "二", "三", "四", "五", "六"],
    monthMessage: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    todayMessage: "选择今天",
    closeMessage: "关闭"
  };
  $.lxlMethos.DateInput = {};
  $.lxlui.controls.DateInput = function(element, options) {
    $.lxlui.controls.DateInput.base.constructor.call(this, element, options);
  };
  $.lxlui.controls.DateInput.lxlExtend($.lxlui.controls.Input, {
    __getType: function() {
      return 'DateInput';
    },
    __idPrev: function() {
      return 'DateInput';
    },
    _extendMethods: function() {
      return $.lxlMethos.DateInput;
    },
    _render: function() {
      var g = this,
        p = this.options;
      if (!p.showTime && p.format.indexOf(" hh:mm:ss")) p.format = p.format.replace(" hh:mm:ss", "");
      if (this.element.tagName.toLowerCase() != "input" || this.element.type != "text") return;
      g.inputText = $(this.element);
      if (!g.inputText.hasClass("dateinput-text-field")) g.inputText.addClass("dateinput-text-field");
      g.link = $('<div class="dateinput-trigger"><div class="dateinput-trigger-icon"></div></div>');
      g.text = g.inputText.wrap('<div class="dateinput-text"></div>').parent();
      if (p.showTime) g.text.width(g.text.width() + 35);
      g.text.append(g.link);
      g.textwrapper = g.text.wrap('<div class="dateinput-wrapper"></div>').parent();
      g.textwrapper.width(g.text.width());
      if (p.disabled) {
        g.inputText.attr("disabled", "disabled");
        g.text.addClass('dateinput-text-disabled');
      }
      if (p.readonly) {
        g.inputText.attr("readonly", "readonly");
        g.text.addClass('dateinput-text-readonly');
      }
      var dateeditorHTML = "";
      dateeditorHTML += "<div class='dateinput' style='display:none'>";
      dateeditorHTML += "    <div class='dateinput-header'>";
      dateeditorHTML += "        <div class='dateinput-header-btn dateinput-header-prevyear'><span></span></div>";
      dateeditorHTML += "        <div class='dateinput-header-btn dateinput-header-prevmonth'><span></span></div>";
      dateeditorHTML += "        <div class='dateinput-header-text'><a  class='dateinput-header-year'></a> <a class='dateinput-header-month'></a></div>";
      dateeditorHTML += "        <div class='dateinput-header-btn dateinput-header-nextmonth'><span></span></div>";
      dateeditorHTML += "        <div class='dateinput-header-btn dateinput-header-nextyear'><span></span></div>";
      dateeditorHTML += "    </div>";
      dateeditorHTML += "    <div class='dateinput-body'>";
      dateeditorHTML += "        <table cellpadding='0' cellspacing='0' border='0' class='dateinput-calendar'>";
      dateeditorHTML += "            <thead>";
      dateeditorHTML += "                <tr><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td></tr>";
      dateeditorHTML += "            </thead>";
      dateeditorHTML += "            <tbody>";
      dateeditorHTML += "                <tr class='dateinput-first'><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td></tr><tr><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td></tr><tr><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td></tr><tr><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td></tr><tr><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td></tr><tr><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td></tr>";
      dateeditorHTML += "            </tbody>";
      dateeditorHTML += "        </table>";
      dateeditorHTML += "        <ul class='dateinput-monthselector'><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>";
      dateeditorHTML += "        <ul class='dateinput-yearselector'><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>";
      dateeditorHTML += "        <ul class='dateinput-hourselector'><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>";
      dateeditorHTML += "        <ul class='dateinput-minuteselector'><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>";
      dateeditorHTML += "    </div>";
      dateeditorHTML += "    <div class='dateinput-toolbar'>";
      dateeditorHTML += "        <div class='dateinput-time'></div>";
      dateeditorHTML += "        <div class='dateinput-btn'><a href='javascript:void(0)' class='dateinput-btn-today'></a> | <a href='javascript:void(0)' class='dateinput-btn-close'></a></div>";
      dateeditorHTML += "        <div class='dateinput-clear'></div>";
      dateeditorHTML += "    </div>";
      dateeditorHTML += "</div>";
      g.dateeditor = $(dateeditorHTML);
      if (p.absolute) g.dateeditor.appendTo('body').addClass("dateinput-absolute");
      else g.textwrapper.append(g.dateeditor);
      g.header = $(".dateinput-header", g.dateeditor);
      g.body = $(".dateinput-body", g.dateeditor);
      g.toolbar = $(".dateinput-toolbar", g.dateeditor);
      g.body.thead = $("thead", g.body);
      g.body.tbody = $("tbody", g.body);
      g.body.monthselector = $(".dateinput-monthselector", g.body);
      g.body.yearselector = $(".dateinput-yearselector", g.body);
      g.body.hourselector = $(".dateinput-hourselector", g.body);
      g.body.minuteselector = $(".dateinput-minuteselector", g.body);
      g.toolbar.time = $(".dateinput-time", g.toolbar);
      g.toolbar.time.hour = $("<a></a>");
      g.toolbar.time.minute = $("<a></a>");
      g.buttons = {
        btnPrevYear: $(".dateinput-header-prevyear", g.header),
        btnNextYear: $(".dateinput-header-nextyear", g.header),
        btnPrevMonth: $(".dateinput-header-prevmonth", g.header),
        btnNextMonth: $(".dateinput-header-nextmonth", g.header),
        btnYear: $(".dateinput-header-year", g.header),
        btnMonth: $(".dateinput-header-month", g.header),
        btnToday: $(".dateinput-btn-today", g.toolbar),
        btnClose: $(".dateinput-btn-close", g.toolbar)
      };
      var nowDate = new Date();
      g.now = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        day: nowDate.getDay(),
        date: nowDate.getDate(),
        hour: nowDate.getHours(),
        minute: nowDate.getMinutes()
      };
      g.currentDate = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        day: nowDate.getDay(),
        date: nowDate.getDate(),
        hour: nowDate.getHours(),
        minute: nowDate.getMinutes()
      };
      g.selectedDate = null;
      g.usedDate = null;
      //设置周日至周六
      $("td", g.body.thead).each(function(i, td) {
        $(td).html(p.dayMessage[i]);
      });
      //设置一月到十一二月
      $("li", g.body.monthselector).each(function(i, li) {
        $(li).html(p.monthMessage[i]);
      });
      //设置时间
      if (p.showTime) {
        g.toolbar.time.show();
        g.toolbar.time.append(g.toolbar.time.hour).append(":").append(g.toolbar.time.minute);
        $("li", g.body.hourselector).each(function(i) {
          var str = i;
          if (i < 10) str = "0" + i.toString();
          $(this).html(str);
        });
        $("li", g.body.minuteselector).each(function(i) {
          var str = i;
          if (i < 10) str = "0" + i.toString();
          $(this).html(str);
        });
      }
      //设置主体
      g.bulidContent();
      //选择年份
      g.buttons.btnYear.bind("selectstart", function() {
        return false;
      }).click(function() {
        if (!g.body.yearselector.is(":visible")) {
          $("li", g.body.yearselector).each(function(i) {
            var currentYear = g.currentDate.year + (i - 4);
            if (currentYear == g.currentDate.year) $(this).addClass("dateinput-selected");
            else $(this).removeClass("dateinput-selected");
            $(this).html(currentYear);
          });
        }
        g.body.yearselector.slideToggle();
      });
      g.body.yearselector.hover(null, function() {
        $(this).slideUp();
      });
      $("li", g.body.yearselector).click(function() {
        g.currentDate.year = parseInt($(this).html());
        g.body.yearselector.slideToggle();
        g.bulidContent();
      });
      //选择月份
      g.buttons.btnMonth.bind("selectstart", function() {
        return false;
      }).click(function() {
        $("li", g.body.monthselector).each(function(i) {
          if (g.currentDate.month == i + 1) $(this).addClass("dateinput-selected");
          else $(this).removeClass("dateinput-selected");
        });
        g.body.monthselector.slideToggle();
      });
      g.body.monthselector.hover(null, function() {
        $(this).slideUp("fast");
      });
      $("li", g.body.monthselector).click(function() {
        var index = $("li", g.body.monthselector).index(this);
        g.currentDate.month = index + 1;
        g.body.monthselector.slideToggle();
        g.bulidContent();
      });
      //选择小时
      g.toolbar.time.hour.click(function() {
        $("li", g.body.hourselector).each(function(i) {
          if (g.currentDate.hour == i) $(this).addClass("dateinput-selected");
          else $(this).removeClass("dateinput-selected");
        });
        g.body.hourselector.slideToggle();
      });
      g.body.hourselector.hover(null, function() {
        $(this).slideUp("fast");
      });
      $("li", g.body.hourselector).click(function() {
        var index = $("li", g.body.hourselector).index(this);
        g.currentDate.hour = index;
        g.body.hourselector.slideToggle();
        g.bulidContent();
        g.showDate();
      });
      //选择分钟
      g.toolbar.time.minute.click(function() {
        $("li", g.body.minuteselector).each(function(i) {
          if (g.currentDate.minute == i) $(this).addClass("dateinput-selected");
          else $(this).removeClass("dateinput-selected");
        });
        g.body.minuteselector.slideToggle("fast", function() {
          var index = $("li", this).index($('li.dateinput-selected', this));
          if (index > 29) {
            var offSet = ($('li.dateinput-selected', this).offset().top - $(this).offset().top);
            $(this).animate({
              scrollTop: offSet
            });
          }
        });
      });
      g.body.minuteselector.hover(null, function() {
        $(this).slideUp("fast");
      });
      $("li", g.body.minuteselector).click(function() {
        var index = $("li", g.body.minuteselector).index(this);
        g.currentDate.minute = index;
        g.body.minuteselector.slideToggle("fast");
        g.bulidContent();
        g.showDate();
      });
      //日期主体事件
      $("td", g.body.tbody).hover(function() {
        if ($(this).hasClass("dateinput-today")) return;
        $(this).addClass("dateinput-over");
      }, function() {
        $(this).removeClass("dateinput-over");
      }).click(function() {
        $(".dateinput-selected", g.body.tbody).removeClass("dateinput-selected");
        if (!$(this).hasClass("dateinput-today")) $(this).addClass("dateinput-selected");
        g.currentDate.date = parseInt($(this).html());
        g.currentDate.day = new Date(g.currentDate.year, g.currentDate.month - 1, 1).getDay();
        if ($(this).hasClass("dateinput-out")) {
          if ($("tr", g.body.tbody).index($(this).parent()) === 0) {
            if (--g.currentDate.month === 0) {
              g.currentDate.month = 12;
              g.currentDate.year--;
            }
          } else {
            if (++g.currentDate.month == 13) {
              g.currentDate.month = 1;
              g.currentDate.year++;
            }
          }
        }
        g.selectedDate = {
          year: g.currentDate.year,
          month: g.currentDate.month,
          date: g.currentDate.date
        };
        g.showDate();
        g.toggleDateInput(true);
      });
      //设置按钮
      g.buttons.btnPrevYear.hoverClass("dateinput-header-prevyear-over").bind("selectstart", function() {
        return false;
      });
      g.buttons.btnNextYear.hoverClass("dateinput-header-nextyear-over").bind("selectstart", function() {
        return false;
      });
      g.buttons.btnPrevMonth.hoverClass("dateinput-header-prevmonth-over").bind("selectstart", function() {
        return false;
      });
      g.buttons.btnNextMonth.hoverClass("dateinput-header-nextmonth-over").bind("selectstart", function() {
        return false;
      });
      g.buttons.btnPrevYear.click(function() {
        g.currentDate.year--;
        g.bulidContent();
      });
      g.buttons.btnNextYear.click(function() {
        g.currentDate.year++;
        g.bulidContent();
      });
      g.buttons.btnPrevMonth.click(function() {
        if (--g.currentDate.month === 0) {
          g.currentDate.month = 12;
          g.currentDate.year--;
        }
        g.bulidContent();
      });
      g.buttons.btnNextMonth.click(function() {
        if (++g.currentDate.month == 13) {
          g.currentDate.month = 1;
          g.currentDate.year++;
        }
        g.bulidContent();
      });
      g.buttons.btnToday.html(p.todayMessage).click(function() {
        g.currentDate = {
          year: g.now.year,
          month: g.now.month,
          day: g.now.day,
          date: g.now.date
        };
        g.selectedDate = {
          year: g.now.year,
          month: g.now.month,
          day: g.now.day,
          date: g.now.date
        };
        g.showDate();
        g.toggleDateInput(true);
      });
      g.buttons.btnClose.html(p.closeMessage).click(function() {
        g.toggleDateInput(true);
      });
      //触发按钮
      g.link.click(function() {
        g.toggleDateInput(g.dateeditor.is(":visible"));
      });
      //文本框
      if (p.initValue) g.inputText.val(p.initValue);
      if (g.inputText.val() !== '') g.onTextChange();
      g.inputText.width(g.text.width() - 25);
      g.inputText.change(function() {
        g.onTextChange();
      }).click(function() {
        g.toggleDateInput(false);
      }).focus(function() {
        g.toggleDateInput(false);
      });
      //鼠标经过隐藏
      g.dateeditor.hover(null, function() {
        if (g.dateeditor.is(":visible") && !g.toggling) g.toggleDateInput(true);
      });
      g.set(p);
    },
    destroy: function() {
      if (this.textwrapper) this.textwrapper.remove();
      if (this.dateeditor) this.dateeditor.remove();
      this.options = null;
      $.lxlui.remove(this);
    },
    bulidContent: function() {
      var g = this,
        p = this.options;
      var thismonthFirstDay = new Date(g.currentDate.year, g.currentDate.month - 1, 1).getDay();
      var nextMonth = g.currentDate.month;
      var nextYear = g.currentDate.year;
      if (++nextMonth == 13) {
        nextMonth = 1;
        nextYear++;
      }
      var monthDayNum = new Date(nextYear, nextMonth - 1, 0).getDate();
      var prevMonthDayNum = new Date(g.currentDate.year, g.currentDate.month - 1, 0).getDate();
      g.buttons.btnMonth.html(p.monthMessage[g.currentDate.month - 1]);
      g.buttons.btnYear.html(g.currentDate.year + '年');
      g.toolbar.time.hour.html(g.currentDate.hour);
      g.toolbar.time.minute.html(g.currentDate.minute);
      if (g.toolbar.time.hour.html().length == 1) g.toolbar.time.hour.html("0" + g.toolbar.time.hour.html());
      if (g.toolbar.time.minute.html().length == 1) g.toolbar.time.minute.html("0" + g.toolbar.time.minute.html());
      $("td", this.body.tbody).each(function() {
        this.className = "";
      });
      $("tr", this.body.tbody).each(function(i, tr) {
        $("td", tr).each(function(j, td) {
          var id = i * 7 + (j - thismonthFirstDay);
          var showDay = id + 1;
          if (g.selectedDate && g.currentDate.year == g.selectedDate.year && g.currentDate.month == g.selectedDate.month && id + 1 == g.selectedDate.date) {
            if (j === 0 || j == 6) $(td).addClass("dateinput-holiday");
            $(td).addClass("dateinput-selected");
            $(td).siblings().removeClass("dateinput-selected");
          } else if (g.currentDate.year == g.now.year && g.currentDate.month == g.now.month && id + 1 == g.now.date) {
            if (j === 0 || j == 6) $(td).addClass("dateinput-holiday");
            $(td).addClass("dateinput-today");
          } else if (id < 0) {
            showDay = prevMonthDayNum + showDay;
            $(td).addClass("dateinput-out").removeClass("dateinput-selected");
          } else if (id > monthDayNum - 1) {
            showDay = showDay - monthDayNum;
            $(td).addClass("dateinput-out").removeClass("dateinput-selected");
          } else if (j === 0 || j == 6) {
            $(td).addClass("dateinput-holiday").removeClass("dateinput-selected");
          } else {
            td.className = "";
          }
          $(td).html(showDay);
        });
      });
    },
    updateSelectBoxPosition: function() {
      var g = this,
        p = this.options;
      if (p.absolute) {
        var contentHeight = $(document).height();
        if (Number(g.text.offset().top + 1 + g.text.outerHeight() + g.dateeditor.height()) > contentHeight && contentHeight > Number(g.dateeditor.height() + 1)) {
          g.dateeditor.css({
            left: g.text.offset().left,
            top: g.text.offset().top - 1 - g.dateeditor.height()
          });
        } else {
          g.dateeditor.css({
            left: g.text.offset().left,
            top: g.text.offset().top + 1 + g.text.outerHeight()
          });
        }
      } else {
        if (g.text.offset().top + 4 > g.dateeditor.height() && g.text.offset().top + g.dateeditor.height() + textHeight + 4 - $(window).scrollTop() > $(window).height()) {
          g.dateeditor.css("marginTop", -1 * (g.dateeditor.height() + textHeight + 5));
          g.showOnTop = true;
        } else {
          g.showOnTop = false;
        }
      }
    },
    toggleDateInput: function(isHide) {
      var g = this,
        p = this.options;
      g.toggling = true;
      if (isHide) {
        g.dateeditor.fadeOut('fast', function() {
          g.toggling = false;
        });
      } else {
        g.updateSelectBoxPosition();
        g.dateeditor.fadeIn('fast', function() {
          g.toggling = false;
        });
      }
    },
    showDate: function() {
      var g = this,
        p = this.options;
      if (!g.currentDate) return;
      g.currentDate.hour = parseInt(g.toolbar.time.hour.html(), 10);
      g.currentDate.minute = parseInt(g.toolbar.time.minute.html(), 10);
      var dateStr = g.currentDate.year + '/' + g.currentDate.month + '/' + g.currentDate.date + ' ' + g.currentDate.hour + ':' + g.currentDate.minute;
      var myDate = new Date(dateStr);
      dateStr = g.formatDate(myDate);
      this.inputText.val(dateStr);
      this.onTextChange();
    },
    isDateTime: function(dateStr) {
      var g = this,
        p = this.options;
      var r = dateStr.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
      if (r == null) return false;
      var d = new Date(r[1], r[3] - 1, r[4]);
      if (d == "NaN") return false;
      return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
    },
    isLongDateTime: function(dateStr) {
      var g = this,
        p = this.options;
      var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2})$/;
      var r = dateStr.match(reg);
      if (r == null) return false;
      var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6]);
      if (d == "NaN") return false;
      return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6]);
    },
    formatDate: function(date) {
      var g = this,
        p = this.options;
      if (date == "NaN") return null;
      var format = p.format;
      var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds()
      };
      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
      }
      return format;
    },
    clear: function() {
      this.set('value', '');
      this.usedDate = null;
    },
    _setCancelable: function(value) {
      var g = this,
        p = this.options;
      if (!value && g.unselect) {
        g.unselect.remove();
        g.unselect = null;
      }
      if (!value && !g.unselect) return;
      g.unselect = $('<div class="dateinput-trigger dateinput-trigger-cancel"><div class="dateinput-trigger-icon"></div></div>').hide();
      g.text.hover(function() {
        g.unselect.show();
      }, function() {
        g.unselect.hide();
      });
      if (!p.disabled && p.cancelable) g.text.append(g.unselect);
      g.unselect.click(function() {
        g.clear();
      });
    },
    _rever: function() {
      var g = this,
        p = this.options;
      if (!g.usedDate) {
        g.inputText.val("");
      } else {
        g.inputText.val(g.formatDate(g.usedDate));
      }
    },
    _getMatch: function(format) {
      var r = [-1, -1, -1, -1, -1, -1],
        groupIndex = 0,
        regStr = "^",
        str = format || this.options.format;
      while (true) {
        var tmp_r = str.match(/^y+|M+|d+|m+|h+|s+|-|\/|:|\s/);
        if (tmp_r) {
          var c = tmp_r[0].charAt(0);
          var mathLength = tmp_r[0].length;
          var index = 'yMdhms'.indexOf(c);
          if (index != -1) {
            r[index] = groupIndex + 1;
            regStr += "(\\d{1," + mathLength + "})";
          } else {
            var st = c == ' ' ? '\\s' : c;
            regStr += "(" + st + ")";
          }
          groupIndex++;
          if (mathLength == str.length) {
            regStr += "$";
            break;
          }
          str = str.substring(mathLength);
        } else {
          return null;
        }
      }
      return {
        reg: new RegExp(regStr),
        position: r
      };
    },
    _bulidDate: function(dateStr) {
      var g = this,
        p = this.options;
      var r = g._getMatch();
      if (!r) return null;
      if (p.showTime && !dateStr.match(r.reg)) dateStr = g.formatDate(new Date(dateStr.replaceAll("-", "/")));
      var t = dateStr.match(r.reg);
      if (!t) return null;
      var tt = {
        y: r.position[0] == -1 ? 1900 : t[r.position[0]],
        M: r.position[1] == -1 ? 0 : parseInt(t[r.position[1]], 10) - 1,
        d: r.position[2] == -1 ? 1 : parseInt(t[r.position[2]], 10),
        h: r.position[3] == -1 ? 0 : parseInt(t[r.position[3]], 10),
        m: r.position[4] == -1 ? 0 : parseInt(t[r.position[4]], 10),
        s: r.position[5] == -1 ? 0 : parseInt(t[r.position[5]], 10)
      };
      if (tt.M < 0 || tt.M > 11 || tt.d < 0 || tt.d > 31) return null;
      var d = new Date(tt.y, tt.M, tt.d);
      if (p.showTime) {
        if (tt.m < 0 || tt.m > 59 || tt.h < 0 || tt.h > 23 || tt.s < 0 || tt.s > 59) return null;
        d.setHours(tt.h);
        d.setMinutes(tt.m);
        d.setSeconds(tt.s);
      }
      return d;
    },
    updateStyle: function() {
      this.onTextChange();
    },
    onTextChange: function() {
      var g = this,
        p = this.options;
      var val = g.inputText.val();
      if (!val) {
        g.selectedDate = null;
        return true;
      }
      var newDate = g._bulidDate(val);
      if (!newDate) {
        g._rever();
        return;
      } else {
        g.usedDate = newDate;
      }
      g.selectedDate = {
        year: g.usedDate.getFullYear(),
        month: g.usedDate.getMonth() + 1,
        day: g.usedDate.getDay(),
        date: g.usedDate.getDate(),
        hour: g.usedDate.getHours(),
        minute: g.usedDate.getMinutes()
      };
      g.currentDate = {
        year: g.usedDate.getFullYear(),
        month: g.usedDate.getMonth() + 1,
        day: g.usedDate.getDay(),
        date: g.usedDate.getDate(),
        hour: g.usedDate.getHours(),
        minute: g.usedDate.getMinutes()
      };
      var formatVal = g.formatDate(newDate);
      g.inputText.val(formatVal);
      g.trigger('changeDate', [formatVal]);
      if ($(g.dateeditor).is(":visible")) g.bulidContent();
    },
    _setHeight: function(value) {
      var g = this;
      if (value > 4) {
        g.text.css({
          height: value
        });
        g.inputText.css({
          height: value
        });
        g.textwrapper.css({
          height: value
        });
      }
    },
    _setWidth: function(value) {
      var g = this;
      if (value > 25) {
        g.text.css({
          width: value
        });
        g.inputText.css({
          width: value - 25
        });
        g.textwrapper.css({
          width: value
        });
      }
    },
    _setValue: function(value) {
      var g = this;
      if (!value) g.inputText.val('');
      if (typeof value == "string") {
        if (/^\/Date/.test(value)) {
          value = value.replace(/^\//, "new ").replace(/\/$/, "");
          eval("value = " + value);
        } else {
          g.inputText.val(value);
        }
      }
      if (typeof value == "object") {
        if (value instanceof Date) {
          g.inputText.val(g.formatDate(value));
          g.onTextChange();
        }
      }
    },
    _getValue: function() {
      return this.usedDate;
    },
    setEnabled: function() {
      var g = this,
        p = this.options;
      this.inputText.removeAttr("disabled");
      this.text.removeClass('dateinput-text-disabled');
      p.disabled = false;
    },
    setDisabled: function() {
      var g = this,
        p = this.options;
      this.inputText.attr("disabled", "disabled");
      this.text.addClass('dateinput-text-disabled');
      p.disabled = true;
    }
  });
})(jQuery);
