import Router from '@koa/router';
import { getOperateLogs, getOperateLogDetail, clearOperateLog } from '../controllers/operateLogController.mjs';

const router = new Router();

router.get('/operatelogs/list', getOperateLogs);
router.get('/operatelogs/detail/:id', getOperateLogDetail);
router.post('/operatelogs/clear', clearOperateLog);

export default router;
