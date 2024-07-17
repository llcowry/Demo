import Router from '@koa/router';
import { getAdminLogs, clearAdminLog } from '../controllers/adminLogController.mjs';

const router = new Router();

router.get('/adminlogs/list', getAdminLogs);
router.post('/adminlogs/clear', clearAdminLog);

export default router;
