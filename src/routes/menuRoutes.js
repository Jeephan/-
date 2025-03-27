const express = require('express');
const router = express.Router();
const MenuModel = require('../models/menuModel');

// 获取菜品分类
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

// 获取分类下的菜品
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

// 获取热门菜品
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

// 获取菜品详情
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
