import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { insertData, getListData } from '../db/mysql.mjs';
import config from '../config/config.mjs';

// 生成 JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, config.JWT_SECRET, { expiresIn: '1h' });
};

// 使用 MD5 加密密码
const hashPassword = (password) => {
  return crypto.createHash('md5').update(password).digest('hex');
};

// 注册新用户
export const register = async (ctx) => {
  const { username, password, nickname, gender, birthday, avatar } = ctx.request.body;
  if (!username || !password) {
    ctx.throw(400, '用户名和密码是必需的');
  }

  // 检查用户名是否已存在
  const existingUser = await getListData('users', 'WHERE username = ?', [username]);
  if (existingUser.data.length > 0) {
    ctx.throw(400, '用户名已存在');
  }

  const hashedPassword = hashPassword(password);
  const result = await insertData('users', { username, password: hashedPassword, nickname, gender, birthday, avatar });

  if (result.status === 'error') {
    ctx.throw(500, result.msg);
  }

  const user = await getListData('users', 'WHERE username = ?', [username]);

  ctx.body = {
    status: 'success',
    msg: '用户注册成功',
    data: {
      token: generateToken(user.data[0]),
    },
  };
};

// 用户登录
export const login = async (ctx) => {
  const { username, password } = ctx.request.body;
  if (!username || !password) {
    ctx.throw(400, '用户名和密码是必需的');
  }

  const userResult = await getListData('users', 'WHERE username = ?', [username]);
  const user = userResult.data[0];

  if (!user) {
    ctx.throw(400, '无效的用户名或密码');
  }

  const hashedPassword = hashPassword(password);
  if (user.password !== hashedPassword) {
    ctx.throw(400, '无效的用户名或密码');
  }

  ctx.body = {
    status: 'success',
    msg: '登录成功',
    data: {
      token: generateToken(user),
    },
  };
};

// 用户注销
export const logout = async (ctx) => {
  ctx.body = {
    status: 'success',
    msg: '注销成功',
  };
};

// 刷新 JWT token
export const refreshToken = async (ctx) => {
  const { token } = ctx.request.body;
  if (!token) {
    ctx.throw(400, 'Token 是必需的');
  }

  try {
    const payload = jwt.verify(token, config.JWT_SECRET);
    const userResult = await getListData('users', 'WHERE id = ?', [payload.id]);
    const user = userResult.data[0];
    if (!user) {
      ctx.throw(400, '未找到用户');
    }

    ctx.body = {
      status: 'success',
      msg: 'Token 刷新成功',
      data: {
        token: generateToken(user),
      },
    };
  } catch (err) {
    ctx.throw(400, '无效的 Token');
  }
};
