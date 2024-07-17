import { Dict } from '../models/Dict.mjs';
import { Op } from 'sequelize';
import { redis } from '../db/database.mjs';

// 分页获取所有字典
export const getDicts = async (ctx) => {
  const { keywords, page = 1, pageSize = 10 } = ctx.request.body;
  const offset = (page - 1) * pageSize;
  let where = {};
  if (keywords) {
    where = {
      [Op.or]: [
        { keyCode: { [Op.like]: `%${keywords}%` } },
        { keyValue: { [Op.like]: `%${keywords}%` } },
        { keyName: { [Op.like]: `%${keywords}%` } },
      ],
    };
  }
  try {
    const dicts = await Dict.findAndCountAll({
      where,
      offset,
      limit: parseInt(pageSize),
    });
    ctx.body = {
      status: 'success',
      msg: '获取列表成功',
      data: dicts.rows,
      totalCount: dicts.count,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 根据keyName获取字典
export const getDictsByKeyName = async (ctx) => {
  const { keyName } = ctx.request.body;
  const dictKey = `dict:${keyName}`;
  try {
    const fetchDataAndCache = async () => {
      const result = await Dict.findAll({
        where: { keyName },
        order: ['keyValue'],
      });
      await redis.set(dictKey, JSON.stringify(result), 'EX', 24 * 60 * 60);
      return result;
    };
    let dicts = [];
    let storedDicts = await redis.get(dictKey);
    if (storedDicts) {
      try {
        dicts = JSON.parse(storedDicts);
      } catch (e) {
        console.error(`Error parsing cached data for ${dictKey}:`, e);
        dicts = await fetchDataAndCache();
      }
    } else {
      dicts = await fetchDataAndCache();
    }
    ctx.body = {
      status: 'success',
      msg: '获取列表成功',
      data: dicts,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 新增字典
export const addDict = async (ctx) => {
  const { keyCode, keyValue, keyName, remark } = ctx.request.body;

  if (!keyCode || !keyValue || !keyName) {
    ctx.body = {
      status: 'fail',
      msg: '编码、值与名称都是必填项',
      code: 400,
    };
    return;
  }

  try {
    const isExists = await Dict.findOne({ where: { keyValue } });
    if (isExists) {
      ctx.body = {
        status: 'fail',
        msg: '字典值已被占用',
        code: 400,
      };
      return;
    }
    const dict = await Dict.create({ keyCode, keyValue, keyName, remark });
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
      ctx.body = {
        status: 'fail',
        msg: '字典不存在',
        code: 400,
      };
      return;
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
  const { keyCode, keyValue, keyName, remark } = ctx.request.body;

  try {
    const dict = await Dict.findByPk(id);
    if (!dict) {
      ctx.body = {
        status: 'fail',
        msg: '字典不存在',
        code: 400,
      };
      return;
    }
    const data = { keyCode, keyValue, keyName, remark };
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
      ctx.body = {
        status: 'fail',
        msg: '字典不存在',
        code: 400,
      };
      return;
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
  if (!ids) {
    ctx.body = {
      status: 'fail',
      msg: '无效参数',
      code: 400,
    };
    return;
  }

  try {
    await Dict.destroy({
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
