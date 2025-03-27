/**
 * 工具函数模块
 * 提供加密、认证等通用功能
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // 使用环境变量中的JWT_SECRET

/**
 * 密码加密
 * @param {string} password - 原始密码
 * @returns {Promise<string>} 加密后的密码
 */
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * 密码验证
 * @param {string} password - 原始密码
 * @param {string} hashedPassword - 加密后的密码
 * @returns {Promise<boolean>} 验证结果
 */
async function verifyPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * 生成JWT token
 * @param {number|string} userId - 用户ID
 * @returns {string} JWT token
 */
function generateToken(userId) {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: '24h'
  });
}

/**
 * 验证JWT token
 * @param {string} token - JWT token
 * @returns {Object|null} 解码后的payload或null
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

/**
 * 统一响应格式
 * @param {boolean} success - 是否成功
 * @param {string} message - 消息
 * @param {Object} data - 数据
 * @returns {Object} 格式化的响应对象
 */
function formatResponse(success, message, data = null) {
  const response = {
    success,
    message
  };
  
  if (data) {
    response.data = data;
  }
  
  return response;
}

module.exports = {
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken,
  formatResponse
};
