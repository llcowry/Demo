import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { logger } from './middlewares/logger.mjs';
import { errorHandler } from './middlewares/errorHandler.mjs';
import indexRoutes from './routes/index.mjs';
import uploadRoutes from './routes/upload.mjs';

const app = new Koa();

// 中间件
app.use(logger);
app.use(errorHandler);
app.use(bodyParser());

// 路由
app.use(indexRoutes.routes());
app.use(indexRoutes.allowedMethods());
app.use(uploadRoutes.routes());
app.use(uploadRoutes.allowedMethods());

const PORT = process.env.PORT || 3000;

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// 处理全局错误
app.on('error', (err, ctx) => {
  console.error('Server error', err, ctx);
});