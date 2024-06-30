import Router from '@koa/router';
import { getDicts, addDict, getDict, updateDict, deleteDict, batchDeleteDict } from '../controllers/dictController.mjs';

const router = new Router({ prefix: '/dicts' });

router.get('/', getDicts);
router.post('/', addDict);
router.get('/:id', getDict);
router.put('/:id', updateDict);
router.delete('/:id', deleteDict);
router.post('/delete', batchDeleteDict);

export default router;
