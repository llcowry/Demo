import { validateUsername, validatePassword, validateEmail } from '../utils/validators.mjs';
import { hashMD5, generateToken, verifyToken } from '../utils/common.mjs';
import { sendMail } from '../utils/mailer.mjs';
import { User } from '../models/User.mjs';
import config from '../config/config.mjs';

// 注册新用户
export const register = async (ctx) => {
  const { username, password, email } = ctx.request.body;
  if (!username || !password) {
    ctx.throw(400, '用户名和密码是必需的');
  }
  if (!validateUsername(username)) {
    ctx.throw(400, '用户名无效（5-20个字符，可以包含字母、数字和一些特殊字符）');
  }
  if (!validatePassword(password)) {
    ctx.throw(400, '密码无效（6-20个字符，至少一个字母和一个数字）');
  }
  if (email && !validateEmail(email)) {
    ctx.throw(400, '电子邮件无效');
  }

  try {
    const isExists = await User.findOne({ where: { username } });
    if (isExists) {
      ctx.throw(400, '用户名已被注册');
    }
    const user = await User.create({ username, password, email });

    // 根据配置项决定是否发送欢迎邮件
    if (config.EMAIL_SEND_ON_REGISTER && email) {
      const emailResult = await sendMail(
        email,
        '欢迎加入我们',
        `亲爱的${nickname}, 欢迎加入我们!`,
        `<p>亲爱的${nickname},</p><p>欢迎加入我们!</p>`,
      );
      if (emailResult.status === 'error') {
        console.error('邮件发送失败:', emailResult.error);
      }
    }
    const token = generateToken(user);
    ctx.body = {
      status: 'success',
      msg: '用户创建成功',
      data: { user, token },
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 用户登录
export const login = async (ctx) => {
  const { username, password } = ctx.request.body;

  if (!username || !password) {
    ctx.throw(400, '用户名和密码是必需的');
  }
  if (!validateUsername(username)) {
    ctx.throw(400, '用户名无效（5-20个字符，可以包含字母、数字和一些特殊字符）');
  }
  if (!validatePassword(password)) {
    ctx.throw(400, '密码无效（6-20个字符，至少一个字母和一个数字）');
  }

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      ctx.throw(400, '用户不存在');
    }
    const hashedPassword = hashMD5(password);
    if (user.password !== hashedPassword) {
      ctx.throw(400, '密码错误');
    }
    const token = generateToken(user);
    delete user.password;
    ctx.body = {
      status: 'success',
      msg: '登录成功',
      data: { user, token },
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 用户注销
export const logout = async (ctx) => {
  // 无效化当前 Token
  const token = ctx.headers.authorization.split(' ')[1];
  invalidateToken(token);
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
    const decoded = verifyToken(token);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      ctx.throw(400, '用户不存在');
    }
    const newToken = generateToken(user);
    ctx.body = {
      status: 'success',
      msg: 'Token 刷新成功',
      data: { token: newToken },
    };
  } catch (error) {
    ctx.throw(500, 'Token 刷新失败: ' + error.message);
  }
};
