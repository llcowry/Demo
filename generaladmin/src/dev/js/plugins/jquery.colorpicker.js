//colorpicker
(function($) {
  $.fn.colorpicker = function(options) {
    var opts = $.extend({}, $.fn.colorpicker.defaults, options);
    $("body").append('<div id="colorPickerPanel" style="position: absolute; display: none;"></div>');
    var ColorHex = new Array('00', '33', '66', '99', 'CC', 'FF');
    var SpColorHex = new Array('FF0000', '00FF00', '0000FF', 'FFFF00', '00FFFF', 'FF00FF');
    var colorTable = '',
      colorValue = '';
    for (i = 0; i < 2; i++) {
      for (j = 0; j < 6; j++) {
        colorTable += '<tr height="11">';
        colorTable += '<td width="11" rel="#000000" style="background-color: #000">';
        colorValue = i == 0 ? ColorHex[j] + ColorHex[j] + ColorHex[j] : SpColorHex[j];
        colorTable += '<td width="11" rel="#' + colorValue + '" style="background-color: #' + colorValue + '">';
        colorTable += '<td width="11" rel="#000000" style="background-color: #000">';
        for (k = 0; k < 3; k++) {
          for (l = 0; l < 6; l++) {
            colorValue = ColorHex[k + i * 3] + ColorHex[l] + ColorHex[j];
            colorTable += '<td width="11" rel="#' + colorValue + '" style="background-color: #' + colorValue + '">';
          }
        }
      }
    }
    $("#colorPickerPanel").html('<table width="239" border="0" cellspacing="0" cellpadding="0" style="border: 1px solid #aaa; border-radius: 3px; box-shadow: 0 0 8px rgba(0,0,0,0.2);"><tr height="30"><td style="background-color: #e1e1e1"><table cellpadding="0" cellspacing="1" border="0" style="border-collapse: collapse"><tr><td style="padding-left: 3px"><input type="text" id="colorPickerDisColor" size="6" disabled="disabled" style="border: solid 1px #666; background-color: #ff0; margin-right: 5px"><input type="text" id="colorPickerHexColor" size="7" disabled="disabled" style="border: inset 1px; font-family: Arial;" value="#000000"></td><td style="padding-left: 50px"><a href="javascript:;" id="clearColorPicker">清除</a> | <a href="javascript:;" id="closeColorPicker">关闭</a></td></tr></table></td></tr><tr><td style="background-color: #e1e1e1; text-align: center; margin: 0 auto; padding: 0 3px 3px"><table id="colorTable" border="0" cellspacing="0" cellpadding="0" style="cursor: pointer;">' + colorTable + '</table></td></tr></table>');
    return this.each(function() {
      var obj = $(this);
      obj.on(opts.event, function() {
        var _t = $(this).offset().top,
          _left = $(this).offset().left;
        var _h = $(this).outerHeight(),
          _h2 = $("#colorPickerPanel").outerHeight();
        var _top = _t - _h2,
          _top2 = _t + _h;
        var target = opts.target ? $(opts.target) : obj;
        if (($(window).height() + $(document).scrollTop() - _top2) >= _h2) _top = _top2;
        $("#colorPickerPanel").css({
          top: _top,
          left: _left
        }).fadeIn("fast");
        if (target.data("color") == null) target.data("color", target.css("color"));
        $("#closeColorPicker").click(function() {
          $("#colorPickerPanel").fadeOut("fast");
          return false;
        });
        $("#clearColorPicker").click(function() {
          target.css("color", target.data("color"));
          $("#colorPickerPanel").fadeOut("fast");
          opts.reset(obj);
        });
        $("#colorTable tr td").off("click").mouseover(function() {
          var color = $(this).css("background-color");
          $("#colorPickerDisColor").css("background-color", color);
          $("#colorPickerHexColor").val($(this).attr("rel"));
        }).click(function() {
          var aaa = $(this).css("background-color");
          var color = opts.ishex ? $(this).attr("rel") : aaa;
          if (opts.fillcolor) target.val(color);
          if (opts.changecolor) target.css("color", aaa);
          $("#clearColorPicker").off("click");
          $("#colorPickerPanel").fadeOut("fast");
          opts.success(obj, color);
        });
      });
      $("#colorPickerPanel").hover(null, function() {
        $(this).fadeOut("fast");
      });
    });
  };
  $.fn.colorpicker.defaults = {
    event: 'focus', //颜色框显示的事件
    ishex: true, //是否使用16进制颜色值
    fillcolor: true, //是否将颜色值填充至对象的val中
    changecolor: false, //是否更改对象的颜色值
    target: null, //目标对象
    success: function() {}, //回调函数
    reset: function() {}
  };
})(jQuery);
