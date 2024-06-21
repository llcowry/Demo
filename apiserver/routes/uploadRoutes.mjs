import Router from '@koa/router';
import { uploadHandler, saveUploadInfo, getFiles, updateFile, deleteFile } from '../controllers/uploadController.mjs';

const router = new Router();

router.post('/upload', uploadHandler, saveUploadInfo); // 上传文件
router.get('/files', getFiles); // 查看所有文件（分页）
router.put('/files/:id', updateFile); // 修改文件记录
router.delete('/files/:id', deleteFile); // 删除文件和记录

export default router;
