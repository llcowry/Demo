import Router from '@koa/router';
import { getIndex } from '../controllers/indexController.mjs';

const router = new Router();

router.get('/', getIndex);

export default router;

/**
 * @swagger
 * tags:
 *   name: Index
 *   description: 首页信息
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: 获取首页信息
 *     description: 返回首页的欢迎信息
 *     tags: [Index]
 *     responses:
 *       200:
 *         description: 首页信息获取成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 欢迎信息
 */
