import nodemailer from 'nodemailer';
import config from '../config/config.mjs'; // 假设你在config.mjs文件中定义了邮件配置

// 创建邮件发送对象并配置 SMTP 服务器
const transporter = nodemailer.createTransport({
  host: config.EMAIL_HOST, // SMTP 服务器地址
  port: config.EMAIL_PORT, // SMTP 端口
  secure: config.EMAIL_SECURE, // 如果使用 465 端口，则为 true，否则为 false
  auth: {
    user: config.EMAIL_USER, // 发件人邮箱账号
    pass: config.EMAIL_PASS, // 发件人邮箱密码
  },
});

/**
 * 发送邮件函数
 * @param {string} to - 收件人地址
 * @param {string} subject - 邮件主题
 * @param {string} text - 邮件文本内容
 * @param {string} html - 邮件 HTML 内容
 * @returns {object} - 包含邮件发送结果的对象
 */
export const sendMail = async (to, subject, text, html) => {
  // 配置邮件选项
  const mailOptions = {
    from: config.EMAIL_FROM, // 发件人地址
    to, // 收件人地址
    subject, // 邮件主题
    text, // 邮件文本内容
    html, // 邮件 HTML 内容
  };

  try {
    // 发送邮件并返回发送结果
    const info = await transporter.sendMail(mailOptions);
    console.log('邮件发送成功: %s', info.messageId);
    return { status: 'success', msg: '邮件发送成功', data: info };
  } catch (error) {
    // 处理发送错误并返回错误信息
    console.error('邮件发送失败: %s', error.message);
    return { status: 'error', msg: '邮件发送失败', error };
  }
};
