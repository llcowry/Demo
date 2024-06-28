// init xl
var xl = {
  setQuantity: {
    obj: null,
    min: 1,
    max: 999,
    reg: function(x) {
      return new RegExp('^[1-9]\\d*$').test(x);
    },
    set: function(mode) {
      var x = this.obj.val();
      if (this.reg(x)) {
        if (mode) {
          x++;
          if (x <= this.max) {
            this.obj.val(x);
          } else {
            console.log('数量最多为' + this.max + '！');
            this.obj.val(this.max);
          }
        } else {
          x--;
          if (x >= this.min) {
            this.obj.val(x);
          } else {
            console.log('数量最少为' + this.min + '！');
            this.obj.val(this.min);
          }
        }
      } else {
        console.log('请输入正确的数量！');
        this.obj.focus().val(1);
      }
      return x;
    },
    add: function() {
      this.set(true);
    },
    reduce: function() {
      this.set(false);
    },
    modify: function() {
      var x = this.obj.val();
      if (x < this.min) {
        console.log('数量最少为' + this.min + '！');
        this.obj.val(this.min);
      } else if (x > this.max) {
        console.log('数量最多为' + this.max + '！');
        this.obj.val(this.max);
      } else if (!this.reg(x)) {
        console.log('请输入正确的数量！');
        this.obj.focus().val(1);
      }
    }
  },
  loadARBox: function(opt) {
    var maxNum = opt.inputObj.data('max') || 999;
    xl.setQuantity.obj = opt.inputObj;
    xl.setQuantity.max = parseInt(maxNum, 10);
    opt.addBtn.click(function() {
      xl.setQuantity.add();
    });
    opt.reduceBtn.click(function() {
      xl.setQuantity.reduce();
    });
    // opt.inputObj.blur(function() {
    //   xl.setQuantity.modify();
    // });
  }
};

// default load
$(function() {
  // 处理默认值
  $('a[href="#"]').each(function() {
    $(this).attr('href', 'javascript:;');
  });
  // 处理返回
  $('.js-back').click(function() {
    window.history.back();
  });
  // 处理链接跳转
  $('.js-goto').click(function() {
    window.location.href = $(this).data('url');
  });
  // 初始化
  $('.main').css({
    'height': $(window).height() - $('header').height() - $('footer').height()
  });
});

// end load
$(window).load(function() {
  $('.loading').remove();
});