import { validatePassword, validateEmail } from '../utils/validators.mjs';
import { hashMD5, generateToken, invalidateToken, verifyToken, generateRandomString } from '../utils/common.mjs';
import { Admin, Role, AdminRoles, Menu, Department } from '../models/Admin.mjs';
import AdminLog from '../models/AdminLog.mjs';
import { addAdminLog } from './adminLogController.mjs';
import LoginFail from '../models/LoginFail.mjs';
import { saveLoginFail } from './loginFailController.mjs';
import config from '../config/config.mjs';
import svgCaptcha from 'svg-captcha';
import { redis } from '../db/database.mjs';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import { decryptData } from '../utils/encrypt.mjs';

// 分页获取所有管理员
export const getAdmins = async (ctx) => {
  const { departmentId, isDisabled, keywords, page = 1, pageSize = 10 } = ctx.query;
  const offset = (page - 1) * pageSize;
  let where = [];
  where.push({ isDeleted: false });
  if (departmentId) where.push({ departmentId });
  if (isDisabled) where.push({ isDisabled: isDisabled === 'true' });
  if (keywords) {
    const keywordConditions = {
      [Op.or]: [
        { username: { [Op.like]: `%${keywords}%` } },
        { nickname: { [Op.like]: `%${keywords}%` } },
        { tel: { [Op.like]: `%${keywords}%` } },
        { email: { [Op.like]: `%${keywords}%` } },
      ],
    };
    where.push(keywordConditions);
  }
  try {
    const result = await Admin.findAndCountAll({
      where: { [Op.and]: where },
      attributes: { exclude: ['password'] },
      include: [
        Role,
        { model: Department, required: false }, // 关联部门信息，设置 required: false 表示可选关联
      ],
      offset,
      limit: parseInt(pageSize),
    });
    const admins = result.rows.map((admin) => {
      const roles = admin.Roles || [];
      const roleIdList = roles.map((role) => role.id);
      const roleNameList = roles.map((role) => role.roleName);
      const departmentName = admin.Department ? admin.Department.deptName : null;
      return {
        ...admin.toJSON(),
        departmentName,
        roleIdList,
        roleNameList,
      };
    });
    ctx.body = {
      status: 'success',
      msg: '获取列表成功',
      data: admins,
      totalCount: result.count,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 获取所有管理员
export const getAllAdmins = async (ctx) => {
  const { keywords, departmentId, isDisabled } = ctx.query;
  let where = [];
  where.push({ isDeleted: false });
  if (departmentId) where.push({ departmentId });
  if (isDisabled) where.push({ isDisabled: isDisabled === 'true' });
  if (keywords) {
    const keywordConditions = {
      [Op.or]: [
        { username: { [Op.like]: `%${keywords}%` } },
        { nickname: { [Op.like]: `%${keywords}%` } },
        { tel: { [Op.like]: `%${keywords}%` } },
        { email: { [Op.like]: `%${keywords}%` } },
      ],
    };
    where.push(keywordConditions);
  }
  try {
    const admins = await Admin.findAll({
      where: { [Op.and]: where },
      attributes: { exclude: ['password'] },
    });
    ctx.body = {
      status: 'success',
      msg: '获取列表成功',
      data: admins,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 新增管理员
export const addAdmin = async (ctx) => {
  const { username, email, nickname, gender, birthday, avatar, tel, note, isDisabled, departmentId, roleIdList } =
    ctx.request.body;
  if (!username) {
    ctx.body = {
      status: 'error',
      msg: '用户名是必填项',
      code: 400,
    };
    return;
  }
  if (email && !validateEmail(email)) {
    ctx.body = {
      status: 'error',
      msg: '电子邮件无效',
      code: 400,
    };
    return;
  }
  try {
    const isExists = await Admin.findOne({ where: { username } });
    if (isExists) {
      ctx.body = {
        status: 'error',
        msg: '用户名已被注册',
        code: 400,
      };
      return;
    }
    let password = generateRandomString(8);
    const admin = await Admin.create({
      username,
      password: hashMD5(password),
      email,
      nickname,
      gender,
      birthday,
      avatar,
      tel,
      note,
      isDisabled,
      departmentId,
    });
    if (roleIdList && roleIdList.length > 0) {
      for (const roleId of roleIdList) {
        await AdminRoles.create({
          adminId: admin.id,
          roleId,
        });
      }
    }
    ctx.body = {
      status: 'success',
      msg: '创建成功',
      data: password,
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
      attributes: { exclude: ['password'] },
      include: Role,
    });
    if (!admin) {
      ctx.body = {
        status: 'fail',
        msg: '用户不存在',
        code: 400,
      };
      return;
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
  const { username, email, nickname, gender, birthday, avatar, tel, note, isDisabled, departmentId, roleIdList } =
    ctx.request.body;
  if (!username) {
    ctx.body = {
      status: 'error',
      msg: '用户名是必填项',
      code: 400,
    };
    return;
  }
  try {
    const admin = await Admin.findByPk(id, { attributes: { exclude: ['password'] } });
    if (!admin) {
      ctx.body = {
        status: 'error',
        msg: '用户不存在',
        code: 400,
      };
      return;
    }
    if (admin.administrator) {
      ctx.body = {
        status: 'error',
        msg: '禁止操作超管账号',
        code: 400,
      };
      return;
    }
    const data = { username, email, nickname, gender, birthday, avatar, tel, note, isDisabled, departmentId };
    const updatedAdmin = await admin.update(data);
    if (roleIdList && roleIdList.length > 0) {
      await AdminRoles.destroy({ where: { adminId: id } });
      for (const roleId of roleIdList) {
        await AdminRoles.create({
          adminId: id,
          roleId,
        });
      }
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
      ctx.body = {
        status: 'error',
        msg: '用户不存在',
        code: 400,
      };
      return;
    }
    if (admin.administrator) {
      ctx.body = {
        status: 'error',
        msg: '禁止操作超管账号',
        code: 400,
      };
      return;
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
      ctx.body = {
        status: 'error',
        msg: '用户不存在',
        code: 400,
      };
      return;
    }
    if (admin.administrator) {
      ctx.body = {
        status: 'error',
        msg: '禁止操作超管账号',
        code: 400,
      };
      return;
    }
    await admin.update({ isDisabled: !isDisabled });
    ctx.body = {
      status: 'success',
      msg: `状态已${!isDisabled ? '禁用' : '启用'}`,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 设置管理员密码
export const setAdminPassword = async (ctx) => {
  const token = ctx.headers.authorization;
  const { id } = verifyToken(token);
  const { newPassword } = ctx.request.body;
  try {
    if (newPassword && !validatePassword(newPassword)) {
      ctx.body = {
        status: 'error',
        msg: '密码无效（6-20个字符，可以包含字母、数字和一些特殊字符）',
        code: 400,
      };
      return;
    }
    const admin = await Admin.findByPk(id);
    let newPassword2 = hashMD5(newPassword);
    if (admin.password == newPassword2) {
      ctx.body = {
        status: 'error',
        msg: '新密码与旧密码不能相同',
        code: 400,
      };
      return;
    }
    await admin.update({ password: newPassword2 });
    ctx.body = {
      status: 'success',
      msg: '密码已更新',
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 重置管理员密码
export const resetAdminPassword = async (ctx) => {
  const { id } = ctx.params;
  try {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      ctx.body = {
        status: 'error',
        msg: '用户不存在',
        code: 400,
      };
      return;
    }
    if (admin.administrator) {
      ctx.body = {
        status: 'error',
        msg: '禁止操作超管账号',
        code: 400,
      };
      return;
    }
    let password = generateRandomString(8);
    await admin.update({ password: hashMD5(password) });
    ctx.body = {
      status: 'success',
      msg: '密码已更新',
      data: password,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 管理员登录
export const adminLogin = async (ctx) => {
  const { username, password, captchaCode, captchaUuid } = ctx.request.body;
  const captchaKey = `captcha:${captchaUuid}`;
  try {
    if (!username || !password) {
      ctx.body = {
        status: 'error',
        msg: '用户名和密码是必填项',
        code: 400,
      };
      return;
    }
    const storedCaptcha = await redis.get(captchaKey);
    if (!captchaCode || captchaCode.toLowerCase() !== storedCaptcha) {
      ctx.body = {
        status: 'error',
        msg: '验证码错误',
        code: 400,
      };
      return;
    }
    await redis.del(captchaKey);
    const admin = await Admin.findOne({
      where: { username },
      include: [
        {
          model: Role,
          attributes: ['id', 'roleName', 'roleCode', 'description'],
          include: [{ model: Menu, order: ['sort'] }],
        },
        { model: Department, required: false },
      ],
    });
    if (!admin) {
      await addAdminLog(ctx, { adminId: null, adminName: username, loginResult: 0, remark: '用户不存在' });
      ctx.body = {
        status: 'error',
        msg: '用户不存在',
        code: 400,
      };
      return;
    }
    let password2 = password;
    if (config.ENCRYPT_STATUS) password2 = decryptData(password2);
    if (admin.password !== hashMD5(password2)) {
      await addAdminLog(ctx, { adminId: admin.id, adminName: admin.username, loginResult: 0, remark: '密码错误' });
      await saveLoginFail(ctx, { adminId: admin.id, adminName: admin.username });
      ctx.body = {
        status: 'error',
        msg: '密码错误',
        code: 400,
      };
      return;
    }
    const loginfail = await LoginFail.findOne({ where: { adminName: admin.username } });
    const currentTime = new Date();
    if (loginfail) {
      const lockEndTime = new Date(new Date(loginfail.lockBeginAt).getTime() + config.LOGINFAIL_LOCK_TIME * 1000);
      if (loginfail.isLock && currentTime < lockEndTime) {
        ctx.body = {
          status: 'error',
          msg: `连续登录失败 ${config.LOGINFAIL_LOCK_COUNT} 次，该账户已锁定，请 ${lockEndTime} 再来登录！`,
          code: 400,
        };
        return;
      }
    }
    await addAdminLog(ctx, { adminId: admin.id, adminName: admin.username, loginResult: 1, remark: '登录成功' });
    await LoginFail.destroy({ where: { adminName: admin.username } });
    // 将角色与菜单信息平级列出
    let menus = admin
      .toJSON()
      .Roles.map((role) => {
        const { Menus } = role;
        return Menus.map((menu) => ({
          ...menu,
        }));
      })
      .flat();
    let menuList = [];
    if (admin.administrator) {
      menus = await Menu.findAll({
        where: { isDisabled: false },
        order: ['sort'],
      });
      menuList = menus;
    } else {
      menuList = menus;
    }
    let adminData = admin.toJSON();
    adminData.menuList = menuList;
    adminData.departmentName = admin.Department ? admin.Department.deptName : null;
    const lastInfo = await AdminLog.findOne({
      where: { adminId: admin.id, loginResult: 1 },
      order: [['createdAt', 'DESC']],
    });
    adminData.lastLoginIp = lastInfo.loginIp;
    adminData.lastLoginUserAgent = lastInfo.userAgent;
    adminData.lastLoginTime = lastInfo.createdAt;
    // 删除密码字段
    delete adminData.password;
    const token = generateToken({ id: admin.id, username: admin.username });
    ctx.body = {
      status: 'success',
      msg: '登录成功',
      data: {
        ...adminData,
        token,
      },
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 管理员注销
export const adminLogout = async (ctx) => {
  const token = ctx.headers.authorization;
  const { id, username } = verifyToken(token);
  try {
    await addAdminLog(ctx, { adminId: id, adminName: username, loginResult: 2, remark: '退出登录' });
    // 无效化当前 Token
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
      ctx.body = {
        status: 'error',
        msg: '用户不存在',
        code: 400,
      };
      return;
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

// 生成验证码
export const getCaptcha = async (ctx) => {
  const captcha = svgCaptcha.create({
    width: 125,
    height: 45,
    size: 4, // 验证码长度
    ignoreChars: '0o1i', // 排除容易混淆的字符
    noise: 3, // 干扰线条数
    color: true, // 验证码字符是否有颜色，默认是 false
    background: '#ffffff', // 验证码图片背景颜色
  });
  // 将验证码存入 redis
  const captchaUuid = uuidv4();
  const captchaText = captcha.text.toLowerCase();
  const captchaKey = `captcha:${captchaUuid}`;
  await redis.set(captchaKey, captchaText, 'EX', config.CAPTCHACODE_EXPIRES_IN);
  // 将 SVG 数据转换为 Base64 格式
  const base64Captcha = Buffer.from(captcha.data).toString('base64');
  // 构造一个 data URI
  const captchaDataUri = `data:image/svg+xml;base64,${base64Captcha}`;
  // 返回验证码和验证码文本
  ctx.body = {
    status: 'success',
    msg: '验证码获取成功',
    data: {
      captchaBase64Image: captchaDataUri,
      captchaUuid: captchaUuid,
      expireSeconds: config.CAPTCHACODE_EXPIRES_IN, // 验证码过期时间
    },
  };
};

// 获取登录信息
export const getLoginInfo = async (ctx) => {
  const token = ctx.headers.authorization;
  try {
    const payload = verifyToken(token);
    const admin = await Admin.findByPk(payload.id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Role,
          attributes: ['id', 'roleName', 'roleCode', 'description'],
          include: [{ model: Menu, order: ['sort'] }],
        },
        { model: Department, required: false },
      ],
    });
    if (!admin) {
      ctx.body = {
        status: 'fail',
        msg: '用户不存在',
        code: 400,
      };
      return;
    }
    let adminData = admin.toJSON();
    let menuList = await redis.get(`menuList:${admin.id}`);
    if (menuList == null) {
      if (admin.administrator) {
        menuList = await Menu.findAll({ where: { isDisabled: false }, order: ['sort'], raw: true });
      } else {
        menuList = adminData.Roles.map((role) => {
          const { Menus } = role;
          return Menus.map((menu) => ({ ...menu }));
        }).flat();
      }
      await redis.set(`menuList:${admin.id}`, JSON.stringify(menuList), 'EX', 3600);
    } else {
      menuList = JSON.parse(menuList);
    }
    adminData.menuList = menuList;
    adminData.departmentName = admin.Department ? admin.Department.deptName : null;
    const lastInfo = await AdminLog.findOne({
      where: { adminId: admin.id, loginResult: 1 },
      order: [['createdAt', 'DESC']],
    });
    if (lastInfo) {
      adminData.lastLoginIp = lastInfo.loginIp;
      adminData.lastLoginUserAgent = lastInfo.userAgent;
      adminData.lastLoginTime = lastInfo.createdAt;
    }
    ctx.body = {
      status: 'success',
      msg: '获取信息成功',
      data: adminData,
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 批量更新部门
export const batchUpdateDepartment = async (ctx) => {
  const { departmentId, adminIds } = ctx.request.body;
  if (!departmentId || !adminIds) {
    ctx.body = {
      status: 'fail',
      msg: '无效参数',
      code: 400,
    };
    return;
  }
  try {
    const department = await Department.findByPk(departmentId);
    if (!department) {
      ctx.body = {
        status: 'fail',
        msg: '部门未找到',
        code: 400,
      };
      return;
    }
    // 查询要更新的管理员列表，并忽略掉超管
    const adminsToUpdate = await Admin.findAll({ where: { id: adminIds } });
    const filteredAdminIds = adminsToUpdate.filter((admin) => admin.administrator != true).map((admin) => admin.id);
    if (filteredAdminIds.length > 0) {
      await Admin.update({ departmentId }, { where: { id: filteredAdminIds } });
    }
    ctx.body = {
      status: 'success',
      msg: '批量更新部门成功',
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};

// 批量删除管理员
export const batchDeleteAdmin = async (ctx) => {
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
    // 查询要删除的管理员列表，并忽略掉超管
    const adminsToUpdate = await Admin.findAll({ where: { id: ids } });
    const filteredAdminIds = adminsToUpdate.filter((admin) => admin.administrator != true).map((admin) => admin.id);
    if (filteredAdminIds.length > 0) {
      await Admin.update({ isDeleted: true }, { where: { id: filteredAdminIds } });
    }
    ctx.body = {
      status: 'success',
      msg: '批量删除成功',
    };
  } catch (error) {
    ctx.throw(500, error.message);
  }
};
