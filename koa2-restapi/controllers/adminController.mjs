import { validateUsername, validatePassword, validateEmail } from '../utils/validators.mjs';
import { hashMD5, generateToken, invalidateToken, verifyToken } from '../utils/common.mjs';
import { Admin, Role, AdminRoles } from '../models/Admin.mjs';
import AdminLog from '../models/AdminLog.mjs';

// 获取所有管理员
export const getAdmins = async (ctx) => {
  const { page = 1, pageSize = 10 } = ctx.query;
  const offset = (page - 1) * pageSize;

  try {
    const result = await Admin.findAndCountAll({
      where: { isDeleted: false },
      include: Role,
      offset,
      limit: parseInt(pageSize),
    });
    ctx.body = {
      status: 'success',
      msg: '获取列表成功',
      data: result.rows,
      totalCount: result.count,
      page: parseInt(page),
      limit: parseInt(limit),
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 新增管理员
export const addAdmin = async (ctx) => {
  const { username, password, email, nickname, roleId, birthday, avatar, tel, note, isDisabled } = ctx.request.body;

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
    const admin = await Admin.create({ username, password, email, nickname, birthday, avatar, tel, note, isDisabled });
    await AdminRoles.create({
      adminId: admin.id,
      roleId,
    });
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
    const admin = await Admin.findByPk(id, {
      include: Role,
    });
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
  const { username, password, email, nickname, roleId, birthday, avatar, tel, note, isDisabled } = ctx.request.body;

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
    const data = { username, email, nickname, birthday, avatar, tel, note, isDisabled };
    if (password) {
      data.password = password;
    }
    const updatedAdmin = await admin.update(data);
    if (roleId) {
      await AdminRoles.update({ roleId }, { where: { adminId: id } });
    }
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
    // 软删除
    await admin.update({ isDeleted: true });
    // await admin.destroy();
    ctx.body = {
      status: 'success',
      msg: '删除成功',
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 启用或禁用管理员
export const setAdminStatus = async (ctx) => {
  const { id } = ctx.params;
  const { isDisabled } = ctx.request.body;

  try {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      ctx.throw(404, '用户不存在');
    }
    await admin.update({ isDisabled });
    ctx.body = {
      status: 'success',
      msg: `状态已${isDisabled ? '禁用' : '启用'}`,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 设置管理员密码
export const setAdminPassword = async (ctx) => {
  const { id } = ctx.params;
  const { password } = ctx.request.body;

  if (password && !validatePassword(password)) {
    ctx.throw(400, '密码无效（6-20个字符，至少一个字母和一个数字）');
  }

  try {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      ctx.throw(404, '用户不存在');
    }
    await admin.update({ password });
    ctx.body = {
      status: 'success',
      msg: '密码已更新',
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
    if (!admin) {
      await AdminLog.create({
        adminId: null,
        adminName: username,
        loginResult: 0,
        loginIp: ctx.headers['x-forwarded-for'] || ctx.request.ip,
        userAgent: ctx.headers['user-agent'],
        remark: '用户不存在',
      });
      ctx.throw(401, '用户不存在');
    }
    if (admin.password !== hashMD5(password)) {
      await AdminLog.create({
        adminId: admin.id,
        adminName: admin.username,
        loginResult: 0,
        loginIp: ctx.headers['x-forwarded-for'] || ctx.request.ip,
        userAgent: ctx.headers['user-agent'],
        remark: '密码错误',
      });
      ctx.throw(401, '密码错误');
    }
    const token = generateToken({ id: admin.id, username: admin.username });
    await AdminLog.create({
      adminId: admin.id,
      adminName: admin.username,
      loginResult: 1,
      loginIp: ctx.headers['x-forwarded-for'] || ctx.request.ip,
      userAgent: ctx.headers['user-agent'],
      remark: '登录成功',
    });
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
  const { adminId, adminName } = ctx.state.user;
  try {
    await AdminLog.create({
      adminId,
      adminName,
      loginResult: 1,
      loginIp: ctx.headers['x-forwarded-for'] || ctx.request.ip,
      userAgent: ctx.headers['user-agent'],
      remark: '注销成功',
    });
    // 无效化当前 Token
    const token = ctx.headers.authorization.split(' ')[1];
    invalidateToken(token);
    ctx.body = {
      status: 'success',
      msg: '注销成功',
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 管理员token刷新
export const refreshAdminToken = async (ctx) => {
  const { token } = ctx.request.body;

  try {
    const payload = verifyToken(token);
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
