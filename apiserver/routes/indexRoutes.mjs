import Router from '@koa/router';
import { getIndex } from '../controllers/indexController.mjs';

const router = new Router();

router.get('/', getIndex);

export default router;