import Router from '@koa/router';
import { getDepts, getDeptTree, getDept, addDept, updateDept, deleteDept } from '../controllers/deptController.mjs';

const router = new Router({ prefix: '/departments' });

router.get('/all', getDepts); // 查看所有部门
router.get('/tree', getDeptTree); // 查看所有部门树形结构
router.post('/', addDept); // 新增部门
router.put('/:id', updateDept); // 修改部门
router.delete('/:id', deleteDept); // 删除部门
router.get('/:id', getDept); // 获取部门

export default router;
