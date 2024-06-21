import fs from 'fs';
import path from 'path';
import moment from 'moment';
import { fileURLToPath } from 'url';

// 获取当前模块的文件路径和目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logDir = path.join(__dirname, '../logs');
const logFilePath = path.join(logDir, 'server.log');

// 创建日志目录（如果不存在）
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}
const logFile = fs.createWriteStream(logFilePath, { flags: 'a' });
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
  const logMessage = `${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')} ${ctx.method} ${ctx.url} ${ctx.status} - ${ms}ms\n`;
  logFile.write(logMessage);
  logStdout.write(logMessage);
};
