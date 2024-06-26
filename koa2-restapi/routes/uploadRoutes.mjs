import Router from '@koa/router';
import { uploadHandler, saveUploadInfo, getFiles, updateFile, deleteFile } from '../controllers/uploadController.mjs';

const router = new Router();

router.post('/upload', uploadHandler, saveUploadInfo);
router.get('/files', getFiles);
router.put('/files/:id', updateFile);
router.delete('/files/:id', deleteFile);

export default router;

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: 上传文件管理
 */

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: 上传文件
 *     description: 上传文件并保存文件信息到数据库
 *     tags: [Upload]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: files
 *         in: formData
 *         description: 要上传的文件
 *         required: true
 *         type: array
 *         items:
 *           type: file
 *     responses:
 *       200:
 *         description: 文件上传并保存成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: 操作状态
 *                 msg:
 *                   type: string
 *                   description: 消息
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       filename:
 *                         type: string
 *                         description: 文件名
 *                       path:
 *                         type: string
 *                         description: 文件路径
 */

/**
 * @swagger
 * /files:
 *   get:
 *     summary: 查看所有文件（分页）
 *     description: 获取分页的文件信息列表
 *     tags: [Upload]
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
 *         description: 文件列表获取成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: 操作状态
 *                 msg:
 *                   type: string
 *                   description: 消息
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: 文件ID
 *                       filename:
 *                         type: string
 *                         description: 文件名
 *                       path:
 *                         type: string
 *                         description: 文件路径
 *                       uploaded_at:
 *                         type: string
 *                         format: date-time
 *                         description: 上传时间
 */

/**
 * @swagger
 * /files/{id}:
 *   put:
 *     summary: 修改文件记录
 *     description: 根据文件ID修改文件信息
 *     tags: [Upload]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: 文件ID
 *         required: true
 *         type: integer
 *       - name: body
 *         in: body
 *         description: 要更新的文件信息
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             filename:
 *               type: string
 *               description: 文件名
 *             path:
 *               type: string
 *               description: 文件路径
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
 *                   description: 操作状态
 *                 msg:
 *                   type: string
 *                   description: 消息
 */

/**
 * @swagger
 * /files/{id}:
 *   delete:
 *     summary: 删除文件和记录
 *     description: 根据文件ID删除文件及其数据库记录
 *     tags: [Upload]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: 文件ID
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: 文件删除成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: 操作状态
 *                 msg:
 *                   type: string
 *                   description: 消息
 */
