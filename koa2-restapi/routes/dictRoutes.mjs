import Router from '@koa/router';
import {
  getDicts,
  getDictsByKeyName,
  addDict,
  deleteDict,
  updateDict,
  getDict,
  batchDeleteDict,
} from '../controllers/dictController.mjs';

const router = new Router({ prefix: '/dicts' });

router.post('/list', getDicts);
router.post('/list/keyName', getDictsByKeyName);
router.post('/', addDict);
router.put('/:id', updateDict);
router.delete('/:id', deleteDict);
router.post('/delete', batchDeleteDict);
router.get('/:id', getDict);

export default router;
