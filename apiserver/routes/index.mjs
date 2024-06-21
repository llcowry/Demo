import Router from '@koa/router';
import indexRoutes from './indexRoutes.mjs';
import uploadRoutes from './uploadRoutes.mjs';
import authRoutes from './authRoutes.mjs';

const router = new Router();

router.use(indexRoutes.routes()).use(indexRoutes.allowedMethods());
router.use(uploadRoutes.routes()).use(uploadRoutes.allowedMethods());
router.use(authRoutes.routes()).use(authRoutes.allowedMethods());

export default router;