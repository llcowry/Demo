import Router from '@koa/router';
import { getMenus, addMenu, getMenu, updateMenu, deleteMenu } from '../controllers/menuController.mjs';

const router = new Router({ prefix: '/menus' });

router.get('/', getMenus);
router.post('/', addMenu);
router.get('/:id', getMenu);
router.put('/:id', updateMenu);
router.delete('/:id', deleteMenu);

export default router;
