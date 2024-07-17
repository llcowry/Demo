import { verifyToken } from '../utils/common.mjs';

const auth = async (ctx, next) => {
  // 从请求头中获取 Authorization 字段，并提取 token
  const token = ctx.headers.authorization;
  // 如果没有 token，则抛出 401 错误
  if (!token) {
    ctx.throw(401, '需要授权令牌');
  }
  try {
    // 验证 token 并解码
    const user = verifyToken(token);
    // 将解码后的用户信息存储在 ctx.state 上
    ctx.state.user = user;
    // 继续执行下一个中间件
    await next();
  } catch (err) {
    let code = 400;
    if (err.message.indexOf('jwt') !== -1) code = 401;
    ctx.throw(code, err.message);
  }
};

export default auth;
