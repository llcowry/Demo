import { validateUsername } from '../utils/validators.mjs';
import { hashMD5, generateToken, verifyToken, generateUniqueId } from '../utils/common.mjs';
import { sendMail } from '../utils/mailer.mjs';
import { User } from '../models/User.mjs';
import config from '../config/config.mjs';
import svgCaptcha from 'svg-captcha';
import { v4 as uuidv4 } from 'uuid';
import { decryptData } from '../utils/encrypt.mjs';

// 注册新用户
export const register = async (ctx) => {
  const { username, password, email } = ctx.request.body;
  const captchaKey = `userCaptcha:${captchaUuid}`;
  try {
    if (!username || !password) {
      ctx.body = {
        status: 'error',
        msg: '用户名和密码是必填项',
        code: 400,
      };
      return;
    }
    if (!validateUsername(username)) {
      ctx.body = {
        status: 'error',
        msg: '用户名无效（5-20个字符，可以包含字母、数字和一些特殊字符）',
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
    const isExists = await User.findOne({ where: { username } });
    if (isExists) {
      ctx.body = {
        status: 'error',
        msg: '用户名已被注册',
        code: 400,
      };
      return;
    }
    let password2 = password;
    if (config.ENCRYPT_STATUS) password2 = decryptData(password2);
    const user = await User.create({ username, password: hashMD5(password2), email });
    // 根据配置项决定是否发送欢迎邮件
    if (config.EMAIL_SEND_ON_REGISTER && email) {
      const emailResult = await sendMail(email, '欢迎加入我们', `亲爱的${nickname}, 欢迎加入我们!`, `<p>亲爱的${nickname},</p><p>欢迎加入我们!</p>`);
      if (emailResult.status === 'error') {
        console.error('邮件发送失败:', emailResult.error);
      }
    }
    const token = generateToken(user);
    delete user.password;
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
  const { username, password, captchaCode } = ctx.request.body;
  const captchaKey = `userCaptcha:${captchaUuid}`;
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
    const user = await User.findOne({ where: { username } });
    if (!user) {
      ctx.body = {
        status: 'error',
        msg: '用户不存在',
        code: 400,
      };
      return;
    }
    let password2 = password;
    if (config.ENCRYPT_STATUS) password2 = decryptData(password2);
    const hashedPassword = hashMD5(password2);
    if (user.password !== hashedPassword) {
      ctx.body = {
        status: 'error',
        msg: '密码错误',
        code: 400,
      };
      return;
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
  const token = ctx.headers.authorization;
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
    ctx.body = {
      status: 'error',
      msg: 'Token 是必填项',
      code: 400,
    };
    return;
  }
  try {
    const decoded = verifyToken(token);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      ctx.body = {
        status: 'error',
        msg: '用户不存在',
        code: 400,
      };
      return;
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
  const captchaKey = `userCaptcha:${captchaUuid}`;
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
