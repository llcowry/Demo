import Router from '@koa/router';
import { getTableColumn, updateTableColumn, deleteTableColumn } from '../controllers/tableColumnController.mjs';

const router = new Router({ prefix: '/tablecolumns' });

router.get('/:id', getTableColumn); // 获取表格自定义列
router.put('/:id', updateTableColumn); // 更新表格自定义列
router.delete('/:id', deleteTableColumn); // 删除表格自定义列

export default router;
