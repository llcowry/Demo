var xlLunar = new function() {
  var lunarInfo = new Array(0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, 0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, 0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, 0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, 0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6, 0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, 0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, 0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, 0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, 0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, 0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, 0x14b63);

  function lYearDays(y) {
    var i, sum = 348;
    for (i = 0x8000; i > 0x8; i >>= 1) sum += (lunarInfo[y - 1900] & i) ? 1 : 0;
    return (sum + leapDays(y));
  }

  function leapDays(y) {
    if (leapMonth(y)) return ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
    else return (0);
  }

  function leapMonth(y) {
    return (lunarInfo[y - 1900] & 0xf);
  }

  function monthDays(y, m) {
    return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
  }

  function Lunar(objDate) {
    var i, leap = 0,
      temp = 0;
    var baseDate = new Date(1900, 0, 31);
    var offset = (objDate - baseDate) / 86400000;
    this.dayCyl = offset + 40;
    this.monCyl = 14;
    for (i = 1900; i < 2050 && offset > 0; i++) {
      temp = lYearDays(i);
      offset -= temp;
      this.monCyl += 12;
    }
    if (offset < 0) {
      offset += temp;
      i--;
      this.monCyl -= 12;
    }
    this.year = i;
    this.yearCyl = i - 1864;
    leap = leapMonth(i);
    this.isLeap = false;
    for (i = 1; i < 13 && offset > 0; i++) {
      if (leap > 0 && i == (leap + 1) && this.isLeap == false) {
        --i;
        this.isLeap = true;
        temp = leapDays(this.year);
      } else {
        temp = monthDays(this.year, i);
      }
      if (this.isLeap == true && i == (leap + 1)) this.isLeap = false;
      offset -= temp;
      if (this.isLeap == false) this.monCyl++;
    }
    if (offset == 0 && leap > 0 && i == leap + 1)
      if (this.isLeap) {
        this.isLeap = false;
      } else {
        this.isLeap = true;
        --i;
        --this.monCyl;
      }
    if (offset < 0) {
      offset += temp;
      --i;
      --this.monCyl;
    }
    this.month = i;
    this.day = offset + 1;
  }

  function lunarDate(m, d) {
    var _s1 = new Array('日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十');
    var _s2 = new Array('初', '十', '廿', '卅', '　');
    var _s3;
    if (m > 10) _s3 = '十' + _s1[m - 10]
    else _s3 = _s1[m]
    _s3 += '月'
    switch (d) {
      case 10:
        _s3 += '初十';
        break;
      case 20:
        _s3 += '二十';
        break;
      case 30:
        _s3 += '三十';
        break;
      default:
        _s3 += _s2[Math.floor(d / 10)];
        _s3 += _s1[d % 10];
    }
    return (_s3);
  }

  function y2k(y) {
    return (y < 1000) ? y + 1900 : y;
  }

  function cyclical(y) {
    var _gan = new Array("甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸");
    var _zhi = new Array("子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥");
    y = y - 1900 + 36;
    return (_gan[y % 10] + _zhi[y % 12]);
  }

  function animals(y) {
    var _animals = new Array("鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪");
    return (_animals[(y - 4) % 12]);
  }
  var _datetime = new Date();
  var _date = _datetime.getDate();
  var _year = y2k(_datetime.getYear());
  var _month = _datetime.getMonth();
  var _day = _datetime.getDay();
  var _week = new Array("日", "一", "二", "三", "四", "五", "六");
  var _lunar = new Lunar(new Date(_year, _month, _date));
  var _lunarStr = _year + '年' + (_month + 1) + '月' + _date + '日 周' + _week[_day] + ' ' + cyclical(_lunar.year) + animals(_lunar.year) + '年';
  return {
    show: function() {
      document.write(_lunarStr);
    },
    text: function() {
      return _lunarStr;
    }
  }
};