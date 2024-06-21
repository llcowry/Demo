import Router from '@koa/router';
import { uploadHandler, saveUploadInfo } from '../middlewares/uploadHandler.mjs';

const router = new Router();

router.post('/upload', uploadHandler, saveUploadInfo);

export default router;
