export default {
  PORT: process.env.PORT || 8000,
  UPLOAD_FILE_DNS: 'http://127.0.0.1:8000/', // 存储文件的DNS，地址最后需要加上'/'
  UPLOAD_DIR: 'public/uploads', // 上传文件的目录
  MAX_FILE_SIZE: 1024 * 1024 * 20, // 限制上传文件的大小：10MB
  LOG_DIR: 'logs', // 记录日志的目录
  LOG_GENERATE: false, // 是否生成日志文件
  JWT_SECRET: 'X7cO9mw3FdTzNb1K', // token密钥
  ENCRYPT_STATUS: true, // 是否开启数据加密
  ENCRYPT_KEY: '0a1b2c3d4e5f6789abcdef0123456789', // 数据加密密钥
  JWT_EXPIRES_IN: '1h', // token过期时间
  CAPTCHACODE_EXPIRES_IN: 300, // 验证码过期时间，单位秒
  LOGINFAIL_LOCK_COUNT: 5, // 连续登录失败的次数
  LOGINFAIL_LOCK_TIME: 1800, // 登录失败锁定账户的时间，单位秒
  DB_HOST: 'localhost', // mysql数据库地址
  DB_USER: 'root', // mysql登录账号
  DB_PASSWORD: 'Root@888', // mysql登录密码
  DB_NAME: 'restapi', // mysql数据库名称
  DB_REDIS_HOST: 'localhost', // redis数据库地址
  DB_REDIS_PASSWORD: '', // redis登录密码
  EMAIL_SEND_ON_REGISTER: true, // 是否在注册时发送邮件
  EMAIL_HOST: 'smtp.example.com', // SMTP 服务器地址
  EMAIL_PORT: 587, // SMTP 端口
  EMAIL_SECURE: false, // true for 465, false for other ports
  EMAIL_USER: 'your-email@example.com', // 你的邮箱账号
  EMAIL_PASS: 'your-email-password', // 你的邮箱密码
  EMAIL_FROM: '"Your Name" <your-email@example.com>', // 发件人地址
};
