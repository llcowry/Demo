/**
 * 错误处理中间件
 *
 * 该中间件捕获其他中间件或路由处理程序抛出的错误。
 * 设置适当的 HTTP 状态码，记录错误消息，并发送错误响应。
 *
 * @param {Object} ctx - Koa 上下文对象，表示请求和响应。
 * @param {Function} next - 调用下一个中间件的函数。
 * @returns {Promise<void>} - 表示异步错误处理操作的 Promise。
 */
export async function errorHandler(ctx, next) {
  try {
    await next();
    // 如果状态码是 404，则抛出 404 错误
    if (ctx.response.status === 404 && !ctx.response.body) {
      ctx.throw(404, 'Not Found');
    }
  } catch (err) {
    ctx.status = err.status || 500; // 设置 HTTP 状态码（默认为 500）
    ctx.body = {
      status: 'error',
      msg: err.message, // 在响应体中设置错误消息
    };
    // 发出错误事件，用于进一步处理/记录错误
    ctx.app.emit('error', err, ctx);
  }
}
