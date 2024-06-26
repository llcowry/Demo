import jwt from 'jsonwebtoken';
import config from '../config/config.mjs';

const authMiddleware = async (ctx, next) => {
  // 从请求头中获取 Authorization 字段，并提取 token
  const token = ctx.headers.authorization?.split(' ')[1];

  // 如果没有 token，则抛出 401 错误
  if (!token) {
    ctx.throw(401, '需要授权令牌');
  }

  try {
    // 验证 token 并解码
    const decoded = jwt.verify(token, config.JWT_SECRET);
    // 将解码后的用户信息存储在 ctx.state 上
    ctx.state.user = decoded;
    // 继续执行下一个中间件
    await next();
  } catch (err) {
    // 如果 token 无效，则抛出 401 错误
    ctx.throw(401, '无效的令牌');
  }
};

export default authMiddleware;
