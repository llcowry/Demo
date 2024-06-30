import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import config from '../config/config.mjs';

// 生成 JWT token
export const generateToken = (data) => {
  return jwt.sign({ id: data.id, username: data.username }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN });
};

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

// 获取描述对象的值
export const getObjectValue = (obj, des) => {
  return eval('obj.' + des);
};

/**
 * 对象比较器
 * 使用方法：data.sort(compare("对象名称")) 在对象内部排序，不生成副本
 * @param  {[type]} propertyName 要排序的对象的子名称（限一级）
 * @return {[type]}              排序规则
 */
export const compareObject = (propertyName) => {
  return function (object1, object2) {
    var value1 = getObjectValue(object1, propertyName);
    var value2 = getObjectValue(object2, propertyName);
    if (value2 < value1) {
      return -1;
    } else if (value2 > value1) {
      return 1;
    } else {
      return 0;
    }
  };
};

/**
 * 根据含义字符串换算对应的毫秒数
 * @param  {[type]} str 字符串
 * @return {[type]}     ms
 */
let getsec = function (str) {
  if (/[s|h|d|l]/i.test(str)) {
    var str1 = str.substring(0, str.length - 1);
    var str2 = str.substring(str.length - 1, str.length);
    if (str2 === 's') {
      return str1 * 1000;
    } else if (str2 === 'h') {
      return str1 * 60 * 60 * 1000;
    } else if (str2 === 'd') {
      return str1 * 24 * 60 * 60 * 1000;
    }
  } else {
    if (str.indexOf('l') === -1) {
      return str * 1000;
    } else {
      return 30 * 24 * 60 * 60 * 1000;
    }
  }
};

// 写 cookies
export const setCookie = function setCookie(name, value, time, path = '/') {
  let cookieString = name + '=' + encodeURIComponent(value);
  if (time) {
    let strsec = getsec(time);
    let exp = new Date();
    exp.setTime(exp.getTime() + parseInt(strsec));
    cookieString += ';expires=' + exp.toGMTString();
  }
  cookieString += ';path=' + path;
  document.cookie = cookieString;
};

// 读 cookies
export const getCookie = function (name) {
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  let arr = document.cookie.match(reg);
  return arr ? decodeURIComponent(arr[2]) : null;
};

// 删 cookies
export const delCookie = function (name, path = '/') {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=' + path;
};

// 获取Token
export const getToken = function () {
  if (window.localStorage) {
    return window.localStorage.getItem('token');
  } else {
    console.error('此浏览器不支持本地存储');
    return null;
  }
};

// 设置Token
export const setToken = function (token) {
  if (window.localStorage) {
    window.localStorage.setItem('token', token);
  } else {
    console.error('此浏览器不支持本地存储');
  }
};

// 删除Token
export const delToken = function () {
  if (window.localStorage) {
    window.localStorage.removeItem('token');
  } else {
    console.error('此浏览器不支持本地存储');
  }
};

/**
 * 根据 host 返回根域名
 * @param  {string} host window.location.host
 * @return {string}      如果不是域名则返回 IP
 */
export const getDomain = (host) => {
  // 取出 host 中的主机部分（去掉端口）
  host = host.split(':')[0];
  // 检查最后一个点后的部分是否为数字
  const lastSegment = host.substring(host.lastIndexOf('.') + 1);
  return isNaN(lastSegment) 
    ? host.substring(host.substring(0, host.lastIndexOf('.')).lastIndexOf('.') + 1) 
    : host;
};

/**
 * 版本号比较方法
 * 传入两个字符串，当前版本号：curV；比较版本号：reqV
 * 调用方法举例：compareVersion("1.1", "1.2")，将返回 false
 * @param {string} curV 当前版本号
 * @param {string} reqV 比较版本号
 * @return {boolean}    若 curV 大于 reqV，则返回 true
 */
export const compareVersion = (curV, reqV) => {
  if (curV && reqV) {
    // 将两个版本号拆成数组
    const arr1 = curV.split('.').map(Number);
    const arr2 = reqV.split('.').map(Number);
    const maxLength = Math.max(arr1.length, arr2.length);
    
    // 用 0 补全较短的数组
    while (arr1.length < maxLength) arr1.push(0);
    while (arr2.length < maxLength) arr2.push(0);

    // 比较每一位的大小
    for (let i = 0; i < maxLength; i++) {
      if (arr1[i] > arr2[i]) return true;
      if (arr1[i] < arr2[i]) return false;
    }
    return false;
  } else {
    // 输入为空
    console.log('版本号不能为空');
    return false;
  }
};
