export default {
  PORT: process.env.PORT || 3008,
  LOG_DIR: 'logs',
  UPLOAD_DIR: 'public/uploads',
  JWT_SECRET: 'your-jwt-secret',
  JWT_EXPIRES_IN: '1h',
  DB_HOST: 'your-db-host',
  DB_USER: 'your-username',
  DB_PASSWORD: 'your-password',
  DB_NAME: 'your-db-name',
  EMAIL_SEND_ON_REGISTER: true, // 是否在注册时发送邮件
  EMAIL_HOST: 'smtp.example.com', // SMTP 服务器地址
  EMAIL_PORT: 587, // SMTP 端口
  EMAIL_SECURE: false, // true for 465, false for other ports
  EMAIL_USER: 'your-email@example.com', // 你的邮箱账号
  EMAIL_PASS: 'your-email-password', // 你的邮箱密码
  EMAIL_FROM: '"Your Name" <your-email@example.com>', // 发件人地址
};
