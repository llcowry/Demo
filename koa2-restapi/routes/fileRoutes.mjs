import Router from '@koa/router';
import { getFiles, getFilePath, updateFile, deleteFile, downloadFile } from '../controllers/fileController.mjs';

const router = new Router();

router.get('/files/list', getFiles);
router.get('/files/path', getFilePath);
router.get('/files/download', downloadFile);
router.put('/files/:id', updateFile);
router.delete('/files/:id', deleteFile);

export default router;
