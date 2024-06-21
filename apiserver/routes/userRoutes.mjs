import Router from '@koa/router';
import { getUsers, addUser, updateUser, deleteUser } from '../controllers/userController.mjs';

const router = new Router();

router.get('/users', getUsers); // 查看所有用户
router.post('/users', addUser); // 新增用户
router.put('/users/:id', updateUser); // 修改用户
router.delete('/users/:id', deleteUser); // 删除用户

export default router;