import Router from '@koa/router';
import { uploadHandler, saveUploadInfo } from '../controllers/uploadController.mjs';

const router = new Router();

router.post('/upload', uploadHandler, saveUploadInfo);

export default router;
