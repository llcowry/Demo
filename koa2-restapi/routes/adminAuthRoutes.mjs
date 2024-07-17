import Router from '@koa/router';
import { adminLogin, adminLogout, refreshAdminToken, getCaptcha } from '../controllers/adminController.mjs';

const router = new Router({
  prefix: '/admins',
});

router.post('/login', adminLogin); // 管理员登录
router.post('/logout', adminLogout); // 管理员注销
router.post('/refreshToken', refreshAdminToken); // 刷新管理员token
router.get('/captcha', getCaptcha); // 获取登录验证码

export default router;
