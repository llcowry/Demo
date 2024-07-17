import { Sequelize } from 'sequelize';
import Redis from 'ioredis';
import config from '../config/config.mjs';

const env = process.env.NODE_ENV || 'default';

let logging = false;
// if (env !== 'production') logging = console.log;

export const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
  host: config.DB_HOST,
  dialect: 'mysql',
  logging: logging,
  define: {
    timestamps: true, // 启用全局时间戳
  },
});

export const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('数据库连接成功');
    if (env !== 'production') {
      await sequelize.sync({ after: true });
    } else {
      await sequelize.sync();
    }
  } catch (error) {
    console.error('无法连接到数据库:', error);
  }
};

export const redis = new Redis({
  host: config.DB_REDIS_HOST,
  port: 6379,
  // password: config.DB_REDIS_PASSWORD,
});