import { Article, Category } from '../models/Article.mjs';
import { deleteUploadFiles } from './fileController.mjs';
import { Op } from 'sequelize';

// 分页查看文章
export const getArticles = async (ctx) => {
  const { categoryId, keywords, createdAtBegin, createdAtEnd, page = 1, pageSize = 10 } = ctx.query;
  const offset = (page - 1) * pageSize;
  let where = [];
  if (createdAtBegin && createdAtEnd) {
    where.push({ createdAt: { [Op.between]: [createdAtBegin, createdAtEnd] } });
  }
  if (keywords) {
    where.push({
      [Op.or]: [{ title: { [Op.like]: `%${keywords}%` } }, { author: { [Op.like]: `%${keywords}%` } }],
    });
  }
  if (categoryId) where.push({ categoryId });
  try {
    const result = await Article.findAndCountAll({
      where: { [Op.and]: where },
      include: {
        model: Category,
        attributes: ['categoryName'],
      },
      order: [['createdAt', 'DESC']],
      offset,
      limit: parseInt(pageSize),
    });
    const formattedRows = result.rows.map((row) => {
      const rowData = row.toJSON();
      if (rowData.previewImg) rowData.previewImg = JSON.parse(rowData.previewImg);
      if (rowData.attachment) rowData.attachment = JSON.parse(rowData.attachment);
      return {
        ...rowData,
        categoryName: rowData.Category.categoryName,
      };
    });
    ctx.body = {
      status: 'success',
      msg: '获取列表成功',
      data: formattedRows,
      totalCount: result.count,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 添加文章
export const addArticle = async (ctx) => {
  const { categoryId, typeId, title, author, contentText, contentHtml, attachment, previewImg, linkUrl, sort, isHomeShow, isRecommend, isDisabled } =
    ctx.request.body;
  if (!title) {
    ctx.body = {
      status: 'fail',
      msg: '标题不能为空',
      code: 400,
    };
    return;
  }
  try {
    const result = await Article.create({
      categoryId,
      typeId,
      title,
      author,
      contentText,
      contentHtml,
      attachment: JSON.stringify(attachment),
      previewImg: JSON.stringify(previewImg),
      linkUrl,
      sort,
      isHomeShow,
      isRecommend,
      isDisabled,
    });
    ctx.body = {
      status: 'success',
      msg: '添加成功',
      data: result,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 编辑文章
export const updateArticle = async (ctx) => {
  const { articleId } = ctx.params;
  const { categoryId, typeId, title, author, contentText, contentHtml, attachment, previewImg, linkUrl, sort, isHomeShow, isRecommend, isDisabled } =
    ctx.request.body;
  if (!title) {
    ctx.body = {
      status: 'fail',
      msg: '标题不能为空',
      code: 400,
    };
    return;
  }
  try {
    const result = await Article.findByPk(articleId);
    if (!result) {
      ctx.body = {
        status: 'fail',
        msg: '记录已不存在',
        code: 400,
      };
      return;
    }
    const data = {
      categoryId,
      typeId,
      title,
      author,
      contentText,
      contentHtml,
      attachment: JSON.stringify(attachment),
      previewImg: JSON.stringify(previewImg),
      linkUrl,
      sort,
      isHomeShow,
      isRecommend,
      isDisabled,
    };
    const updateResult = await result.update(data);
    ctx.body = {
      status: 'success',
      msg: '更新成功',
      data: updateResult,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 删除文章
export const deleteArticle = async (ctx) => {
  const { articleId } = ctx.params;
  try {
    const result = await Article.findByPk(articleId);
    if (!result) {
      ctx.body = {
        status: 'fail',
        msg: '记录已不存在',
        code: 400,
      };
      return;
    }
    // 删除上传记录与关联的文件
    if (result.attachment) {
      const attachment = JSON.parse(result.attachment);
      if (Array.isArray(attachment)) {
        await deleteUploadFiles(ctx, attachment);
      }
    }
    if (result.previewImg) {
      const previewImg = JSON.parse(result.previewImg);
      if (Array.isArray(previewImg)) {
        await deleteUploadFiles(ctx, previewImg);
      }
    }
    await result.destroy();
    ctx.body = {
      status: 'success',
      msg: '删除成功',
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 批量删除文章
export const batchDeleteArticle = async (ctx) => {
  const { ids } = ctx.request.body;
  if (!ids) {
    ctx.body = {
      status: 'fail',
      msg: '无效参数',
      code: 400,
    };
    return;
  }
  try {
    const deletePromises = ids.map(async (articleId) => {
      const result = await Article.findByPk(articleId);
      if (!result) {
        return { status: 'fail', msg: `文章ID ${articleId} 已不存在` };
      }
      if (result.attachment) {
        const attachment = JSON.parse(result.attachment);
        if (Array.isArray(attachment)) {
          await deleteUploadFiles(ctx, attachment);
        }
      }
      if (result.previewImg) {
        const previewImg = JSON.parse(result.previewImg);
        if (Array.isArray(previewImg)) {
          await deleteUploadFiles(ctx, previewImg);
        }
      }
      await result.destroy();
      return { status: 'success', msg: `文章ID ${articleId} 删除成功` };
    });
    const results = await Promise.all(deletePromises);
    ctx.body = {
      status: 'success',
      msg: '批量删除操作完成',
      data: results,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 查看文章
export const getArticle = async (ctx) => {
  const { articleId } = ctx.params;
  try {
    const result = await Article.findByPk(articleId, {
      include: {
        model: Category,
        attributes: ['categoryName'],
      },
    });
    if (!result) {
      ctx.body = {
        status: 'fail',
        msg: '记录已不存在',
        code: 400,
      };
      return;
    }
    let formattedData = result.toJSON();
    if (formattedData.attachment) formattedData.attachment = JSON.parse(formattedData.attachment);
    if (formattedData.previewImg) formattedData.previewImg = JSON.parse(formattedData.previewImg);
    formattedData = {
      ...formattedData,
      categoryName: formattedData.Category.categoryName,
    };
    ctx.body = {
      status: 'success',
      msg: '获取信息成功',
      data: formattedData,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 获取所有分类
export const getAllCategorys = async (ctx) => {
  const { keywords } = ctx.query;
  let where = {};
  if (keywords) {
    where = { categoryName: { [Op.like]: `%${keywords}%` } };
  }
  try {
    const result = await Category.findAll({
      where,
      order: ['sort'],
    });
    ctx.body = {
      status: 'success',
      msg: '获取列表成功',
      data: result,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 新增分类
export const addCategory = async (ctx) => {
  const { categoryName, adminId, pid, sort } = ctx.request.body;

  if (!categoryName) {
    ctx.body = {
      status: 'error',
      msg: '名称是必填项',
      code: 400,
    };
    return;
  }

  try {
    const isExists = await Category.findOne({ where: { categoryName } });
    if (isExists) {
      ctx.body = {
        status: 'error',
        msg: '名称已被占用',
        code: 400,
      };
      return;
    }
    const result = await Category.create({ categoryName, adminId, pid, sort });
    ctx.body = {
      status: 'success',
      msg: '创建成功',
      data: result,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 修改分类
export const updateCategory = async (ctx) => {
  const { categoryId } = ctx.params;
  const { categoryName, pid, sort } = ctx.request.body;

  try {
    const result = await Category.findByPk(categoryId);
    if (!result) {
      ctx.body = {
        status: 'error',
        msg: '记录已不存在',
        code: 400,
      };
      return;
    }
    const data = { categoryName, pid, sort };
    const updatedResult = await result.update(data);
    ctx.body = {
      status: 'success',
      msg: '更新成功',
      data: updatedResult,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 删除分类
export const deleteCategory = async (ctx) => {
  const { categoryId } = ctx.params;

  try {
    const result = await Category.findByPk(categoryId);
    if (!result) {
      ctx.body = {
        status: 'error',
        msg: '记录已不存在',
        code: 400,
      };
      return;
    }
    await result.destroy();
    ctx.body = {
      status: 'success',
      msg: '删除成功',
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};
