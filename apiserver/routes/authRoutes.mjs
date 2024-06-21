import Router from '@koa/router';
import { register, login, logout, refreshToken } from '../controllers/authController.mjs';

const router = new Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);

export default router;