const { connectDB, pool } = require('./src/config/database');

// 测试数据库连接
async function testDatabaseConnection() {
  try {
    // 尝试连接数据库
    await connectDB();
    console.log('✅ 数据库连接测试成功');
    
    // 测试简单查询
    try {
      const [rows] = await pool.query('SELECT 1 as test');
      console.log('✅ 数据库查询测试成功:', rows);
    } catch (error) {
      console.error('❌ 数据库查询测试失败:', error);
    }
    
    // 测试表是否存在
    try {
      const tables = ['users', 'menu_items', 'categories', 'orders', 'order_items', 'carts', 'coupons', 'user_coupons', 'reviews'];
      for (const table of tables) {
        const [rows] = await pool.query(`SHOW TABLES LIKE '${table}'`);
        if (rows.length > 0) {
          console.log(`✅ 表 ${table} 存在`);
        } else {
          console.log(`❌ 表 ${table} 不存在`);
        }
      }
    } catch (error) {
      console.error('❌ 表检查测试失败:', error);
    }
    
  } catch (error) {
    console.error('❌ 数据库连接测试失败:', error);
  } finally {
    // 关闭连接池
    await pool.end();
    console.log('数据库连接池已关闭');
  }
}

// 执行测试
testDatabaseConnection();