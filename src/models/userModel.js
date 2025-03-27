const { pool } = require('../config/database');

class UserModel {
  // 根据ID查找用户
  static async findById(id) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM users WHERE id = ?',
        [id]
      );
      return rows[0];
    } catch (error) {
      console.error('查询用户失败:', error);
      throw error;
    }
  }

  // 根据openid查找用户
  static async findByOpenid(openid) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM users WHERE openid = ?',
        [openid]
      );
      return rows[0];
    } catch (error) {
      console.error('查询用户失败:', error);
      throw error;
    }
  }
  
  // 根据openid查找用户（用于用户名密码登录）
  static async findByUsername(username) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM users WHERE openid = ?',
        [username]
      );
      return rows[0];
    } catch (error) {
      console.error('查询用户失败:', error);
      throw error;
    }
  }

  // 创建用户
  static async create(userData) {
    try {
      const { openid, nickname, avatar_url, phone, username, password } = userData;
      
      // 如果有openid，使用微信登录方式创建用户
      if (openid && !username) {
        const [result] = await pool.query(
          'INSERT INTO users (openid, nickname, avatar_url, phone) VALUES (?, ?, ?, ?)',
          [openid, nickname, avatar_url, phone]
        );
        return result.insertId;
      }
      
      // 如果有username，使用普通注册方式创建用户（将username作为openid存储）
      if (username) {
        const [result] = await pool.query(
          'INSERT INTO users (openid, nickname, phone, password) VALUES (?, ?, ?, ?)',
          [username, nickname || username, phone, password]
        );
        return result.insertId;
      }
      
      throw new Error('创建用户需要提供openid或username');
    } catch (error) {
      console.error('创建用户失败:', error);
      throw error;
    }
  }

  // 更新用户信息
  static async update(id, userData) {
    try {
      const { nickname, avatar_url, phone } = userData;
      const [result] = await pool.query(
        'UPDATE users SET nickname = ?, avatar_url = ?, phone = ? WHERE id = ?',
        [nickname, avatar_url, phone, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('更新用户失败:', error);
      throw error;
    }
  }
  
  // 验证密码
  static async verifyPassword(userId, password) {
    try {
      const [rows] = await pool.query(
        'SELECT password FROM users WHERE id = ?',
        [userId]
      );
      if (rows.length === 0 || !rows[0].password) {
        return false;
      }
      
      // 使用utils中的verifyPassword函数验证密码
      const { verifyPassword } = require('../utils/utils');
      return await verifyPassword(password, rows[0].password);
    } catch (error) {
      console.error('验证密码失败:', error);
      throw error;
    }
  }
}

module.exports = UserModel;
