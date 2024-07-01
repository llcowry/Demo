import Router from '@koa/router';
import {
  getAdmins,
  getAdmin,
  addAdmin,
  updateAdmin,
  deleteAdmin,
  setAdminStatus,
  setAdminPassword,
  adminLogin,
  adminLogout,
  refreshAdminToken,
} from '../controllers/adminController.mjs';

const router = new Router({ prefix: '/admins' });

router.get('/', getAdmins); // 查看所有管理员
router.post('/', addAdmin); // 新增管理员
router.get('/:id', getAdmin); // 获取管理员
router.put('/:id', updateAdmin); // 修改管理员
router.delete('/:id', deleteAdmin); // 删除管理员
router.post('/:id/status', setAdminStatus); // 设置管理员状态
router.post('/:id/password', setAdminPassword); // 设置管理员密码
router.post('/login', adminLogin); // 管理员登录
router.post('/logout', adminLogout); // 管理员注销
router.post('/refresh-token', refreshAdminToken); // 刷新管理员token

export default router;
