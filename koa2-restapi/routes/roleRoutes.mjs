import Router from '@koa/router';
import { getRoles, getRole, addRole, updateRole, deleteRole, setRoleMenus } from '../controllers/roleController.mjs';

const router = new Router({ prefix: '/roles' });

router.get('/', getRoles); // 查看所有角色
router.post('/', addRole); // 新增角色
router.get('/:id', getRole); // 获取角色
router.put('/:id', updateRole); // 修改角色
router.delete('/:id', deleteRole); // 删除角色
router.post('/:id/menus', setRoleMenus); // 设置角色所属菜单

export default router;
