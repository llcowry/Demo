/**
 * 错误处理中间件
 */
import { addOperateLog } from '../controllers/operateLogController.mjs';

export async function errorHandler(ctx, next) {
  try {
    await next();
    // 如果状态码是 404，则抛出 404 错误
    if (ctx.response.status === 404 && !ctx.response.body) {
      ctx.throw(404, 'Not Found');
    }
  } catch (err) {
    await addOperateLog(ctx, err.message);
    ctx.status = err.status || 500; // 设置 HTTP 状态码（默认为 500）
    ctx.body = {
      status: 'error',
      msg: err.message, // 在响应体中设置错误消息
    };
    // 发出错误事件，用于进一步处理/记录错误
    ctx.app.emit('error', err, ctx);
  }
}
