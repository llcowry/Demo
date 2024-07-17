import Router from '@koa/router';
import {
  getMenus,
  addMenu,
  getMenu,
  updateMenu,
  deleteMenu,
  batchDeleteMenu,
  getMenuTree,
} from '../controllers/menuController.mjs';

const router = new Router();

router.get('/menus/list', getMenus);
router.get('/menus/tree', getMenuTree);
router.post('/menus', addMenu);
router.put('/menus/:id', updateMenu);
router.delete('/menus/:id', deleteMenu);
router.post('/menus/delete', batchDeleteMenu);
router.get('/menus/:id', getMenu);

export default router;
