/**
 * 用户路由模块
 * 处理用户相关的API路由
 */

const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  wxLogin,
  updateUserInfo, 
  getUserProfile 
} = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');

// 公开路由 - 无需认证
router.post('/register', register);
router.post('/login', login);
router.post('/wx-login', wxLogin);

// 受保护路由 - 需要认证
router.get('/profile', authenticate, getUserProfile);
router.put('/profile', authenticate, updateUserInfo);

module.exports = router;
