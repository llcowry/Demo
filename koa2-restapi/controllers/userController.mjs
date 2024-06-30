import { validateUsername, validatePassword, validateEmail } from '../utils/validators.mjs';
import { sendMail } from '../utils/mailer.mjs';
import { User } from '../models/User.mjs';
import config from '../config/config.mjs';

// 获取所有用户
export const getUsers = async (ctx) => {
  const { page = 1, pageSize = 10 } = ctx.query;
  const offset = (page - 1) * pageSize;

  try {
    const result = await User.findAndCountAll({
      offset,
      limit: parseInt(pageSize),
    });
    ctx.body = {
      status: 'success',
      msg: '获取列表成功',
      data: result.rows,
      totalCount: result.count,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 新增用户
export const addUser = async (ctx) => {
  const { username, password, email, nickname, gender, birthday, avatar, level } = ctx.request.body;

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
    const user = await User.create({ username, password, email, nickname, gender, birthday, avatar, tel });

    // 根据配置项决定是否发送欢迎邮件
    if (config.EMAIL_SEND_ON_REGISTER && email) {
      const emailResult = await sendMail(email, '欢迎加入我们', `亲爱的${nickname}, 欢迎加入我们!`, `<p>亲爱的${nickname},</p><p>欢迎加入我们!</p>`);
      if (emailResult.status === 'error') {
        console.error('邮件发送失败:', emailResult.error);
      }
    }

    ctx.body = {
      status: 'success',
      msg: '创建成功',
      data: user,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 获取用户信息
export const getUser = async (ctx) => {
  const { id } = ctx.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      ctx.throw(400, '用户不存在');
    }
    ctx.body = {
      status: 'success',
      msg: '获取信息成功',
      data: user,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 修改用户
export const updateUser = async (ctx) => {
  const { id } = ctx.params;
  const { username, password, email, nickname, gender, birthday, avatar, level, tel } = ctx.request.body;

  // 验证用户名、密码和电子邮件
  if (username && !validateUsername(username)) {
    ctx.throw(400, '用户名无效（5-20个字符，可以包含字母、数字和一些特殊字符）');
  }
  if (password && !validatePassword(password)) {
    ctx.throw(400, '密码无效（6-20个字符，至少一个字母和一个数字）');
  }
  if (email && !validateEmail(email)) {
    ctx.throw(400, '电子邮件无效');
  }

  try {
    const user = await User.findByPk(id);
    if (!user) {
      ctx.throw(400, '用户不存在');
    }
    const data = { username, nickname, email, gender, birthday, avatar, level, tel };
    if (password) {
      data.password = password;
    }
    const updatedUser = await user.update(data);
    ctx.body = {
      status: 'success',
      msg: '更新成功',
      data: updatedUser,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 删除用户
export const deleteUser = async (ctx) => {
  const { id } = ctx.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      ctx.throw(400, '用户不存在');
    }
    await user.destroy();
    ctx.body = {
      status: 'success',
      msg: '删除成功',
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};
