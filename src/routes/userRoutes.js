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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 用户管理API
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: 用户注册
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 注册成功
 *       400:
 *         description: 注册失败
 */
router.post('/register', register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: 用户登录
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 登录成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: 登录失败
 */
router.post('/login', login);

/**
 * @swagger
 * /api/users/wx-login:
 *   post:
 *     summary: 微信小程序登录
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               openid:
 *                 type: string
 *               userInfo:
 *                 type: object
 *                 properties:
 *                   nickName:
 *                     type: string
 *                   avatarUrl:
 *                     type: string
 *     responses:
 *       200:
 *         description: 登录成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       500:
 *         description: 登录失败
 */
router.post('/wx-login', wxLogin);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: 获取用户个人资料
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 获取成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: 未授权
 */
router.get('/profile', authenticate, getUserProfile);

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: 更新用户个人资料
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *               avatar_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: 更新成功
 *       401:
 *         description: 未授权
 *       500:
 *         description: 更新失败
 */
router.put('/profile', authenticate, updateUserInfo);

module.exports = router;
