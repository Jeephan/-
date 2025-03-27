const { pool } = require('../config/database');

class MenuModel {
  // 获取所有分类
  static async getAllCategories() {
    const [categories] = await pool.execute(
      'SELECT * FROM categories ORDER BY sort_order'
    );
    return categories;
  }

  // 获取分类下的菜品
  static async getMenuItemsByCategory(categoryId) {
    const [items] = await pool.execute(
      'SELECT * FROM menu_items WHERE category_id = ?',
      [categoryId]
    );
    return items;
  }

  // 获取热门菜品
  static async getHotItems() {
    const [items] = await pool.execute(
      'SELECT * FROM menu_items WHERE is_hot = 1'
    );
    return items;
  }

  // 获取菜品详情
  static async getMenuItem(id) {
    const [items] = await pool.execute(
      'SELECT * FROM menu_items WHERE id = ?',
      [id]
    );
    return items[0];
  }

  // 检查库存
  static async checkStock(id, quantity) {
    const [items] = await pool.execute(
      'SELECT stock FROM menu_items WHERE id = ?',
      [id]
    );
    if (items.length === 0) return false;
    return items[0].stock >= quantity;
  }
}

module.exports = MenuModel;
