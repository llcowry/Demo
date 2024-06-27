import fs from 'fs';
import path from 'path';
import moment from 'moment';
import { fileURLToPath } from 'url';
import config from '../config/config.mjs';

// 获取当前模块的文件路径和目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logDir = path.join(__dirname, `../${config.LOG_DIR}`);

// 创建日志目录（如果不存在）
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// 获取当前日志文件路径
const getLogFilePath = () => {
  const dateStr = moment().format('YYYY-MM-DD');
  return path.join(logDir, `server-${dateStr}.log`);
};

// 初始化日志文件流
let logFile = fs.createWriteStream(getLogFilePath(), { flags: 'a' });
const logStdout = process.stdout;

/**
 * 日志记录中间件
 *
 * 该中间件记录每个请求的请求方法、URL 和响应时间。
 * 应尽早放置在中间件堆栈中，以记录所有传入请求。
 *
 * @param {Object} ctx - Koa 上下文对象，表示请求和响应。
 * @param {Function} next - 调用下一个中间件的函数。
 * @returns {Promise<void>} - 表示异步记录操作的 Promise。
 */
export const logger = async (ctx, next) => {
  const start = Date.now();
  await next();
  // 计算请求处理所需时间
  const ms = Date.now() - start;
  // 记录 HTTP 方法、URL、响应状态码和响应时间（毫秒）
  const logMessage = `${moment().format('YYYY-MM-DD HH:mm:ss')} ${ctx.method} ${ctx.url} ${ctx.status} - ${ms}ms\n`;

  // 检查是否需要切换日志文件（按日期）
  const currentLogFilePath = getLogFilePath();
  if (logFile.path !== currentLogFilePath) {
    logFile.end(); // 结束当前日志文件流
    logFile = fs.createWriteStream(currentLogFilePath, { flags: 'a' }); // 创建新的日志文件流
  }

  logFile.write(logMessage);
  logStdout.write(logMessage);
};
