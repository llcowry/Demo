import Router from '@koa/router';
import {
  getLoginInfo,
  getAdmins,
  getAllAdmins,
  getAdmin,
  addAdmin,
  updateAdmin,
  deleteAdmin,
  batchDeleteAdmin,
  setAdminStatus,
  setAdminPassword,
  resetAdminPassword,
  batchUpdateDepartment,
} from '../controllers/adminController.mjs';

const router = new Router({ prefix: '/admins' });

router.get('/login/info', getLoginInfo); // 获取登录信息
router.get('/list', getAdmins); // 分页查看所有管理员
router.get('/all', getAllAdmins); // 查看所有管理员
router.post('/', addAdmin); // 新增管理员
router.put('/:id', updateAdmin); // 修改管理员
router.delete('/:id', deleteAdmin); // 删除管理员
router.post('/delete', batchDeleteAdmin); // 批量删除管理员
router.post('/:id/status', setAdminStatus); // 设置管理员状态
router.post('/password', setAdminPassword); // 设置管理员密码
router.post('/:id/password/reset', resetAdminPassword); // 重置管理员密码
router.post('/departments/update', batchUpdateDepartment); // 批量更新部门
router.get('/:id', getAdmin); // 获取管理员

export default router;
