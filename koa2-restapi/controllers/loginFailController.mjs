import LoginFail from '../models/LoginFail.mjs';
import config from '../config/config.mjs';
import { Op } from 'sequelize';

// 分页查看登录失败日志
export const getLoginFails = async (ctx) => {
  const { adminName, isLock, lockBeginAtBegin, lockBeginAtEnd, page = 1, pageSize = 10 } = ctx.query;
  const offset = (page - 1) * pageSize;
  let where = {};
  if (adminName) where.adminName = { [Op.like]: `%${adminName}%` };
  if (isLock) where.isLock = isLock === 'true' ? true : false;
  if (lockBeginAtBegin && lockBeginAtEnd) {
    where.lockBeginAt = { [Op.between]: [lockBeginAtBegin, lockBeginAtEnd] };
  }
  try {
    const result = await LoginFail.findAndCountAll({
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

// 保存登录失败日志
export const saveLoginFail = async (ctx, data) => {
  const { adminId, adminName } = data;
  try {
    const loginfail = await LoginFail.findOne({ where: { adminName } });
    if (loginfail) {
      let currentCount = loginfail.failCount + 1;
      if (loginfail.failCount < config.LOGINFAIL_LOCK_COUNT) {
        loginfail.update({ failCount: currentCount });
      }
      if (currentCount == config.LOGINFAIL_LOCK_COUNT) {
        loginfail.update({ isLock: true, lockBeginAt: new Date() });
      }
    } else {
      await LoginFail.create({ adminId, adminName, failCount: 1 });
    }
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 批量登录失败日志
export const batchDeleteLoginFail = async (ctx) => {
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
    await LoginFail.destroy({ where: { id: ids } });
    ctx.body = {
      status: 'success',
      msg: '批量删除成功',
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};
