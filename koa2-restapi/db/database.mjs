import { Sequelize } from 'sequelize';
import config from '../config/config.mjs';

const env = process.env.NODE_ENV || 'default';

let logging = false;
if (env !== 'production') logging = console.log;

const db = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
  host: config.DB_HOST,
  dialect: 'mysql',
  logging: logging,
  define: {
    timestamps: true, // 启用全局时间戳
  },
});

export default db;