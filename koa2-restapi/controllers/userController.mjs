import { getPaginatedData, insertData, updateDataById, deleteDataById, getDataById } from '../db/mysql.mjs';
import crypto from 'crypto';

// 使用 MD5 加密密码
const hashPassword = (password) => {
  return crypto.createHash('md5').update(password).digest('hex');
};

// 查看所有用户（分页处理）
export const getUsers = async (ctx) => {
  const { page = 1, pageSize = 10 } = ctx.query;
  const result = await getPaginatedData('users', parseInt(page), parseInt(pageSize));

  if (result.status === 'error') {
    ctx.throw(500, result.msg);
  }

  ctx.body = {
    status: 'success',
    msg: '获取用户列表成功',
    data: result.data,
    totalCount: result.totalCount,
  };
};

// 新增用户
export const addUser = async (ctx) => {
  const { username, password, nickname, gender, birthday, avatar, level } = ctx.request.body;

  if (!username || !password) {
    ctx.throw(400, '用户名和密码是必需的');
  }

  const hashedPassword = hashPassword(password);
  const result = await insertData('users', { username, password: hashedPassword, nickname, gender, birthday, avatar, level });

  if (result.status === 'error') {
    ctx.throw(500, result.msg);
  }

  ctx.body = {
    status: 'success',
    msg: '用户新增成功',
  };
};

// 修改用户
export const updateUser = async (ctx) => {
  const { id } = ctx.params;
  const { username, password, nickname, gender, birthday, avatar, level } = ctx.request.body;

  const existingUser = await getDataById('users', id);
  if (existingUser.status === 'error') {
    ctx.throw(400, '用户不存在');
  }

  const data = { username, nickname, gender, birthday, avatar, level };

  if (password) {
    data.password = hashPassword(password);
  }

  const result = await updateDataById('users', id, data);

  if (result.status === 'error') {
    ctx.throw(500, result.msg);
  }

  ctx.body = {
    status: 'success',
    msg: '用户信息更新成功',
  };
};

// 删除用户
export const deleteUser = async (ctx) => {
  const { id } = ctx.params;

  const existingUser = await getDataById('users', id);
  if (existingUser.status === 'error') {
    ctx.throw(400, '用户不存在');
  }

  const result = await deleteDataById('users', id);

  if (result.status === 'error') {
    ctx.throw(500, result.msg);
  }

  ctx.body = {
    status: 'success',
    msg: '用户删除成功',
  };
};
