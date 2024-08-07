import Koa from 'koa';
import bodyParser from '@koa/bodyparser';
import cors from '@koa/cors';
import serve from 'koa-static';
import helmet from 'koa-helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import { koaSwagger } from 'koa2-swagger-ui';
import swaggerConfig from './config/swagger.mjs';
import { logger } from './middlewares/logger.mjs';
import { errorHandler } from './middlewares/errorHandler.mjs';
import router from './routes/index.mjs';
import { initDB } from './db/database.mjs';
import config from './config/config.mjs';

const PORT = config.PORT;

const app = new Koa();

// 获取当前文件的目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 同步所有模型
initDB();

// 中间件
app.use(
  helmet({
    contentSecurityPolicy: false, // 禁用contentSecurityPolicy
    crossOriginResourcePolicy: false,
  }),
);
app.use(
  cors({
    origin: (ctx) => ctx.get('Origin'),
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'X-Access-Token', 'Accept'],
    exposeHeaders: ['Content-Disposition'],
    credentials: true,
    maxAge: 300,
    keepHeadersOnError: true,
  }),
);
app.use(logger);
app.use(errorHandler);
app.use(
  bodyParser({
    enableTypes: ['json'],
    jsonLimit: '10mb',
  }),
);
app.use(serve(path.join(__dirname, '/public')));

// 设置 Swagger UI
app.use(koaSwagger(swaggerConfig));

// 路由
app.use(router.routes()).use(router.allowedMethods());

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器访问地址：http://localhost:${PORT}`);
  console.log(`Swagger访问地址：http://localhost:${PORT}/swagger`);
});

// 处理全局错误
app.on('error', (err, ctx) => {
  console.error('服务器运行错误：', err, ctx);
});
