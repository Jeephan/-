/**
 * 认证中间件
 * 用于验证用户身份和权限
 */

const { verifyToken } = require('../utils/utils');
const { error } = require('../utils/responseHandler');

/**
 * 验证用户是否已登录
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 * @param {Function} next - 下一个中间件函数
 */
function authenticate(req, res, next) {
  try {
    // 从请求头中获取token
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return error(res, '未提供认证令牌', 401);
    }
    
    // 提取Bearer token
    const token = authHeader.split(' ')[1];
    if (!token) {
      return error(res, '认证令牌格式不正确', 401);
    }
    
    // 验证token
    const decoded = verifyToken(token);
    if (!decoded) {
      return error(res, '无效的认证令牌', 401);
    }
    
    // 将用户ID添加到请求对象中
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error('认证中间件错误:', err);
    return error(res, '认证过程中发生错误', 500);
  }
}

module.exports = {
  authenticate
};