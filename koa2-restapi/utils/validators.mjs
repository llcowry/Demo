// 正则表达式验证
export const validateUsername = (username) => /^[a-zA-Z0-9_\~\!\@\#\$\%\^\&\*\(\)\+\=\-\,\;\:\'\"\|\.]{5,20}$/.test(username); // 用户名5-20个字符，可以包含字母、数字和一些特殊字符
export const validatePassword = (password) => /^[a-zA-Z0-9_\~\!\@\#\$\%\^\&\*\(\)\+\=\-\,\;\:\'\"\|\.]{6,20}$/.test(password); // 密码6-20个字符，可以包含字母、数字和一些特殊字符
export const validateEmail = (email) => /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email); // 简单的电子邮件验证
export const validatePhoneNumber = (phoneNumber) => /^\+?[1-9]\d{1,14}$/.test(phoneNumber); // 国际电话号码格式
export const validateURL = (url) => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(url); // URL验证
export const validateDate = (date) => /^\d{4}-\d{2}-\d{2}$/.test(date); // 日期验证（YYYY-MM-DD）
export const validateNumber = (number) => /^[0-9]+$/.test(number); // 数字验证