import Router from '@koa/router';
import { getUsers, addUser, updateUser, deleteUser } from '../controllers/userController.mjs';

const router = new Router();

router.get('/users', getUsers); // 查看所有用户
router.post('/users', addUser); // 新增用户
router.put('/users/:id', updateUser); // 修改用户
router.delete('/users/:id', deleteUser); // 删除用户

export default router;

/**
 * @swagger
 * tags:
 *   name: User
 *   description: 用户管理
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: 查看所有用户
 *     tags: [User]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: 页码
 *         required: false
 *         type: integer
 *         default: 1
 *       - name: pageSize
 *         in: query
 *         description: 每页记录数
 *         required: false
 *         type: integer
 *         default: 10
 *     responses:
 *       200:
 *         description: 用户列表获取成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 msg:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       username:
 *                         type: string
 *                       nickname:
 *                         type: string
 *                       gender:
 *                         type: string
 *                       birthday:
 *                         type: string
 *                         format: date
 *                       avatar:
 *                         type: string
 *                       level:
 *                         type: integer
 *                 totalCount:
 *                   type: integer
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: 新增用户
 *     tags: [User]
 *     requestBody:
 *       description: 用户信息
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               nickname:
 *                 type: string
 *               gender:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *               avatar:
 *                 type: string
 *               level:
 *                 type: integer
 *     responses:
 *       200:
 *         description: 用户新增成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 msg:
 *                   type: string
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: 修改用户
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: 用户ID
 *         required: true
 *         type: integer
 *     requestBody:
 *       description: 更新的用户信息
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               nickname:
 *                 type: string
 *               gender:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *               avatar:
 *                 type: string
 *               level:
 *                 type: integer
 *     responses:
 *       200:
 *         description: 用户信息更新成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 msg:
 *                   type: string
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: 删除用户
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: 用户ID
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: 用户删除成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 msg:
 *                   type: string
 */
