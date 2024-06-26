import jwt from 'jsonwebtoken';
import { insertData, getListData } from '../db/mysql.mjs';
import { validateUsername, validatePassword, validateEmail } from '../utils/validators.mjs';
import { hashMD5, generateUniqueId } from '../utils/common.mjs';
import { sendMail } from '../utils/mailer.mjs';
import config from '../config/config.mjs';

// 生成 JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, config.JWT_SECRET, { expiresIn: '1h' });
};

// 注册新用户
export const register = async (ctx) => {
  const { username, password, email } = ctx.request.body;
  if (!username || !password) {
    ctx.throw(400, '用户名和密码是必需的');
  }
  if (!validateUsername(username)) {
    ctx.throw(400, '用户名无效（3-15个字符，可以包含字母、数字和一些特殊字符）');
  }
  if (!validatePassword(password)) {
    ctx.throw(400, '密码无效（6-20个字符，至少一个字母和一个数字）');
  }
  if (email && !validateEmail(email)) {
    ctx.throw(400, '电子邮件无效');
  }

  // 检查用户名是否已存在
  const existingUser = await getListData('users', 'WHERE username = ?', [username]);
  if (existingUser.data.length > 0) {
    ctx.throw(400, '用户名已存在');
  }

  const hashedPassword = hashMD5(password);
  const result = await insertData('users', { id: generateUniqueId(), username, password: hashedPassword, email });

  if (result.status === 'error') {
    ctx.throw(500, result.msg);
  }

  // 根据配置项决定是否发送欢迎邮件
  if (config.EMAIL_SEND_ON_REGISTER && email) {
    const emailResult = await sendMail(email, '欢迎加入我们', `亲爱的${nickname}, 欢迎加入我们!`, `<p>亲爱的${nickname},</p><p>欢迎加入我们!</p>`);

    if (emailResult.status === 'error') {
      console.error('邮件发送失败:', emailResult.error);
    }
  }

  const user = await getListData('users', 'WHERE username = ?', [username]);

  ctx.body = {
    status: 'success',
    msg: '用户注册成功',
    data: {
      token: generateToken(user.data[0])
    }
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

  const hashedPassword = hashMD5(password);
  if (user.password !== hashedPassword) {
    ctx.throw(400, '无效的用户名或密码');
  }

  ctx.body = {
    status: 'success',
    msg: '登录成功',
    data: {
      token: generateToken(user)
    }
  };
};

// 用户注销
export const logout = async (ctx) => {
  ctx.body = {
    status: 'success',
    msg: '注销成功'
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
        token: generateToken(user)
      }
    };
  } catch (err) {
    ctx.throw(400, '无效的 Token');
  }
};
