import Router from '@koa/router';
import { getFiles, updateFile, deleteFile } from '../controllers/fileController.mjs';

const router = new Router();

router.get('/files', getFiles);
router.put('/files/:id', updateFile);
router.delete('/files/:id', deleteFile);

export default router;

/**
 * @swagger
 * tags:
 *   name: File
 *   description: 文件上传管理
 */

/**
 * @swagger
 * /files:
 *   get:
 *     summary: 查看所有文件（分页）
 *     tags: [File]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: 页码
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: 每页显示的记录数
 *     responses:
 *       200:
 *         description: 获取文件列表成功
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
 *                       original_filename:
 *                         type: string
 *                       current_filename:
 *                         type: string
 *                       path:
 *                         type: string
 *                       size:
 *                         type: integer
 *                       type:
 *                         type: string
 *                       description:
 *                         type: string
 *                       uploaded_at:
 *                         type: string
 *                         format: date-time
 *                 totalCount:
 *                   type: integer
 */

/**
 * @swagger
 * /files/{id}:
 *   put:
 *     summary: 修改文件记录
 *     tags: [File]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 文件 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: 文件信息更新成功
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
 * /files/{id}:
 *   delete:
 *     summary: 删除文件和记录
 *     tags: [File]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 文件 ID
 *     responses:
 *       200:
 *         description: 文件和记录删除成功
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
