import Feedback from '../models/Feedback.mjs';
import { deleteUploadFiles } from './fileController.mjs';
import { Op } from 'sequelize';

// 分页查看留言反馈
export const getFeedbacks = async (ctx) => {
  const { keywords, createdAtBegin, createdAtEnd, page = 1, pageSize = 10 } = ctx.query;
  const offset = (page - 1) * pageSize;
  let where = {};
  const timeCondition = {};
  if (createdAtBegin && createdAtEnd) {
    timeCondition.createdAt = { [Op.between]: [createdAtBegin, createdAtEnd] };
  }
  if (keywords) {
    where = {
      [Op.or]: [
        { [Op.and]: [{ userName: { [Op.like]: `%${keywords}%` } }, timeCondition] },
        { [Op.and]: [{ content: { [Op.like]: `%${keywords}%` } }, timeCondition] },
      ],
    };
  } else if (createdAtBegin && createdAtEnd) {
    where = timeCondition;
  }
  try {
    const result = await Feedback.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      offset,
      limit: parseInt(pageSize),
    });
    const formattedRows = result.rows.map((row) => {
      if (row.attachment) {
        row.attachment = JSON.parse(row.attachment);
      }
      return row;
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

// 新增留言反馈
export const addFeedback = async (ctx) => {
  const { userId, userName, content, attachment } = ctx.request.body;
  if (!content) {
    ctx.body = {
      status: 'fail',
      msg: '留言内容不能为空',
      code: 400,
    };
    return;
  }
  try {
    const result = await Feedback.create({ userId, userName, content, attachment: JSON.stringify(attachment) });
    ctx.body = {
      status: 'success',
      msg: '创建成功',
      data: result,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 修改留言反馈
export const updateFeedback = async (ctx) => {
  const { id } = ctx.params;
  const { isRead } = ctx.request.body;
  try {
    const result = await Feedback.findByPk(id);
    if (!result) {
      ctx.body = {
        status: 'fail',
        msg: '记录已不存在',
        code: 400,
      };
      return;
    }
    const updatedResult = await result.update({ isRead });
    ctx.body = {
      status: 'success',
      msg: '更新成功',
      data: updatedResult,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 删除留言反馈
export const deleteFeedback = async (ctx) => {
  const { id } = ctx.params;
  try {
    const result = await Feedback.findByPk(id);
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
      await deleteUploadFiles(ctx, attachment);
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

// 获取留言反馈
export const getFeedback = async (ctx) => {
  const { id } = ctx.params;
  try {
    const result = await Feedback.findByPk(id);
    if (!result) {
      ctx.body = {
        status: 'error',
        msg: '记录已不存在',
        code: 400,
      };
      return;
    }
    let formattedData = result.toJSON();
    if (formattedData.attachment) formattedData.attachment = JSON.parse(formattedData.attachment);
    ctx.body = {
      status: 'success',
      msg: '获取信息成功',
      data: formattedData,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};
