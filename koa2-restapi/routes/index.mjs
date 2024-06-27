import Router from '@koa/router';
import indexRoutes from './indexRoutes.mjs';
import authRoutes from './authRoutes.mjs';
import uploadRoutes from './uploadRoutes.mjs';
import fileRoutes from './fileRoutes.mjs';
import userRoutes from './userRoutes.mjs';
import authMiddleware from '../middlewares/auth.mjs'; 

const router = new Router({ prefix: '/api' });

// 公开路由
router.use(indexRoutes.routes()).use(indexRoutes.allowedMethods());
router.use(authRoutes.routes()).use(authRoutes.allowedMethods());
router.use(uploadRoutes.routes()).use(uploadRoutes.allowedMethods());

// 受保护路由
router.use(authMiddleware); // 应用认证中间件
router.use(fileRoutes.routes()).use(fileRoutes.allowedMethods());
router.use(userRoutes.routes()).use(userRoutes.allowedMethods());

export default router;