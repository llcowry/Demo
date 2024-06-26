import Router from '@koa/router';
import indexRoutes from './indexRoutes.mjs';
import uploadRoutes from './uploadRoutes.mjs';
import authRoutes from './authRoutes.mjs';
import userRoutes from './userRoutes.mjs';

const router = new Router();

router.use(indexRoutes.routes()).use(indexRoutes.allowedMethods());
router.use(uploadRoutes.routes()).use(uploadRoutes.allowedMethods());
router.use(authRoutes.routes()).use(authRoutes.allowedMethods());
router.use(userRoutes.routes()).use(userRoutes.allowedMethods());

export default router;