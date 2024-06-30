import { Dict } from '../models/Dict.mjs';

// 获取所有字典
export const getDicts = async (ctx) => {
  const { page = 1, pageSize = 10 } = ctx.query;
  const offset = (page - 1) * pageSize;

  try {
    const dicts = await Dict.findAndCountAll({
      offset,
      limit: parseInt(pageSize),
    });
    ctx.body = {
      status: 'success',
      msg: '获取列表成功',
      data: dicts.rows,
      totalCount: dicts.count,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 新增字典
export const addDict = async (ctx) => {
  const { keyCode, keyName, note } = ctx.request.body;

  if (!keyCode || !keyName) {
    ctx.throw(400, '字典编码与名称是必需的');
  }

  try {
    const isExists = await Dict.findOne({ where: { keyCode } });
    if (isExists) {
      ctx.throw(400, '字典编码已被占用');
    }
    const dict = await Dict.create({ keyCode, keyName, note });
    ctx.body = {
      status: 'success',
      msg: '创建成功',
      data: dict,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 获取字典信息
export const getDict = async (ctx) => {
  const { id } = ctx.params;

  try {
    const dict = await Dict.findByPk(id);
    if (!dict) {
      ctx.throw(400, '字典不存在');
    }
    ctx.body = {
      status: 'success',
      msg: '获取信息成功',
      data: dict,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 修改字典
export const updateDict = async (ctx) => {
  const { id } = ctx.params;
  const { keyCode, keyName, note } = ctx.request.body;

  try {
    const dict = await Dict.findByPk(id);
    if (!dict) {
      ctx.throw(400, '字典不存在');
    }
    const data = { keyCode, keyName, note };
    const updatedDict = await dict.update(data);
    ctx.body = {
      status: 'success',
      msg: '更新成功',
      data: updatedDict,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 删除字典
export const deleteDict = async (ctx) => {
  const { id } = ctx.params;

  try {
    const dict = await Dict.findByPk(id);
    if (!dict) {
      ctx.throw(400, '字典不存在');
    }
    await dict.destroy();
    ctx.body = {
      status: 'success',
      msg: '删除成功',
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 批量删除字典
export const batchDeleteDict = async (ctx) => {
  const { ids } = ctx.request.body;

  try {
    if (!Array.isArray(ids)) {
      ctx.throw(400, '无效参数：ids 应为ID数组');
    }
    await Dict.destroy({
      where: {
        id: ids
      }
    });
    ctx.body = {
      status: 'success',
      msg: '批量删除成功',
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};
