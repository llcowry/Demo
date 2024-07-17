import Router from '@koa/router';
import { getCacheNames, getCacheKey, removeCache } from '../controllers/cacheController.mjs';

const router = new Router({ prefix: '/cache' });

router.get('/names', getCacheNames);
router.get('/key/:cacheName', getCacheKey);
router.get('/remove/:cacheName', removeCache);

export default router;
