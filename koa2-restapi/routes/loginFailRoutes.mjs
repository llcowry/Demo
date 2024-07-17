import Router from '@koa/router';
import { getLoginFails, batchDeleteLoginFail } from '../controllers/loginFailController.mjs';

const router = new Router();

router.get('/loginfail/list', getLoginFails); // 分页查看登录失败日志
router.post('/loginfail/delete', batchDeleteLoginFail); // 批量登录失败日志

export default router;
