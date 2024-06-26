import Koa from 'koa';
import bodyParser from '@koa/bodyparser';
import cors from '@koa/cors';
import serve from 'koa-static';
import helmet from 'koa-helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import { koaSwagger } from 'koa2-swagger-ui';
import swaggerJsdoc from 'swagger-jsdoc';
import { logger } from './middlewares/logger.mjs';
import { errorHandler } from './middlewares/errorHandler.mjs';
import router from './routes/index.mjs';
import config from './config/config.mjs';

const PORT = config.PORT;

const app = new Koa();

// 获取当前文件的目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 中间件
app.use(
  helmet({
    contentSecurityPolicy: false // 禁用contentSecurityPolicy
  })
);
app.use(cors());
app.use(logger);
app.use(errorHandler);
app.use(
  bodyParser({
    enableTypes: ['json'],
    jsonLimit: '10mb'
  })
);
app.use(serve(path.join(__dirname, '/public')));

// 设置 Swagger UI
const specs = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Koa2 REST API',
      version: '1.0.0',
      description: 'API Documentation'
    }
  },
  apis: [path.join(__dirname, './routes/*.mjs')]
});
app.use(
  koaSwagger({
    routePrefix: '/swagger', // Swagger UI 的访问路径
    swaggerOptions: { spec: specs }
  })
);

// 路由
app.use(router.routes()).use(router.allowedMethods());

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server startup with http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/swagger`);
});

// 处理全局错误
app.on('error', (err, ctx) => {
  console.error('Server error', err, ctx);
});
