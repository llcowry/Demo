import Router from '@koa/router';
import { register, login, logout, refreshToken } from '../controllers/authController.mjs';

const router = new Router({
  prefix: '/auth',
});

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);

export default router;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 授权管理
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: 用户注册
 *     description: 创建一个新用户
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: 用户名
 *               password:
 *                 type: string
 *                 description: 密码
 *     responses:
 *       201:
 *         description: 用户注册成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: 用户ID
 *                 username:
 *                   type: string
 *                   description: 用户名
 *       400:
 *         description: 注册失败
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 用户登录
 *     description: 用户登录并获取令牌
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: 用户名
 *               password:
 *                 type: string
 *                 description: 密码
 *     responses:
 *       200:
 *         description: 登录成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: 访问令牌
 *       401:
 *         description: 登录失败
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: 用户注销
 *     description: 注销当前用户
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: 注销成功
 *       401:
 *         description: 注销失败
 */

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: 刷新令牌
 *     description: 刷新用户的访问令牌
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: 刷新令牌
 *     responses:
 *       200:
 *         description: 令牌刷新成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: 新的访问令牌
 *       401:
 *         description: 刷新令牌失败
 */
