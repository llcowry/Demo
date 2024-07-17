import Router from '@koa/router';
import { getConfigs, addConfig, getConfig, updateConfig, deleteConfig } from '../controllers/configController.mjs';

const router = new Router({ prefix: '/config' });

router.get('/list', getConfigs);
router.post('/', addConfig);
router.put('/:id', updateConfig);
router.delete('/:id', deleteConfig);
router.get('/:id', getConfig);

export default router;
