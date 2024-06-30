import Router from '@koa/router';
import indexRoutes from './indexRoutes.mjs';
import userAuthRoutes from './userAuthRoutes.mjs';
import uploadRoutes from './uploadRoutes.mjs';
import auth from '../middlewares/auth.mjs';
import fileRoutes from './fileRoutes.mjs';
import userRoutes from './userRoutes.mjs';
import adminRoutes from './adminRoutes.mjs';
import roleRoutes from './roleRoutes.mjs';
import menuRoutes from './menuRoutes.mjs';

const router = new Router({ prefix: '/api' });

// 公开路由
router.use(indexRoutes.routes()).use(indexRoutes.allowedMethods());
router.use(userAuthRoutes.routes()).use(userAuthRoutes.allowedMethods());
router.use(uploadRoutes.routes()).use(uploadRoutes.allowedMethods());

// 授权认证
router.use(auth); 

// 受保护路由
router.use(fileRoutes.routes()).use(fileRoutes.allowedMethods());
router.use(userRoutes.routes()).use(userRoutes.allowedMethods());
router.use(adminRoutes.routes()).use(adminRoutes.allowedMethods());
router.use(roleRoutes.routes()).use(roleRoutes.allowedMethods());
router.use(menuRoutes.routes()).use(menuRoutes.allowedMethods());

export default router;
