import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { logger } from './middlewares/logger.mjs';
import { errorHandler } from './middlewares/errorHandler.mjs';
import router from './routes/index.mjs';
import config from './config/config.mjs';

const app = new Koa();

// 中间件
app.use(logger);
app.use(errorHandler);
app.use(bodyParser());

// 路由
app.use(router.routes()).use(router.allowedMethods());

const PORT = config.PORT;

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// 处理全局错误
app.on('error', (err, ctx) => {
  console.error('Server error', err, ctx);
});
