import Router from '@koa/router';
import {
  getRoles,
  getRole,
  addRole,
  updateRole,
  deleteRole,
  getRoleMenus,
  setRoleMenus,
  getRoleAdmins,
  getAllRoleAdmins,
  deleteRoleAdmins,
  batchDeleteRoleAdmins,
  batchAddRoleAdmins,
} from '../controllers/roleController.mjs';

const router = new Router({ prefix: '/roles' });

router.get('/list', getRoles); // 查看所有角色
router.post('/', addRole); // 新增角色
router.put('/:id', updateRole); // 修改角色
router.delete('/:id', deleteRole); // 删除角色
router.get('/:id/menus', getRoleMenus); // 获取角色所属菜单
router.post('/:id/menus', setRoleMenus); // 设置角色所属菜单
router.get('/:id/admins/list', getRoleAdmins); // 分页获取角色所属用户
router.get('/:id/admins/all', getAllRoleAdmins); // 获取所有角色所属用户
router.delete('/:id/admins/delete/:adminId', deleteRoleAdmins); // 删除角色所属用户
router.post('/:id/admins/delete', batchDeleteRoleAdmins); // 批量删除角色所属用户
router.post('/:id/admins/add', batchAddRoleAdmins); // 批量设置角色所属用户
router.get('/:id', getRole); // 获取角色

export default router;
