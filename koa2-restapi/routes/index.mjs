import Router from '@koa/router';
import indexRoutes from './indexRoutes.mjs';
import userAuthRoutes from './userAuthRoutes.mjs';
import uploadRoutes from './uploadRoutes.mjs';
import adminAuthRoutes from './adminAuthRoutes.mjs';
import auth from '../middlewares/auth.mjs';
import fileRoutes from './fileRoutes.mjs';
import userRoutes from './userRoutes.mjs';
import adminRoutes from './adminRoutes.mjs';
import roleRoutes from './roleRoutes.mjs';
import menuRoutes from './menuRoutes.mjs';
import dictRoutes from './dictRoutes.mjs';
import deptRoutes from './deptRoutes.mjs';
import cacheRoutes from './cacheRoutes.mjs';
import configRoutes from './configRoutes.mjs';
import operateLogRoutes from './operateLogRoutes.mjs';
import adminLogRoutes from './adminLogRoutes.mjs';
import tableColumnRoutes from './tableColumnRoutes.mjs';
import loginFailRoutes from './loginFailRoutes.mjs';
import feedbackRoutes from './feedbackRoutes.mjs';
import articleRoutes from './articleRoutes.mjs';
import versionLogRoutes from './versionLogRoutes.mjs';

const router = new Router({ prefix: '/api' });

// 公开路由
router.use(indexRoutes.routes()).use(indexRoutes.allowedMethods());
router.use(userAuthRoutes.routes()).use(userAuthRoutes.allowedMethods());
router.use(uploadRoutes.routes()).use(uploadRoutes.allowedMethods());
router.use(adminAuthRoutes.routes()).use(adminAuthRoutes.allowedMethods());

// 授权认证
router.use(auth); 

// 受保护路由
router.use(fileRoutes.routes()).use(fileRoutes.allowedMethods());
router.use(userRoutes.routes()).use(userRoutes.allowedMethods());
router.use(adminRoutes.routes()).use(adminRoutes.allowedMethods());
router.use(roleRoutes.routes()).use(roleRoutes.allowedMethods());
router.use(menuRoutes.routes()).use(menuRoutes.allowedMethods());
router.use(dictRoutes.routes()).use(dictRoutes.allowedMethods());
router.use(deptRoutes.routes()).use(deptRoutes.allowedMethods());
router.use(cacheRoutes.routes()).use(cacheRoutes.allowedMethods());
router.use(configRoutes.routes()).use(configRoutes.allowedMethods());
router.use(operateLogRoutes.routes()).use(operateLogRoutes.allowedMethods());
router.use(adminLogRoutes.routes()).use(adminLogRoutes.allowedMethods());
router.use(tableColumnRoutes.routes()).use(tableColumnRoutes.allowedMethods());
router.use(loginFailRoutes.routes()).use(loginFailRoutes.allowedMethods());
router.use(feedbackRoutes.routes()).use(feedbackRoutes.allowedMethods());
router.use(articleRoutes.routes()).use(articleRoutes.allowedMethods());
router.use(versionLogRoutes.routes()).use(versionLogRoutes.allowedMethods());

export default router;
