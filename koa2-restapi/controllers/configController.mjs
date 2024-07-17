import Config from '../models/Config.mjs';
import { Op } from 'sequelize';

// 分页获取所有配置
export const getConfigs = async (ctx) => {
  const { keywords, page = 1, pageSize = 10 } = ctx.query;
  const offset = (page - 1) * pageSize;
  let where = {};
  if (keywords) {
    where = {
      [Op.or]: [
        { configName: { [Op.like]: `%${keywords}%` } },
        { configKey: { [Op.like]: `%${keywords}%` } },
        { configValue: { [Op.like]: `%${keywords}%` } },
      ],
    };
  }
  try {
    const configs = await Config.findAndCountAll({
      where,
      offset,
      limit: parseInt(pageSize),
    });
    ctx.body = {
      status: 'success',
      msg: '获取列表成功',
      data: configs.rows,
      totalCount: configs.count,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 新增配置
export const addConfig = async (ctx) => {
  const { configKey, configValue, configName, remark } = ctx.request.body;

  if (!configKey || !configValue || !configName) {
    ctx.body = {
      status: 'fail',
      msg: '键、值与名称都是必填项',
      code: 400,
    };
    return;
  }

  try {
    const isExists = await Config.findOne({ where: { configValue } });
    if (isExists) {
      ctx.body = {
        status: 'fail',
        msg: '配置已被占用',
        code: 400,
      };
      return;
    }
    const config = await Config.create({ configKey, configValue, configName, remark });
    ctx.body = {
      status: 'success',
      msg: '创建成功',
      data: config,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 获取配置信息
export const getConfig = async (ctx) => {
  const { id } = ctx.params;

  try {
    const config = await Config.findByPk(id);
    if (!config) {
      ctx.body = {
        status: 'fail',
        msg: '配置不存在',
        code: 400,
      };
      return;
    }
    ctx.body = {
      status: 'success',
      msg: '获取信息成功',
      data: config,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 修改配置
export const updateConfig = async (ctx) => {
  const { id } = ctx.params;
  const { configKey, configValue, configName, remark } = ctx.request.body;

  try {
    const config = await Config.findByPk(id);
    if (!config) {
      ctx.body = {
        status: 'fail',
        msg: '配置不存在',
        code: 400,
      };
      return;
    }
    const data = { configKey, configValue, configName, remark };
    const updatedConfig = await config.update(data);
    ctx.body = {
      status: 'success',
      msg: '更新成功',
      data: updatedConfig,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 删除配置
export const deleteConfig = async (ctx) => {
  const { id } = ctx.params;

  try {
    const config = await Config.findByPk(id);
    if (!config) {
      ctx.body = {
        status: 'fail',
        msg: '配置不存在',
        code: 400,
      };
      return;
    }
    await config.destroy();
    ctx.body = {
      status: 'success',
      msg: '删除成功',
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};
