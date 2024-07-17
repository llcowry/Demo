import Router from '@koa/router';
import {
  getVersionLogs,
  addVersionLog,
  updateVersionLog,
  deleteVersionLog,
  batchDeleteVersionLog,
} from '../controllers/versionLogController.mjs';

const router = new Router({ prefix: '/versionlogs' });

router.get('/list', getVersionLogs); // 查看所有版本更新日志
router.post('/', addVersionLog); // 新增版本更新日志
router.put('/:id', updateVersionLog); // 修改版本更新日志
router.delete('/:id', deleteVersionLog); // 删除版本更新日志
router.post('/delete', batchDeleteVersionLog); // 批量删除版本更新日志

export default router;
