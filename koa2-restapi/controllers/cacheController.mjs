import { redis } from '../db/database.mjs';

// 获取所有缓存
export const getCacheNames = async (ctx) => {
  try {
    let cursor = '0';
    let keys = [];
    do {
      const result = await redis.scan(cursor, 'MATCH', '*', 'COUNT', '100');
      cursor = result[0];
      keys.push(...result[1]);
    } while (cursor !== '0');
    ctx.body = {
      status: 'success',
      msg: '获取列表成功',
      data: keys,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 根据缓存名称获取对应值
export const getCacheKey = async (ctx) => {
  const { cacheName } = ctx.params;
  try {
    const cachedValue = await redis.get(cacheName);
    ctx.body = {
      status: 'success',
      msg: '获取成功',
      data: JSON.parse(cachedValue),
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 删除对应缓存
export const removeCache = async (ctx) => {
  const { cacheName } = ctx.params;
  try {
    await redis.del(cacheName);
    ctx.body = {
      status: 'success',
      msg: '删除成功',
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};
