import { validateUsername, validatePassword, validateEmail } from '../utils/validators.mjs';
import { Admin } from '../models/Admin.mjs';
import { hashMD5, generateToken } from '../utils/common.mjs';
import config from '../config/config.mjs';

// 获取所有管理员
export const getAdmins = async (ctx) => {
  const { page = 1, pageSize = 10 } = ctx.query;
  const offset = (page - 1) * pageSize;

  try {
    const result = await Admin.findAndCountAll({
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

// 新增管理员
export const addAdmin = async (ctx) => {
  const { username, password, email, nickname, roleId, birthday, avatar, tel, note } = ctx.request.body;

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
    const isExists = await Admin.findOne({ where: { username } });
    if (isExists) {
      ctx.throw(400, '用户名已被注册');
    }
    const admin = await Admin.create({ username, password, email, nickname, roleId, birthday, avatar, tel, note });
    ctx.body = {
      status: 'success',
      msg: '创建成功',
      data: admin,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 获取管理员信息
export const getAdmin = async (ctx) => {
  const { id } = ctx.params;

  try {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      ctx.throw(400, '用户不存在');
    }
    ctx.body = {
      status: 'success',
      msg: '获取信息成功',
      data: admin,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 修改管理员
export const updateAdmin = async (ctx) => {
  const { id } = ctx.params;
  const { username, password, email, nickname, roleId, birthday, avatar, tel, note } = ctx.request.body;

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
    const admin = await Admin.findByPk(id);
    if (!admin) {
      ctx.throw(400, '用户不存在');
    }
    const data = { username, email, nickname, roleId, birthday, avatar, tel, note };
    if (password) {
      data.password = password;
    }
    const updatedAdmin = await admin.update(data);
    ctx.body = {
      status: 'success',
      msg: '更新成功',
      data: updatedAdmin,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 删除管理员
export const deleteAdmin = async (ctx) => {
  const { id } = ctx.params;

  try {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      ctx.throw(400, '用户不存在');
    }
    await admin.destroy();
    ctx.body = {
      status: 'success',
      msg: '删除成功',
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 管理员登录
export const adminLogin = async (ctx) => {
  const { username, password } = ctx.request.body;

  try {
    const admin = await Admin.findOne({ where: { username } });
    if (!admin || admin.password !== hashMD5(password)) {
      ctx.throw(401, '用户名或密码错误');
    }
    const token = generateToken({ id: admin.id, username: admin.username });
    ctx.body = {
      status: 'success',
      msg: '登录成功',
      data: {
        admin,
        token,
      },
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 管理员注销
export const adminLogout = async (ctx) => {
  ctx.body = {
    status: 'success',
    msg: '注销成功',
  };
};

// 管理员token刷新
export const refreshAdminToken = async (ctx) => {
  const { token } = ctx.request.body;

  try {
    const payload = jwt.verify(token, config.JWT_SECRET);
    const admin = await Admin.findByPk(payload.id);
    if (!admin) {
      ctx.throw(404, '用户不存在');
    }
    const newToken = generateToken({ id: admin.id, username: admin.username });
    ctx.body = {
      status: 'success',
      msg: 'Token刷新成功',
      data: {
        token: newToken,
      },
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};