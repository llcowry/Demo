import { getPaginatedData, insertData, updateDataById, deleteDataById, getDataById } from '../db/mysql.mjs';
import { validateUsername, validatePassword, validateEmail } from '../utils/validators.mjs';
import { hashMD5, generateUniqueId } from '../utils/common.mjs';
import { sendMail } from '../utils/mailer.mjs';
import config from '../config/config.mjs';

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
    totalCount: result.totalCount
  };
};

// 新增用户
export const addUser = async (ctx) => {
  const { username, password, nickname, gender, birthday, avatar, level, email } = ctx.request.body;

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

  const hashedPassword = hashMD5(password);
  const result = await insertData('users', { id: generateUniqueId(), username, password: hashedPassword, nickname, gender, birthday, avatar, level, email });

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

  ctx.body = {
    status: 'success',
    msg: '用户新增成功'
  };
};

// 修改用户
export const updateUser = async (ctx) => {
  const { id } = ctx.params;
  const { username, password, nickname, gender, birthday, avatar, level, email } = ctx.request.body;

  // 验证用户名、密码和电子邮件
  if (username && !validateUsername(username)) {
    ctx.throw(400, '用户名无效（3-15个字符，可以包含字母、数字和一些特殊字符）');
  }
  if (password && !validatePassword(password)) {
    ctx.throw(400, '密码无效（6-20个字符，至少一个字母和一个数字）');
  }
  if (email && !validateEmail(email)) {
    ctx.throw(400, '电子邮件无效');
  }

  const existingUser = await getDataById('users', id);
  if (existingUser.status === 'error') {
    ctx.throw(400, '用户不存在');
  }

  const data = { username, nickname, gender, birthday, avatar, level, email };

  if (password) {
    data.password = hashMD5(password);
  }

  const result = await updateDataById('users', id, data);

  if (result.status === 'error') {
    ctx.throw(500, result.msg);
  }

  ctx.body = {
    status: 'success',
    msg: '用户信息更新成功'
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
    msg: '用户删除成功'
  };
};
