import crypto from 'crypto';

/**
 * 使用 MD5 加密字符串
 * @param {string} data - 需要加密的字符串
 * @returns {string} - 加密后的字符串
 */
export const hashMD5 = (data) => {
  return crypto.createHash('md5').update(data).digest('hex');
};

/**
 * 生成随机字符串
 * @param {number} length - 字符串长度
 * @returns {string} - 生成的随机字符串
 */
export const generateRandomString = (length) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * 检查对象是否为空
 * @param {object} obj - 需要检查的对象
 * @returns {boolean} - 如果对象为空则返回 true，否则返回 false
 */
export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

/**
 * 深拷贝对象
 * @param {object} obj - 需要深拷贝的对象
 * @returns {object} - 深拷贝后的对象
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * 生成唯一ID
 * @returns {string} - 生成的唯一ID
 */
export const generateUniqueId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

/**
 * 计算两个日期之间的差异（天数）
 * @param {Date} date1 - 第一个日期
 * @param {Date} date2 - 第二个日期
 * @returns {number} - 日期差异的天数
 */
export const dateDiffInDays = (date1, date2) => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

// 截取字符串，多余的部分用...代替
export const subStr = (str, len) => {
  let n = 0;
  let s = '';
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 128) {
      n += 2;
    } else {
      n++;
    }
    s += str.charAt(i);
    if (n >= len) {
      return s + '...';
    }
  }
  return s;
};

// 获取json长度
export const getJsonLength = (jsonData) => {
  var arr = [];
  for (var item in jsonData) {
    arr.push(jsonData[item]);
  }
  return arr.length;
};
