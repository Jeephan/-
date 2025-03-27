const express = require('express');
const router = express.Router();
const MenuModel = require('../models/menuModel');

/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: 菜单管理API
 */

/**
 * @swagger
 * /api/menu/categories:
 *   get:
 *     summary: 获取所有菜品分类
 *     tags: [Menu]
 *     responses:
 *       200:
 *         description: 获取分类成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 categories:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 */
async function getCategories(req, res) {
  try {
    const categories = await MenuModel.getAllCategories();
    res.json({
      message: '获取分类成功',
      categories
    });
  } catch (error) {
    console.error('获取分类错误：', error);
    res.status(500).json({ message: '获取分类失败' });
  }
}

/**
 * @swagger
 * /api/menu/category/{categoryId}/items:
 *   get:
 *     summary: 获取指定分类下的所有菜品
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: 分类ID
 *     responses:
 *       200:
 *         description: 获取菜品成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MenuItem'
 */
async function getCategoryItems(req, res) {
  try {
    const { categoryId } = req.params;
    const items = await MenuModel.getMenuItemsByCategory(categoryId);
    res.json({
      message: '获取菜品成功',
      items
    });
  } catch (error) {
    console.error('获取菜品错误：', error);
    res.status(500).json({ message: '获取菜品失败' });
  }
}

/**
 * @swagger
 * /api/menu/hot-items:
 *   get:
 *     summary: 获取热门菜品
 *     tags: [Menu]
 *     responses:
 *       200:
 *         description: 获取热门菜品成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MenuItem'
 */
async function getHotItems(req, res) {
  try {
    const items = await MenuModel.getHotItems();
    res.json({
      message: '获取热门菜品成功',
      items
    });
  } catch (error) {
    console.error('获取热门菜品错误：', error);
    res.status(500).json({ message: '获取热门菜品失败' });
  }
}

/**
 * @swagger
 * /api/menu/item/{id}:
 *   get:
 *     summary: 获取菜品详情
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 菜品ID
 *     responses:
 *       200:
 *         description: 获取菜品详情成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 item:
 *                   $ref: '#/components/schemas/MenuItem'
 *       404:
 *         description: 菜品不存在
 */
async function getMenuItem(req, res) {
  try {
    const { id } = req.params;
    const item = await MenuModel.getMenuItem(id);
    if (!item) {
      return res.status(404).json({ message: '菜品不存在' });
    }
    res.json({
      message: '获取菜品详情成功',
      item
    });
  } catch (error) {
    console.error('获取菜品详情错误：', error);
    res.status(500).json({ message: '获取菜品详情失败' });
  }
}

// 设置路由
router.get('/categories', getCategories);
router.get('/category/:categoryId/items', getCategoryItems);
router.get('/hot-items', getHotItems);
router.get('/item/:id', getMenuItem);

module.exports = router;
