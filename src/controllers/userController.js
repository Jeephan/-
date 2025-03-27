const UserModel = require('../models/userModel');
const { generateToken, hashPassword, verifyPassword } = require('../utils/utils');
const { success, error } = require('../utils/responseHandler');

/**
 * 用户控制器
 * 处理用户注册、登录、信息管理等功能
 */

/**
 * 微信登录
 * @param {Object} req - 请求对象，包含openid和用户信息
 * @param {Object} res - 响应对象
 */
async function wxLogin(req, res) {
  try {
    const { openid, userInfo } = req.body;

    // 查找用户是否已存在
    let user = await UserModel.findByOpenid(openid);

    if (!user) {
      // 创建新用户
      const userId = await UserModel.create({
        openid,
        nickname: userInfo.nickName,
        avatar_url: userInfo.avatarUrl
      });
      user = await UserModel.findById(userId);
    }

    // 生成token
    const token = generateToken(user.id);

    // 返回用户信息和token
    success(res, '登录成功', {
      token,
      user: {
        id: user.id,
        nickname: user.nickname,
        avatar_url: user.avatar_url,
        member_level: user.member_level,
        points: user.points
      }
    });
  } catch (err) {
    console.error('微信登录错误：', err);
    error(res, '登录过程中发生错误', 500);
  }
}

/**
 * 更新用户信息
 * @param {Object} req - 请求对象，包含用户ID和更新信息
 * @param {Object} res - 响应对象
 */
async function updateUserInfo(req, res) {
  try {
    const userId = req.userId; // 从token中获取
    const { nickname, avatar_url, phone } = req.body;

    await UserModel.update(userId, {
      nickname,
      avatar_url,
      phone
    });

    const user = await UserModel.findById(userId);

    success(res, '更新成功', { user });
  } catch (err) {
    console.error('更新用户信息错误：', err);
    error(res, '更新用户信息失败', 500);
  }
}

/**
 * 获取用户信息
 * @param {Object} req - 请求对象，包含用户ID
 * @param {Object} res - 响应对象
 */
async function getUserProfile(req, res) {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId);

    if (!user) {
      return error(res, '用户不存在', 404);
    }

    success(res, '获取用户信息成功', { user });
  } catch (err) {
    console.error('获取用户信息错误：', err);
    error(res, '获取用户信息失败', 500);
  }
}

/**
 * 用户登录
 * @param {Object} req - 请求对象，包含用户名和密码
 * @param {Object} res - 响应对象
 */
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // 检查用户是否存在（使用openid字段存储username）
    const user = await UserModel.findByUsername(username);
    if (!user) {
      return error(res, '用户名或密码错误', 401);
    }
    
    // 验证密码
    if (user.password && password) {
      const isPasswordValid = await verifyPassword(password, user.password);
      if (!isPasswordValid) {
        return error(res, '用户名或密码错误', 401);
      }
    }
    
    // 生成token
    const token = generateToken(user.id);
    
    // 返回用户信息和token
    success(res, '登录成功', {
      token,
      user: {
        id: user.id,
        nickname: user.nickname,
        avatar_url: user.avatar_url,
        member_level: user.member_level,
        points: user.points
      }
    });
  } catch (err) {
    console.error('登录失败:', err);
    error(res, '登录失败', 500);
  }
};

/**
 * 用户注册
 * @param {Object} req - 请求对象，包含注册信息
 * @param {Object} res - 响应对象
 */
async function register(req, res) {
  try {
    const { username, password, nickname, phone } = req.body;
    
    // 验证请求数据
    if (!username || !password) {
      return error(res, '用户名和密码不能为空', 400);
    }
    
    // 验证用户名格式
    if (username.length < 3) {
      return error(res, '用户名长度不能少于3个字符', 400);
    }
    
    // 检查用户是否已存在（使用openid字段存储username）
    const existingUser = await UserModel.findByUsername(username);
    if (existingUser) {
      return error(res, '用户名已存在', 400);
    }
    
    // 加密密码
    const hashedPassword = await hashPassword(password);
    
    // 创建新用户（将username作为openid存储）
    const userId = await UserModel.create({
      username,
      password: hashedPassword,
      nickname: nickname || username,
      phone
    });
    
    const user = await UserModel.findById(userId);
    
    // 生成token
    const token = generateToken(userId);
    
    success(res, '注册成功', {
      token,
      user: {
        id: user.id,
        nickname: user.nickname,
        avatar_url: user.avatar_url,
        member_level: user.member_level,
        points: user.points
      }
    }, 201);
  } catch (err) {
    console.error('注册错误：', err);
    error(res, '注册过程中发生错误', 500);
  }
}

// 确保导出所有函数
module.exports = {
  register,
  login,
  wxLogin,
  updateUserInfo,
  getUserProfile
};
