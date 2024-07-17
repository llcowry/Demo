import AdminLog from '../models/AdminLog.mjs';
import { Op } from 'sequelize';

// 分页查看登录日志
export const getAdminLogs = async (ctx) => {
  const { adminName, loginIp, loginResult, createdAtBegin, createdAtEnd, page = 1, pageSize = 10 } = ctx.query;
  const offset = (page - 1) * pageSize;
  let where = {};
  if (adminName) where.adminName = { [Op.like]: `%${adminName}%` };
  if (loginIp) where.loginIp = { [Op.like]: `%${loginIp}%` };
  if (loginResult) where.loginResult = loginResult;
  if (createdAtBegin && createdAtEnd) {
    where.createdAt = { [Op.between]: [createdAtBegin, createdAtEnd] };
  }
  try {
    const result = await AdminLog.findAndCountAll({
      where,
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

// 新增登录日志
export const addAdminLog = async (ctx, data) => {
  const { adminId, adminName, loginResult, remark } = data;
  try {
    await AdminLog.create({
      adminId,
      adminName,
      loginResult,
      remark,
      loginIp: ctx.headers['x-forwarded-for'] || ctx.request.ip,
      userAgent: ctx.headers['user-agent'],
    });
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 清空日志
export const clearAdminLog = async (ctx) => {
  try {
    await AdminLog.destroy({
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
