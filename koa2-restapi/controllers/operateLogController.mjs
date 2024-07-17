import OperateLog from '../models/OperateLog.mjs';
import { verifyToken } from '../utils/common.mjs';
import { Op } from 'sequelize';

// 分页查看操作日志
export const getOperateLogs = async (ctx) => {
  const { adminName, result, createdAtBegin, createdAtEnd, page = 1, pageSize = 10 } = ctx.query;
  const offset = (page - 1) * pageSize;
  let where = {};
  if (adminName) where.adminName = { [Op.like]: `%${adminName}%` };
  if (result) where.result = result === 'true' ? true : false;
  if (createdAtBegin && createdAtEnd) {
    where.createdAt = { [Op.between]: [createdAtBegin, createdAtEnd] };
  }
  try {
    const operatelogs = await OperateLog.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      offset,
      limit: parseInt(pageSize),
    });
    ctx.body = {
      status: 'success',
      msg: '获取列表成功',
      data: operatelogs.rows,
      totalCount: operatelogs.count,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 查看操作日志
export const getOperateLogDetail = async (ctx) => {
  const { id } = ctx.params;
  try {
    const operatelog = await OperateLog.findByPk(id);
    if (!operatelog) {
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
      data: operatelog,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 新增操作日志
export const addOperateLog = async (ctx, err) => {
  const token = ctx.headers.authorization;
  try {
    const user = verifyToken(token);
    await OperateLog.create({
      adminId: user.id,
      adminName: user.username,
      url: ctx.url,
      method: ctx.method,
      params: JSON.stringify(ctx.request.body),
      result: ctx.status == 200,
      loginIp: ctx.ip || ctx.headers['x-forwarded-for'] || ctx.request.ip,
      userAgent: ctx.headers['user-agent'],
      remark: err,
    });
  } catch (error) {
    // ctx.throw(500, error.message);
    ctx.body = {
      status: 'error',
      msg: error.message,
      code: 400,
    };
  }
};

// 清空日志
export const clearOperateLog = async (ctx) => {
  try {
    await OperateLog.destroy({
      truncate: true,
    });
    ctx.body = {
      status: 'success',
      msg: '操作成功',
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};
