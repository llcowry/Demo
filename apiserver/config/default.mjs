export default {
  PORT: process.env.PORT || 3008,
  LOG_DIR: 'logs',
  UPLOAD_DIR: 'uploads',
  JWT_SECRET: 'your-jwt-secret',
  JWT_EXPIRES_IN: '1h',
  DB_HOST: 'your-db-host',
  DB_USER: 'your-username',
  DB_PASSWORD: 'your-password',
  DB_NAME: 'your-db-name',
};
