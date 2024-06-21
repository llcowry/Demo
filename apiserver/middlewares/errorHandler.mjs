export async function errorHandler(ctx, next) {
  try {
    await next();
    if (ctx.status === 404) {
      ctx.throw(404, 'Not Found');
    }
  } catch (err) {
    console.error('Error handler:', err);
    ctx.status = err.status || 500;
    ctx.body = {
      status: 'error',
      msg: err.message || 'Internal Server Error',
      data: null,
    };
  }
}
