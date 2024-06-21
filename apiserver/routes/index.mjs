import Router from '@koa/router';
import indexRoutes from './indexRoutes.mjs';
import uploadRoutes from './uploadRoutes.mjs';

const router = new Router();

router.use(indexRoutes.routes()).use(indexRoutes.allowedMethods());
router.use(uploadRoutes.routes()).use(uploadRoutes.allowedMethods());

export default router;