import VersionLog from '../models/VersionLog.mjs';
import { Op } from 'sequelize';

// 分页获取所有记录
export const getVersionLogs = async (ctx) => {
  const { typeId, keywords, publishDateBegin, publishDateEnd, page = 1, pageSize = 10 } = ctx.query;
  const offset = (page - 1) * pageSize;
  let where = [];
  if (typeId) where.push({ typeId });
  if (publishDateBegin && publishDateEnd) {
    where.push({ publishDate: { [Op.between]: [publishDateBegin, publishDateEnd] } });
  }
  if (keywords) {
    where.push({
      [Op.or]: [
        { version: { [Op.like]: `%${keywords}%` } },
        { publisher: { [Op.like]: `%${keywords}%` } },
        { content: { [Op.like]: `%${keywords}%` } },
      ],
    });
  }
  try {
    const result = await VersionLog.findAndCountAll({
      where: { [Op.and]: where },
      order: [['createdAt', 'DESC']],
      offset,
      limit: parseInt(pageSize),
    });
    ctx.body = {
      status: 'success',
      msg: '获取列表成功',
      data: result.rows,
      totalCount: result.count,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 新增记录
export const addVersionLog = async (ctx) => {
  const { typeId, version, publisher, publishDate, link, content } = ctx.request.body;
  try {
    if (!version || !publishDate || !content) {
      ctx.body = {
        status: 'fail',
        msg: '版本号、发布日期与版本说明都是必需的',
        code: 400,
      };
      return;
    }
    const isExists = await VersionLog.findOne({ where: { version } });
    if (isExists) {
      ctx.body = {
        status: 'fail',
        msg: '此版本号已使用',
        code: 400,
      };
      return;
    }
    const result = await VersionLog.create({ typeId, version, publisher, publishDate, link, content });
    ctx.body = {
      status: 'success',
      msg: '创建成功',
      data: result,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 获取记录信息
export const getVersionLog = async (ctx) => {
  const { id } = ctx.params;
  try {
    const result = await VersionLog.findByPk(id);
    if (!result) {
      ctx.body = {
        status: 'fail',
        msg: '记录已不存在',
        code: 400,
      };
      return;
    }
    ctx.body = {
      status: 'success',
      msg: '获取信息成功',
      data: result,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 修改记录
export const updateVersionLog = async (ctx) => {
  const { id } = ctx.params;
  const { typeId, version, publisher, publishDate, link, content } = ctx.request.body;
  try {
    const result = await VersionLog.findByPk(id);
    if (!result) {
      ctx.body = {
        status: 'fail',
        msg: '记录已不存在',
        code: 400,
      };
      return;
    }
    const data = { typeId, version, publisher, publishDate, link, content };
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

// 删除记录
export const deleteVersionLog = async (ctx) => {
  const { id } = ctx.params;
  try {
    const result = await VersionLog.findByPk(id);
    if (!result) {
      ctx.body = {
        status: 'fail',
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

// 批量删除记录
export const batchDeleteVersionLog = async (ctx) => {
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
    await VersionLog.destroy({
      where: {
        id: ids,
      },
    });
    ctx.body = {
      status: 'success',
      msg: '批量删除成功',
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};
