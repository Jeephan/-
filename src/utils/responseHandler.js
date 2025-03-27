/**
 * 响应处理工具
 * 提供统一的API响应格式
 */

/**
 * 成功响应
 * @param {Object} res - Express响应对象
 * @param {string} message - 成功消息
 * @param {Object|Array} data - 响应数据
 * @param {number} statusCode - HTTP状态码
 */
function success(res, message, data = null, statusCode = 200) {
  const response = {
    success: true,
    message
  };
  
  if (data !== null) {
    response.data = data;
  }
  
  res.status(statusCode).json(response);
}

/**
 * 错误响应
 * @param {Object} res - Express响应对象
 * @param {string} message - 错误消息
 * @param {number} statusCode - HTTP状态码
 * @param {Object} errors - 详细错误信息
 */
function error(res, message, statusCode = 400, errors = null) {
  const response = {
    success: false,
    message
  };
  
  if (errors !== null) {
    response.errors = errors;
  }
  
  res.status(statusCode).json(response);
}

/**
 * 创建自定义错误
 * @param {string} message - 错误消息
 * @param {number} statusCode - HTTP状态码
 * @returns {Error} 自定义错误对象
 */
function createError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

module.exports = {
  success,
  error,
  createError
};