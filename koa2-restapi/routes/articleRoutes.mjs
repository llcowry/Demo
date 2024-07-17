import Router from '@koa/router';
import {
  getArticles,
  addArticle,
  updateArticle,
  deleteArticle,
  batchDeleteArticle,
  getArticle,
  getAllCategorys,
  addCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/articleController.mjs';

const router = new Router();

router.get('/articles/list', getArticles); // 分页查询文章
router.post('/articles', addArticle); // 添加文章
router.put('/articles/:articleId', updateArticle); // 编辑文章
router.delete('/articles/:articleId', deleteArticle); // 删除文章
router.post('/articles/delete', batchDeleteArticle); // 批量删除文章
router.get('/articles/detail/:articleId', getArticle); // 查看文章详情

router.get('/articles/category/all', getAllCategorys); // 获取所有分类
router.post('/articles/category', addCategory); // 添加分类
router.put('/articles/category/:categoryId', updateCategory); // 修改分类
router.delete('/articles/category/:categoryId', deleteCategory); // 删除分类

export default router;
