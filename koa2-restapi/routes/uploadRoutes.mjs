import Router from '@koa/router';
import { uploadHandler, saveUploadInfo } from '../controllers/uploadController.mjs';

const router = new Router();

router.post('/upload', uploadHandler, saveUploadInfo);

export default router;

/**
 * @swagger
 * tags:
 *   name: Uploads
 *   description: 文件上传管理
 */

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: 上传文件
 *     tags: [Uploads]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: 文件上传和数据保存成功
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
 *                       status:
 *                         type: string
 *                       msg:
 *                         type: string
 *                       data:
 *                         type: object
 *                         properties:
 *                           originalname:
 *                             type: string
 *                           filename:
 *                             type: string
 *                           path:
 *                             type: string
 *                           size:
 *                             type: integer
 *                           type:
 *                             type: string
 */
